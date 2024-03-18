import { Injectable, inject } from '@angular/core';
import {
  Firestore,
  addDoc,
  collection,
  collectionData,
  doc,
  docData,
  getDocs,
  query,
  setDoc,
  where,
} from '@angular/fire/firestore';
import { Observable, map } from 'rxjs';
import { IUser } from '../model/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private firestore: Firestore = inject(Firestore);

  getUserByEmail(email: string): Promise<any> {
    const emailDocRef = collection(this.firestore, 'users');
    const q = query(emailDocRef, where('email', '==', email));

    return getDocs(q);
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
