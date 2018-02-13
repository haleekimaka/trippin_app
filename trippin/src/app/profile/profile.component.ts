import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../user.service';
import { DataService } from '../data.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  logged_user;
  current_user = [];
  user_reviews;
  follows;
  same_user;

  constructor(
    private _userService: UserService,
    private _dataService: DataService,
    private route: ActivatedRoute,
    private _router: Router,
  ) { }

  ngOnInit() {
    this.same_user;
    this.follows;
    this._userService.user.subscribe(
      (data) => { this.logged_user = data; console.log(this.logged_user)}
    )
    this._userService.other_user.subscribe(
      (data) => { 
        this.current_user = data;
        console.log("Line 31: ", this.current_user); 
        if (Array.isArray(this.logged_user)){
          if (this.current_user[0]['_id'] == this.logged_user[0]['_id']) {
            this.same_user = true;
            console.log('same user')
          }
          else {
            this.same_user = false;
            console.log('not the same user')
          }
        }
        else {
          if (this.current_user[0]['_id'] == this.logged_user['_id']) {
            this.same_user = true;
            console.log('same user')
          }
          else {
            this.same_user = false;
            console.log('not the same user')
          }
        }

        if (this.logged_user.follows){
          for (let x = 0; x < this.logged_user['follows'].length; x++) {
            if (this.logged_user.follows[x]['_id'] == this.current_user[0]['_id']) {
              this.follows = true;
            }
          }
        }
        else if (this.logged_user[0]['follows']){
          for (let x = 0; x < this.logged_user[0]['follows'].length; x++) {
            if (this.logged_user[0].follows[x]['_id'] == this.current_user[0]['_id']) {
              this.follows = true;
            }
          }
        }
        else {
          console.log("test is not working")
        }

      }
    )

    this._dataService.reviews_of_user.subscribe(
      (data) => { this.user_reviews = data }
    )
  }

  editReview(id){
    this._router.navigateByUrl('review/edit');
  }
  deleteReview(id){
    
  }
  showReview(id){
    this._dataService.getReview(id);
    this._router.navigateByUrl('review/show');
  }
  createReview() {
    this._router.navigateByUrl('review/create');
  }

  followUser(user) {
    console.log("profile component, followUser(), line 97: ", user, this.logged_user);
    if (Array.isArray(user) && !Array.isArray(this.logged_user)) {
      this._userService.followUser(user[0]._id, this.logged_user._id);
    }
    else if (Array.isArray(user) && Array.isArray(this.logged_user)) {
      this._userService.followUser(user[0]._id, this.logged_user[0]._id);
    }
    else if (!Array.isArray(user) && Array.isArray(this.logged_user)) {
      this._userService.followUser(user._id, this.logged_user[0]._id);
    }
    else {
      this._userService.followUser(user._id, this.logged_user._id)
    }
    this.follows = true;
    this._router.navigateByUrl('profile');
    
  }
  unfollowUser(user) {
    console.log("profile component, unfollowUser(), line 111: ", user, this.logged_user);
    if (Array.isArray(user) && !Array.isArray(this.logged_user)) {
      this._userService.unfollowUser(user[0]._id, this.logged_user._id);
    }
    else if (Array.isArray(user) && Array.isArray(this.logged_user)) {
      this._userService.unfollowUser(user[0]._id, this.logged_user[0]._id);
    }
    else if (!Array.isArray(user) && Array.isArray(this.logged_user)) {
      this._userService.unfollowUser(user._id, this.logged_user[0]._id);
    }
    else {
      this._userService.unfollowUser(user._id, this.logged_user._id)
    }
    this.follows = false;
    this._router.navigateByUrl('profile');
  }

}
