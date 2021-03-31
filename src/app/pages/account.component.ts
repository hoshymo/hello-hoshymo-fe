import { AuthService } from '../services/auth.service';
import { UserComment, UserdataService } from '../services/userdata.service';

import firebase from 'firebase/app';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Observable } from 'rxjs';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit, OnDestroy {

  public userComment$: Observable<UserComment>;
  public user$: Observable<firebase.User>;

  constructor(
    private router: Router,
    private authService: AuthService,
    private userdataService: UserdataService,
    private snackBar: MatSnackBar
  ) {
    this.user$ = authService.getUserObservable();
  }

  ngOnInit() {
    this.userComment$ = this.userdataService.getUserCommentObservable(this.user$);
  }

  ngOnDestroy() {
    // if (this.userCommentSubs)
    //   this.userCommentSubs.unsubscribe();
  }

  // use with caution, this might cause infinite loop if a promise operation
  // is inside (or in more complex condition)
  // ngAfterViewChecked() {}

  onClickSaveComment(inVal: string) {
    const comment = {
      commentText: inVal, createdAtMs: (new Date()).getTime()
    };
    this.userdataService.saveUserComment(this.user$, comment, () => {
      this.snackBar.open('Saved!', 'i', { duration: 1000 });
    }, err => {
      console.log('(E) failed to save comment. ', err);
    });
  }
}
