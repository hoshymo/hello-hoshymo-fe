import { Injectable, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Auth, User, authState } from '@angular/fire/auth';

import { Observable, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnDestroy {
  private currentUser: User;
  private user$: Observable<User>;
  private userSubs: Subscription;

  constructor(
    private router: Router,
    private auth: Auth
  ) {
    this.user$ = authState(this.auth);

    this.userSubs = authState(this.auth).subscribe(user => {
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

  getUserObservable(): Observable<User> {
    return this.user$;
  }
}
