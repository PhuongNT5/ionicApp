import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SetcalendarPage } from './setcalendar';

@NgModule({
  declarations: [
    SetcalendarPage,
  ],
  imports: [
    IonicPageModule.forChild(SetcalendarPage),
  ],
})
export class SetcalendarPageModule {}
