import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { AuthenticationService } from 'src/services/authentication.service';
import { LayoutService } from './service/app.layout.service';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    model: any[] = [];

    constructor(public layoutService: LayoutService, public authenticationService: AuthenticationService) { }

    ngOnInit() {

        let role = this.authenticationService.getAccountRoleFromLocalCache();
        if (role == "ADMIN") {
            this.model = [
                {
                    items: [
                        { label: 'Dashboard', icon: 'pi pi-fw pi-th-large', routerLink: ['/dashboard'] },
    
                        {
                            label: 'Administration',
                            icon: 'pi pi-fw pi-shield',
                            items: [
                                {
                                    label: "Users",
                                    icon: 'pi pi-fw pi-circle',
                                    routerLink: ['/dashboard/users']
                                },
                                {
                                    label: "Roles",
                                    icon: 'pi pi-fw pi-circle',
                                    routerLink: ['/dashboard/roles']
                                }
                            ]
                        },
                        {
                            label: 'Clubs',
                            icon: 'pi pi-fw pi-clone',
                            routerLink: ['/dashboard/clubs']
                        },
                        {
                            label: 'Teachers',
                            icon: 'pi pi-fw pi-clone',
                            routerLink: ['/dashboard/teachers']
                        },
                        {
                            label: 'Grades',
                            icon: 'pi pi-fw pi-clone',
                            routerLink: ['/dashboard/grades']
                        },
                        {
                            label: 'Departments',
                            icon: 'pi pi-fw pi-clone',
                            routerLink: ['/dashboard/departments']
                        },
                        {
                            label: 'Events',
                            icon: 'pi pi-fw pi-shield',
                            items: [
                                {
                                    label: "Manage Events",
                                    icon: 'pi pi-fw pi-circle',
                                    routerLink: ['/dashboard/events']
                                },
                                {
                                    label: "Manage Types",
                                    icon: 'pi pi-fw pi-circle',
                                    routerLink: ['/dashboard/events/type']
                                }
                            ]
                        },
                    ]
                },
    
            ];

        }else if (role == "LEADER") {

            this.model = [
                {
                    items: [
                        { label: 'Dashboard', icon: 'pi pi-fw pi-th-large', routerLink: ['/dashboard'] },
                        {
                            label: 'My Club',
                            icon: 'pi pi-fw pi-shield',
                            routerLink: ['/dashboard/my_club']
                        },
                        {
                            label: 'Events',
                            icon: 'pi pi-fw pi-calendar',
                            routerLink: ['/dashboard/my_events']
                        },
                        {
                            label: 'Container',
                            icon: 'pi pi-fw pi-table',
                            routerLink: ['/dashboard/container']
                        },
                    ]
                },
    
            ];

        }

        

    }
}
