import { Injectable } from '@angular/core';
import {Question} from '../../interfaces/question.interface';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  private questionList: Question[] = [];
  private questionSubject = new BehaviorSubject<Question[]>(this.questionList);

  getQuestions(): Observable<Question[]> {
    return this.questionSubject.asObservable();
  }

  addQuestion(question: Question): void {
    this.questionList.push({ ...question, id: this.questionList.length + 1 });
    this.questionSubject.next(this.questionList);
  }

  updateQuestion(question: Question): void {
    const index = this.questionList.findIndex(q => q.id === question.id);
    if (index !== -1) {
      this.questionList[index] = question;
      this.questionSubject.next(this.questionList);
    }
  }

  deleteQuestion(id: number): void {
    this.questionList = this.questionList.filter(q => q.id !== id);
    this.questionSubject.next(this.questionList);
  }
}
