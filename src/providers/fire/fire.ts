import { Injectable } from '@angular/core';

import * as firebase from "firebase";
//import {AngularFirestore} from "angularfire2/firestore";


@Injectable()
export class FireProvider {

  constructor(/*private firestore: AngularFirestore*/) {
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
  // # >>>> POST methods <<<< #
  // # ###################### #

  // # ###################### #
  // # >>>> UPDATE methods <<<< #
  // # ###################### #

  // # ###################### #
  // # >>>> DELETE methods <<<< #
  // # ###################### #

  // # ###################### #
  // # >>>> Alert methods <<<< #
  // # ###################### #


}
