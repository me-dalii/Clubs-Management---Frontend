import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { MessageService } from 'primeng/api';
import { Club } from 'src/app/models/Club';
import { Teacher } from 'src/app/models/Teacher';
import { AuthenticationService } from 'src/services/authentication.service';
import { ClubService } from 'src/services/club.service';
import { TeacherService } from 'src/services/teacher.service';

@Component({
  selector: 'app-myclub',
  templateUrl: './myclub.component.html',
  styleUrls: ['./myclub.component.scss'],
  providers: [MessageService],

})
export class MyclubComponent implements OnInit {

  club : Club;
  dataLoaded = false;

  clubDialog : boolean;
  coordiantorDialog : boolean;

  myForm: FormGroup;
  teachers: Teacher[];

  selectedTeacher : Teacher;


  constructor(private clubService: ClubService, 
    private authenticationService: AuthenticationService, 
    private messageService: MessageService,
    private teacherService: TeacherService,
    private sanitizer: DomSanitizer) { }

  ngOnInit(): void {

    this.getClub();

    this.myForm = new FormGroup({
      id: new FormControl(''),
      name: new FormControl(''),
      email: new FormControl(''),
      description: new FormControl(''),
    })

  }

  getClub() {
    this.clubService.getClubByLeaderUsername(this.authenticationService.getAccountUsername()).subscribe({
      next: (response: Club) => this.club = response,
      error: (e) => this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Loading Failed', life: 3000 }),
      complete: () => {
        this.dataLoaded = true;
        this.selectedTeacher = this.club.coordinator;
        console.log(this.club);
      }
    })
  }

  editDetailsButton(){
    this.myForm.get('id').setValue(this.club.id);
    this.myForm.get('name').setValue(this.club.name);
    this.myForm.get('email').setValue(this.club.email);
    this.myForm.get('description').setValue(this.club.description);
    this.clubDialog = true;
  }

  getSrcFromCustomFile() {
    let uint8Array = new Uint8Array(atob(this.club.logo.data).split("").map(char => char.charCodeAt(0)));
    let dwn = new Blob([uint8Array])
    return this.sanitizer.bypassSecurityTrustResourceUrl(URL.createObjectURL(dwn));
  }

  hideDialog(){
    this.clubDialog = false;
  }

  editClub(){

    let club = {
      'id': this.myForm.get('id').value,
      'name': this.myForm.get('name').value,
      'email': this.myForm.get('email').value,
      'description': this.myForm.get('description').value,
    }

    this.clubService.saveClubDetails(club).subscribe({
      next: (response: Club) => {
        this.club = response;
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Club Updated', life: 3000 });
      },
      error: (e) => this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Editing Failed', life: 3000 }),
      complete: () => this.dataLoaded = true
    })
    this.clubDialog = false;
  }

  editCoordiantorButton(){
    this.getTeachers();
    this.coordiantorDialog = true;
  }

  getTeachers() {
    this.teacherService.getAvailableTeachers().subscribe({
      next: (response: Teacher[]) => this.teachers = response,
      error: (e) => this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Teachers Loading Failed', life: 3000 }),
    })
  }

  saveCoordinator(){
    if(this.selectedTeacher != null ){
      if(this.selectedTeacher != this.club.coordinator){
        this.clubService.updateClubCoordinator(this.club.id, this.selectedTeacher.id).subscribe({
          next: (response: Club) => {
            this.club = response;
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Coordinator Updated', life: 3000 });
          },
          error: (e) => this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Editing Failed', life: 3000 }),
          complete: () => {
            this.dataLoaded = true;
            this.coordiantorDialog = false;
          }
        })
      }else{
        this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'You must choose a different teacher', life: 3000 });
      }
    }
  }

  hideCoordinatorDialog(){
    this.coordiantorDialog = false;
  }

}
