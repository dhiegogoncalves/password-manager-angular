import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  addDoc,
  DocumentReference,
  collectionData,
  DocumentData,
  updateDoc,
  doc,
  deleteDoc,
  QueryDocumentSnapshot,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Password } from '../models/Password';

@Injectable({
  providedIn: 'root',
})
export class PasswordService {
  constructor(private firestone: Firestore) {}

  addPassword(
    data: object,
    siteId: string
  ): Promise<DocumentReference<object>> {
    const dbInstance = collection(this.firestone, `sites/${siteId}/passwords`);
    return addDoc(dbInstance, data);
  }

  loadPasswords(siteId: string): Observable<Password[]> {
    const dbInstance = collection(this.firestone, `sites/${siteId}/passwords`);
    return collectionData(dbInstance, { idField: 'id' }) as Observable<
      Password[]
    >;
  }
}
