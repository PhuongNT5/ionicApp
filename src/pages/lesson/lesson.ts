import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LessonProvider} from '../../providers/lesson/lesson';
/**
 * Generated class for the LessonPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-lesson',
  templateUrl: 'lesson.html',
})
export class LessonPage {
  listLesson: any;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public lessonProvider: LessonProvider
  ) {
  }

  ionViewDidLoad() {
    this.getLessons();
    console.log('ionViewDidLoad LessonPage');
  }
  public getLessons () {
      return this.lessonProvider.getLessons().then(lessons => {
        this.listLesson = lessons;
      }, err =>{
        console.log(err);
      })
  }
}
