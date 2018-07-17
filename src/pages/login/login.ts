import { Component, ViewChild, ViewContainerRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserProvider} from '../../providers/user/user';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  user ={
    email: '',
    password:''
  }
  @ViewChild('email') email: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, 
        public storage: Storage,
        public userProvider: UserProvider,
        public toastr: ToastsManager,
        private vcr: ViewContainerRef,

  ) {
    this.toastr.setRootViewContainerRef(this.vcr);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
    setTimeout(() => {
      this.email.setFocus();
    }, 500);
  }
  createAccount() {
    this.navCtrl.push('RegisterPage',{},{animate: true, direction: 'forward'});
  }
   public login() {
     this.userProvider.login(this.user).then(res => {
       if(res != null){
        let response = <any>res;
        this.navCtrl.push('HomePage',{},{animate: true, direction: 'forward'});
        this.toastr.success("Login success");
        localStorage.setItem('token', 'bearer'+ ' '+ response.token);
        localStorage.setItem('name', response.user.username);
       }
     }, err =>{
      this.toastr.error(err);
     })
   }
}
