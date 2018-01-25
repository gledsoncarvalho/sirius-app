import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { UserProvider, User, UserList } from "../../providers/user/user";
import { ToastController } from 'ionic-angular/components/toast/toast-controller';
import { Storage } from "@ionic/storage";
import { Geolocation } from '@ionic-native/geolocation';
import { Observable } from "rxjs/Observable";
import { AngularFireDatabase} from 'angularfire2/database';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

  ocorrencia: any;
  fila_central: any;
  users: UserList[];
  name: string;
  telefone: number;
  lat: any;
  lng: any;
  data: any;
  val: string;

  //@comments: criando um atributo que vai receber as ocorrencias
  ocorrencias;
  filas_centrais;
  chave_oco: any;

  constructor(public navCtrl: NavController, private userProvider: UserProvider,
    private toast: ToastController, private storage: Storage,
    private geo: Geolocation, public navParams: NavParams, public db: AngularFireDatabase) {

      this.storage.length().then((val) => {
        if (val == 0) {
          this.navCtrl.push('EditContactPage');
          console.log('Não há usuário:', val);
        }
      });

      this.ocorrencia = this.navParams.data.ocorrencia || { };

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

    editUser(item: UserList) {
      this.navCtrl.push('EditContactPage', { key: item.key, user: item.user});
    }

    removeUser(item: UserList) {
      this.userProvider.remove(item.key)
      .then(() => {
        let index = this.users.indexOf(item);
        this.users.splice(index,1);

        this.toast.create({message: 'Usuário removido.', duration: 3000, position: 'botton' }).present();
      })
    }

    getLocation() {
      this.geo.getCurrentPosition()
      .then(pos => {
        this.lat = pos.coords.latitude;
        this.lng = pos.coords.longitude;
        console.log("LAt: " +JSON.stringify(this.lat) + "Long:" + JSON.stringify(this.lng));
      })
      .catch(err => console.log(err));

      let watch = this.geo.watchPosition();
      watch.subscribe((data) => {
        this.data = Date();
        console.log("Data: "+ JSON.stringify(this.data));
      });
    }

    onSubmit() {

      this.geo.getCurrentPosition().then(pos => {
        this.lat = pos.coords.latitude;
        this.lng = pos.coords.longitude;
      }).catch(
        err => console.log(err)
      );

      let data = new Date();
      console.log("Hora: " + data.getHours() + ":" + data.getMinutes());

      let pos = this.geo.getCurrentPosition().then(pos => {
        return pos;
      });

      let user = this.storage.get("user").then(user => {
        return user;
      });

      let ocs = this.ocorrencias;
      let fc = this.fila_central;

      Promise.all([pos, user, ocs, fc]).then(function(values) {
        console.log(values);
        console.log(ocs);
        let ocorrencias = {
          "contato" : {
            "telefone" : values[1].telefone
          },
          "hora" : data.getHours() + ":" + data.getMinutes(),
          "localizacao" : {
            "lat" : values[0].coords.latitude,
            "lgt" : values[0].coords.longitude,
            "local" : "Paulistana",
            "municipio" : "Paulistana",
            "referencia" : "Do lado de..",
            "zona" : "Urbana"
          },
          "paciente" : "Raimundo da banca",
          "situacao" : "ABERTA",
          "solicitante" : values[1].name,
          "tipo" : "Padrão"
        }
        console.log(ocorrencias);

        ocs.push(ocorrencias).then((item) => {
          let key = item.key;
          console.log("Key: " + item.key);
          fc.set(item.key, "true");
        });
      });

    }
  }
