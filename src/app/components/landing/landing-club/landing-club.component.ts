import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MessageService } from 'primeng/api';
import { Club } from 'src/app/models/Club';
import { ClubService } from 'src/services/club.service';

@Component({
  selector: 'app-landing-club',
  templateUrl: './landing-club.component.html',
  styleUrls: ['./landing-club.component.scss'],
  providers: [MessageService]

})
export class LandingClubComponent implements OnInit {

  clubs : Club[];

  constructor(private messageService: MessageService, private clubService : ClubService,private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    document.documentElement.style.fontSize = '16px';

    this.getClubs();
    
  }

  getClubs() {
    this.clubService.getApprovedClubs().subscribe({
      next: (response: Club[]) => this.clubs = response,
      error: (e) => this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Chargement échoué', life: 3000 }),
      complete: () => console.log(this.clubs)
    })
  }

  getSrcFromCustomFile(club : Club) {
  
    let uint8Array = new Uint8Array(atob(club.logo.data).split("").map(char => char.charCodeAt(0)));
    let dwn = new Blob([uint8Array])
    return this.sanitizer.bypassSecurityTrustResourceUrl(URL.createObjectURL(dwn));
  }


}
