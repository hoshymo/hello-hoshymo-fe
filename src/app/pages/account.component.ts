import { AuthService } from '../services/auth.service';

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  public idToken: string;
  user: firebase.User;

  public userDisplayName: string;
  public userPhotoURL: string;

  constructor(
    private router: Router,
    private authService: AuthService
  ) {
    this.user = authService.getAuthenticatedUser();
    if (this.user) {
      this.userDisplayName = this.user.displayName;
      this.userPhotoURL = this.user.photoURL;
    }
  }

  ngOnInit() {
  }

  onClickMyAccount() {
    // this.router.navigate(['/account']);

    let user = this.authService.getAuthenticatedUser();
    if (!user) {
      console.log("user not logged in?");
      return;
    }

    user.getIdToken().then(idToken => {
      this.idToken = idToken;
    });
  }

}
