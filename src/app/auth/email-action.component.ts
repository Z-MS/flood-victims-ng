// This component extracts parameters from the address bar and redirects users to the reset password or confirm email pages, depending on what they requested for
import { Component, inject, OnInit } from "@angular/core";
import { ActivatedRoute, NavigationExtras, Router } from "@angular/router";

@Component({
    template: ``
})

export class EmailActionComponent implements OnInit {
    router = inject(Router)
    activatedRoute = inject(ActivatedRoute)

    ngOnInit(): void {
        const snapshot = this.activatedRoute.snapshot;
        const mode = snapshot.queryParamMap.get('mode');
        if(mode === 'resetPassword') {
            const confirmationCode = snapshot.queryParamMap.get('oobCode');
            const navigationExtras: NavigationExtras = {
                state: {
                    code: confirmationCode
                }
             }
            this.router.navigate(['/reset-password'], navigationExtras);
        } else if(mode === 'verifyEmail') {
            this.router.navigate(['/displaced']);
        } else {
            this.router.navigate(['/']);
        }
    }
}