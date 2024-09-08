import { Injectable } from '@angular/core';
import {Question} from '../../interfaces/question.interface';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  private API_URL = `${environment.API_URL}/questions`;

  constructor(private http: HttpClient) {}

  getQuestions(): Observable<Question[]> {
    return this.http.get<Question[]>(this.API_URL).pipe(
      catchError(this.handleError<Question[]>('getQuestions', []))
    );
  }

  getQuestionById(id: number): Observable<Question> {
    return this.http.get<Question>(`${this.API_URL}/${id}`).pipe(
      catchError(this.handleError<Question>(`getQuestionById id=${id}`))
    );
  }

  createQuestion(question: Question): Observable<Question> {
    return this.http.post<Question>(this.API_URL, question).pipe(
      catchError(this.handleError<Question>('createQuestion'))
    );
  }

  updateQuestion(id: number, question: Question): Observable<Question> {
    return this.http.put<Question>(`${this.API_URL}/${id}`, question).pipe(
      catchError(this.handleError<Question>('updateQuestion'))
    );
  }

  deleteQuestion(id: number): Observable<Question> {
    return this.http.delete<Question>(`${this.API_URL}/${id}`).pipe(
      catchError(this.handleError<Question>('deleteQuestion'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T): any {
    return (error: HttpErrorResponse): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`); // Log error in the console
      // You can handle the error differently based on the error type, for example:
      if (error.status === 0) {
        console.error('Network error occurred.');
      } else {
        console.error(`Backend returned code ${error.status}, body was: ${error.error}`);
      }
      return of(result as T);
    };
  }
}
