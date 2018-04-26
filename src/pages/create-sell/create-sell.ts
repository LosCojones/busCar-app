import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import * as firebase from 'firebase';
import {HomePage} from "../home/home";
import {FireProvider} from "../../providers/fire/fire";


@IonicPage()
@Component({
  selector: 'page-create-sell',
  templateUrl: 'create-sell.html',
})
export class CreateSellPage {


  model = {
    marca: '',
    modelo: '',
    comprador: null,
    vendedor: null,
    precio: '',
    kms: '',
    combustible: '',
    imgURL:'',
    fecha_pub: new Date(),
    fecha_mat: null,
    descripcion: ''
  };

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private alertCtrl: AlertController,
              private fire: FireProvider) {
  }

  ionViewDidEnter() {
    let currentUser = firebase.auth().currentUser;
    if (currentUser) { this.model.vendedor = currentUser.uid; }
  }

  createSell () {
    let currentUser = firebase.auth().currentUser;
    if(currentUser) {
      this.fire.createSell(this.model)
        .then(newItem => {
          console.log("Coche añadido");
          this.successfullyAddedCar();
        }).catch(function (e) {
        console.log(e);
      });
      this.navCtrl.setRoot(HomePage);
    } else {
      this.showNotLoggedInUser();
    }
  }

  showNotLoggedInUser() {
    let alert = this.alertCtrl.create({
      title: 'Creación fallida',
      subTitle: 'Debe haber iniciado sesión para crear una nueva venta',
      buttons: ['OK']
    });
    alert.present();
  }

  successfullyAddedCar() {
    let alert = this.alertCtrl.create({
      title: 'Coche creado',
      buttons: ['OK']
    });
    alert.present();
  }

  /****************************************************
  Image - picker native permissions and usage
   ****************************************************/
  // hasReadPermission() {
  //   this.imagePicker.hasReadPermission(
  //     function(result) {
  //       // if this is 'false' you probably want to call 'requestReadPermission' now
  //       alert(result);
  //     }
  //   )
  // }
  //
  // requestReadPermission() {
  //   // no callbacks required as this opens a popup which returns async
  //   this.imagePicker.requestReadPermission();
  // }

  // openGallery (): void {
  //   let options = {
  //     maximumImagesCount: 1,
  //   };
  //
  //   this.imagePicker.getPictures(options).then(
  //     file_uris => console.log(file_uris),
  //     err => console.log(err)
  //   );
  // }

}
