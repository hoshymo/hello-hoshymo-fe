import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { AuthService } from '../app/services/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Hello';

  constructor(
    private router: Router,
    public afAuth: AngularFireAuth,
    private snackBar: MatSnackBar,
    private authService: AuthService // need to be here to prioritize initialization
    ) {
    // let as = new AuthService();
    // console.log(as);
  }

  login() {
    this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
  }

  logout() {
    this.afAuth.auth.signOut();
    this.router.navigate(['/']);
  }

  onClickGoAccount() {
    if (this.afAuth.user == null) {
      this.snackBar.open('Please log in first.', 'Error', {
        duration: 1000,
      });
      return;
    }

    this.router.navigate(['/account']);
  }

  onClickGoAbout() {
    this.router.navigate(['/about']);
  }
  
  onClickTest() {
    console.log("test");
    this.afAuth.user.subscribe(user => {
      user.getIdToken().then(idtoken => {
        console.log("idToken: " + idtoken);
      });
    });
  }
}
