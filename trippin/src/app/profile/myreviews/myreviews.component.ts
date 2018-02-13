import { Component, OnInit } from '@angular/core';
import { UserService } from '../../user.service';
import { DataService } from '../../data.service';
import { NgForm, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-myreviews',
  templateUrl: './myreviews.component.html',
  styleUrls: ['./myreviews.component.css']
})
export class MyreviewsComponent implements OnInit {
  logged_user;
  user;
  user_reviews;
  constructor(private _userService: UserService, private _dataService: DataService, private _router: Router) { }

  ngOnInit() {
    this._userService.user.subscribe(
      (data) => { this.logged_user = data; console.log(data)}
    )

    this._userService.other_user.subscribe (
      (data) => { this.user = data; console.log(data) }
    )
    this._dataService.reviews_of_user.subscribe(
      (data) => { this.user_reviews = data; console.log(this.user_reviews) }
    )
  }

  showReview(review_id) {
    this._dataService.getReview(review_id);
    this._router.navigateByUrl('review/show');
  }

  removeReview(review_id){
    this._dataService.deleteReview(review_id, this.logged_user._id);

  }

}
