import { Injectable } from '@angular/core';
import { Firestore, doc, docData, setDoc } from '@angular/fire/firestore';
import { User } from '@angular/fire/auth';
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
    private firestore: Firestore
  ) { }

  private getUserCommentDoc(uid: string) {
    return doc(this.firestore, `user-comments/${uid}`);
  }

  getUserCommentObservable(user$: Observable<User>): Observable<UserComment> {
    return user$.pipe(take(1), mergeMap(user => {
      const itemDoc = this.getUserCommentDoc(user.uid);
      return docData(itemDoc) as Observable<UserComment>;
    }));
  }

  saveUserComment(user$: Observable<User>, comment: UserComment,
      onfulfilled?: () => void, onrejected?: (err: any) => void): void {
    user$.pipe(take(1)).subscribe(user => {
      const itemDoc = this.getUserCommentDoc(user.uid);
      setDoc(itemDoc, comment).then(() => {
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
