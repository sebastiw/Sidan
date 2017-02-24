import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

import { AuthenticationService } from '../authentication.service';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

	isLoggedIn: boolean;

	username: string;
	password: string;

	error: string;
	posting: boolean;

  constructor(
  	private auth:AuthenticationService,
  	private location:Location
  ) {}

  ngOnInit() {
  	this.username = "#";
  	this.password = "";

    this.auth.checkLogin().then(user => {
      this.isLoggedIn = !!user;
    })
  }

  onSubmit() {
    this.error = null;
		this.posting = true;

		this.auth.login(this.username, this.password)
		.then(status => {
	  	this.isLoggedIn = !!status;
      this.posting = false;
    }, err => {
      this.error = err;
      this.posting = false;
    });
    
    return false;
  }

  onLogout() {
    this.error = null;
    this.posting = true;

    this.auth.logout()
    .then(status => {
      this.isLoggedIn = !!status;
      this.posting = false;
    }, err => {
      this.error = err;
			this.posting = false;
    });
    
    return false;
  }
}
