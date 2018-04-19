import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CreateSellPage } from './create-sell';

@NgModule({
  declarations: [
    CreateSellPage,
  ],
  imports: [
    IonicPageModule.forChild(CreateSellPage),
  ],
})
export class CreateSellPageModule {}
