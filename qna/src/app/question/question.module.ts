import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuestionComponent } from './question.component';
import { QuestionService} from './question.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';



@NgModule({
  declarations: [QuestionComponent],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule
  ],
  exports: [
    QuestionComponent
  ],
  providers: [QuestionService]
})
export class QuestionModule { }
