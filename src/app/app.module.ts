import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicStorageModule } from "@ionic/storage";
import { HttpModule } from '@angular/http';


import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { DatePipe } from "@angular/common";
import { UserProvider } from "../providers/user/user";
import { Geolocation } from '@ionic-native/geolocation';
import { AngularFireModule } from "angularfire2";
import { AngularFireDatabaseModule } from "angularfire2/database";
import { FirebaseProvider } from '../providers/firebase/firebase';


@NgModule({
  declarations: [
    MyApp,
    HomePage
  ],
  imports: [
    BrowserModule,
    IonicStorageModule.forRoot(),
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp({
      apiKey: "AIzaSyAVOnXFPxLL7c9Xi0oUV7-8UxiTyxck2bM",
      authDomain: "sirius-b77ba.firebaseapp.com",
      databaseURL: "https://sirius-b77ba.firebaseio.com",
      projectId: "sirius-b77ba",
      storageBucket: "sirius-b77ba.appspot.com",
      messagingSenderId: "54967610528"
    }),
    AngularFireDatabaseModule,
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    IonicStorageModule,
    DatePipe,
    UserProvider,
    FirebaseProvider,
    Geolocation,
    FirebaseProvider
  ]
})
export class AppModule {}
