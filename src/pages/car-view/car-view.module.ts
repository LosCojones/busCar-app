import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CarViewPage } from './car-view';

@NgModule({
  declarations: [
    CarViewPage,
  ],
  imports: [
    IonicPageModule.forChild(CarViewPage),
  ],
})
export class CarViewPageModule {}
