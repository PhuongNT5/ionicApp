import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LessonProvider } from '../../providers/lesson/lesson';

/**
 * Generated class for the AddEventPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-event',
  templateUrl: 'add-event.html',
})
export class AddEventPage {
  dateEvent = '';
  public event = {
    title: '',
    place: '',
    name: '',
    date: '',
  }

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private lessonProvider: LessonProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddEventPage');
    this.dateEvent = this.navParams.get('date');
    console.log(this.dateEvent)
    this.event.date = this.dateEvent;
  }
  
  addEvent() {
    console.log(this.event);
    this.lessonProvider.createLesson(this.event).then(lesson => {
      console.log(" Add lesson successful");
    }, err => {
      console.log(err);
    })
  }

}
