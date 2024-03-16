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

export interface IEmail {
  id?: string;
  emailAddress: string;
  presDocs: string[];
}

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  private firestore: Firestore = inject(Firestore);

  getEmailById(id: string): Observable<IEmail> {
    const emailDocRef = doc(this.firestore, `emails/${id}`);
    return docData(emailDocRef, { idField: 'id' }) as Observable<IEmail>;
  }

  async postData(
    emailDoc: IEmail,
    emailDocId: string,
    onSuccess: () => void,
    onError: (error: any) => void
  ) {
    try {
      const roundRef = collection(this.firestore, 'emails');
      if (emailDocId) {
        // Update an existing document
        const roundDocRef = doc(roundRef, emailDocId);
        await setDoc(roundDocRef, emailDoc);
      } else {
        // Add a new document
        await addDoc(roundRef, emailDoc);
      }
      onSuccess(); // Call the success callback
    } catch (error) {
      onError(error); // Call the error callback
    }
  }
}
