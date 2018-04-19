import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from "ionic-angular";
import * as firebase from 'firebase'
import {HomePage} from "../home/home";
//import { AngularFirestore, AngularFirestoreCollection} from "angularfire2/firestore";
//import { Observable } from 'rxjs/Observable';


@IonicPage()
@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html',
})
export class SigninPage {
  userData = {
    email: '',
    password: '' };


  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
  }

  showAlertOnFail() {
    let alert = this.alertCtrl.create({
      title: 'Datos erroneos',
      subTitle: 'Para iniciar sesión, introduzca datos correctos',
      buttons: ['OK']
    });
    alert.present();
  }

  enterNickname() {
    firebase.auth().signInWithEmailAndPassword(this.userData.email, this.userData.password)
      .then( (data) => {
        this.pop();
      })
      .catch((error) => {
        this.showAlertOnFail();

    });

      /*
      * signin hecho pero falta verificar que se ha iniciado sesion y tratar cada caso*/
  }

  pop(){
    //TODO no se puede hacer un puto pop dentro de una promesa
    this.navCtrl.pop();
    this.navCtrl.setRoot(HomePage);
  }


}
