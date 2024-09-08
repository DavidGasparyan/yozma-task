import { Component, OnInit } from '@angular/core';
import {Question} from '../../interfaces/question.interface';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {QuestionService} from './question.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {

  questionForm: FormGroup;
  questions: Question[] = [];
  editingQuestion: Question | null = null;

  constructor(private fb: FormBuilder, private questionService: QuestionService) {
    this.questionForm = this.fb.group({
      question: ['', Validators.required],
      answer: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.questionService.getQuestions().subscribe((questions: Question[]) => {
      this.questions = questions;
    });
  }

  submitQuestion(): boolean {
    const formValue = this.questionForm.value;

    if (this.questionForm.invalid) {
      return;
    }

    if (this.editingQuestion) {
      this.questionService.updateQuestion({
        ...this.editingQuestion,
        question: formValue.question,
        answer: formValue.answer
      });
      this.editingQuestion = null;
    } else {
      this.questionService.addQuestion({
        id: 0,
        question: formValue.question,
        answer: formValue.answer
      });
    }
    this.questionForm.reset();


    // Workaround for the form not resetting the form control values, its a bug on Angular 10
    return false;
  }

  editQuestion(question: Question): void {
    this.questionForm.patchValue({
      question: question.question,
      answer: question.answer
    });
    this.editingQuestion = question;
  }

  deleteQuestion(id: number): void {
    this.questionService.deleteQuestion(id);
  }
}
