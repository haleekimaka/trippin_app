import { Component, OnInit } from '@angular/core';
import { Review } from '../../review';
import { MapService } from '../../map.service';
import { DataService } from '../../data.service';
import { UserService } from '../../user.service';
import { NgForm, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-createreview',
  templateUrl: './createreview.component.html',
  styleUrls: ['./createreview.component.css']
})
export class CreatereviewComponent implements OnInit {
  user;
  newReview: Review = new Review();
  current_location = {};
  present:any = true;
  constructor(private _mapService: MapService, private _dataService: DataService, private _userService: UserService, private _router: Router) { }

  ngOnInit() {
    this._mapService.current_location.subscribe(
      (data) => {this.current_location = data}
    )
    this._userService.user.subscribe(
      (data) => { this.user = data }
    )
  }

  onSubmit(formData: NgForm) {
    console.log(formData);
    
    if(this.newReview.couples){
      this.newReview.kind.push("Couples")
    }
    if (this.newReview.families) {
      this.newReview.kind.push("Families")
    }
    if (this.newReview.solos) {
      this.newReview.kind.push("Solo Travellers")
    }
    if(Array.isArray(this.user)){
      this.newReview.user = this.user[0];
    }
    else{
      this.newReview.user = this.user;
    }
    this.newReview._location = this.current_location;

    console.log(this.newReview);

    let resp = this._dataService.createReview(this.newReview);
    this._router.navigateByUrl('review/show');

  }
  gotoProfile(){
    console.log(this.user);
    this._mapService.setCurrentLocation({});
    this._mapService.setReviewCoords([]);
    if (Array.isArray(this.user)) {
      this._userService.getAnotherUser(this.user[0]._id);
      this._router.navigateByUrl('profile');
    }
    else {
      this._userService.getAnotherUser(this.user._id);
      this._router.navigateByUrl('profile');
    }
  }
  gotoLanding() {
    this._mapService.setCurrentLocation({});
    this._mapService.setReviewCoords([]);
    this._router.navigateByUrl('landing');
  }

}
