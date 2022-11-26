import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Account } from 'src/app/models/Account';
import { Club } from 'src/app/models/Club';
import { Grade } from 'src/app/models/Grade';
import { Teacher } from 'src/app/models/Teacher';
import { User } from 'src/app/models/User';
import { Gender } from 'src/enums/Gender';
import { Role } from 'src/enums/Role';
import { AccountService } from 'src/services/account.service';
import { AuthenticationService } from 'src/services/authentication.service';
import { ClubService } from 'src/services/club.service';
import { GradeService } from 'src/services/grade.service';
import { TeacherService } from 'src/services/teacher.service';
import { UserService } from 'src/services/user.service';
import { RoleComponent } from '../../role/role.component';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
  providers: [MessageService],

})
export class RegistrationComponent implements OnInit {

  myForm: FormGroup;
  teachers: Teacher[];
  selectedTeacher : Teacher;
  users: User[];
  grades: Grade[];

  gender = Gender;
  genders = [];

  showLoading : boolean;
  logo_file: any;
  FSBrequest_file: any;
  UCrequest_file: any;


  constructor(private messageService : MessageService, private userService : UserService,
    private teacherService : TeacherService, private gradeService : GradeService,
    private accountService : AccountService, private clubService : ClubService,
    private authenticationService: AuthenticationService,
    private router: Router) { }

  ngOnInit(): void {

    this.getTeachers();
    this.getUsers();
    this.getGrades();

    this.genders = Object.keys(this.gender);


    this.myForm = new FormGroup({
      id: new FormControl(''),
      name: new FormControl(''),
      description: new FormControl(''),
      clubEmail: new FormControl(''),

      logo: new FormControl(''),
      FSBrequest: new FormControl(''),
      UCrequest: new FormControl(''),

      coordinator: new FormControl(''),

      firstName: new FormControl(''),
      lastName: new FormControl(''),
      cin: new FormControl(''),
      email: new FormControl(''),
      phone: new FormControl(''),
      dob: new FormControl(''),
      gender: new FormControl(''),

      grade: new FormControl(''),

      username: new FormControl(''),
      password: new FormControl(''),
      confirmPassword: new FormControl(''),
    });
  }

  getTeachers() {
    this.teacherService.getAvailableTeachers().subscribe({
      next: (response: Teacher[]) => this.teachers = response,
      error: (e) => this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Teachers Loading Failed', life: 3000 }),
    })
  }

  getUsers(){
    this.userService.getUsers().subscribe({
      next: (response: User[]) => this.users = response,
      error: (e) => this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Loadin failed', life: 3000 }),
    })
  }

  getGrades(){
    this.gradeService.getGrades().subscribe({
      next: (response: Grade[]) => this.grades = response,
      error: (e) => this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Grades Loadin failed', life: 3000 }),
    })
  }

  onRowSelect(event) {
    this.myForm.get('coordinator').setValue(this.selectedTeacher);
    this.messageService.add({severity:'info', summary:'Coordinator ' + this.selectedTeacher.firstName + ' ' + this.selectedTeacher.lastName + ' Selected', detail: event.data.name});
  }

  onRowUnselect(event) {
      this.myForm.get('coordinator').setValue(null);
      this.messageService.add({severity:'info', summary:'Coordinator Unselected',  detail: event.data.name});
  }

