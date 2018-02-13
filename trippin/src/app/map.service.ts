import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class MapService {
  clicked_coords: BehaviorSubject<any[]> = new BehaviorSubject([]);
  current_location: BehaviorSubject<any> = new BehaviorSubject([]);
  review_coords: BehaviorSubject < any > = new BehaviorSubject([]);

  constructor(private _http: HttpClient) { }

  getPlaceInfo(coords, callback) {
    console.log("Came to service")
    this._http.get("https://api.mapbox.com/geocoding/v5/mapbox.places/" + coords[0] + "," + coords[1] + ".json?access_token=pk.eyJ1IjoiaGFsZWVraW1ha2EiLCJhIjoiY2piZnBwc3FuMzQ2ajMzcWdhajg2bnI1aSJ9.aeq1rXKekoQ8pnK0nbeRzw").subscribe(
      (place: any[]) => { this.clicked_coords.next(place); console.log(place); callback(place)},
      (errorResponse) => { console.log(errorResponse) }
    );
  }

  setCurrentLocation(location_info){
    this.current_location.next(location_info);
  }

  setReviewCoords(coords){
    if (coords.length > 0){
      this.review_coords.next([coords[0], coords[1]])
    }
    else {
      this.review_coords.next([]);
    }
  }


}

