import { Component, OnInit } from '@angular/core';
import { Club } from 'src/app/models/Club';
import { Event } from 'src/app/models/Event';
import { ClubService } from 'src/services/club.service';
import { EventService } from 'src/services/event.service';
import { TeacherService } from 'src/services/teacher.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  clubs : Club[];
  events : Event[];

  totalApprovedClubs : number;
  totalRequestedClubs : number;
  totalEvents : number;
  totalApprovedEvents : number;
  totalTeachers : number;
  totalActiveTeachers : number;

  constructor(private clubService : ClubService, 
    private teacherService : TeacherService, 
    private eventService : EventService) { }

  ngOnInit(): void {
    
    this.getClubs();
    this.getTotalApprovedClubs();
    this.getTotalRequestedClubs();
    this.getTotalEvents();
    this.getTotalApprovedEvents();
    this.getTotalTeachers();
    this.getTotalActiveTeachers();

  }

  getTotalApprovedClubs(){
    this.clubService.getTotalApprovedClubs().subscribe({
      next: (response: number) => this.totalApprovedClubs = response,
      error: (e) => console.log(e),
      complete: () => console.log(this.totalApprovedClubs)
    })
  }

  getTotalRequestedClubs(){
    this.clubService.getTotalRequestedClubs().subscribe({
      next: (response: number) => this.totalRequestedClubs = response,
      error: (e) => console.log(e),
      complete: () => console.log(this.totalRequestedClubs)
    })
  }

  getTotalEvents(){
    this.eventService.getTotalEvents().subscribe({
      next: (response: number) => this.totalEvents = response,
      error: (e) => console.log(e),
      complete: () => console.log(this.totalEvents)
    })
  }

  getTotalApprovedEvents(){
    this.eventService.getTotalApprovedEvents().subscribe({
      next: (response: number) => this.totalApprovedEvents = response,
      error: (e) => console.log(e),
      complete: () => console.log(this.totalApprovedEvents)
    })
  }

  getTotalTeachers(){
    this.teacherService.getTotalTeachers().subscribe({
      next: (response: number) => this.totalTeachers = response,
      error: (e) => console.log(e),
      complete: () => console.log(this.totalTeachers)
    })
  }

  getTotalActiveTeachers(){
    this.teacherService.getTotalActiveTeachers().subscribe({
      next: (response: number) => this.totalActiveTeachers = response,
      error: (e) => console.log(e),
      complete: () => console.log(this.totalActiveTeachers)
    })
  }


  getClubs(){
    this.clubService.getClubs().subscribe({
      next: (response: Club[]) => this.clubs = response,
      error: (e) => console.log(e),
      complete: () => {
        
        this.getEvents();
      }
    })
  }

  getEvents(){
    this.eventService.getApprovedEvents().subscribe({
      next: (response: Event[]) => this.events = response,
      error: (e) => console.log(e),
      complete: () => {
        //add events to clubs
        this.clubs.forEach(club => {
          club.events = this.events.filter(event => event.club.id == club.id);
        });
        //sort Clubs by number of Club approved events
        this.clubs.sort((a,b) => b.events.filter(event => event.status == true).length - a.events.filter(event => event.status == true).length); 
        //get the first 5 Clubs
        if(this.clubs.length > 5){
          this.clubs = this.clubs.slice(0, 5);
        }
      }
    })
  }
    

  




}
