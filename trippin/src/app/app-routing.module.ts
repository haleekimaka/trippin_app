import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { ReviewComponent } from './review/review.component';
import { CreatereviewComponent } from './review/createreview/createreview.component';
import { ShowreviewComponent } from './review/showreview/showreview.component';
import { EditreviewComponent } from './review/editreview/editreview.component';
import { SearchComponent } from './search/search.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: LoginComponent },
  { path: 'landing', pathMatch: 'full', component: LandingComponent },
  // { path: 'profile/:profile_id', pathMatch: 'full', component: ProfileComponent },
  { path: 'profile', pathMatch: 'full', component: ProfileComponent },
  { path: 'review', component: ReviewComponent, children:[
    { path: 'create', pathMatch: 'full', component: CreatereviewComponent },
    { path: 'show', pathMatch: 'full', component: ShowreviewComponent },
    { path: 'edit', pathMatch: 'full', component: EditreviewComponent },
  ]},
  { path: 'search', pathMatch: 'full', component: SearchComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
