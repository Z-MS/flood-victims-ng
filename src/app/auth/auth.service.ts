import { inject, Injectable, signal } from "@angular/core";
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile, user } from "@angular/fire/auth";
import { from, Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class AuthService {
    firebaseAuth = inject(Auth);
    user$ = user(this.firebaseAuth);

    userLoading = signal<boolean>(true);
    isSubmitting = signal<boolean>(false);

    register(email: string, password: string, name: string): Observable<void> {
        const promise = createUserWithEmailAndPassword(this.firebaseAuth, email, password)
        .then(response => updateProfile(response.user, { displayName: name }));

        return from(promise);
    }

    login(email: string, password: string): Observable<void> {
        const promise = signInWithEmailAndPassword(this.firebaseAuth, email, password)
        .then(() => {});
        return from(promise);
    }

    logout(): Observable<void> {
        return from(signOut(this.firebaseAuth));
    }
}