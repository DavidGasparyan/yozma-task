import {Component, OnInit} from '@angular/core';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'qna';
  userId: string;

  ngOnInit(): void {
    this.generateUserId();
  }

  generateUserId(): void {
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      this.userId = storedUserId;
    } else {
      this.userId = uuidv4();
      localStorage.setItem('userId', this.userId);
    }
    console.log('Generated UserId:', this.userId);
  }
}
