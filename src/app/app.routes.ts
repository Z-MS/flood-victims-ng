import { Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';

export const routes: Routes = [
    {
        path: '',
        component: HomepageComponent
    },
    {
        path: 'displaced-persons',
        loadComponent: () => import('./displaced-persons/displaced-persons.component').then(m => m.DisplacedPersonsComponent)
    },
    {
        path: 'signin',
        loadComponent: () => import('./auth/signin/signin.component').then(m => m.SigninComponent)
    },
    {
        path: 'signup',
        loadComponent: () => import('./auth/signup/signup.component').then(m => m.SignupComponent)
    },
    {
        path: 'about',
        loadComponent: () => import('./about/about.component').then(m => m.AboutComponent)
    },
    {
        path: 'contact',
        loadComponent: () => import('./contact/contact.component').then(m => m.ContactComponent)
    }
];
