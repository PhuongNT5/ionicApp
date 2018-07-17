import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LessonProvider } from '../../providers/lesson/lesson'
/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  listLesson: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public lessonProvider: LessonProvider
  ) {
  }

  ionViewDidLoad() {
    this.getLessons();
    //console.log('ionViewDidLoad HomePage');

  }
  schedulePage() {
    this.navCtrl.push('SchedulePage', {}, { animate: true, direction: 'forward' })
  }
  setCalendarPage() {
    this.navCtrl.push('SetcalendarPage', {}, { animate: true, direction: 'forward' })
  }
  setChatRoomPage() {
    this.navCtrl.push('ChatroomPage', {}, { animate: true, direction: 'forward' })
  }
  getLessons() {
    this.lessonProvider.getLessons().then(lessons => {
      this.listLesson = lessons;
    }, err => {
      console.log(err);

    })
  }

}
