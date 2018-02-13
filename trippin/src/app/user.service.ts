import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { DataService } from './data.service';
import { Router } from '@angular/router';

@Injectable()
export class UserService {

  user: BehaviorSubject<any[]> = new BehaviorSubject([]);
  other_user: BehaviorSubject<any[]> = new BehaviorSubject([])

  constructor(private _http: HttpClient, private _dataService: DataService, private _router: Router) { }
  
  getUser(user_id){
    this._http.get('/user/' + user_id).subscribe(
      (data: any[]) => { 
        this.user.next(data); 
        console.log(data); 
        this._dataService.getReviewsByUser(user_id);
        this._dataService.allReviews();
        this._dataService.topReviews();
        this._dataService.recentReviews(); 
      },
      (errorResponse) => { console.log(errorResponse) }
    );
  }

  getAnotherUser(user_id) {
    this._http.get('/user/' + user_id).subscribe(
      (data: any[]) => {
        this.other_user.next(data); 
        console.log(data); 
        this._dataService.getReviewsByUser(user_id); 
        this._dataService.allReviews();
        this._dataService.topReviews();
        this._dataService.recentReviews(); },
      (errorResponse) => { console.log(errorResponse) }
    );
  }

  refreshUser(user_id){
    this._http.get('/user/' + user_id).subscribe(
      (data: any[]) => {
        this.user.next(data);
      },
      (errorResponse) => { console.log(errorResponse) }
    );

  }

  createUser(username){
    this._http.post('/user', username).subscribe(
      (response) => { this.getUser(response); this.getAnotherUser(response)},
      (errorResponse) => { console.log(errorResponse) }
    );
  }

  checkUser(username, callback){
    this._http.get('/user/check/' + username).subscribe(
      (data: any[]) => { 
        console.log(data);
        callback(data);
        
      },
      (errorResponse) => { console.log(errorResponse) }
    );
  }

  followUser(user_id, follower_id){
    console.log(user_id, follower_id);
    this._http.put('/user/follow/'+user_id, {user: user_id, follower: follower_id}).subscribe (
      (data: any[]) => {
        console.log(data);
        this.getUser(follower_id);
        this.getAnotherUser(user_id);
        this._dataService.getReviewsByUser(user_id);
        this._dataService.allReviews();
        this._dataService.topReviews();
        this._dataService.recentReviews(); 
      },
      (errorResponse) => { console.log(errorResponse) }
    );
  }

  unfollowUser(user_id, follower_id) {
    this._http.put('/user/unfollow/' + user_id, { user: user_id, follower: follower_id }).subscribe(
      (data: any[]) => {
        console.log(data);
        this.getUser(follower_id);
        this.getAnotherUser(user_id);
        this._dataService.getReviewsByUser(user_id);
        this._dataService.allReviews();
        this._dataService.topReviews();
        this._dataService.recentReviews(); 
      },
      (errorResponse) => { console.log(errorResponse) }
    );
  }

  wipeUser() {
    this.user.next([]);
  }

}
