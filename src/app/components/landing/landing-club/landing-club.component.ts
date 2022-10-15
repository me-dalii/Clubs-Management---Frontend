import { Component, OnInit } from '@angular/core';
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

  constructor(private messageService: MessageService, private clubService : ClubService) { }

  ngOnInit(): void {
    document.documentElement.style.fontSize = '16px';

    this.getClubs();
  }

  getClubs() {
    this.clubService.getClubs().subscribe({
      next: (response: Club[]) => this.clubs = response,
      error: (e) => this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Chargement échoué', life: 3000 }),
    })
  }


}