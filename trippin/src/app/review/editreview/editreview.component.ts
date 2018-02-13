import { Component, OnInit } from '@angular/core';
import { NgForm, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MapService } from '../../map.service';
import { DataService } from '../../data.service';
import { UserService } from '../../user.service';
import { Router } from '@angular/router';
import { Review } from '../../review';

@Component({
  selector: 'app-editreview',
  templateUrl: './editreview.component.html',
  styleUrls: ['./editreview.component.css']
})
export class EditreviewComponent implements OnInit {
  review;
  editReview: Review = new Review();
  logged_user;
  current_coords;
  same_user;
  constructor(private _mapService: MapService, private _dataService: DataService, private _userService: UserService, private _router: Router ) { }

  ngOnInit() {
    this._dataService.current_review.subscribe(
      (data) => {
        this.review = data;
        console.log(data); 
      })

    this._userService.user.subscribe(
      (data) => {
        this.logged_user = data;
        console.log(data);
      }
    );
  }

  gotoReview(){
    this._dataService.getReview(this.review._id);
    this._router.navigateByUrl('review/show');
  }

}
