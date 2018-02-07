import { Injectable } from '@angular/core';
import { Storage } from "@ionic/storage";
import { DatePipe } from "@angular/common";

@Injectable()
export class UserProvider {

  constructor(private storage: Storage, private datePipe: DatePipe) {
    
    
  }

  public insert(user: User) {
    let key = this.datePipe.transform(new Date(), "ddMMyyyyHHmmss");
    return this.save(key, user);
  }

  public update(key: string, user: User) {
    return this.save(key, user);
  }

  private save(key: string, user: User){
    return this.storage.set('user', user);
  }

  public remove(key: string){
    return this.storage.remove(key);
  }

  public getAll(){
    let users: UserList[] = [];

    return this.storage.forEach((value: User, key: string, itrationNumber: Number) => {
      let user = new UserList();
      user.key = key;
      user.user = value;
      users.push(user);
    })
      .then(() => {
        return Promise.resolve(users);
      })
      .catch((error) => {
        return Promise.reject(error);
      })
  }

}

export class User {
  name: string;
  telefone: number;
}

export class UserList {
  key: string;
  user: User;
}
