import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Observable } from "rxjs/Observable";
import { AngularFireDatabase} from 'angularfire2/database';

@IonicPage()
@Component({
  selector: 'page-status',
  templateUrl: 'status.html',
})
export class StatusPage {

  status: Observable<{}>;
 
  constructor(public navCtrl: NavController, public navParams: NavParams, public db: AngularFireDatabase) {
    
    this.status = this.db.object('/ocorrencias/' + navParams.get('key')).valueChanges();
    
  }

   async cancelaOcorrencia() {
     let c = await this.db.database.ref('/ocorrencias/' + this.navParams.get('key'));
     let r1 = await this.db.database.ref('/fila_central/' + this.navParams.get('key')).off();
     let r2 = await this.db.database.ref('/fila_medico/' + this.navParams.get('key')).off();
     let r3 = await this.db.database.ref('/fila_base/' + this.navParams.get('key')).off();
     let at = await this.db.database.ref('/ocorrencias/' + this.navParams.get('key')).set({situacao: "arquivada"});

      c.on("value", function(snapshot) {
        var sit = snapshot.val().situacao;
        switch(sit) {
          case "fila_central": {
            r1; at;
          }
          case "fila_medico": {
            r2; at;
          }
          case "fila_base": {
            r3; at;
          }
          case "deslocando": {
            at;
          }

        }
      });
    }
}
