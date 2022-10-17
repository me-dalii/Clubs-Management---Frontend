import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { AuthenticationService } from 'src/services/authentication.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {
  profileItems: any[];

  constructor(public layoutService: LayoutService, public router: Router, 
    public authenticationService: AuthenticationService,) { }

  ngOnInit(): void {

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
}
