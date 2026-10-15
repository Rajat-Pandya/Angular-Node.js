import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Myself } from './myself/myself';
import { About } from './about/about';
import { Login } from './login/login';
import { EmpDetail } from './emp-detail/emp-detail';
import { Registration } from './registration/registration';

export const routes: Routes = [
    { path: '', component: Login, pathMatch: 'full' },
    { path: 'home', component: Home },
    { path: 'myself', component: Myself },
    { path: 'about', component: About },
    { path: 'login', component: Login },
    { path: 'emp-detail', component: EmpDetail },
    { path: 'registration', component: Registration },
    { path: '**', component: Login },
];
