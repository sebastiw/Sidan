import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

@Injectable()
export class AuthenticationService {

  currentUser:any;

  constructor(private http: Http) { }

    login(username: string, password: string) {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        let body = {
            username: username,
            password: password
        };

         return new Promise((resolve, reject) => {
             this.http
                .post('/json/auth', body, options)
                .map(res => res.json())
                .subscribe(user => {
                  this.currentUser = null;
                  if( !user ) resolve(false);

                  this.currentUser = user;
                  resolve(true);
                }, error => {
                    this.currentUser = null;
                    reject(error._body);
                });
          });
    }
 
    logout() {
         return new Promise((resolve, reject) => {
            let headers = new Headers({ 'Content-Type': 'application/json' });
            let options = new RequestOptions({ headers: headers });

             this.http
                .post('/json/auth/logout', null, options)
                .subscribe(res => {
                  this.currentUser = null;
                  resolve(null);
                }, error => {
                    reject(error);
                });
          });
    }

    checkLogin(){
         return new Promise((resolve, reject) => {
             this.http
                .get('/json/auth')
                .map(res => res.json())
                .subscribe(user => {
                  this.currentUser = user;
                  resolve(user);
                }, error => {
                  resolve(null);
                });
          });
    }

    getCurrentUser() {
      return this.currentUser;
    }
}
