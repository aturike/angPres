import { Injectable, inject } from '@angular/core';
import { Firestore, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { IIntroRules } from '../model/rules.model';
import { collection } from 'firebase/firestore';

@Injectable({
  providedIn: 'root',
})
export class RulesService {
  private firestore: Firestore = inject(Firestore);

  getAllIntroRules(): Observable<IIntroRules[]> {
    const introRulesRef = collection(this.firestore, 'introRules');
    return collectionData(introRulesRef, { idField: 'id' }) as Observable<
      IIntroRules[]
    >;
  }
}
