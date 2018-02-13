import { Component, OnInit } from '@angular/core';
import { MapService } from '../../map.service';
import { DataService } from '../../data.service';
import { UserService } from '../../user.service';
import { NgForm, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Review } from '../../review';
import { Router } from '@angular/router';

@Component({
  selector: 'app-showreview',
  templateUrl: './showreview.component.html',
  styleUrls: ['./showreview.component.css']
})
export class ShowreviewComponent implements OnInit {
  review;
  logged_user;
  current_coords;
  same_user;
  constructor(private _mapService: MapService, private _dataService: DataService, private _userService: UserService, private _router: Router) { }

  ngOnInit() {
    this._dataService.current_review.subscribe(
      (data) => { 
        this.review = data; 
        console.log(data); 
        if (this.logged_user && this.review) {
          console.log("logged user: ", this.logged_user);
          console.log("review user: ", this.review._user);
          if (this.logged_user._id == this.review._user._id) {
            console.log('review written by logged_user');
            this.same_user = true;
          }
          else {
            console.log('review written by other user');
            this.same_user = false;
          }
        }
      }
    );
    this._userService.user.subscribe(
      (data) => { 
        this.logged_user = data; 
        console.log(data); 
      }
    );
    this.current_coords = this._dataService.review_coords;
  }

  likePlace(){

  }

  likeReview(review_id) {
    console.log(review_id);
    this._dataService.likeReview(review_id);
  }

  reviewPlace(coords){
    console.log(coords);
    this._mapService.setReviewCoords(coords);
    this._router.navigateByUrl('/review/create');
  }

  editReview(review_id){
    console.log(review_id);
    this._dataService.getReview(review_id);
    this._router.navigateByUrl('/review/edit');
  }

  removeReview(review_id){
    if(Array.isArray(this.logged_user)){
      this._dataService.deleteReview(review_id, this.logged_user[0]._id);
      this._userService.refreshUser(this.logged_user[0]._id);
    }
    else{
      this._dataService.deleteReview(review_id, this.logged_user._id);
      this._userService.refreshUser(this.logged_user._id);
    }
    this._router.navigateByUrl('profile');
  }

  showUser(user_id){
    this._userService.getAnotherUser(user_id);
    this._router.navigateByUrl('profile');
  }

}
