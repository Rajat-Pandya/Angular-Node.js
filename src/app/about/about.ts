import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Navbar } from '../navbar/navbar';
import { DatePipe, TitleCasePipe, UpperCasePipe } from '@angular/common';
interface Hobby {
  name: string;
  icon: string;
  description: string;
  hoursPerWeek: number;
}
@Component({
  selector: 'app-about',
  imports: [Navbar, DatePipe, TitleCasePipe, UpperCasePipe],
  templateUrl: './about.html',
  styleUrl: './about.css',
})
export class About {
  name = 'Rajat Pandya';
  tagline = 'student, developer and curious learner';
  intro = 'I spend most of my free time building things and learning how they work.';
  today = new Date();

  hobbies: Hobby[] = [
    {
      name: 'Building apps',
      icon: '📱',
      description: 'Trying out small Flutter and Firebase ideas just for fun.',
      hoursPerWeek: 6
    },
    {
      name: 'Game development',
      icon: '🎮',
      description: 'Making small games and learning how game logic works.',
      hoursPerWeek: 4
    },
    {
      name: 'Reading',
      icon: '📚',
      description: 'Tech blogs, documentation and the occasional novel.',
      hoursPerWeek: 3
    },
    {
      name: 'Cricket',
      icon: '🏏',
      description: 'Weekend matches with friends.',
      hoursPerWeek: 2
    }
  ];

  get hobbyCount(): number {
    return this.hobbies.length;
  }

  get totalHours(): number {
    return this.hobbies.reduce((sum, h) => sum + h.hoursPerWeek, 0);
  }

  getGreeting(): string {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  }

}
