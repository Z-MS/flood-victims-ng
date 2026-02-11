import { Component, inject, OnInit } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import type { ColDef } from 'ag-grid-community';
import { DisplacedPersonsService } from './displaced-persons.service';
import { AsyncPipe } from '@angular/common';
import { DocumentData } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-displaced-persons',
  imports: [AgGridAngular, AsyncPipe],
  templateUrl: './displaced-persons.component.html',
  styleUrl: './displaced-persons.component.css'
})
export class DisplacedPersonsComponent {
  displacedPersonsService = inject(DisplacedPersonsService);
  colDefs: ColDef[] = [
    {
      field: "fullName",
      headerName: "Name"
    },
    { field: "age" },
    { field: "gender" },
    { field: "phone" },
    { field: "employmentStatus" },
    { field: "occupation" },
    { field: "qualification" },
    { field: "maritalStatus" },
    { field: "numberOfChildren" }
  ];

}
