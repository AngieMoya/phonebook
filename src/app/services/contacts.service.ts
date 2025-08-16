import { computed, inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, switchMap, tap } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { Contact } from '../interfaces/api-interface';
import { CONTACT_TYPES } from '../constants/contact-types';

export type CreateContactDto = Omit<Contact, 'id' | 'createdAt' | 'updatedAt'>;

// Update payload (full object including id)
export type UpdateContactDto = Contact;

@Injectable({
  providedIn: 'root',
})
export class ContactsService {
  restApi = computed(() => `${environment.API_URL}/api/contacts`);
  private http = inject(HttpClient);

  private refresh$ = new BehaviorSubject<void>(undefined);

  public contacts = toSignal(this.refresh$.pipe(switchMap(() => this.getContacts())), {
    initialValue: [],
  });

  /** Trigger refresh manually */
  refreshContacts() {
    this.refresh$.next();
  }

  /** Get all contacts */
  getContacts(): Observable<Contact[]> {
    return this.http.get<Contact[]>(this.restApi());
  }

  /** Get contact by id */
  getContact(id: number): Observable<Contact> {
    return this.http.get<Contact>(`${this.restApi()}/${id}`);
  }

  /** Create a new contact */
  createContact(contact: CreateContactDto): Observable<Contact> {
    let payload: Partial<Contact> ={
      contactType: contact.contactType,
      name: contact.name,
      phoneNumber: contact.phoneNumber,
      comments: contact.comments,
    }
    switch (contact.contactType) {
      case CONTACT_TYPES[0].value:
        payload.email = contact.email;
        payload.documentNumber = contact.documentNumber;
        break;
      case CONTACT_TYPES[1].value:
        payload.publicOrganizationAddress = contact.publicOrganizationAddress;
        payload.organizationName = contact.organizationName;
        break;
      default:
        payload.legalRepresentativeName=contact.legalRepresentativeName;
        payload.privateOrganizationAddress=contact.privateOrganizationAddress;
        break;
    }
    return this.http.post<Contact>(this.restApi(), payload).pipe(tap(() => this.refreshContacts()));
  }

  /** Update a contact */
  updateContact(id: number, contact: UpdateContactDto): Observable<Contact> {
    return this.http.put<Contact>(`${this.restApi()}/${id}`, contact);
  }

  /** Delete a contact */
  deleteContact(id: number): Observable<void> {
    return this.http
      .delete<void>(`${this.restApi()}/${id}`)
      .pipe(tap(() => this.refreshContacts()));
  }
}
