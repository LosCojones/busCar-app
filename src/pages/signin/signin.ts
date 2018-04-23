import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from "ionic-angular";

import {HomePage} from "../home/home";
import {FireProvider} from "../../providers/fire/fire";



@IonicPage()
@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html',
})
export class SigninPage {
  userData = {
    email: '',
    password: ''
  };


  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public alertCtrl: AlertController,
              private fire: FireProvider) {
  }

  ionViewDidLoad() {
  }


  enterNickname() {
    this.fire.signIn(this.userData.email, this.userData.password)
      .then( (data) => {
        console.log(data);
        this.navCtrl.setRoot(HomePage);
      })
      .catch((error) => {
        console.log(error);
        //this.showAlertOnFail();
      });
      /*
      * signin hecho pero falta verificar que se ha iniciado sesion y tratar cada caso*/

  }

  showAlertOnFail() {
    let alert = this.alertCtrl.create({
      title: 'Datos erroneos',
      subTitle: 'Para iniciar sesión, introduzca datos correctos',
      buttons: ['OK']
    });
    alert.present();
  }
}
