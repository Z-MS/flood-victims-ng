import { Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { AuthGuardService } from './auth/auth-guard.service';

export const routes: Routes = [
    {
        path: '',
        component: HomepageComponent
    },
    {
        path: 'displaced',
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
        path: 'forgot-password',
        loadComponent: () => import('./auth/forgot-password.component').then(m => m.ForgotPasswordComponent)
    },
    {
        path: 'about',
        loadComponent: () => import('./about/about.component').then(m => m.AboutComponent)
    },
    {
        path: 'contact',
        loadComponent: () => import('./contact/contact.component').then(m => m.ContactComponent)
    },
    {
        path: 'action',
        loadComponent: () => import('./auth/email-action.component').then(m => m.EmailActionComponent),
        canActivate: [AuthGuardService]
    },
    {
        path: 'reset-password',
        loadComponent: () => import('./auth/reset-password.component').then(m => m.ResetPasswordComponent),
        canActivate: [AuthGuardService]
    }
];
