import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Department } from 'src/app/models/Depatment';
import { Grade } from 'src/app/models/Grade';
import { DepartmentService } from 'src/services/department.service';
import { GradeService } from 'src/services/grade.service';

@Component({
  selector: 'app-grade',
  templateUrl: './grade.component.html',
  styleUrls: ['./grade.component.scss'],
  providers: [MessageService]
})
export class GradeComponent implements OnInit {

  grades : Grade[];
  selectedGrades : Grade[];

  grade : Grade;

  gradeDialog : boolean;
  
  deleteGradeDialog: boolean = false;
  deleteGradesDialog: boolean = false;

  gradeForm: FormGroup;
  departments: Department[];

  constructor(private messageService: MessageService, private gradeService : GradeService, 
    private departmentService : DepartmentService) { }

  ngOnInit(): void {

    this.getGrades();
    this.getDepartments();

    this.gradeForm = new FormGroup({
      id: new FormControl(''),
      title: new FormControl(''),
      department: new FormControl(''),
    })
  }

  getGrades(){
    this.gradeService.getGrades().subscribe({
      next: (response: Grade[]) => this.grades = response,
      error: (e) => this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Loading failed', life: 3000 }),
    })
  }

  getDepartments(){
    this.departmentService.getDepartments().subscribe({
      next: (response: Department[]) => this.departments = response,
      error: (e) => this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Loading failed', life: 3000 }),
    })
  }

  openNew(){
    this.grade = {};
    this.gradeForm.reset();
    this.gradeDialog = true;

  }

  hideDialog(){
    this.gradeDialog = false;
    // this.submitted = false;
  }

  saveGrade(){
    this.grade = {
      'id': this.gradeForm.get('id').value,
      'title': this.gradeForm.get('title').value,
      'department': this.gradeForm.get('department').value
    }

    this.gradeService.saveGrade(this.grade).subscribe({
      next: (response: Grade) => {
        this.gradeForm.reset();
        this.messageService.add({ severity: 'success', summary: 'Succès', detail: 'Grade Added', life: 3000 });
        this.getGrades();
      },
      error: (e) => {
        this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Failed', life: 3000 });
      },
      complete: () => this.gradeDialog = false
    })
  }

  editGrade(grade: Grade){
    this.gradeForm.reset()
    this.grade = {...grade};
    this.gradeForm.get('id').setValue(grade.id)
    this.gradeForm.get('title').setValue(grade.title)
    this.gradeForm.get('department').setValue(grade.department)
    this.gradeDialog = true;
  }


  deleteGrade(grade: Grade){
    this.grade = grade;
    this.deleteGradeDialog = true;
  }

  deleteSelectedGrades(){
    this.deleteGradesDialog = true;
  }


  confirmDelete() {
    this.gradeService.deleteGrade(this.grade.id).subscribe({
      next: (v) => 
      {
        this.getGrades();
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: "Grade deleted", life: 3000 });
      },
      error: (e) => this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Delete Failed', life: 3000 }),
      complete: () => this.deleteGradeDialog = false
    })
    this.grade = {};
  }

  confirmDeleteSelected() {
    for (let s of this.selectedGrades) {
      this.gradeService.deleteGrade(s.id).subscribe({
        next: (v) => this.getGrades(),
        error: (e) => this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Delete Failed', life: 3000 }),
      })
    }
    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Deleted Successfully', life: 3000 });
    this.deleteGradesDialog = false;
    this.selectedGrades = null;

  }

}
