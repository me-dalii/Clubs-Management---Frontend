import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { Club } from 'src/app/models/Club';
import { AuthenticationService } from 'src/services/authentication.service';
import { ClubService } from 'src/services/club.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
  providers: [MessageService]
})
export class LandingComponent implements OnInit {
  profileItems: any[];

  clubs : Club[];

  constructor(public layoutService: LayoutService, public router: Router, 
    public authenticationService: AuthenticationService, private messageService: MessageService, private clubService : ClubService,private sanitizer: DomSanitizer) { }

  ngOnInit(): void {

    this.getClubs();

    this.profileItems = [
      {label: 'Dashboard', icon: 'pi pi-th-large', command: () => {
        this.router.navigate(['/dashboard']);
      }},
      {label: 'Settings', icon: 'pi pi-cog', command: () => {
      }},
      {separator: true},
      {label: 'Help', icon: 'pi pi-info', command: () => {
        this.router.navigate(['/help']);
      }},
      {separator: true},
      {label: 'Sign out', icon: 'pi pi-sign-out', command: () => {
        this.authenticationService.logOut();
        this.router.navigate(['/login']);
      }}
  ];
  }

  login() {
    this.router.navigate(['/login']);
  }
  
  register() {
    this.router.navigate(['/register']);
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
