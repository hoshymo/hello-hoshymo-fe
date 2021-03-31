import { Injectable } from '@angular/core';
import firebase from 'firebase/app';

import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { take, mergeMap } from 'rxjs/operators';

export class UserComment {
  commentText: string;
  createdAtMs: number;
}

@Injectable({
  providedIn: 'root'
})
export class UserdataService {

  constructor(
    private afs: AngularFirestore
  ) { }

  private getUserCommentDoc(uid: string): AngularFirestoreDocument<UserComment> {
    return this.afs.doc<UserComment>(`user-comments/${uid}`);
  }

  getUserCommentObservable(user$: Observable<firebase.User>): Observable<UserComment> {
    return user$.pipe(take(1), mergeMap(user => {
      const itemDoc = this.getUserCommentDoc(user.uid);
      // if subscription is needed ...
      // this.userCommentSubs = itemDoc.snapshotChanges().subscribe(action => {
      //   this.userCommentText = action.payload.data().commentText;
      //   // to avoid -> Error: ExpressionChangedAfterItHasBeenCheckedError: Expression has changed after it was checked.
      //   this.cdRef.detectChanges();
      // });
      return itemDoc.valueChanges();
    }));
  }

  saveUserComment(user$: Observable<firebase.User>, comment: UserComment,
      onfulfilled?: () => void, onrejected?: (err: any) => void): void {
    user$.pipe(take(1)).subscribe(user => {
      const itemDoc = this.getUserCommentDoc(user.uid);
      itemDoc.set(comment).then(() => {
        if (onfulfilled) {
          onfulfilled();
        }
      }).catch(err => {
        if (onrejected) {
          onrejected(err);
        }
      });
    });
  }
}
