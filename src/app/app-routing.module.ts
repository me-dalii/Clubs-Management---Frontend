import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { RegistrationComponent } from './components/auth/registration/registration.component';
import { ClubDetailsComponent } from './components/club/club-details/club-details.component';
import { ClubComponent } from './components/club/club.component';
import { DepartmentComponent } from './components/department/department.component';
import { EventTypeComponent } from './components/event-type/event-type.component';
import { EventComponent } from './components/event/event.component';
import { GradeComponent } from './components/grade/grade.component';
import { LandingClubComponent } from './components/landing/landing-club/landing-club.component';
import { LandingHomeComponent } from './components/landing/landing-home/landing-home.component';
import { LandingComponent } from './components/landing/landing.component';
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
          children:[
            { path:'', component : LandingHomeComponent },
            { path:'clubs', component : LandingClubComponent },
          ]
        },
        {
          path: 'dashboard', component: AppLayoutComponent,
          children:[
            { path:'users', component : UserComponent },
            { path:'roles', component : RoleComponent },

            { path:'clubs', component : ClubComponent },
            { path:'clubs/:id',component:ClubDetailsComponent},

            { path:'teachers', component : TeacherComponent },

            { path:'events', component : EventComponent },
            { path:'events/type', component : EventTypeComponent },

            { path:'grades', component : GradeComponent },
            { path:'departments', component : DepartmentComponent },


          ]
        },
        {path: 'login', component: LoginComponent},
        {path: 'register', component: RegistrationComponent},

    ], 
    { scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled' })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
