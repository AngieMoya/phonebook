import { computed, inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { Contact } from '../interfaces/api-interface';

// Create payload (no id, createdAt, updatedAt for POST)
export type CreateContactDto = Omit<Contact, 'id' | 'createdAt' | 'updatedAt'>;

// Update payload (full object including id)
export type UpdateContactDto = Contact;

@Injectable({
  providedIn: 'root',
})
export class ContactsService {
  private readonly apiUrl = `${environment.API_URL}/api/contacts`;
  private http = inject(HttpClient);

  /** Get all contacts */
  getContacts(): Observable<Contact[]> {
    return this.http.get<Contact[]>(this.apiUrl);
  }

  /** Get contact by id */
  getContact(id: number): Observable<Contact> {
    return this.http.get<Contact>(`${this.apiUrl}/${id}`);
  }

  /** Create a new contact */
  createContact(contact: CreateContactDto): Observable<Contact> {
    return this.http.post<Contact>(this.apiUrl, contact);
  }

  /** Update a contact */
  updateContact(id: number, contact: UpdateContactDto): Observable<Contact> {
    return this.http.put<Contact>(`${this.apiUrl}/${id}`, contact);
  }

  /** Delete a contact */
  deleteContact(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
