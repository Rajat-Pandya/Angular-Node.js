import { Component, signal } from '@angular/core';
import { RouterOutlet, RouterLink, Router, RedirectCommand } from '@angular/router';
import { Navbar } from './navbar/navbar';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('PracticeAngular');
}
