import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFirestore, AngularFirestoreCollection } from "angularfire2/firestore";
import { Observable } from 'rxjs/Observable';

interface sellInstance {
  vendedor: string;
  comprador?: string;
  precio: number;
  coche: string;
}

@IonicPage()
@Component({
  selector: 'page-buy',
  templateUrl: 'buy.html',
})
export class BuyPage {

  sellCollection: AngularFirestoreCollection<sellInstance>;
  sell: Observable<sellInstance[]>;

  constructor(public navCtrl: NavController, public navParams: NavParams, private firestore: AngularFirestore) {
  }

  ionViewDidEnter() {
    this.sellCollection = this.firestore.collection('sells', ref => ref.orderBy('coche'));
    this.sell = this.sellCollection.valueChanges();
  }

}
