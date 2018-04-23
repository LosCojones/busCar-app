import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import * as firebase from 'firebase';
import { AngularFirestore/*, AngularFirestoreCollection, AngularFirestoreDocument*/} from "angularfire2/firestore";
import {HomePage} from "../home/home";

@IonicPage()
@Component({
  selector: 'page-create-sell',
  templateUrl: 'create-sell.html',
})
export class CreateSellPage {

  // sellCollection: AngularFirestoreCollection<sellInstance>;

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
              private firestore: AngularFirestore) {
  }

  ionViewDidEnter() {
    // this.sellCollection = this.firestore.collection('users');
    // this.sellCollection.snapshotChanges().subscribe();
  }

  createSell () {
    let currentUser = firebase.auth().currentUser;
    if(currentUser) {
      let marca = this.model.marca;
      let modelo = this.model.modelo;
      let comprador = this.model.comprador;
      let vendedor = currentUser.uid;
      let precio = this.model.precio;
      let fmat = this.model.fecha_mat;
      let kms = this.model.kms;
      let comb = this.model.combustible;
      let desc = this.model.descripcion;
      let fpub = this.model.fecha_pub;

      /*
      Metemos en el coche creado al UID de su dueño. No se si es buena idea o es mejor meter directamente el nombre,
      porque despues cuando vayamos a mostrar el coche, tendremos el uid del dueño no su nmobre, y para conseguir su nombre
      tenemos que encuestar a la BD otra vez.
       */
      this.firestore.collection('sells').add({marca, modelo, comprador, vendedor, precio, fmat, kms, comb, desc, fpub})
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
