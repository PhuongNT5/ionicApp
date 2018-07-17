import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
// import { Observable } from 'rxjs/Observable';
// import 'rxjs/add/operator/catch';
// import 'rxjs/add/operator/map';
 //import { NavController } from 'ionic-angular';

/*
  Generated class for the UserProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
export class User{
  username: string
  email: string
  password: string
  role: string
  constructor(values: Object = {}) {
    Object.assign(this, values);
}
}

export class IUser {
  token: string;
  user : {
    username: string;
    role: string;
    email: string;
  }
}

@Injectable()
export class UserProvider {
  apiUrl = 'http://localhost:3000/api';
  constructor(public http: HttpClient
  ) { }
    public users: User;

    getUsers() {
      return new Promise(resolve => {
        this.http.get(this.apiUrl+'/user').subscribe(res => {
          resolve(res);
        }, err => {
          console.log(err);
        });
      });
    }
    register(newUser) {
      return new Promise (resolve => {
        this.http.post(this.apiUrl+ '/user', newUser).subscribe(res =>{
          resolve(res);
        }, err => console.log(err))
      })
    }
    login(newUser){
      return new Promise (resolve => {
        this.http.post(this.apiUrl + '/user/login', newUser).subscribe(res => {
          resolve(res);
        }, err => console.log(err.error.message))
      })
    }
    
}
