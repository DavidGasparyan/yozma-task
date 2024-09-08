import {Component, OnDestroy, OnInit} from '@angular/core';
import {Question} from '../../interfaces/question.interface';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {QuestionService} from './question.service';
import {switchMap, takeUntil} from 'rxjs/operators';
import {of, Subject} from 'rxjs';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

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
    this.loadQuestions();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadQuestions(): void {
    this.questionService.getQuestions()
      .pipe(takeUntil(this.destroy$))
      .subscribe(
      (questions: Question[]) => {
        this.questions = [...questions];
      },
      (error) => {
        console.error('Error fetching questions', error);
      }
    );
  }

  private updateQuestion(question: Question): void {
    this.questionService.updateQuestion(this.editingQuestion.id, question)
      .pipe(
        takeUntil(this.destroy$),
        switchMap((updatedQuestion: Question) => {
          this.questionService.unlockQuestion(updatedQuestion.id);
          return of(updatedQuestion);
        })
      )
      .subscribe({
        next: (updatedQuestion: Question) => {
          this.questions = this.questions.map((q: Question) => (
            q.id === updatedQuestion.id ? { ...updatedQuestion } as Question : q
          ));
          this.resetForm();
        },
        error: (err) => {
          console.error('An error occurred while updating or unlocking the question:', err);
        }
      });
  }

  private createQuestion(question: Question): void {
    this.questionService.createQuestion(question)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (newQuestion) => {
          this.questions.push(newQuestion);
          this.resetForm();
          console.log(this.questions);
        },
        (error) => {
          console.error('Error creating question', error);
        }
      );
  }

  submitQuestion(): void {
    const question: Question = this.questionForm.value;

    if (this.questionForm.invalid) {
      return;
    }

    if (this.editingQuestion) {
      this.updateQuestion(question);
      return;
    }

    this.createQuestion(question);
    return;
  }

  editQuestion(question: Question): void {
    this.questionService.lockQuestion(question.id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
      next: () => {
        console.log('Lock acquired, patching form with question:', question);
        this.questionForm.patchValue({
          question: question.question,
          answer: question.answer,
        });
        this.editingQuestion = question;
      },
      error: (err) => {
        if (err.status === 423) {
          alert('This question is currently being edited by another user.');
        } else {
          console.error('An error occurred:', err);
          alert('An error occurred while locking the question.');
        }
      }
    });
  }

  deleteQuestion(id: number): void {
    this.questionService.deleteQuestion(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
      next: (question: Question) => {
        this.questions = this.questions.filter((q) => q.id !== question.id);
      },
      error: (err) => {
        if (err.status === 423) {
          alert('This question is currently being edited by another user.');
        } else {
          console.error('An error occurred:', err);
          alert('An error occurred while locking the question.');
        }
      }
    });
  }

  resetForm(): void {
    if (this.editingQuestion) {
      this.questionService.unlockQuestion(this.editingQuestion.id)
        .pipe(takeUntil(this.destroy$))
        .subscribe();
    }
    this.questionForm.reset();
    this.editingQuestion = null;
  }
}
