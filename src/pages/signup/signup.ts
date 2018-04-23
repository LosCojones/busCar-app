import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import * as firebase from 'firebase';
import {AngularFirestore} from "angularfire2/firestore";
import {HomePage} from "../home/home";

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  userData = {
    name: '',
    email: '',
    password: ''
  };

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private firestore: AngularFirestore,
              private alertCtrl: AlertController) {
  }


  createUser() {
    //TODO - validations
    //Ahora mismo se traga cualquier usuario que le metas, hasta el '', ''
    let email = this.userData.email;
    let password = this.userData.password;
    let name = this.userData.name;

    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((newUser) => {
        this.firestore.collection( '/users').doc(`${newUser.uid}`).set({
          name: name,
          email: email
        });
        console.log("Usuario creado correctamente");
        this.navCtrl.setRoot(HomePage);
      })
      .catch((error) => {
        this.showAlertOnFail();
        console.log(error);
    });
  }

  showAlertOnFail() {
    let alert = this.alertCtrl.create({
      title: 'Creación fallida',
      subTitle: 'Direccion de correo electronico en uso, por favor, utilice otra',
      buttons: ['OK']
    });
    alert.present();
  }
}
