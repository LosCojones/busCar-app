import { Injectable } from '@angular/core';

import * as firebase from "firebase";
import { AngularFirestore } from "angularfire2/firestore";


@Injectable()
export class FireProvider {

  constructor(private firestore: AngularFirestore) {
  }

  // # ##################### #
  // # >>>> Auth() methods <<<< #
  // # ##################### #


  signIn(correo, pass){
    return firebase.auth().signInWithEmailAndPassword(correo, pass);
  }

  signOut(){
    return firebase.auth().signOut();
  }


  // # ###################### #
  // # >>>> GET methods <<<< #
  // # ###################### #

  availableSells() {
    return this.firestore.collection('sells', ref => ref.where('comprador', '==', null));
  }

  verCoche(id) {
    let carRef = firebase.firestore().collection('/sells').doc(id);
    return carRef.get();
  }

  // # ###################### #
  // # >>>> POST methods <<<< #
  // # ###################### #

  createSell(sell) {
    return this.firestore.collection('sells').add(sell);
  }
  createRent(rent) {
    return this.firestore.collection('rents').add(rent);
  }

  // # ###################### #
  // # >>>> DELETE methods <<<< #
  // # ###################### #

  // # ###################### #
  // # >>>> Alert methods <<<< #
  // # ###################### #


}
