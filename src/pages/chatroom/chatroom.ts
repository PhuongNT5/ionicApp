import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams} from 'ionic-angular';
import { Socket } from 'ng-socket-io';
/**
 * Generated class for the ChatroomPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-chatroom',
  templateUrl: 'chatroom.html',
})
export class ChatroomPage {
  nickname = '';
  constructor(public navCtrl: NavController, public navParams: NavParams,  private socket: Socket) {

  }

  ionViewDidLoad() {
    this.nickname = localStorage.getItem('name');
  }
  joinChat() {
    this.socket.connect();

    this.socket.emit('set-nickname', this.nickname);
    this.navCtrl.push('ConversationPage', { nickname: this.nickname });
  }
}
