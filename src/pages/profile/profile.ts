import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import * as firebase from 'firebase';
import {FireProvider} from "../../providers/fire/fire";
import {HomePage} from "../home/home";

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  userData = {
    name: ''
    //Rellenaremos esto con todos los datos a mostrar del perfil del usuario con sesion iniciada.
  };

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private alertCtrl: AlertController,
              private fire: FireProvider) {

    this.fillUserData();
    this.getUserImg();



  }
  /*
  Faltaria la parte en la que si no hay ningun usuario con sesion iniciada, no nos mostrara esta pagina. Controlaremos esta
  funcionalidad cuando quitemos el menu, y por el propio flujo de navegación no se permita que se muestre
  la pagina si no estemos logeados
   */

  fillUserData() {
    let userID = firebase.auth().currentUser;
    if (userID) {
      let userRef = firebase.firestore().collection('/users').doc(`${userID.uid}`);
      userRef.get().then((doc)  => {
        if (doc.exists) {
          this.userData.name = doc.data().name;
        } else {
          // doc.data() will be undefined in this case
          console.log("No such user!");
        }
      }).catch(function(error) {
        console.log("Error getting document:", error);
      });
    } else {
      this.showAlertOnFail();//Esto no hace na
    }
  }

  getUserImg() {
    let pathReference = firebase.storage().ref();
    pathReference.child('blank-profile-picture.png').getDownloadURL().then(function(url) {
      let img = document.getElementById('myimg');
      img.setAttribute('src', url);
    }).catch(function(error) {
      console.log(error);
    });

  }

  cerrarSesion(){
    this.fire.signOut()
      .then((data) => {
      console.log("User signed out");
      })
      .catch((error) => {
      console.log(error);
      });
    this.navCtrl.setRoot(HomePage);
    this.logOutAlert();
  }

  //Esto no hace na tampoco
  showAlertOnFail() {
    let alert = this.alertCtrl.create({
      title: 'Operación fallida',
      subTitle: 'Debe haber iniciado sesión para ver su perfil',
      buttons: ['OK']
    });
    alert.present();
  }

  logOutAlert(){
    let alert = this.alertCtrl.create({
      subTitle: 'Sesión cerrada correctamente'
    });
    alert.present();
  }

}
