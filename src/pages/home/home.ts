import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { UserProvider, User, UserList } from "../../providers/user/user";
import { ToastController } from 'ionic-angular/components/toast/toast-controller';
import { Storage } from "@ionic/storage";
import { Geolocation } from '@ionic-native/geolocation';
import { Observable } from "rxjs/Observable";

//@comments: Adicionando uma nova dependência
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

      
      });

      this.ocorrencia = this.navParams.data.ocorrencia || { };
      this.fila_central = this.navParams.data.fila_central || { };


      this.fila_central = db.list('/fila_central/aguardando');
      this.ocorrencias = db.list('/ocorrencias');

    }

    ionViewDidEnter() {
      this.userProvider.getAll()
        .then(results => {
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

        this.storage.get("user").then((val) => {
          let u = JSON.stringify(val);
          console.log('Users', u);
        });

        this.geo.getCurrentPosition()
          .then(pos => {
          this.lat = pos.coords.latitude;
          this.lng = pos.coords.longitude;
        })
        .catch(err => console.log(err));

        let watch = this.geo.watchPosition();
        watch.subscribe((data) => {
          this.data = Date(); // Sabe como filtrar esse Date()? Está vindo uma carrada de informaç
          console.log("Data: "+ this.data);
        });

      let ocorrencias = {
            "atendimento" : {
              "medico" : "ze",
              "prioridade" : 4,
              "ta_vivo" : true
            },
            "base" : "paulistana",
            "contato" : {
              "telefone" : "(89)994174455"
            },
            "deslocamento" : {
              "saida" : "10:10"
            },
            "hora" : "5:00",
            "localizacao" : {
              "lat" : -8.5829043,
              "lgt" : -41.4177845,
              "local" : "paulistana",
              "municipio" : "paulistana",
              "referencia" : "Do lado de..",
              "zona" : "Urbana"
            },
            "paciente" : "adenildo de sousa",
            "situacao" : "ABERTA",
            "solicitante" : "Gabriel coelho glima",
            "tipo" : "padrão"

        }

        this.ocorrencias.push(ocorrencias).then((item) => {
          console.log("Key: " + item.key);
          this.chave_oco = item.key;
        });

        console.log(this.ocorrencia);

        let fila_central = {
                  [this.chave_oco] : "true"
      }



        this.fila_central.push(fila_central).then((item) => {
          console.log("KEY-fila: " + item.key);
          this.fila_central.key = item.key;
        });
    }
}
