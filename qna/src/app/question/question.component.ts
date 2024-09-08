import {Component, OnChanges, OnInit} from '@angular/core';
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
  lockedQuestions: Set<number> = new Set();

  constructor(private fb: FormBuilder, private questionService: QuestionService) {
    this.questionForm = this.fb.group({
      question: ['', Validators.required],
      answer: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadQuestions();
  }

  loadQuestions(): void {
    this.questionService.getQuestions().subscribe(
      (questions: Question[]) => {
        this.questions = [...questions];
      },
      (error) => {
        console.error('Error fetching questions', error);
      }
    );
  }

  submitQuestion(): void {
    const formValue = this.questionForm.value;

    if (this.questionForm.invalid) {
      return;
    }

    if (this.editingQuestion) {
      this.questionService.updateQuestion(this.editingQuestion.id, formValue).subscribe(() => {
        this.questionService.unlockQuestion(this.editingQuestion.id).subscribe(() => {
          this.lockedQuestions.delete(this.editingQuestion?.id || 0);  // Remove lock
        });
        this.loadQuestions();
        this.resetForm();
      });

      return;
    }

    this.questionService.createQuestion(formValue).subscribe(
      (newQuestion) => {
        this.questions.push(newQuestion);
        this.resetForm();
        console.log(this.questions);
      },
      (error) => {
        console.error('Error creating question', error);
      }
    );

    return;
  }

  editQuestion(question: Question): void {
    this.questionService.lockQuestion(question.id).subscribe({
      next: () => {
        console.log('Lock acquired, patching form with question:', question);
        this.questionForm.patchValue({
          question: question.question,
          answer: question.answer,
        });
        this.editingQuestion = question;
        this.lockedQuestions.add(question.id);  // Mark the question as locked
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
    this.questionService.deleteQuestion(id).subscribe({
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
        .subscribe();
    }
    this.questionForm.reset();
    this.editingQuestion = null;
  }
}
