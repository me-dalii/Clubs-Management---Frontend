import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AuthenticationService } from 'src/services/authentication.service';
import { LayoutService } from "./service/app.layout.service";

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html'
})
export class AppTopBarComponent implements OnInit{

    items!: MenuItem[];
    profileItems: any[];

    constructor(public layoutService: LayoutService, public authenticationService: AuthenticationService, private router : Router) { }
    
    ngOnInit(): void {

        this.profileItems = [
            {label: 'Home', icon: 'pi pi-home', command: () => {
              this.router.navigate(['/']);
            }},
            {label: 'Settings', icon: 'pi pi-cog', command: () => {
            }},
            {separator: true},
            {label: 'Help', icon: 'pi pi-info', command: () => {
              this.router.navigate(['/help']);
            }},
            {separator: true},
            
        ];
    }

    public onLogout(){
        this.authenticationService.logOut();
        this.router.navigate(['/']);
    }

    public onProfile(){
        this.router.navigateByUrl('/cpm/profile');
    }
}