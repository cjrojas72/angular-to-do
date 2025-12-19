import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        loadComponent: () => {
            return LoginComponent
        }
    },
    {
        path: 'home',
        loadComponent: () => {
            return HomeComponent
        }
    },
    {
        path: 'profile',
        loadComponent: () =>{
            return ProfileComponent
        }
    },
];
