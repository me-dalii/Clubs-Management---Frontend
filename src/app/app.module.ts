import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StyleClassModule } from 'primeng/styleclass';
import { DividerModule } from 'primeng/divider';
import { ChartModule } from 'primeng/chart';
import { PanelModule } from 'primeng/panel';
import { ButtonModule } from 'primeng/button';
import { TimelineModule } from 'primeng/timeline';
import { TabViewModule } from 'primeng/tabview';
import { CheckboxModule } from 'primeng/checkbox';
import { AppLayoutModule } from './layout/app.layout.module';
import { AutoCompleteModule } from "primeng/autocomplete";
import { CalendarModule } from "primeng/calendar";
import { ChipsModule } from "primeng/chips";
import { ChipModule } from "primeng/chip";
import { DropdownModule } from "primeng/dropdown";
import { InputMaskModule } from "primeng/inputmask";
import { InputNumberModule } from "primeng/inputnumber";
import { CascadeSelectModule } from "primeng/cascadeselect";
import { MultiSelectModule } from "primeng/multiselect";
import { InputTextareaModule } from "primeng/inputtextarea";
import { InputTextModule } from "primeng/inputtext";
import { RatingModule } from 'primeng/rating';
import { KnobModule } from 'primeng/knob';
import { ListboxModule } from 'primeng/listbox';
import { SelectButtonModule } from 'primeng/selectbutton';
import { InputSwitchModule } from 'primeng/inputswitch';
import { RadioButtonModule } from 'primeng/radiobutton';
import { ColorPickerModule } from 'primeng/colorpicker';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { PasswordModule } from 'primeng/password';
import { SliderModule } from 'primeng/slider';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { MenuModule } from 'primeng/menu';
import { FileUploadModule } from 'primeng/fileupload';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SkeletonModule } from 'primeng/skeleton';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { TooltipModule } from 'primeng/tooltip';
import { DataViewModule } from 'primeng/dataview';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { AccordionModule } from 'primeng/accordion';
import { SplitButtonModule } from 'primeng/splitbutton';
import { SplitterModule } from 'primeng/splitter';
import { TableModule } from 'primeng/table';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { LandingComponent } from './components/landing/landing.component';
import { TeacherComponent } from './components/teacher/teacher.component';
import { EventComponent } from './components/event/event.component';
import { EventTypeComponent } from './components/event-type/event-type.component';
import { UserComponent } from './components/user/user.component';
import { RoleComponent } from './components/role/role.component';
import { ClubComponent } from './components/club/club.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegistrationComponent } from './components/auth/registration/registration.component';
import { GradeComponent } from './components/grade/grade.component';
import { DepartmentComponent } from './components/department/department.component';
import { LandingClubComponent } from './components/landing/landing-club/landing-club.component';
import { LandingHomeComponent } from './components/landing/landing-home/landing-home.component';
import { ClubDetailsComponent } from './components/club/club-details/club-details.component';
import { LandingAboutComponent } from './components/landing/landing-about/landing-about.component';
import { LandingEventComponent } from './components/landing/landing-event/landing-event.component';
import { MyclubComponent } from './components/leader components/myclub/myclub.component';
import { MyeventsComponent } from './components/leader components/myevents/myevents.component';
import { ContainerComponent } from './components/leader components/container/container.component';
import { TagModule } from 'primeng/tag';
import {ImageModule} from 'primeng/image';
import {CardModule} from 'primeng/card';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    TeacherComponent,
    ClubComponent,
    EventComponent,
    EventTypeComponent,
    UserComponent,
    RoleComponent,
    LoginComponent,
    RegistrationComponent,
    GradeComponent,
    DepartmentComponent,
    LandingClubComponent,
    LandingHomeComponent,
    ClubDetailsComponent,
    LandingAboutComponent,
    LandingEventComponent,
    MyclubComponent,
    MyeventsComponent,
    ContainerComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    SkeletonModule,
    ReactiveFormsModule,
    AppRoutingModule,
    DividerModule,
    CommonModule,
    StyleClassModule,
    ChartModule,
    PanelModule,
    ButtonModule,
    TimelineModule,
    TabViewModule,
    CheckboxModule,
    AutoCompleteModule,
    CalendarModule,
    ChipsModule,
    DropdownModule,
    InputMaskModule,
    InputNumberModule,
    ColorPickerModule,
    CascadeSelectModule,
    MultiSelectModule,
    ToggleButtonModule,
    SliderModule,
    InputTextareaModule,
    RadioButtonModule,
    InputTextModule,
    RatingModule,
    ChipModule,
    KnobModule,
    InputSwitchModule,
    ListboxModule,
    SelectButtonModule,
    AppLayoutModule,
    OverlayPanelModule,
    PasswordModule,
    MenuModule,
    FileUploadModule,
    ToastModule,
    ToolbarModule,
    TooltipModule,
    DataViewModule,
    DialogModule,
    ConfirmDialogModule,
    AccordionModule,
    SplitterModule,
    SplitButtonModule,
    TableModule,
    PdfViewerModule,
    TagModule,
    ImageModule,
    CardModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
