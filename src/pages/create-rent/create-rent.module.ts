import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CreateRentPage } from './create-rent';

@NgModule({
  declarations: [
    CreateRentPage,
  ],
  imports: [
    IonicPageModule.forChild(CreateRentPage),
  ],
})
export class CreateRentPageModule {}
