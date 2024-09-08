import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuestionComponent } from './question.component';
import { QuestionService} from './question.service';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [QuestionComponent],
  imports: [
    ReactiveFormsModule,
    CommonModule
  ],
  providers: [QuestionService]
})
export class QuestionModule { }
