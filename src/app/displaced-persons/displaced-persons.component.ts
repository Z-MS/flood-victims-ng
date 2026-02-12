import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import type { ColDef } from 'ag-grid-community';
import { DisplacedPersonsService } from './displaced-persons.service';
import { AsyncPipe } from '@angular/common';
import { AddDisplacedComponent } from './add-displaced/add-displaced.component';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-displaced-persons',
  imports: [AgGridAngular, AsyncPipe, AddDisplacedComponent],
  templateUrl: './displaced-persons.component.html',
  styleUrl: './displaced-persons.component.css'
})
export class DisplacedPersonsComponent {
  displacedPersonsService = inject(DisplacedPersonsService);
  authService = inject(AuthService)
  actionSuccessful: boolean = false;

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


  @ViewChild('createDialog', {static: true}) dialog!: ElementRef<HTMLDialogElement>
  
  openCreateForm() {  
    this.dialog.nativeElement.showModal();
  }

  closeCreateForm(message: string): void {
    this.dialog.nativeElement.close()
    if(message === 'create') {
      this.actionSuccessful = true;
      setTimeout(() => { this.actionSuccessful = false }, 2000)
    }
  }
}
