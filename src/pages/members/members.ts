import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { UserProvider} from '../../providers/user/user';

/**
 * Generated class for the MembersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-members',
  templateUrl: 'members.html',
})
export class MembersPage {
   listMem:any;
  constructor(
        public userProvider: UserProvider,
  ) {

  }

  ionViewDidLoad() {
    this.getMembers();
    console.log('ionViewDidLoad MembersPage');
  }
  public getMembers() {
     this.userProvider.getUsers().then(data => {
        this.listMem = data;
     }, err => {
       console.log(err);
     })
  }
}
