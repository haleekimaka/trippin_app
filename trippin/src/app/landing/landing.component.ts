import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../user.service';
import { MapService } from '../map.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {
  user;
  constructor(private _router: Router, private _userService: UserService, private _mapService: MapService) { }

  ngOnInit() {
    this.user = this._userService.user;
    console.log(this.user);
  }

  createReview() {
    this._mapService.setReviewCoords([]);
    this._router.navigateByUrl('/review/create');
  }

}
