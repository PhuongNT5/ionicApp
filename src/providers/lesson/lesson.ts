import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the LessonProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

export class Lesson {
  title: string
  name:string
  content: string
  place: string
  date: Date
}

@Injectable()
export class LessonProvider {
  apiUrl =  'http://localhost:3000/api/lesson';

  constructor(public http: HttpClient) {
    console.log('Hello LessonProvider Provider');
  }
  public lessons: Lesson;

  getLessons() {
    return new Promise (resolve => {
      this.http.get(this.apiUrl ).subscribe(res => {
        resolve(res);
      }, err => {
        console.log(err);
      })
    })
  }

  createLesson (lesson) {
    return new Promise (resolve => {
      this.http.post(this.apiUrl, lesson).subscribe(res => {
        resolve(res);
      }, err => {
        console.log(err);
      })
    })
  }

}
