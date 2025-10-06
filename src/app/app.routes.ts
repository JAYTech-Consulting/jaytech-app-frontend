// src/app/app-routing.ts
import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { About } from './pages/about/about';
import { Profile } from './pages/profile/profile';
import { Service } from './pages/service/service';
import { Contact } from './pages/contact/contact';
import { Login } from './pages/login/login';
import { Register } from './pages/register/register';

export const appRoutes: Routes = [
    { path: '', component: Home },
    { path: 'about-us', component: About },
    { path: 'services', component: Service },
    { path: 'contact-us', component: Contact },
    { path: 'login', component: Login },
    { path: 'register', component: Register },
    { path: 'profile', component: Profile },
];
