import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the NoteProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
export interface INote {
  title: String,
  location: String,
  startTime: String,
  startDate: String,
  endDate: String,
  endTime: String,
  repeat: String
}

@Injectable()
export class NoteProvider {

  apiUrl =  'http://localhost:3000/api/note';
  constructor(public http: HttpClient) {
    console.log('Hello NoteProvider Provider');
  }

  getNotes() {
    return new Promise (resolve => {
      this.http.get(this.apiUrl ).subscribe(res => {
        resolve(res);
      }, err => {
        console.log(err);
      })
    })
  }
  createNote(note:INote) {
    return new Promise (resolve => {
      this.http.post(this.apiUrl, note).subscribe(res => {
        resolve(res);
      }, err => {
        console.log(err);
      })
    });
  }
}
