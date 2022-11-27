import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Account } from 'src/app/models/Account';
import { Club } from 'src/app/models/Club';
import { Grade } from 'src/app/models/Grade';
import { Teacher } from 'src/app/models/Teacher';
import { User } from 'src/app/models/User';
import { Role } from 'src/enums/Role';
import { AccountService } from 'src/services/account.service';
import { AuthenticationService } from 'src/services/authentication.service';
import { ClubService } from 'src/services/club.service';
import { GradeService } from 'src/services/grade.service';
import { TeacherService } from 'src/services/teacher.service';
import { UserService } from 'src/services/user.service';
import { ageRangeValidator } from 'src/shared/validators/InputValidator';
import { PasswordStrengthValidator } from 'src/shared/validators/password-strength.validators';



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


  showLoading : boolean;
  logo_file: any;
  FSBrequest_file: any;
  UCrequest_file: any;

  clubs : Club[];
  accounts: Account[];


  constructor(private messageService : MessageService, private userService : UserService,
    private teacherService : TeacherService, private gradeService : GradeService,
    private accountService : AccountService, private clubService : ClubService,
    private authenticationService: AuthenticationService,
    private router: Router) { }


  clubNameExistsValidator( control: AbstractControl): { [key: string]: boolean } | null {
    let check = this.clubs.find(i => i.name === control.value);
    return check == null ? null : { clubNameTaken: true };
  }

  cinValidator( control: AbstractControl): { [key: string]: boolean } | null {
    let check = this.users.find(i => i.cin === control.value);
    return check == null ? null : { cinExists: true };
  }

  usernameValidator( control: AbstractControl): { [key: string]: boolean } | null {
    let check = this.accounts.find(i => i.username === control.value);
    return check == null ? null : { usernameExists: true };
  }

  ngOnInit(): void {

    this.getTeachers();
    this.getUsers();
    this.getGrades();
    this.getClubs();
    this.getAccounts();

    this.myForm = new FormGroup({
      name: new FormControl('', [Validators.pattern("[A-Za-z _àâéêèëìïîôùçæœÀÂÉÊÈËÌÏÎÔÙÛÇÆŒ-]+"), Validators.required]),
      description: new FormControl('', [Validators.required, Validators.maxLength(255)]),
      clubEmail: new FormControl('', [Validators.required, Validators.email]),

      logo: new FormControl('', [Validators.required]),
      FSBrequest: new FormControl('', [Validators.required]),
      UCrequest: new FormControl('', [Validators.required]),

      coordinator: new FormControl('', [Validators.required]),

      firstName: new FormControl('', [Validators.pattern("[A-Za-z _àâéêèëìïîôùçæœÀÂÉÊÈËÌÏÎÔÙÛÇÆŒ-]+"), Validators.required]),
      lastName: new FormControl('', [Validators.pattern("[A-Za-z _àâéêèëìïîôùçæœÀÂÉÊÈËÌÏÎÔÙÛÇÆŒ-]+"), Validators.required]),
      cin: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{8}$')]),
      email: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl('', [Validators.required, Validators.min(1),Validators.pattern('^[0-9]{8}$')]),
      dob: new FormControl('', [ageRangeValidator, Validators.required]),

      grade: new FormControl('', [Validators.required]),

      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required, PasswordStrengthValidator]),
    });
  }

  getTeachers() {
    this.teacherService.getAvailableTeachers().subscribe({
      next: (response: Teacher[]) => this.teachers = response,
      error: (e) => this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Teachers Loading Failed', life: 3000 }),
    })
  }

  getClubs(){
    this.clubService.getClubs().subscribe({
      next: (response: Club[]) =>{
        this.clubs = response;
        this.myForm.get('name').addValidators([ this.clubNameExistsValidator.bind(this)]);
      },
      error: (e) => console.error("clubs loading failed"),
    })
  }

  getUsers(){
    this.userService.getUsers().subscribe({
      next: (response: User[]) => {
        this.users = response;
        this.myForm.get('cin').addValidators([ this.cinValidator.bind(this)]);
      },
      error: (e) => console.error("users loading failed"),
    })
  }

  getAccounts(){
    this.accountService.getAccounts().subscribe({
      next: (response: Account[]) => {
        this.accounts = response;
        this.myForm.get('username').addValidators([ this.usernameValidator.bind(this)]);
      },
      error: (e) => console.error("accounts loading failed"),
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
  }

  onRowUnselect(event) {
      this.myForm.get('coordinator').setValue(null);
      this.myForm.get('coordinator').markAsTouched()
  }

  onRegister() {
    this.showLoading = true;
    //touch all fields to trigger validation messages
    this.myForm.markAllAsTouched();
    

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

    this.showLoading = false;

    return
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
    }else{
      this.myForm.get('logo').reset();
    }
  }

  onRemoveLogo(){
    this.logo_file = null
    this.myForm.get('logo').setValue(null);
    this.myForm.get('logo').markAsTouched()
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
    this.myForm.get('FSBrequest').setValue(null);
    this.myForm.get('FSBrequest').markAsTouched()

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
    this.myForm.get('UCrequest').setValue(null);
    this.myForm.get('UCrequest').markAsTouched()
  }

}
