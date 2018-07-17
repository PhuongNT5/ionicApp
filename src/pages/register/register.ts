import { Component } from '@angular/core';
import { IonicPage, ToastController, NavController } from 'ionic-angular';
import { UserProvider} from '../../providers/user/user';
import { ToastsManager } from 'ng2-toastr';
//import { ToastsManager } from 'ng2-toastr';
/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  reg ={
    mail: "",
    username: "",
    password:"",
    role:"user"
 }
 createSuccess = false;
  constructor(
        public userProvider: UserProvider,
        public toastr: ToastsManager,
        public toastCtrl: ToastController,
        public navCtrl: NavController
  ) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  public register() {
    this.userProvider.register(this.reg).then(data => {
      this.toastr.success('Success', 'Created new user');
      let toast = this.toastCtrl.create({
        message: 'User was added successfully',
        duration: 3000,
        position: 'center'
      });
    
      toast.onDidDismiss(() => {
        console.log('Dismissed toast');
      });
    
    }, error => {
      console.log(error);
      let toast = this.toastCtrl.create({
        message: error.error,
        duration: 3000,
        position: 'center'
      });
      toast.onDidDismiss(() => {
        console.log('Dismissed toast');
      });
    
    });
  }

}
