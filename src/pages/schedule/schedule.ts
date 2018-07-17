import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import * as moment from 'moment';
import { LessonProvider} from '../../providers/lesson/lesson';
import { MenuController } from 'ionic-angular';
import { ToastsManager } from 'ng2-toastr';
import { mobiscroll } from '@mobiscroll/angular-lite';

mobiscroll.settings = {
    theme: 'auto'
};
/**
 * Generated class for the SchedulePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-schedule',
  templateUrl: 'schedule.html',
})
export class SchedulePage {
  noItem = new Array(moment().date(1).day());
  Item = new Array(moment().daysInMonth());
  nowDay = moment().date();
  date = new Date();
  months = [ "January", "February", "March", "April", "May", "June", 
  "July", "August", "September", "October", "November", "December" ];
  year = moment().year();
  month = moment().month();
  monthInYear = this.months[this.month];
  weekDay = [ 'SUN' , 'MO', 'TU','WE','TH','FRI','SA'];

  listLesson :any;
  lessons: any;
  dateHasLesson: Array<any> =[];
  tempDate: string;
  isInPast:boolean;
  existEvent: boolean;

  constructor(public navCtrl: NavController,
      public lessonProvider: LessonProvider,
      public menuCtrl: MenuController,
      public toastr: ToastsManager
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SchedulePage');
    this.getLessons();
  }
  prevMonth() {
    if (this.month <1 ) {
      this.month = 12;
      this.year = this.year -1;
    }
    this.month = this.month -1;
    this.monthInYear = this.months[this.month];
    this.noItem = new Array(moment(this.date.setMonth(  this.month)).date(1).day())
    this.Item = new Array(moment(this.date.setMonth(this.month)).daysInMonth());
  }

  nextMonth() {
    if (this.month >12) {
      this.month = 1;
      this.year = this.year +1;
    }
    this.month = this.month +1;
    this.monthInYear = this.months[this.month];
    this.noItem = new Array(moment(this.date.setMonth(  this.month)).date(1).day())
    this.Item = new Array(moment(this.date.setMonth(this.month)).daysInMonth())
  }
  public getLessons () {
    return this.lessonProvider.getLessons().then(lessons => {
      this.listLesson = lessons;
      this.listLesson.forEach(e => {
        var less ={
          name: e.name,
          date: moment(e.date).format('L')
        }
      this.dateHasLesson.push(less);
      });
    }, err =>{
      console.log(err);
    })
  }
  openMenu() {
    this.menuCtrl.enable(true, 'firstOption');
  }

  addLesson(model){
    this.lessonProvider.createLesson(model).then(
      data => {
        this.toastr.success("Add lesson success");
      },
      err => {
        console.log(err);
      }
    )
  }
  checkExistEvent(date, month, year) {
    month = this.months.indexOf(month) +1;
    var dateTime = date+'/' +month+'/' +year
    dateTime = moment(dateTime).format('L');
    if (this.dateHasLesson.findIndex(e => e.date == dateTime) > -1) {
      return true;
    }
    return false;
  }
  getNameEvent(date, month, year) {
    month = this.months.indexOf(month) +1;
    var dateTime = date+'/' +month+'/' +year
    dateTime = moment(dateTime).format('L');
   return  this.dateHasLesson.find(e => e.date == dateTime).name;
  }

  getTempDate(date, month, year) {
    month = this.months.indexOf(month) +1;
    var dateTime = date+'/' +month+'/' +year;
    this.tempDate = moment(dateTime).format('L');
    var current = new Date();
    if ((new Date(month+'/'+ date+'/' +year)) < current ) {
      this.isInPast = false;
    }else{
      this.isInPast = true;
    }
    if (this.dateHasLesson.findIndex(e => e.date == this.tempDate) > -1) {
      this.existEvent = true;
    }else{
      this.existEvent = false;
    }
  }

  addSchedule() {
    this.navCtrl.push('AddEventPage', { date: this.tempDate });
  }

}
