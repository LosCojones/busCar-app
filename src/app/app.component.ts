import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HomePage } from '../pages/home/home';
//import * as firebase from 'firebase';

import {BuyPage} from "../pages/buy/buy";
import {CreateSellPage} from "../pages/create-sell/create-sell";
import {SigninPage} from "../pages/signin/signin";
import {SignupPage} from "../pages/signup/signup";
import {ProfilePage} from "../pages/profile/profile";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  pages: Array<{title: string, component: any}>;

  //loggedIn : boolean;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, ) {
    this.initializeApp();

    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'Comprar', component: BuyPage },
      { title: 'Vender', component: CreateSellPage },
      { title: 'Iniciar sesión', component: SigninPage },
      { title: 'Registrarse', component: SignupPage },
      { title: 'Perfil', component: ProfilePage },
    ];

    //this.loggedIn = firebase.auth().currentUser;

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
