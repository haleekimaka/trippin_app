import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { LandingComponent } from './landing/landing.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ProfileComponent } from './profile/profile.component';
import { EditreviewComponent } from './review/editreview/editreview.component';
import { CreatereviewComponent } from './review/createreview/createreview.component';
import { MinimapComponent } from './review/minimap/minimap.component';
import { ShowreviewComponent } from './review/showreview/showreview.component';
import { GlobalmapComponent } from './landing/globalmap/globalmap.component';
import { ListComponent } from './landing/list/list.component';
import { LoginComponent } from './login/login.component';
import { ReviewComponent } from './review/review.component';
import { MyreviewsComponent } from './profile/myreviews/myreviews.component';
import { LikedreviewsComponent } from './profile/likedreviews/likedreviews.component';
import { MymapComponent } from './profile/mymap/mymap.component';
import { DataService } from './data.service';
import { UserService } from './user.service';
import { MapService } from './map.service';
import { SearchComponent } from './search/search.component';

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    HeaderComponent,
    FooterComponent,
    ProfileComponent,
    EditreviewComponent,
    CreatereviewComponent,
    MinimapComponent,
    ShowreviewComponent,
    GlobalmapComponent,
    ListComponent,
    LoginComponent,
    ReviewComponent,
    MyreviewsComponent,
    LikedreviewsComponent,
    MymapComponent,
    SearchComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [DataService, UserService, MapService],
  bootstrap: [AppComponent]
})
export class AppModule { }
