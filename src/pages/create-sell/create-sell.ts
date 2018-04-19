import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFirestore/*, AngularFirestoreCollection, AngularFirestoreDocument*/} from "angularfire2/firestore";

@IonicPage()
@Component({
  selector: 'page-create-sell',
  templateUrl: 'create-sell.html',
})
export class CreateSellPage {

  // sellCollection: AngularFirestoreCollection<sellInstance>;

  model = {
    coche: '',
    comprador: '',
    vendedor: '',
    precio: ''
  };

  constructor(public navCtrl: NavController, public navParams: NavParams, private firestore: AngularFirestore) {
  }

  ionViewDidEnter() {
    // this.sellCollection = this.firestore.collection('users');
    // this.sellCollection.snapshotChanges().subscribe();
  }

  createSell () {
    let coche = this.model.coche;
    let comprador = this.model.comprador;
    let vendedor = this.model.vendedor;
    let precio = this.model.precio;

    /*
    * Falta controlar currentuser para vendedor
    * */
    this.firestore.collection('sells').add({coche, comprador, vendedor, precio})
      .then(newItem => {
        console.log('Coche "${coche}" añadido');
      }).catch(function (e) {
        console.log(e);
    });
    this.navCtrl.pop();
  }

}
