import { inject, Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from "@angular/router";
import { AuthService } from "./auth.service";
import { Observable } from "rxjs/internal/Observable";
import { map } from "rxjs/internal/operators/map";

@Injectable({
    providedIn: 'root'
})

export class AuthGuardService implements CanActivate {
    authService = inject(AuthService)
    router = inject(Router);
    
    canActivate(): Observable<boolean> {
        return this.authService.user$.pipe(
            map((user) => {
                if(user) {
                    return true;
                } else {
                    this.router.navigateByUrl('/');
                    return false;
                }
            })
        );
    }
}