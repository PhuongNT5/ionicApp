import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { NoteProvider } from '../../providers/note/note';
/**
 * Generated class for the NotePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-note',
  templateUrl: 'note.html',
})
export class NotePage {
  listNote: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, 
    public noteProvider: NoteProvider,
    public toastCtrl: ToastController
  ) {
  }

  ionViewDidLoad() {
    this.getNotes();
    console.log('ionViewDidLoad NotePage');
  }
  public getNotes () {
    return this.noteProvider.getNotes().then(notes => {
      this.listNote = notes;
    }, err =>{
      console.log(err);
    })
}
  deleteNote(id) {
    return this.noteProvider.deleteNote(id).then(note =>{
      this.showToast("Deleted Note Success!");
      this.getNotes();
    }, (err) => {
      this.showToast("Deleted Note Error!");
      console.log(err);
    })
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
