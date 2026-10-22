import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Navbar } from '../navbar/navbar';
import { Child } from './child/child';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [Navbar, Child, FormsModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  greeting: string = 'Hello from Parent';
  replyMessage: string = '';
  showChild: boolean = true;

  toggleChild(): void {
    this.showChild = !this.showChild;
  }

  receive(msg: string): void {
    this.replyMessage = msg;
  }
}
