import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { UserService } from './user.service';

@Injectable()
export class DataService {
  current_review: BehaviorSubject<any[]> = new BehaviorSubject([]);
  all_reviews: BehaviorSubject<any[]> = new BehaviorSubject([]);
  top_reviews: BehaviorSubject<any[]> = new BehaviorSubject([]);
  recent_reviews: BehaviorSubject<any[]> = new BehaviorSubject([]);
  reviews_of_user: BehaviorSubject<any[]> = new BehaviorSubject([]);
  review_coords: BehaviorSubject<any[]> = new BehaviorSubject([]);
  results_set: BehaviorSubject<any[]> = new BehaviorSubject([]);
  search_query: BehaviorSubject<any[]> = new BehaviorSubject([]);

  constructor(private _http: HttpClient) { }
  setQuery(query){
    this.runSearch(query);
    this.search_query.next(query);
  }

  runSearch(query){
    this._http.get('/search/' + query.type + "/" + query.content).subscribe(
      (response: any[]) => { this.results_set.next(response) },
      (errorResponse) => { console.log(errorResponse) }
    )
  }
  allReviews(){
    this._http.get('/reviews').subscribe(
      (reviews: any[]) => { this.all_reviews.next(reviews) },
      (errorResponse) => { console.log(errorResponse) }
    );
  }

  topReviews(){
    this._http.get('/reviews/top').subscribe(
      (reviews: any[]) => { this.top_reviews.next(reviews) },
      (errorResponse) => { console.log(errorResponse) }
    );
  }

  recentReviews(){
    this._http.get('/reviews/recent').subscribe(
      (reviews: any[]) => { this.recent_reviews.next(reviews) },
      (errorResponse) => { console.log(errorResponse) }
    );
  }
  createReview(review_data){
    console.log(review_data);
    this._http.post('/reviews', review_data).subscribe(
      (response:any) => { 
        this.allReviews(); 
        this.getReview(response._id); 
        // console.log("Line 42: ", response);
        this.addReviewtoUser(response);
        this.getReviewsByUser(response._user);
      },
      (errorResponse) => { console.log(errorResponse) }
    );
  }

  addReviewtoUser(review){
    console.log(review);
    this._http.post('/reviews/addtouser', review).subscribe(
      (response: any) => { this.getReviewsByUser(response._id);
      },
      (errorResponse) => { console.log(errorResponse) }
    );
  }

  getReview(review_id) {
    this._http.get("reviews/one/" + review_id).subscribe(
      (review: any[]) => { 
        this.current_review.next(review); 
        // console.log(review); 
        this.review_coords.next(review['_location']['coords']); 
        this.allReviews(); 
        this.topReviews(); 
        this.recentReviews()},
      (errorResponse) => { console.log(errorResponse) }
    );
  }

  getReviewsByUser(user_id){
    this._http.get("reviews/user/" + user_id).subscribe(
      (reviews: any) => { 
        this.reviews_of_user.next(reviews); 
        // console.log(reviews); 
        this.allReviews(); 
        this.topReviews(); 
        this.recentReviews()},
      (errorResponse) => { console.log(errorResponse) }
    );
  }

  // editReview(review_data) {
  //   this._http.put('/surveys', review_data).subscribe(
  //     (response: any) => { this.allReviews(); this.getReview(response._id) },
  //     (errorResponse) => { console.log(errorResponse) }
  //   );
  // }

  deleteReview(review_id, user_id) {
    this._http.delete('/reviews/' + review_id).subscribe(
      (response: any) => { this.getReviewsByUser(user_id); },
      (errorResponse) => { console.log(errorResponse) }
    );
  }

  likeReview(review_id){
    this._http.put('/reviews/like/' + review_id, {}).subscribe(
      (response: any) => { this.getReview(review_id); },
      (errorResponse) => { console.log(errorResponse) }
    );
  }

  likePlace(){

  }

}
