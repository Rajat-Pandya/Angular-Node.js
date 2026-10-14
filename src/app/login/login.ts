import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  imports: [MatFormFieldModule, MatInputModule, FormsModule, NgClass],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  constructor(private router:Router){}

  email:string = "";
  password:string = "";
  message:string = "";
  isSuccess:boolean = false;

  ToHome(){
    if(this.email === "admin@gmail.com" && this.password === "123"){
      this.isSuccess = true;
      this.message = "Login Successful";
      setTimeout(() => {
        this.router.navigate(['home']);  
      },1000);
    }else{
      this.isSuccess = false;
      this.message = "Invalid Email or Password";
    }
  }
}
