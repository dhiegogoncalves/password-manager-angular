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
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SiteService {
  constructor(private firestone: Firestore) {}

  addSite(data: object): Promise<DocumentReference<object>> {
    const dbInstance = collection(this.firestone, 'sites');
    return addDoc(dbInstance, data);
  }

  loadSites(): Observable<DocumentData[]> {
    const dbInstance = collection(this.firestone, 'sites');
    return collectionData(dbInstance, { idField: 'id' });
  }

  updateSite(id: string, data: object): Promise<void> {
    const docInstance = doc(this.firestone, 'sites', id);
    return updateDoc(docInstance, data);
  }

  deleteSite(id: string): Promise<void> {
    const docInstance = doc(this.firestone, 'sites', id);
    return deleteDoc(docInstance);
  }
}
