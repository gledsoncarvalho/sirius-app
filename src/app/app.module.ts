import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicStorageModule } from "@ionic/storage";
import { HttpModule } from '@angular/http';

import { MyApp } from './app.component';
import { DatePipe } from "@angular/common";
import { UserProvider } from "../providers/user/user";
import { Geolocation } from '@ionic-native/geolocation';
import { AngularFireModule } from "angularfire2";
import { AngularFireDatabaseModule } from "angularfire2/database";

import { HomePage } from '../pages/home/home';
import { StatusPage } from '../pages/status/status';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    StatusPage
  ],
  imports: [
    BrowserModule,
    IonicStorageModule.forRoot(),
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp( {
      apiKey: "AIzaSyBsaoO_dfCrgQ7jYXHMd11pIbo_PleicwI",
      authDomain: "sirius-666.firebaseapp.com",
      databaseURL: "https://sirius-666.firebaseio.com",
      projectId: "sirius-666",
      storageBucket: "sirius-666.appspot.com",
      messagingSenderId: "178245427359"
    }),
    AngularFireDatabaseModule,
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    StatusPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    IonicStorageModule,
    DatePipe,
    UserProvider,
    Geolocation,
    UserProvider
  ]
})
export class AppModule {}
