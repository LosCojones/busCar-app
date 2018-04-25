import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as firebase from 'firebase';
import { AngularFirestore, AngularFirestoreCollection } from "angularfire2/firestore";

interface rentInstance {
  vendedor: string;
  comprador?: string;
  precio: number;
  marca: string;
  modelo: string;
  fecha_lim: Date;
  id?: string;
}

/**
 * Generated class for the RentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-rent',
  templateUrl: 'rent.html',
})
export class RentPage {

  rentCollection: AngularFirestoreCollection<rentInstance>;
  rent: rentInstance[];
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private firestore: AngularFirestore) {
  }

  ionViewDidEnter() {
    this.rentCollection = this.firestore.collection('rents', ref => ref.where('comprador', '==', null));
    this.rentCollection.snapshotChanges().subscribe( rentList => {
      this.rent = rentList.map(item => {
        let imgURL2 = item.payload.doc.data().imgURL;
        let id2 = item.payload.doc.id;
        this.getCarImg(imgURL2, id2);
        return {
          vendedor: item.payload.doc.data().vendedor,
          precio: item.payload.doc.data().precio,
          comprador: item.payload.doc.data().comprador,
          marca: item.payload.doc.data().marca,
          modelo: item.payload.doc.data().modelo,
          fecha_lim: item.payload.doc.data().fecha_lim,
          id: item.payload.doc.id
        }
      })
    });
  }
  getCarImg(URL2, id2) {
    if(URL2 != "") {
      let pathReference = firebase.storage().ref();
      pathReference.child("/" + URL2).getDownloadURL().then(function (url) {
        let img = document.getElementById(id2);
        img.setAttribute('src', url);
      }).catch(function (error) {
        console.log(error);
      });
    }
  }
  deleteCar(car: rentInstance) {
    /*
    Ya funciona, ahora el tema es que realmente un usuario no va a eliminar coches desde aqui, pero al menos ya sabemos como hacerlo.
     */
    this.firestore.doc(`rents/${car.id}`).delete()
      .then(() => {
        console.log("Coche eliminado");
      })
      .catch((error) => {
        console.log(error);
      })
  }

}