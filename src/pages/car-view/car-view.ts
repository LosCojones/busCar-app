import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as firebase from 'firebase'
import {FireProvider} from "../../providers/fire/fire";

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
    fecha_lim: null,
    descripcion: '',
  };
  wherefrom: string;
  constructor(public navCtrl: NavController, public navParams: NavParams, private fire: FireProvider) {

  }

  ionViewDidLoad() {
    this.id = this.navParams.get("id");
    this.wherefrom = this.navParams.get("wherefrom");
    this.fillCarInfo();
  }

  fillCarInfo(){
    if (this.id) {
      this.fire.verCoche(this.id, this.wherefrom).then((doc)  => {
        if (doc.exists) {
          this.model.marca = doc.data().marca;
          this.model.modelo = doc.data().modelo;

          this.model.vendedor = doc.data().vendedor;
          this.model.precio = doc.data().precio;
          this.model.kms = doc.data().kms;
          this.model.combustible = doc.data().combustible;
          this.model.fecha_pub = doc.data().fecha_pub;
          if( this.wherefrom == "/sells"){
            this.model.fecha_mat = doc.data().fecha_mat;
          }else if( this.wherefrom == "/rents"){
            this.model.fecha_lim = doc.data().fecha_lim;
          }
          this.model.descripcion = doc.data().descripcion;
          this.model.imgURL = doc.data().imgURL;
          this.getCarImg();

        } else {
          // doc.data() will be undefined in this case
          console.log("No such car!");
        }
        let userRef = firebase.firestore().collection('/users').doc(`${this.model.vendedor}`);
        userRef.get().then((doc)  => {
          if (doc.exists) {
            this.model.vendedor = doc.data().name;
            console.log(this.model.vendedor);
          }
        });
      }).catch(function(error) {
        console.log("Error getting document:", error);
      });
    }

  }
  getCarImg() {
    if(this.model.imgURL != ''){
      let pathReference = firebase.storage().ref();
      pathReference.child("/" + this.model.imgURL).getDownloadURL().then(function(url) {
        let img = document.getElementById('carimg');
        img.setAttribute('src', url);
      }).catch(function(error) {
        console.log(error);
      });
    }
  }


  comprar(car_id, tipo) {
    let currentUser = firebase.auth().currentUser;
    if (currentUser) {
      var carRef = firebase.firestore().collection(tipo).doc(car_id);
      carRef.set({
        comprador: currentUser.uid,
      },{merge: true});
    }
    this.navCtrl.pop();
  }

}

