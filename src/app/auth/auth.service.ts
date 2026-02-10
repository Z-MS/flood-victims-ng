import { inject, Injectable, isDevMode, signal } from "@angular/core";
import { Auth, confirmPasswordReset, createUserWithEmailAndPassword, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword, signOut, updateProfile, user } from "@angular/fire/auth";
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
        .then(response => {
            updateProfile(response.user, { displayName: name });
            // send confirmation email
            sendEmailVerification(this.firebaseAuth.currentUser!);
        });

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

    sendForgotPasswordEmail(email: string): Observable<void> {
        const actionCodeSettings = {
            url: isDevMode() ? 'http://localhost:4200/signin' : 'https://flood-victims-ng.vercel.app/signin',
        }
        const promise = sendPasswordResetEmail(this.firebaseAuth, email, actionCodeSettings);
        return from(promise);
    }

    resetPassword(oobCode: string, newPassword: string): Observable<void> {
        const promise = confirmPasswordReset(this.firebaseAuth, oobCode, newPassword);
        return from(promise);
    }
}