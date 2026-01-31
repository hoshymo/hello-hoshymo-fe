import { Component } from '@angular/core';
import { Auth, GoogleAuthProvider, signInWithPopup, authState } from '@angular/fire/auth';
import { AuthService } from '../app/services/auth.service';
import { Router } from '@angular/router';
import { MatLegacySnackBar as MatSnackBar } from '@angular/material/legacy-snack-bar';

class TextCard {
  header: string;
  desc: string;

  constructor (header: string, desc: string) {
    this.header = header;
    this.desc = desc;
  }
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Hello';
  cards = new Array<TextCard>();

  constructor(
    private router: Router,
    public auth: Auth,
    private snackBar: MatSnackBar,
    private authService: AuthService // need to be here to prioritize initialization
    ) {
    // let as = new AuthService();
    // console.log(as);

    this.cards.push(new TextCard("Hello", "desc"));
  }

  login() {
    signInWithPopup(this.auth, new GoogleAuthProvider());
  }

  logout() {
    this.auth.signOut();
    this.router.navigate(['/']);
  }

  onClickGoAccount() {
    if (this.auth.currentUser == null) {
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
    console.log('test');
    authState(this.auth).subscribe(user => {
      user.getIdToken().then(idtoken => {
        console.log('idToken: ' + idtoken);
      });
    });

    this.cards.push(new TextCard("2", "desc"));
  }
}
