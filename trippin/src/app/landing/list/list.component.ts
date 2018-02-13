import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from '../../data.service';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  top;
  recent;
  constructor( private _router: Router, private _dataService: DataService) { }

  ngOnInit() {
    this._dataService.top_reviews.subscribe(
      (data) => { this.top = data }
    )
    this._dataService.recent_reviews.subscribe(
      (data) => { this.recent = data; console.log(this.recent)}
    )
  }

  showReview(id) {
    this._dataService.getReview(id);
    this._router.navigateByUrl('review/show');
    //get review call to data service
  }

}
