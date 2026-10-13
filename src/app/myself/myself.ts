import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Navbar } from '../navbar/navbar';

@Component({
  selector: 'app-myself',
  imports: [Navbar],
  templateUrl: './myself.html',
  styleUrl: './myself.css',
})
export class Myself {
  name: string = "Rajat";
  phone:string = "7300317298";
}
