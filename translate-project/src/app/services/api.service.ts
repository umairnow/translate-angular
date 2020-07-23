import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';

import {Observable, of, throwError} from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { TranslateModel } from '../Interfaces/translate-modal';

@Injectable({ providedIn: 'root'})
export class ApiService {
  constructor(private http: HttpClient) { }

  private baseURL = 'http://localhost:8080/translate';
  private httpOptions = {headers: new HttpHeaders()
      .set('Content-Type', 'application/json')};

  /** GET translations from the server */
  getTranslations(): Observable<TranslateModel[]> {
    const url = `${this.baseURL}/translations.json`;
    return this.http.get<TranslateModel[]>(url, this.httpOptions)
      .pipe(
        tap(_ => `Fetched translations`),
        catchError(this.handleError)
      );
  }

  updateTranslation(translations: TranslateModel[]): Observable<any> {
    const url = `${this.baseURL}/translations.json`;
    return this.http.post(url, translations, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  deleteTranslation(key: string): Observable<object> {
    const url = `${this.baseURL}/translation/${key}.json`;
    return this.http.delete(url)
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   */
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // Return an observable with a user-facing error message.
    return throwError(
      'Something bad happened; please try again later.');
  }
}
