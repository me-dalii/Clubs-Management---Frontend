import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Department } from 'src/app/models/Depatment';
import { DepartmentService } from 'src/services/department.service';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.scss'],
  providers: [MessageService]
})
export class DepartmentComponent implements OnInit {

  departments : Department[];
  selectedDepartments : Department[];

  department : Department;

  departmentDialog : boolean;
  
  deleteDepartmentDialog: boolean = false;
  deleteDepartmentsDialog: boolean = false;

  departmentForm: FormGroup;

  constructor(private messageService: MessageService, private departmentService : DepartmentService) { }

  ngOnInit(): void {

    this.getDepartments();

    this.departmentForm = new FormGroup({
      id: new FormControl(''),
      name: new FormControl(''),
    })
  }

  
  getDepartments(){
    this.departmentService.getDepartments().subscribe({
      next: (response: Department[]) => this.departments = response,
      error: (e) => this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Loading failed', life: 3000 }),
    })
  }

  openNew(){
    this.department = {};
    this.departmentForm.reset();
    this.departmentDialog = true;

  }

  hideDialog(){
    this.departmentDialog = false;
    // this.submitted = false;
  }

  saveDepartment(){
    this.department = {
      'id': this.departmentForm.get('id').value,
      'name': this.departmentForm.get('name').value,
    }
    console.log(this.department)

    this.departmentService.saveDepartment(this.department).subscribe({
      next: (response: Department) => {
        this.departmentForm.reset();
        this.messageService.add({ severity: 'success', summary: 'Succès', detail: 'Department Added', life: 3000 });
        this.getDepartments();
      },
      error: (e) => {
        this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Failed', life: 3000 });
      },
      complete: () => this.departmentDialog = false
    })
  }

  editDepartment(department: Department){
    this.departmentForm.reset()
    this.department = {...department};
    this.departmentForm.get('id').setValue(department.id)
    this.departmentForm.get('name').setValue(department.name)
    this.departmentDialog = true;
  }


  deleteDepartment(department: Department){
    this.department = department;
    this.deleteDepartmentDialog = true;
  }

  deleteSelectedDepartments(){
    this.deleteDepartmentsDialog = true;
  }


  confirmDelete() {
    this.departmentService.deleteDepartment(this.department.id).subscribe({
      next: (v) => 
      {
        this.getDepartments();
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: "Department deleted", life: 3000 });
      },
      error: (e) => this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Delete Failed', life: 3000 }),
      complete: () => this.deleteDepartmentDialog = false
    })
    this.department = {};
  }

  confirmDeleteSelected() {
    for (let s of this.selectedDepartments) {
      this.departmentService.deleteDepartment(s.id).subscribe({
        next: (v) => this.getDepartments(),
        error: (e) => this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Delete Failed', life: 3000 }),
      })
    }
    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Deleted Successfully', life: 3000 });
    this.deleteDepartmentsDialog = false;
    this.selectedDepartments = null;

  }

}
