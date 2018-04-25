import { Component } from '@angular/core';
import {NavController, PopoverController} from 'ionic-angular';
import {PopoverPage} from "../popover/popover";
import {AngularFirestore, AngularFirestoreCollection} from "angularfire2/firestore";
import * as firebase from "firebase";
import {CarViewPage} from "../car-view/car-view";

interface sellInstance {
  vendedor: string;
  comprador?: string;
  precio: number;
  marca: string;
  modelo: string;
  id?: string;
}

interface rentInstance {
  vendedor: string;
  comprador?: string;
  precio: number;
  marca: string;
  modelo: string;
  fecha_lim: string;
  id1?: string;
  imgURL: string;
}

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  sellCollection: AngularFirestoreCollection<sellInstance>;
  sell: sellInstance[];
  rentCollection: AngularFirestoreCollection<rentInstance>;
  rent: rentInstance[];

  constructor(public navCtrl: NavController,
              private popoverCtrl: PopoverController,
              private firestore: AngularFirestore) {

  }

  ionViewDidEnter() {
    this.sellCollection = this.firestore.collection('sells', ref => ref.where('comprador', '==', null));
    this.sellCollection.snapshotChanges().subscribe(sellList => {
      this.sell = sellList.map(item => {
        let imgURL2 = item.payload.doc.data().imgURL;
        let id2 = item.payload.doc.id;
        console.log(imgURL2 + id2);
        this.getCarImg(imgURL2, id2);
        return {
          vendedor: item.payload.doc.data().vendedor,
          precio: item.payload.doc.data().precio,
          comprador: item.payload.doc.data().comprador,
          marca: item.payload.doc.data().marca,
          modelo: item.payload.doc.data().modelo,
          imgURL: item.payload.doc.data().imgURL,
          id: item.payload.doc.id
        }
      })
    });
    this.rentCollection = this.firestore.collection('rents', ref => ref.where('comprador', '==', null));
    this.rentCollection.snapshotChanges().subscribe(rentList => {
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
          imgURL: item.payload.doc.data().imgURL,
          id1: item.payload.doc.id
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

  changeToCarView(id, tipo){
    this.navCtrl.push(CarViewPage, {
      id: id,
      wherefrom: tipo
    });
  }


  presentPopover(myEvent) {
    let popover = this.popoverCtrl.create(PopoverPage);
    popover.present({
      ev: myEvent
    });
  }

}