  onRegister() {
    this.showLoading = true;
    //touch all fields to trigger validation messages
    for(let i in this.myForm.controls) {
      this.myForm.get(i).markAsDirty();
    }

    if(!this.myForm.valid){
      this.messageService.add({severity:'error', summary:'Erreur', detail:'Please complete all the fields'});
      this.showLoading = false;
      return;
    }

    //print all form values
    console.log(this.myForm.value);


    let account : Account ={
      username: this.myForm.get('username').value,
      password: this.myForm.get('password').value,
      role : Role.LEADER
    }

    this.accountService.saveAccount(account).subscribe({
      next: (response: Account) => {
        account = response;
        this.messageService.add({ severity: 'success', summary: 'Succès', detail: 'Account Saved', life: 3000 });
        let user : User = {
          firstName: this.myForm.get('firstName').value,
          lastName: this.myForm.get('lastName').value,
          cin: this.myForm.get('cin').value,
          email: this.myForm.get('email').value,
          phone: this.myForm.get('phone').value,
          dob: this.myForm.get('dob').value,
          gender: this.myForm.get('gender').value,
          account: account,
          grade: this.myForm.get('grade').value,
        }
        this.userService.saveUser(user).subscribe({
          next: (response: User) => {
            user = response;
            this.messageService.add({ severity: 'success', summary: 'Succès', detail: 'User Saved', life: 3000 });
            let club : Club = {
              name: this.myForm.get('name').value,
              description: this.myForm.get('description').value,
              email : this.myForm.get('clubEmail').value,
              coordinator: this.myForm.get('coordinator').value,
              leader: user,
            }

            const formData: FormData = new FormData();
            formData.append('name', this.myForm.get('name').value);
            formData.append('description', this.myForm.get('description').value);
            formData.append('email', this.myForm.get('clubEmail').value);
            formData.append('coordinatorId', this.myForm.get('coordinator').value.id);
            formData.append('leaderId', user.id+"");

            if (this.logo_file != null) {
              formData.append('logo_file',this.logo_file,this.logo_file?.name);
            }

            if (this.FSBrequest_file != null) {
              formData.append('FSBrequest_file',this.FSBrequest_file,this.FSBrequest_file?.name);
            }

            if (this.UCrequest_file != null) {
              formData.append('UCrequest_file',this.UCrequest_file,this.UCrequest_file?.name);
            }

            this.clubService.saveClub(formData).subscribe({
              next: (response: Club) => {
                club = response;
                this.messageService.add({ severity: 'success', summary: 'Succès', detail: 'Club Saved', life: 3000 });
                this.showLoading = false;
                this.messageService.add({ severity: 'success', summary: 'Succès', detail: 'Club Registered', life: 3000 });
              },
              error: (e) => {
                this.showLoading = false;
                this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Club Saving Failed', life: 3000 });
              },
              complete: () => {
                //login
                this.authenticationService.login(account).subscribe({
                  next: (response: any) => {
                    this.authenticationService.saveAccessToken(response.headers.get("access_token"));
                    this.authenticationService.saveRefreshToken(response.headers.get("refresh_token"));
                    this.authenticationService.addAccountRoleToLocalCache();
                    this.router.navigate(['/dashboard']);
                  },
                  error: (e) => {
                    this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed Authentication', life: 3000 })
                  },
                  complete: () => this.showLoading = false
                  
                });
              }

            })
          }
        })
      },
      error: (e) => {
        this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Failed', life: 3000 });
      },
      complete: () => {}
    })

  }

  onSelectLogo(event) {
    this.logo_file = event.files[0];
    if(this.logo_file.size < 10000000){
      this.myForm.get('logo').setValue('valid')
      this.messageService.add({severity: 'info', summary: 'Success', detail: 'Logo Added'});
    }else{
      this.myForm.get('logo').reset();
    }
  }

  onRemoveLogo(){
    this.logo_file = null
    this.myForm.get('logo').reset()
  }

  onSelectFSBrequest(event) {
    this.FSBrequest_file = event.files[0];
    if(this.FSBrequest_file.size < 10000000){
      this.myForm.get('FSBrequest').setValue('valid')
      this.messageService.add({severity: 'info', summary: 'Success', detail: 'FSB request Added'});
    }else{
      this.myForm.get('FSBrequest').reset();
    }
  }

  onRemoveFSBrequest(){
    this.FSBrequest_file = null
    this.myForm.get('FSBrequest').reset()
  }

  onSelectUCrequest(event) {
    this.UCrequest_file = event.files[0];
    if(this.UCrequest_file.size < 10000000){
      this.myForm.get('UCrequest').setValue('valid')
      this.messageService.add({severity: 'info', summary: 'Success', detail: 'UC request Added'});
    }else{
      this.myForm.get('UCrequest').reset();
    }
  }

  onRemoveUCrequest(){
    this.UCrequest_file = null
    this.myForm.get('UCrequest').reset()
  }

}
