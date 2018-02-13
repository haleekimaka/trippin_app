import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; 
import { UserService } from '../user.service';
import { DataService } from '../data.service';
import { NgForm, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MymapComponent } from '../profile/mymap/mymap.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  logged_user;
  search_query;
  query_kind;
  constructor(private _router: Router, private _userService: UserService, private _dataService: DataService) { }

  ngOnInit() {
    this._userService.user.subscribe(
      (data) => {this.logged_user = data}
    )
  }

  gotoLanding() {
    this._dataService.topReviews();
    this._dataService.recentReviews();
    this._router.navigateByUrl('landing');
  }

  gotoProfile(){
    console.log(this.logged_user);
    if(Array.isArray(this.logged_user)){
      this._userService.getAnotherUser(this.logged_user[0]._id);
      this._router.navigateByUrl('profile');
      let map = new MymapComponent(this._userService, this._dataService, this._router);
      map.buildMap();
    }
    else {
      this._userService.getAnotherUser(this.logged_user._id);
      this._router.navigateByUrl('profile');
      let map = new MymapComponent(this._userService, this._dataService, this._router);
      map.buildMap();
    }
  }

  onSubmit(formData: NgForm){
    console.log(formData);
    console.log(this.search_query);
    console.log(this.query_kind);
    this._dataService.setQuery({ content: this.search_query, type: this.query_kind });
    this._router.navigateByUrl('search');
  }

  logout() {
    this._userService.wipeUser();
    this._router.navigateByUrl('/');
  }

}
