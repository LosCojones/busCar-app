import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as firebase from 'firebase'
import {FireProvider} from "../../providers/fire/fire";

/**
 * Generated class for the CarViewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-car-view',
  templateUrl: 'car-view.html',
})
export class CarViewPage {

  id: string;
  model = {
    marca: '',
    modelo: '',
    vendedor: null,
    precio: '',
    kms: '',
    combustible: '',
    imgURL:'',
    fecha_pub: null,
    fecha_mat: null,
    descripcion: ''
  };
  constructor(public navCtrl: NavController, public navParams: NavParams, private fire: FireProvider) {
  }

  ionViewDidLoad() {
    this.id = this.navParams.get("id");
    this.fillCarInfo();
  }

  fillCarInfo(){
    if (this.id) {
      this.fire.verCoche(this.id).then((doc)  => {
        if (doc.exists) {
          this.model.marca = doc.data().marca;
          this.model.modelo = doc.data().modelo;
          this.model.vendedor = doc.data().vendedor;
          this.model.precio = doc.data().precio;
          this.model.kms = doc.data().kms;
          this.model.combustible = doc.data().comb;
          this.model.imgURL = doc.data().imgURL;
          this.model.fecha_pub = doc.data().fpub;
          this.model.fecha_mat = doc.data().fmat;
          this.model.descripcion = doc.data().desc;
        } else {
          // doc.data() will be undefined in this case
          console.log("No such car!");
        }
        let userRef = firebase.firestore().collection('/users').doc(`${this.model.vendedor}`);
        userRef.get().then((doc)  => {
          if (doc.exists) {
            this.model.vendedor = doc.data().name;
          }
        });
      }).catch(function(error) {
        console.log("Error getting document:", error);
      });
    }
  }

}
