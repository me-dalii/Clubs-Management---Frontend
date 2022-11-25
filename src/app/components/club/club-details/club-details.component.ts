import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Club } from 'src/app/models/Club';
import { Teacher } from 'src/app/models/Teacher';
import { AccountService } from 'src/services/account.service';
import { ClubService } from 'src/services/club.service';
import { TeacherService } from 'src/services/teacher.service';

@Component({
  selector: 'app-club-details',
  templateUrl: './club-details.component.html',
  styleUrls: ['./club-details.component.scss'],
  providers: [MessageService],
})
export class ClubDetailsComponent implements OnInit {

  pathId: number;

  club : Club;

  dataLoaded = false;
  coordiantorDialog: boolean;
  teachers: Teacher[];

  UCrequest_file: any;
  FSBrequest_file: any;

  statusOptions: any[];

  clubStatusDialog : boolean;

  statusValue : boolean;

  constructor(private route: ActivatedRoute, private clubService: ClubService, 
    private accountService: AccountService, 
    private messageService: MessageService,private teacherService : TeacherService,
    private sanitizer: DomSanitizer) { }

  ngOnInit(): void {

    this.pathId = parseInt(this.route.snapshot.paramMap.get('id'));

    this.getClub();

    this.statusOptions = [{label: 'Approve', value: true}, {label: 'Reject', value: false}];
  }

  getClub() {
    this.clubService.getClubById(this.pathId).subscribe({
      next: (response: Club) => this.club = response,
      error: (e) => this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Loading Failed', life: 3000 }),
      complete: () => {
        console.log(this.club);
        this.dataLoaded = true;
        if(this.club.ucrequest != null){
          this.UCrequest_file = this.pdfConverter(this.club.ucrequest);
        }
        if(this.club.fsbrequest != null){
          this.FSBrequest_file = this.pdfConverter(this.club.fsbrequest);
        }
      }
    })
  }

  editDetailsButton(){

  }

  editRequestButton(){
    this.clubStatusDialog = true;
  }
  
  saveStatus(){
    console.log(this.statusValue);
    this.accountService.updateAccountStatus(this.club.leader.account.id,this.statusValue).subscribe({
      next: (response: Club) => this.getClub(),
      error: (e) => this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Status Update Failed', life: 3000 }),
      complete: () => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Status Updated', life: 3000 });
        this.clubStatusDialog = false;
      }
    })

  }
  
  getSrcFromCustomFile(club) {
    let uint8Array = new Uint8Array(atob(club.logo.data).split("").map(char => char.charCodeAt(0)));
    let dwn = new Blob([uint8Array])
    return this.sanitizer.bypassSecurityTrustResourceUrl(URL.createObjectURL(dwn));
  }

  pdfConverter(file){
    let uint8Array = new Uint8Array(atob(file.data).split("").map(char => char.charCodeAt(0)));
    let dwn = new Blob([uint8Array])
    return this.sanitizer.bypassSecurityTrustResourceUrl(URL.createObjectURL(dwn));
  }

  editCoordiantorButton(){
    this.getTeachers();
    this.coordiantorDialog = true;
  }

  getTeachers() {
    this.teacherService.getTeachers().subscribe({
      next: (response: Teacher[]) => this.teachers = response,
      error: (e) => this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Teachers Loading Failed', life: 3000 }),
    })
  }

}
