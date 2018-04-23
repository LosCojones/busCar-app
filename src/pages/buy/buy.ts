import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFirestore, AngularFirestoreCollection } from "angularfire2/firestore";
// import { Observable } from 'rxjs/Observable';

interface sellInstance {
  vendedor: string;
  comprador?: string;
  precio: number;
  coche: string;
  id?: string;
}

@IonicPage()
@Component({
  selector: 'page-buy',
  templateUrl: 'buy.html',
})
export class BuyPage {

  sellCollection: AngularFirestoreCollection<sellInstance>;
  // sell: Observable<sellInstance[]>;
  sell: sellInstance[];

  constructor(public navCtrl: NavController, public navParams: NavParams, private firestore: AngularFirestore) {
  }

  ionViewDidEnter() {
    this.sellCollection = this.firestore.collection('sells', ref => ref.orderBy('coche'));
    this.sellCollection.snapshotChanges().subscribe( sellList => {
      this.sell = sellList.map(item => {
        return {
          vendedor: item.payload.doc.data().vendedor,
          precio: item.payload.doc.data().precio,
          comprador: item.payload.doc.data().comprador,
          coche: item.payload.doc.data().coche,
          id: item.payload.doc.id
        }
      })
    });
  }

  deleteCar(car: sellInstance) {
    /*
    Ya funciona, ahora el tema es que realmente un usuario no va a eliminar coches desde aqui, pero al menos ya sabemos como hacerlo.
     */
    this.firestore.doc(`sells/${car.id}`).delete()
      .then(() => {
        console.log("Coche eliminado");
      })
      .catch((error) => {
        console.log(error);
      })
  }

  getUserById(user) {

  }

}
