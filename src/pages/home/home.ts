import { Component } from '@angular/core';
import { NavController} from 'ionic-angular';
import { UserProvider, UserList } from "../../providers/user/user";
import { ToastController } from 'ionic-angular/components/toast/toast-controller';
import { Storage } from "@ionic/storage";
import { Geolocation } from '@ionic-native/geolocation';
import { AngularFireDatabase} from 'angularfire2/database';
import { LoadingController } from "ionic-angular";
import { StatusPage } from '../status/status';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

  users: UserList[];
  ocorrencias: any;
  fila_central: any;

  constructor(public navCtrl: NavController, private userProvider: UserProvider, private toast: ToastController, 
    private storage: Storage, private geo: Geolocation, public db: AngularFireDatabase, public loadingCtrl: LoadingController) {

    this.storage.length().then((val) => {
      if (val == 0) {
        this.navCtrl.push('EditContactPage');
        console.log('Não há usuário:', val);
      }
    });

    this.fila_central = db.list('/fila_central/aguardando');
    this.ocorrencias = db.list('/ocorrencias');

  }

  ionViewDidEnter() {
    this.userProvider.getAll().then(results => {
      this.users = results;
    });
  }

  addUser() {
    this.navCtrl.push('EditContactPage');
  }

  removeUser(item: UserList) {
    this.userProvider.remove(item.key)
    .then(() => {
      let index = this.users.indexOf(item);
      this.users.splice(index,1);

      this.toast.create({message: 'Usuário removido.', duration: 3000, position: 'botton' }).present();
    })
  }

  async getLocation() {
    return this.geo.getCurrentPosition();
  }

  async getUser() {
    return this.storage.get("user");
  }

  async onSubmit() {

    let loading = this.loadingCtrl.create({
      content: 'Solicitação em andamento. Aguarde...'
    });  
    loading.present();
        
    let pos = await this.getLocation();
    let user = await this.getUser();

    let data = new Date();
    let ocorrencia = {
      "contato" : {
        "telefone" : user.telefone
      },
      "hora" : data.getHours() + ":" + data.getMinutes(),
      "localizacao" : {
        "lat" : pos.coords.latitude,
        "lgt" : pos.coords.longitude,
        "local" : "Paulistana",
        "municipio" : "Paulistana",
        "referencia" : "Do lado de..",
        "zona" : "Urbana"
      },
      "paciente" : "Raimundo da banca",
      "situacao" : "fila_central",
      "solicitante" : user.name,
      "tipo" : "Padrão"
    }
      
    let fc = this.fila_central;
    let navCtrl = this.navCtrl;

    this.ocorrencias.push(ocorrencia).then(item => {
      
      fc.set(item.key, "true");
      loading.dismiss();

      navCtrl.push(StatusPage, {
        key: item.key
      });
    });    

  }

}