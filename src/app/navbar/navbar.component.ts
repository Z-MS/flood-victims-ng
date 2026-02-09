import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { AsyncPipe } from '@angular/common';

@Component({
	selector: 'navbar',
	imports: [RouterLink, AsyncPipe],
	styleUrl: './navbar.component.css',
	template: `
        <header>
            <button #navToggle (click)="toggleNavbar()" class="nav-toggle" aria-label="open navigation" aria-controls="nav-list" aria-expanded="false">
                <span class="hamburger">
                    <svg height="20" width="20">
                        <path d="M 2 4 L 18 4 M 2 10 L 18 10 M 2 16 L 18 16" stroke="white" stroke-width="2"/>
                    </svg>
                </span>
                <span class="close">
                    <svg height="20" width="20">
                        <path d="M 2 2 L 18 18 M 18 2 L 2 18" stroke="white" stroke-width="2"/>
                    </svg>
                </span>
            </button>
            <div id="header-logo-container">
                <a id="logo" routerLink="/"><img src="logo.jpg" width="30" height="30" alt='Swift relief foundation logo'/></a>
            </div>
            <nav id='header-nav'>
            <ul #sideNavbar data-visible="false" class='nav-list'>
              <li class='nav-item'><a class='nav-link' routerLink="/">Home</a></li>
              <li class='nav-item'><a class='nav-link' routerLink="/displaced">Displaced Persons</a></li>
              <li id='about' class='nav-item'><a class='nav-link' routerLink="/about">About</a></li>
              <li id='contact' class='nav-item'><a class='nav-link' routerLink="/contact">Contact</a></li>
              
              @if(authService.userLoading()) {
                <li class='nav-item'>Checking login status...</li>
							} @else {
									@if(authService.user$ | async) {   
										<li class='nav-item'><button id='signout-button' (click)="signOutUser()">Sign out</button></li>
									} @else {
										<li id='signin' class='nav-item'><a class='nav-link' routerLink="/signin">Sign in</a></li>
										<li id='signup' class='nav-item'><a class='nav-link' routerLink="/signup">Sign up</a></li>
									}
							}
            </ul>       
          </nav>
        </header>
    `,
})

export class Navbar {
	authService = inject(AuthService);
	router = inject(Router);
    @ViewChild('navToggle') navToggleRef!: ElementRef<HTMLButtonElement>;
    @ViewChild('sideNavbar') sideNavbarRef!: ElementRef<HTMLUListElement>;

	ngOnInit(): void {
		// check if user is logged in
		this.authService.user$.subscribe({
			next: () => {
				this.authService.userLoading.set(false)
			}
		})
	}

	toggleNavbar() {
        const visibility = this.sideNavbarRef?.nativeElement.getAttribute('data-visible');
        if(visibility === 'false') {
            this.sideNavbarRef?.nativeElement.setAttribute('data-visible', 'true')
            this.navToggleRef?.nativeElement.setAttribute('aria-expanded', 'true')
        } else {
            this.sideNavbarRef?.nativeElement.setAttribute('data-visible', 'false')
            this.navToggleRef?.nativeElement.setAttribute('aria-expanded', 'false')
        }
    }

	signOutUser() {
		this.authService.logout();
		this.router.navigateByUrl('/');
	}
}