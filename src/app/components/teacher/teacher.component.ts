import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Teacher } from 'src/app/models/Teacher';
import { Gender } from 'src/enums/Gender';
import { TeacherService } from 'src/services/teacher.service';

@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.scss'],
  providers: [MessageService]
})
export class TeacherComponent implements OnInit {
  teachers: Teacher[];
  selectedTeachers : Teacher[];

  teacher : Teacher;

  teacherDialog : boolean;
  
  deleteTeacherDialog: boolean = false;
  deleteTeachersDialog: boolean = false;

  teacherForm: FormGroup;

  gender = Gender;
  genders = [];

  constructor(private messageService: MessageService, private teacherService : TeacherService) { }

  ngOnInit(): void {
    this.getTeachers();
    this.genders = Object.keys(this.gender);

    this.teacherForm = new FormGroup({
      id: new FormControl(''),
      cin: new FormControl(''),
      firstName: new FormControl(''),
      lastName: new FormControl(''),
      email: new FormControl(''),
      phone: new FormControl(''),
      dob: new FormControl(''),
      gender : new FormControl(''),
    })

  }

  getTeachers() {
    this.teacherService.getTeachers().subscribe({
      next: (response: Teacher[]) => this.teachers = response,
      error: (e) => this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Chargement échoué', life: 3000 }),
    })
  }

  openNew(){
    this.teacher = {};
    this.teacherForm.reset();
    this.teacherDialog = true;

  }

  hideDialog(){
    this.teacherDialog = false;
    // this.submitted = false;
  }

  saveTeacher(){

    
    
    this.teacher = {
      'id': this.teacherForm.get('id').value,
      'cin': this.teacherForm.get('cin').value,
      'firstName': this.teacherForm.get('firstName').value,
      'lastName': this.teacherForm.get('lastName').value,
      'email': this.teacherForm.get('email').value,
      'phone': this.teacherForm.get('phone').value,
      'dob': this.teacherForm.get('dob').value,
      'gender' : this.teacherForm.get('gender').value
    }

    this.teacherService.saveTeacher(this.teacher).subscribe({
      next: (response: Teacher) => {
        this.teacherForm.reset();
        this.messageService.add({ severity: 'success', summary: 'Succès', detail: 'Teacher Added', life: 3000 });
        this.getTeachers();
      },
      error: (e) => {
        this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Failed', life: 3000 });
      },
      complete: () => this.teacherDialog = false
    })
  }

  editTeacher(teacher: Teacher){
    this.teacherForm.reset()
    this.teacher = {...teacher};
    this.teacherForm.get('id').setValue(teacher.id)
    this.teacherForm.get('cin').setValue(teacher.cin)
    this.teacherForm.get('firstName').setValue(teacher.firstName)
    this.teacherForm.get('lastName').setValue(teacher.lastName)
    this.teacherForm.get('email').setValue(teacher.email)
    this.teacherForm.get('phone').setValue(teacher.phone)
    this.teacherForm.get('dob').setValue(new Date(teacher.dob))
    this.teacherForm.get('gender').setValue(teacher.gender)

    this.teacherDialog = true;
  }


  deleteTeacher(teacher: Teacher){
    this.teacher = teacher;
    this.deleteTeacherDialog = true;
  }

  deleteSelectedTeachers(){
    this.deleteTeachersDialog = true;
  }


  confirmDelete() {
    this.teacherService.deleteTeacher(this.teacher.id).subscribe({
      next: (v) => 
      {
        this.getTeachers();
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: "Teacher Deleted", life: 3000 });
      },
      error: (e) => this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Delete Failed', life: 3000 }),
      complete: () => this.deleteTeacherDialog = false
    })
    this.teacher = {};
  }

  confirmDeleteSelected() {
    for (let s of this.selectedTeachers) {
      this.teacherService.deleteTeacher(s.id).subscribe({
        next: (v) => this.getTeachers(),
        error: (e) => this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Delete Failed', life: 3000 }),
      })
    }
    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Deleted Successfully', life: 3000 });
    this.deleteTeachersDialog = false;
    this.selectedTeachers = null;

  }


}
