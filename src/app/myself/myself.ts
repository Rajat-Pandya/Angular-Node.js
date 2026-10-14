import { Component, Pipe } from '@angular/core';
import { Router } from '@angular/router';
import { Navbar } from '../navbar/navbar';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-myself',
  imports: [Navbar, CommonModule],
  templateUrl: './myself.html',
  styleUrl: './myself.css',
})
export class Myself {
  name: string = "Rajat";
  phone:string = "7300317298";
}
