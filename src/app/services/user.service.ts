import { Injectable, inject } from '@angular/core';
import {
  Firestore,
  addDoc,
  collection,
  doc,
  docData,
  setDoc,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { IUser } from '../model/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private firestore: Firestore = inject(Firestore);

  getEmailById(id: string): Observable<IUser> {
    const emailDocRef = doc(this.firestore, `users/${id}`);
    return docData(emailDocRef, { idField: 'id' }) as Observable<IUser>;
  }

  createUser(userDoc: IUser): Promise<any> {
    const roundRef = collection(this.firestore, 'users');
    return addDoc(roundRef, userDoc);
  }

  updateUser(userDoc: IUser, userId?: string): Promise<void> {
    const userRef = collection(this.firestore, 'users');
    const userDocRef = doc(userRef, userId);
    return setDoc(userDocRef, userDoc);
  }
}
