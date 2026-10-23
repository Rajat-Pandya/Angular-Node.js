import { Component, Pipe } from '@angular/core';
import { Router } from '@angular/router';
import { Navbar } from '../navbar/navbar';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-myself',
  imports: [Navbar, CommonModule, FormsModule, MatFormFieldModule, MatInputModule],
  templateUrl: './myself.html',
  styleUrl: './myself.css',
})
export class Myself {

  constructor(private router : Router){}

  profile = {
    name: 'Rajat Pandya',
    title: 'Final-year B.Tech CS Student',
    college: 'Government Engineering College, Banswara',
    bio: 'I enjoy building mobile apps and exploring machine learning and computer vision.',
    skills: 'Flutter, Firebase, Java, Python, C++, SQL',
    openToInternships: true
  };

  get skillList(): string[] {
    return this.profile.skills
      .split(',')
      .map(s => s.trim())
      .filter(s => s.length > 0);
  }

  get initials(): string {
    return this.profile.name
      .split(' ')
      .filter(word => word.length > 0)
      .map(word => word[0])
      .slice(0, 2)
      .join('')
      .toUpperCase();
  }

  routeParams(){
    this.router.navigate(['/emp-detail', 101]);
  }

  queryParams(){
    this.router.navigate(['/emp-detail'],{queryParams: {name: this.profile.name, college: this.profile.college}});
  }

}
