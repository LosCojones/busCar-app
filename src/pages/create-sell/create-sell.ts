import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import * as firebase from 'firebase';
import {HomePage} from "../home/home";
import {FireProvider} from "../../providers/fire/fire";

@IonicPage()
@Component({
  selector: 'page-create-sell',
  templateUrl: 'create-sell.html',
})
export class CreateSellPage {


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
    fecha_mat: null,
    descripcion: ''
  };

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private alertCtrl: AlertController,
              private fire: FireProvider) {
  }

  ionViewDidEnter() {

  }

  createSell () {
    let currentUser = firebase.auth().currentUser;
    if(currentUser) {
     /*
      Metemos en el coche creado al UID de su dueño. No se si es buena idea o es mejor meter directamente el nombre,
      porque despues cuando vayamos a mostrar el coche, tendremos el uid del dueño no su nmobre, y para conseguir su nombre
      tenemos que encuestar a la BD otra vez.
       */
      this.fire.createSell(this.model)
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
      subTitle: 'Debe haber iniciado sesión para crear una nueva venta',
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
