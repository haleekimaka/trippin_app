import { Component, OnInit } from '@angular/core';
import { UserService } from '../../user.service';
import { DataService } from '../../data.service';
import { Router } from '@angular/router';
import { MymapComponent } from '../mymap/mymap.component';

@Component({
  selector: 'app-likedreviews',
  templateUrl: './likedreviews.component.html',
  styleUrls: ['./likedreviews.component.css']
})
export class LikedreviewsComponent implements OnInit {
  current_user;
  user_reviews;
  constructor(private _userService: UserService, private _dataService: DataService, private _router: Router) { }

  ngOnInit() {
    this._userService.other_user.subscribe(
      (data) => { this.current_user = data; console.log(data) }
    )
    this._dataService.reviews_of_user.subscribe(
      (data) => { this.user_reviews = data; console.log(data) }
    )
  }

  showUser(user_id){
    this._userService.getAnotherUser(user_id);
    let map = new MymapComponent(this._userService, this._dataService, this._router);
    map.buildMap();
  }


}
