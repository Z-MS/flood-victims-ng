import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { StatCardComponent } from '../stat-card/stat-card.component';
import { DisplacedPersonsService } from '../displaced-persons/displaced-persons.service';
import { AsyncPipe } from '@angular/common';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-homepage',
  imports: [StatCardComponent, AsyncPipe, RouterLink],
  providers: [DisplacedPersonsService],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})

export class HomepageComponent {
  displacedPersonsService = inject(DisplacedPersonsService);
}
