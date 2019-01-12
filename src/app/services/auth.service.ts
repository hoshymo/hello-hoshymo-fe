import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuth } from '@angular/fire/auth';

import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private subsUser: Subscription; // TODO unsubscribe
  private fbUser: firebase.User;

  constructor(
    private router: Router,
    private afAuth: AngularFireAuth
  ) {
    console.log("AuthService ctor - ");

    // // this also works, but either way you have to have init.json in 
    // // environments.firebase or the app crushes in some place
    // fetch('/__/firebase/init.json').then(response => {
    //   if (!response.ok) {
    //     console.log("(E) failed to get firebase/init.json! (1)");
    //     return;
    //   }
    //   response.json().then(o => {
    //     AngularFireModule.initializeApp(o);
    //     console.log("firebase initialized. ", o);
    //   });
    // }).catch(e => {
    //   console.log("(E) failed to get firebase/init.json! (2)", e);
    // });

    this.afAuth.user.subscribe(user => {
      console.log('(X) user', user);
      this.fbUser = user;
    });
  }

  logout() {
    this.router.navigate(['/']);
  }

  getAuthenticatedUser(): firebase.User {
    return this.fbUser;
  }

}
