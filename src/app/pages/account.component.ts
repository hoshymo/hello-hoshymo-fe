import { AuthService } from '../services/auth.service';

import { Component, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

class UserComment {
  commentText: string;
  createdAtMs: number;
}

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit, OnDestroy {

  public idToken: string;
  user: firebase.User;

  public oUserComment: Observable<UserComment>;

  public userDisplayName: string;
  public userPhotoURL: string;

  constructor(
    private router: Router,
    private authService: AuthService,
    private afs: AngularFirestore,
    private snackBar: MatSnackBar
  ) {
    this.user = authService.getAuthenticatedUser();
    if (this.user) {
      this.userDisplayName = this.user.displayName;
      this.userPhotoURL = this.user.photoURL;
    }
  }

  ngOnInit() {
    if (this.user) {
      let itemDoc = this.afs.doc<UserComment>(`user-comments/${this.user.uid}`);
      // if subscription is needed ...
      // this.userCommentSubs = itemDoc.snapshotChanges().subscribe(action => {
      //   this.userCommentText = action.payload.data().commentText;
      //   // to avoid -> Error: ExpressionChangedAfterItHasBeenCheckedError: Expression has changed after it was checked.
      //   this.cdRef.detectChanges();
      // });
      this.oUserComment = itemDoc.valueChanges();
    }
  }

  ngOnDestroy() {
    // if (this.userCommentSubs)
    //   this.userCommentSubs.unsubscribe();
  }

  // use with caution, this might cause infinite loop if a promise operation
  // is inside (or in more complex condition)
  // ngAfterViewChecked() {}

  onClickShowIdTokenString() {
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

  onClickSaveComment(inVal: string) {
    let comment = {
      commentText: inVal, createdAtMs: (new Date()).getTime()
    }
    let itemDoc = this.afs.doc<UserComment>(`user-comments/${this.user.uid}`);
    itemDoc.set(comment).then(value => {
      this.snackBar.open('Saved!', 'i', { duration: 1000 });
    }).catch(err => {
      console.log("(E) failed to save comment. ", err);
    });
  }
}
