import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../user';
import { Router } from '@angular/router';
import { NgForm, FormGroup } from '@angular/forms';
import { DataService } from '../data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  new_user: User = new User();
  existing: User = new User();

  constructor(private _userService: UserService, private _router: Router, private _dataService: DataService) { }

  ngOnInit() {
  }
  
  login(){
    console.log(this.existing.username);
    this._userService.checkUser(this.existing.username, (data)=> {
        if (data == null) {
          let el = document.getElementById('error_log');
          el.innerHTML = ""
          el.innerHTML += "User does not exist, please register.";
          console.log("User does not exist, please register.");
        }
        else {
          this._userService.user.next(data);
          this._userService.getAnotherUser(data._id);
          this._router.navigateByUrl('landing');
          this.existing = new User();
        }
      }
    );
    
  }

  register() {
    console.log(this.new_user.username);
    this._userService.checkUser(this.new_user.username, (data) => {
      if (data != null) {
        let el = document.getElementById('error_reg');
        el.innerHTML = ""
        el.innerHTML += "User already exists. Please login or choose another username.";
        console.log("User already exists.");
      }
      else {
        console.log(this.new_user);
        this._userService.createUser(this.new_user);
        this._router.navigateByUrl('landing');
        this.new_user = new User();
      }
    }
    );

  }

}
