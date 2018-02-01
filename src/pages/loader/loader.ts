import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase} from 'angularfire2/database';
import { ViewChild } from '@angular/core/src/metadata/di';
import { Slides } from "ionic-angular";

/**
 * Generated class for the LoaderPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-loader',
  templateUrl: 'loader.html',
})
export class LoaderPage {

  @ViewChild(Slides) slides: Slides;

  constructor(public navCtrl: NavController, public navParams: NavParams, public db: AngularFireDatabase) {
  }

  goToSlide() {
    this.slides.slideTo(3,3);
  }

}
