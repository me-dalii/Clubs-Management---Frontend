import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Club } from 'src/app/models/Club';
import { ClubService } from 'src/services/club.service';

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

  constructor(private route: ActivatedRoute, private clubService: ClubService, 
    private messageService: MessageService,
    private sanitizer: DomSanitizer) { }

  ngOnInit(): void {

    this.pathId = parseInt(this.route.snapshot.paramMap.get('id'));

    this.getClub();
  }

  getClub() {
    this.clubService.getClubById(this.pathId).subscribe({
      next: (response: Club) => this.club = response,
      error: (e) => this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Loading Failed', life: 3000 }),
      complete: () => this.dataLoaded = true
    })
  }

  editDetailsButton(){

  }

  getSrcFromCustomFile(club) {
    let uint8Array = new Uint8Array(atob(club.logo.data).split("").map(char => char.charCodeAt(0)));
    let dwn = new Blob([uint8Array])
    return this.sanitizer.bypassSecurityTrustResourceUrl(URL.createObjectURL(dwn));
  }


}
