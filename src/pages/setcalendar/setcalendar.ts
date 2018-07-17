import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { Calendar } from '@ionic-native/calendar';
import { LessonProvider,  } from '../../providers/lesson/lesson';
import { NoteProvider} from '../../providers/note/note'
/**
 * Generated class for the SetcalendarPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-setcalendar',
  templateUrl: 'setcalendar.html',
})
export class SetcalendarPage {
  now = new Date();
  x = this.now.toDateString().split("GM")[0];
  y = this.now.toString().split("GM")[0].slice(15, 23);
  z = this.x.slice(3, 15);
  listNote = [];
  public note = {
    title: '',
    location: '',
    startDate: '',
    startTime: '',
    endDate: '',
    endTime: '',
    repeat: '',
    notes: ''
  }
  eventSource = [];
  viewTitle: string;
  selectedDay = new Date();

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public alert: AlertController,
    private localNotification: LocalNotifications,
    private calendar: Calendar,
    public toastCtrl: ToastController,
    public lessonProvider: LessonProvider,
    public noteProvider: NoteProvider
   ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SetcalendarPage');
    // console.log(this.x);
    // console.log(this.y);
  }
  addNote() {
    this.listNote.push(this.note);

  }
  scheduleNotification() {
    let firstNotificationTime = new Date();
    firstNotificationTime.setMinutes(firstNotificationTime.getMinutes() + 1);
    this.localNotification.hasPermission();
    this.localNotification.requestPermission();
    this.localNotification.schedule({
      id: 1,
      title: 'Reminder',
      text: 'Alo Alo',
      trigger: { at: new Date(new Date().getTime() + 3600) },
      data: {
        mydata: "My notification"
      }
    })
  }
  public createEvent(title,location, notes, startDate, endDate ) {
    this.calendar.createEvent(title, location, notes, startDate, endDate).then(
      (msg) => { alert(msg); },
      (err) => { alert(err); }
    ); 
  }
  public getCalender() {
    if (this.note.startDate != '' && this.note.startTime != '' && this.note.endDate !=null && this.note.endTime != '' ){
    var startDateTimeISO = this.buildISODate(this.note.startDate, this.note.startTime);
    var enddateTimeISO = this.buildISODate(this.note.endDate, this.note.endTime);
        	
    this.calendar.requestWritePermission();	this.calendar.createEvent(this.note.title, this.note.location, this.note.notes, new Date(startDateTimeISO), new Date(enddateTimeISO)).then(
        (msg) => { alert('msg '+msg); },
        (err) => { alert('err '+err); }
    );	
    this.localNotification.schedule({
      id: 1,
      title: 'Reminder',
      text: 'Alo Alo',
      trigger: { at: new Date(new Date().getTime() + 3600) },
      data: {
        mydata: "My notification"
      }
    });
    var noteCreate = {
      title: this.note.title,
      location: this.note.location,
      startDate: this.note.startDate,
      startTime: this.note.startTime,
      endDate: this.note.endDate,
      endTime: this.note.endTime,
      repeat: this.note.repeat,
    }
    this.noteProvider.createNote(noteCreate).then(
      (note) =>{ console.log(note)}
    )
    .catch((err) => {
      var message = err.error;
      this.showToast(message);
    });
  }
  else{
    this.showToast("Date and Time must not be null");
  }
 }

 buildISODate(date, time){
    var dateArray = date && date.split('-');
    var timeArray = time && time.split(':');
    var normalDate = new Date(parseInt(dateArray[0]), parseInt(dateArray[1])-1, parseInt(dateArray[2]), parseInt(timeArray[0]), parseInt(timeArray[1]), 0, 0);
    return normalDate.toISOString();
}
showToast(msg) {
  let toast = this.toastCtrl.create({
      message: msg,
      duration: 2000,
      position: 'top',
  });
  toast.present();
}
}
