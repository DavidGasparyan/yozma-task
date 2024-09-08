import { Injectable } from '@angular/core';
import {Question} from '../../interfaces/question.interface';
import {Observable, of} from 'rxjs';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  private API_URL = `${environment.API_URL}/questions`;

  private getUserId(): string {
    return localStorage.getItem('userId') || '';
  }

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'X-User-Id': this.getUserId(),
    });
  }

  constructor(private http: HttpClient) {}

  lockQuestion(id: number): Observable<any> {
    return this.http.post(`${this.API_URL}/${id}/lock`, {}, { headers: this.getHeaders() }).pipe(
      catchError(this.handleError<Question>('lockQuestion'))
    );
  }

  unlockQuestion(id: number): Observable<any> {
    return this.http.post(`${this.API_URL}/${id}/unlock`, {}, { headers: this.getHeaders() }).pipe(
      catchError(this.handleError<Question>('unlockQuestion'))
    );
  }

  getQuestions(): Observable<Question[]> {
    return this.http.get<Question[]>(this.API_URL, { headers: this.getHeaders() }).pipe(
      catchError(this.handleError<Question[]>('getQuestions', []))
    );
  }

  createQuestion(question: Question): Observable<Question> {
    return this.http.post<Question>(this.API_URL, question).pipe(
      catchError(this.handleError<Question>('createQuestion'))
    );
  }

  updateQuestion(id: number, question: Question): Observable<Question> {
    return this.http.put<Question>(`${this.API_URL}/${id}`, question, { headers: this.getHeaders() }).pipe(
      catchError(this.handleError<Question>('updateQuestion'))
    );
  }

  deleteQuestion(id: number): Observable<Question> {
    return this.http.delete<Question>(`${this.API_URL}/${id}`, { headers: this.getHeaders() }).pipe(
      catchError(this.handleError<Question>('deleteQuestion'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T): (error: HttpErrorResponse) => Observable<T> {
    return (error: HttpErrorResponse): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);

      if (error.status === 0) {
        console.error('Network error occurred.');
      } else if (error.status === 423) {
        console.warn(`Operation ${operation} failed: Question is currently locked (423).`);
        throw error;
      } else {
        console.error(`Backend returned code ${error.status}, body was: ${error.error}`);
      }

      return of(result as T);
    };
  }
}
