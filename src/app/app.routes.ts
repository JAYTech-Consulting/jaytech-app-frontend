// src/app/app-routing.ts
import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { About } from './pages/about/about';
import { Profile } from './pages/profile/profile';

export const appRoutes: Routes = [
    { path: '', component: Home },
    { path: 'about', component: About },
    { path: 'profile', component: Profile },
];
