import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Socket } from 'ng-socket-io';
import { Observable } from 'rxjs/Observable';
/**
 * Generated class for the ConversationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-conversation',
  templateUrl: 'conversation.html',
})
export class ConversationPage {
  messages = [];
  nickname = '';
  message = '';

  constructor(private navCtrl: NavController, private navParams: NavParams, private socket: Socket, private toastCtrl: ToastController) {
    
    this.nickname = this.navParams.get('nickname');
    if (!this.nickname) {
      this.navCtrl.setRoot('HomePage');
    }
    this.getMessages().subscribe(message => {
      this.messages.push(message);
    });

    this.getUsers().subscribe(data => {
      let user = data['user']; 
      if (data['event'] === 'left') {
          this.showToast(user + 'has just left');
      } else {
          this.showToast( user + 'has just joined' );
      }
  });
  }

  ionViewDidLoad() {
  }
  sendMessage() {
    this.socket.emit('add-message', { text: this.message });
    this.message = '';
}

  getMessages() {
    let observable = new Observable(observer => {
      this.socket.on('message', (data) => {
        observer.next(data);
      });
    });
    return observable;
  }

getUsers() {
    let observable = new Observable(observer => {
        this.socket.on('users-changed', (data) => {
            observer.next(data);
        });
    });
    return observable;
}

showToast(msg) {
  let toast = this.toastCtrl.create({
      message: msg,
      duration: 2000,
      position: 'top',
  });
  toast.present();
}
  ionViewWillLeave() {
    this.socket.disconnect();
  }

}
