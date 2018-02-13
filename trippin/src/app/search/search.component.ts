import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { DataService } from '../data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  results_set;
  query;
  empty = true;

  constructor(
    private _userService: UserService,
    private _dataService: DataService,
    private _router: Router) { }

  ngOnInit() {

    this._dataService.results_set.subscribe(
      (data) => {
        this.results_set = data;
        console.log(this.results_set)
      }
    )

    this._dataService.search_query.subscribe(
        (data) => {
          this.query = data;
          console.log(this.query);
          if (this.query.content && this.query.type) {
            this.empty = false
          }
          else {
            this.empty = true
          }
          console.log("Line 32", this.empty)
        }
      )
  }

  showUser(user_id){
    this._userService.getAnotherUser(user_id);
    this._router.navigateByUrl('profile');
  }

  showReview(review_id){
    this._dataService.getReview(review_id);
    this._router.navigateByUrl('review/show');
  }

}
