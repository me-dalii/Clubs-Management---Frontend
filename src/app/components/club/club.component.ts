import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Club } from 'src/app/models/Club';
import { ClubService } from 'src/services/club.service';

@Component({
  selector: 'app-club',
  templateUrl: './club.component.html',
  styleUrls: ['./club.component.scss'],
  providers: [MessageService]
})
export class ClubComponent implements OnInit {

  selectedClubs : Club[];

  clubs : Club[];
  club : Club;

  clubDialog : boolean;

  myForm: FormGroup;

  constructor(private messageService: MessageService, private clubService : ClubService,
    private sanitizer: DomSanitizer, private router: Router) { }

  ngOnInit(): void {

    this.getClubs();

    this.myForm = new FormGroup({
      id: new FormControl(''),
      name: new FormControl(''),
      description: new FormControl(''),
      status: new FormControl(''),
      president: new FormControl(''),
      coordinator: new FormControl(''),
    })

  }

  getClubs() {
    this.clubService.getClubs().subscribe({
      next: (response: Club[]) => this.clubs = response,
      error: (e) => this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Chargement échoué', life: 3000 }),
      complete: () => console.log(this.clubs)
    })
  }

  openNew(){
    this.club = {};
    // this.submitted = false;
    this.clubDialog = true;
  }

  hideDialog(){
    this.clubDialog = false;
    // this.submitted = false;
  }

  saveClub(){
    this.club = {
      'id': this.myForm.get('id').value,
      'name': this.myForm.get('name').value,
      'description': this.myForm.get('description').value,
    }

    // this.clubService.saveClub(this.club).subscribe({
    //   next: (response: Club) => {
    //     this.myForm.reset();
    //     this.messageService.add({ severity: 'success', summary: 'Succès', detail: 'Club Added', life: 3000 });
    //     this.getClubs();
    //   },
    //   error: (e) => {
    //     this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Failed', life: 3000 });
    //   },
    //   complete: () => this.clubDialog = false
    // })
  }

  getSrcFromCustomFile(club : Club) {
    let uint8Array = new Uint8Array(atob(club.logo.data).split("").map(char => char.charCodeAt(0)));
    let dwn = new Blob([uint8Array])
    return this.sanitizer.bypassSecurityTrustResourceUrl(URL.createObjectURL(dwn));
  }

  toClub(club){
    //navigate to club details
    this.router.navigate(['dashboard/clubs/',club.id]);
  }

  

}
