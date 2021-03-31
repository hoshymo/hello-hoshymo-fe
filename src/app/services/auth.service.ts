import { Injectable, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';

import { Observable, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnDestroy {
  private currentUser: firebase.User;
  private user$: Observable<firebase.User>;
  private userSubs: Subscription;

  constructor(
    private router: Router,
    private afAuth: AngularFireAuth
  ) {
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

    this.user$ = this.afAuth.user;

    this.userSubs = this.afAuth.user.subscribe(user => {
      this.currentUser = user;
    });
  }

  ngOnDestroy(): void {
    if (this.userSubs) {
      this.userSubs.unsubscribe();
    }
  }

  logout() {
    this.router.navigate(['/']);
  }

  isAuthenticated(): boolean {
    return (this.currentUser !== undefined);
  }

  getUserObservable(): Observable<firebase.User> {
    return this.user$;
  }
}
