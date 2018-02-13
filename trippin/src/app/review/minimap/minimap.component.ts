import { Component, OnInit, Input} from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { MapService } from '../../map.service';
import { Location } from '../../location';
import { DataService } from '../../data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-minimap',
  templateUrl: './minimap.component.html',
  styleUrls: ['./minimap.component.css']
})
export class MinimapComponent implements OnInit {
  map: mapboxgl.Map;
  place;
  location: Location = new Location();
  current_location;
  coords; 
  marker:any = false;

  @Input() style: string = 'mapbox://styles/mapbox/streets-v9';

  constructor(private _mapService: MapService, private _dataService: DataService, private _router: Router) {
    mapboxgl.accessToken = "pk.eyJ1IjoiaGFsZWVraW1ha2EiLCJhIjoiY2piZnBwc3FuMzQ2ajMzcWdhajg2bnI1aSJ9.aeq1rXKekoQ8pnK0nbeRzw";
  }

  ngOnInit() {
    this.initializeMap();

    // this.place = this._mapService.clicked_coords;

    this._mapService.current_location.subscribe(
      (data) => { this.current_location = data }
    );

    this._dataService.review_coords.subscribe(
      (data) => { this.coords = data; console.log(data); if (data[1]) { this.createMarker([data[0], data[1]]); this.toLocation(data[0], data[1]) } }
    ) 
    
  }
  
  initializeMap(){
    this.buildMap();
  }

  buildMap() {
    var bounds = [
      [-198.2812499999957, -73.32785809840632],
      [198.2812499999957, 73.32785809840632]
    ];
    this.map = new mapboxgl.Map({
      container: 'mini',
      style: this.style,
      zoom: 0,
      // center: this.center,
      maxBounds: bounds
    })
    this.map.addControl(new mapboxgl.NavigationControl());

    this.map.on('click', (event) => {
      console.log([event.lngLat.lng, event.lngLat.lat]);
      this._mapService.getPlaceInfo([event.lngLat.lng, event.lngLat.lat], (data)=> {
        this.location.state = "";
        this.location.country = "";
        this.location.city = "";
        for(let x = 0; x < data.features.length; x++){
          if (data.features[x].place_type[0] == 'region'){
            this.location.state = data.features[x].text;
          }
          if (data.features[x].place_type[0] == 'country'){
            this.location.country = data.features[x].text;
          }
          if(data.features[x].place_type[0] == 'place'){
            this.location.city = data.features[x].text;
          }
        }
        if(this.location.coords.length > 0){
          this.location.coords = [];
        }
        this.location.coords.push(event.lngLat.lng);
        this.location.coords.push(event.lngLat.lat);
        console.log(this.location);
        this._mapService.setCurrentLocation(this.location);
        this.createMarker(this.location.coords);
        this.map.flyTo({
          center: [event.lngLat.lng, event.lngLat.lat],
          zoom: 8
        });
      });
    })
  }

  zoom(location){
    let locations = {
      "nam": [-109.33593749999379, 47.27922900257258], "cam": [-84.9290473393317, 12.515798808592592], "latam": [-60.678432811467104, -15.232210665510905], "eur": [18.184313587921963, 54.1728618068554], "afr": [21.574467216632826, 8.81386859214214], "asia": [87.67732900189611, 48.6149665417727], "spaf": [129.32860682673783, -19.274540869730]};
      
    this.map.flyTo({
      center: [locations[location][0], locations[location][1]],
      zoom: 2
    });
  }
  
  createMarker(coords){
    if(this.marker){
      this.marker.remove();
    }
    let el = document.createElement('div');
    el.className = 'trippin_marker';

    this.marker = new mapboxgl.Marker(el).setLngLat(coords).addTo(this.map);

  }

  toLocation(lng, lat){
    this.map.flyTo({
      center: [lng, lat],
      zoom: 5
    });
    this._mapService.getPlaceInfo([lng,lat], (data) => {
      this.location.state = "";
      this.location.country = "";
      this.location.city = "";
      for (let x = 0; x < data.features.length; x++) {
        if (data.features[x].place_type[0] == 'region') {
          this.location.state = data.features[x].text;
        }
        if (data.features[x].place_type[0] == 'country') {
          this.location.country = data.features[x].text;
        }
        if (data.features[x].place_type[0] == 'place') {
          this.location.city = data.features[x].text;
        }
      }
      if (this.location.coords.length > 0) {
        this.location.coords = [];
      }
      this.location.coords.push(lng);
      this.location.coords.push(lat);
      console.log(this.location);
      this._mapService.setCurrentLocation(this.location);
  })

}

  showReview(review_id){
    this.location = new Location();
    this._dataService.getReview(review_id);
    this._router.navigateByUrl('review/show');
  }
}
