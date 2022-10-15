import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { LayoutService } from "./service/app.layout.service";

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html'
})
export class AppTopBarComponent {

    items!: MenuItem[];

    constructor(public layoutService: LayoutService, private router : Router) { }

    public onLogout(){
        this.router.navigateByUrl('/login');
    }

    public onProfile(){
        this.router.navigateByUrl('/cpm/profile');
    }
}