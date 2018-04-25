import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController} from 'ionic-angular';
import * as firebase from 'firebase';
import {HomePage} from "../home/home";
import {FireProvider} from "../../providers/fire/fire";

/**
 * Generated class for the CreateRentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-create-rent',
  templateUrl: 'create-rent.html',
})
export class CreateRentPage {

  model = {
    marca: '',
    modelo: '',
    comprador: null,
    vendedor: null,
    precio: '',
    kms: '',
    combustible: '',
    imgURL:'',
    fecha_pub: new Date(),
    fecha_lim: null,
    descripcion: ''
  };

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private alertCtrl: AlertController,
              private fire: FireProvider) {
  }

  ionViewDidEnter() {
    let currentUser = firebase.auth().currentUser;
    if(currentUser){
      this.model.vendedor = currentUser.uid;
    }
  }
  createRent () {
    let currentUser = firebase.auth().currentUser;
    if(currentUser) {
      /*
       Metemos en el coche creado al UID de su dueño. No se si es buena idea o es mejor meter directamente el nombre,
       porque despues cuando vayamos a mostrar el coche, tendremos el uid del dueño no su nmobre, y para conseguir su nombre
       tenemos que encuestar a la BD otra vez.
        */
      this.fire.createRent(this.model)
        .then(newItem => {
          console.log("Coche añadido");
          this.successfullyAddedCar();
        }).catch(function (e) {
        console.log(e);
      });
      this.navCtrl.setRoot(HomePage);
    } else {
      this.showNotLoggedInUser();
    }
  }
  showNotLoggedInUser() {
    let alert = this.alertCtrl.create({
      title: 'Creación fallida',
      subTitle: 'Debe haber iniciado sesión para crear un nuevo alquiler',
      buttons: ['OK']
    });
    alert.present();
  }
  successfullyAddedCar() {
    let alert = this.alertCtrl.create({
      title: 'Coche creado',
      buttons: ['OK']
    });
    alert.present();
  }

}
