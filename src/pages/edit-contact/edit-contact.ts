import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { UserProvider, User } from "../../providers/user/user";

@IonicPage()
@Component({
  selector: 'page-edit-contact',
  templateUrl: 'edit-contact.html',
})
export class EditContactPage {

  model: User;
  key: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, 
    public userProvider: UserProvider, public toast: ToastController) {
      if (this.navParams.data.user && this.navParams.data.key) {
        this.model = this.navParams.data.user;
        this.key = this.navParams.data.key;
      } else {
        this.model = new User();
      }
  }

  save() {
    this.saveUser().then(() => {
        this.toast.create({message: 'Usuário salvo!', duration: 3000, position: 'botton'}).present();
        this.navCtrl.pop();
    }).catch(() => {
        this.toast.create({message: 'Erro ao salvar o usuário!', duration: 3000, position: 'botton'}).present();
    })
  }

  public saveUser() {
    if (this.key) {
      return this.userProvider.update("user", this.model);
    } else {
      return this.userProvider.insert(this.model);
    }
  }
}
