import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ProfileComponent } from './pages/profile/profile.component';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        loadComponent: () => {
        return HomeComponent
        }
    },
    {
        path: 'profile',
        loadComponent: () =>{
            return ProfileComponent
        }
    }
];
