import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideFirebaseApp(() => 
      initializeApp({ projectId: "flood-victims", appId: "1:1009735267550:web:104e080090c7a5bcc77e4f",
        storageBucket: "flood-victims.firebasestorage.app",
        apiKey: "AIzaSyA4QOqDoZiGCKvcrabeuL__xwav1lYj698",
        authDomain: "flood-victims.firebaseapp.com",
        messagingSenderId: "1009735267550"
      })),
      provideAuth(() => getAuth()), 
      provideFirestore(() => getFirestore())
  ]
};
