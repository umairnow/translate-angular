import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
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
        catchError(this.handleError<TranslateModel[]>('getTranslations', []))
      );
  }

  updateTranslation(translations: TranslateModel[]): Observable<any> {
    const url = `${this.baseURL}/translations.json`;
    return this.http.post(url, translations, this.httpOptions)
      .pipe(
        catchError(this.handleError<TranslateModel>('updateTranslation', null))
      );
  }

  deleteTranslation(key: string): Observable<object> {
    const url = `${this.baseURL}/translation${key}.json`;
    return this.http.delete(url)
      .pipe(
        catchError(this.handleError<TranslateModel>('deleteTranslation', null))
      );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
