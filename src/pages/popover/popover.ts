import { Component } from '@angular/core';
import {AlertController, App, NavController} from 'ionic-angular';
import { ViewController } from 'ionic-angular';
import {SigninPage} from "../signin/signin";
import {ProfilePage} from "../profile/profile";
import {SignupPage} from "../signup/signup";
import * as firebase from 'firebase';


/**
 * Generated class for the PopoverPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  template: `
    <ion-list>
      <button *ngIf="!currentUser" ion-item (click)="redirectToSignin()">Iniciar Sesión</button>
      <button *ngIf="currentUser" ion-item (click)="redirectToProfile()">Perfil</button>
      <button *ngIf="!currentUser" ion-item (click)="redirectToSignup()">Registrarse</button>
    </ion-list>
  `
})
export class PopoverPage {

  currentUser = firebase.auth().currentUser;
  constructor(public navCtrl: NavController,
              public app: App,
              public viewCtrl: ViewController,
              public alertCtrl: AlertController) {
  }

  redirectToSignin(){
    this.viewCtrl.dismiss().then(() => {
      this.app.getRootNav().push(SigninPage);
    });
  }
  redirectToProfile(){
    this.viewCtrl.dismiss().then(() => {
      this.app.getRootNav().push(ProfilePage);
    });
  }
  redirectToSignup(){
    this.viewCtrl.dismiss().then(() => {
      this.app.getRootNav().push(SignupPage);
    });
  }

}
