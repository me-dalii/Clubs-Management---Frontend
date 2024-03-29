import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ErrorComponent } from './components/auth/error/error.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegistrationComponent } from './components/auth/registration/registration.component';
import { SuccessComponent } from './components/auth/success/success.component';
import { ClubDetailsComponent } from './components/club/club-details/club-details.component';
import { ClubComponent } from './components/club/club.component';
import { ContainerComponent } from './components/container/container.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DepartmentComponent } from './components/department/department.component';
import { EventRequestComponent } from './components/event-request/event-request.component';
import { EventTypeComponent } from './components/event-type/event-type.component';
import { EventComponent } from './components/event/event.component';
import { GradeComponent } from './components/grade/grade.component';
import { LandingEventComponent } from './components/landing/landing-event/landing-event.component';
import { LandingComponent } from './components/landing/landing.component';
import { MyclubComponent } from './components/leader components/myclub/myclub.component';
import { MycontainerComponent } from './components/leader components/mycontainer/mycontainer.component';
import { MyeventsComponent } from './components/leader components/myevents/myevents.component';
import { RoleComponent } from './components/role/role.component';
import { TeacherComponent } from './components/teacher/teacher.component';
import { UserComponent } from './components/user/user.component';
import { AppLayoutComponent } from './layout/app.layout.component';


@NgModule({
  imports: [
    RouterModule.forRoot([
        // {path: '', component: LandingComponent},
        {
          path: '', component: LandingComponent,
        },
        {
          path: 'events', component: LandingEventComponent,
        },
        {
          path: 'dashboard', component: AppLayoutComponent,
          children:[
            { path:'', component : DashboardComponent },
            { path:'users', component : UserComponent },
            { path:'roles', component : RoleComponent },

            { path:'clubs', component : ClubComponent },
            { path:'clubs/:id',component:ClubDetailsComponent},

            { path:'teachers', component : TeacherComponent },

            { path:'events', component : EventComponent },
            { path:'events/type', component : EventTypeComponent },
            { path:'events/requests', component : EventRequestComponent },


            { path:'grades', component : GradeComponent },
            { path:'departments', component : DepartmentComponent },
            { path:'container', component : ContainerComponent },

            { path:'my_club', component : MyclubComponent },
            { path:'my_events', component : MyeventsComponent },
            { path:'my_container', component : MycontainerComponent },
          ]
        },
        {path: 'login', component: LoginComponent},
        {path: 'register', component: RegistrationComponent},
        {path: 'error', component: ErrorComponent},
        {path: 'success', component: SuccessComponent},

    ], 
    { scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled' })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
