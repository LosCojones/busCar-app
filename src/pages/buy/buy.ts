import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFirestore, AngularFirestoreCollection } from "angularfire2/firestore";
import {CarViewPage} from "../car-view/car-view";
// import { Observable } from 'rxjs/Observable';

interface sellInstance {
  vendedor: string;
  comprador?: string;
  precio: number;
  marca: string;
  modelo: string;
  id?: string;
}

@IonicPage()
@Component({
  selector: 'page-buy',
  templateUrl: 'buy.html',
})
export class BuyPage {

  sellCollection: AngularFirestoreCollection<sellInstance>;
  sell: sellInstance[];
  polla: string;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private firestore: AngularFirestore) {
  }

  ionViewDidEnter() {
    this.sellCollection = this.firestore.collection('sells', ref => ref.where('comprador', '==', null));
    this.sellCollection.snapshotChanges().subscribe( sellList => {
      this.sell = sellList.map(item => {
        //
        return {
          vendedor: item.payload.doc.data().vendedor,
          precio: item.payload.doc.data().precio,
          comprador: item.payload.doc.data().comprador,
          marca: item.payload.doc.data().marca,
          modelo: item.payload.doc.data().modelo,
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

  changeToCarView(id){
    this.navCtrl.push(CarViewPage, {
      id: id
    });
  }

}
