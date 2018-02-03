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

}