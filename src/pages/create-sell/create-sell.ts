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
    coche: '',
    comprador: null,
    vendedor: null,
    precio: ''
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
    let vendedor = firebase.auth().currentUser;
    if(vendedor) {
      let coche = this.model.coche;
      let comprador = this.model.comprador;
      vendedor = vendedor.uid;
      let precio = this.model.precio;

      /*
      Metemos en el coche creado al UID de su dueño. No se si es buena idea o es mejor meter directamente el nombre,
      porque despues cuando vayamos a mostrar el coche, tendremos el uid del dueño no su nmobre, y para conseguir su nombre
      tenemos que encuestar a la BD otra vez.
       */
      this.firestore.collection('sells').add({coche, comprador, vendedor, precio})
        .then(newItem => {
          console.log("Coche añadido");
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

}
