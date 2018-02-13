import { Component, OnInit, Input} from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { DataService } from '../../data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-globalmap',
  templateUrl: './globalmap.component.html',
  styleUrls: ['./globalmap.component.css']
})
export class GlobalmapComponent implements OnInit {
  map: mapboxgl.Map;
  top_reviews;

  @Input() style: string = 'mapbox://styles/mapbox/streets-v9';
  constructor(private _dataService: DataService, private _router: Router) { 
    mapboxgl.accessToken = "pk.eyJ1IjoiaGFsZWVraW1ha2EiLCJhIjoiY2piZnBwc3FuMzQ2ajMzcWdhajg2bnI1aSJ9.aeq1rXKekoQ8pnK0nbeRzw";

  }

  ngOnInit() {
    this._dataService.top_reviews.subscribe(
      (data) => { this.top_reviews = data }
    );
    this.initializeMap();
  }

  initializeMap() {
    this.buildMap();
  }

  buildMap(){
    var bounds = [
      [-198.2812499999957, -73.32785809840632],
      [198.2812499999957, 73.32785809840632]
    ];

    this.map = new mapboxgl.Map ({
      container: 'global',
      style: this.style,
      zoom: 0,
      // center: this.center,
      maxBounds: bounds
    })

    this.map.addControl(new mapboxgl.NavigationControl());

    this.map.on('load', (event) => {
      for (let x = 0; x < this.top_reviews.length; x++) {
        this.createMarker(this.top_reviews[x]);
      }
    })

    this.map.on('click', (event) => {
      this.map.flyTo({
        center: [event.lngLat.lng, event.lngLat.lat],
        zoom: 4
      });
    })
  }

  createMarker(review) {

    let el = document.createElement('div');
    el.className = 'trippin_marker';
    el.id = review._id;

    let popup = new mapboxgl.Popup({
      closeOnClick: true,
      closeButton: false,
    }).setHTML('<img src="http://placehold.it/70x50" class="rounded mb-3 img-responsive"><a (click)="showReview(' + review._id + ')" class="h5">' + review.title + '</a><div class="text-gray">' + review.location_info + '</div>');

    new mapboxgl.Marker(el).setLngLat(review._location.coords).setPopup(popup).addTo(this.map);
  }

  showReview(review_id) {
    console.log("entered ShowReview");
    this._dataService.getReview(review_id);
    this._router.navigateByUrl('review/show');
  }

}
