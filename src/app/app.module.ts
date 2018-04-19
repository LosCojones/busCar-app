import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import * as firebase from 'firebase'
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { SigninPage } from "../pages/signin/signin";
import { CreateSellPage } from "../pages/create-sell/create-sell";
import { BuyPage } from "../pages/buy/buy";

export const firestoreConfig = {
  apiKey: "AIzaSyDp5PCWZRpJoyCtjh_fq4xDUyHQCWj4e_4",
  authDomain: "buscar-c7fab.firebaseapp.com",
  databaseURL: "https://buscar-c7fab.firebaseio.com",
  projectId: "buscar-c7fab",
  storageBucket: "buscar-c7fab.appspot.com",
  messagingSenderId: "504307116114"
};
firebase.initializeApp(firestoreConfig);
@NgModule({
  declarations: [
    MyApp,
    HomePage,
    SigninPage,
    CreateSellPage,
    BuyPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firestoreConfig),
    AngularFirestoreModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    SigninPage,
    CreateSellPage,
    BuyPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
