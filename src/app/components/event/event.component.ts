import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Event } from 'src/app/models/Event';
import { EventType } from 'src/app/models/EventType';
import { EventTypeService } from 'src/services/event-type.service';
import { EventService } from 'src/services/event.service';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss'],
  providers: [MessageService]
})
export class EventComponent implements OnInit {

  selectedEvents : Event[];

  events : Event[];

  eventDialog : boolean;

  deleteEventDialog : boolean;
  deleteEventsDialog: boolean;
  eventTypes : EventType[] ;

  eventForm : FormGroup;
  event: Event

  constructor(private eventService : EventService, private messageService : MessageService, private eventTypeService : EventTypeService) { }

  ngOnInit(): void {

    this.getEvents();
    this.getEventTypes();


    this.eventForm = new FormGroup({
      id: new FormControl(''),
      title: new FormControl(''),
      description: new FormControl(''),
      eventDate: new FormControl(''),
      endDate: new FormControl(''),
      place: new FormControl(''),
      participantsEstimation: new FormControl(''),
      type : new FormControl('')
    })
  }

  openNew(){
    this.event = {};
    this.eventForm.reset();
    this.eventDialog = true;
  }

  deleteSelectedEvents(){
    this.deleteEventsDialog = true;
  }

  getEvents() {
    this.eventService.getEvents().subscribe({
      next: (response: Event[]) => this.events = response,
      error: (e) => this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Chargement échoué', life: 3000 }),
    })
  }


  getEventTypes(){

    this.eventTypeService.getEventTypes().subscribe({
      next: (response: EventType[]) => { this.eventTypes = response,console.log(this.eventTypes);},
      error: (e) => this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Loading Failed', life: 3000 }),
    })

  }

  editEvent(event){
    this.eventForm.reset()
    this.event = {...event};
    this.eventForm.get('id').setValue(event.id)
    this.eventForm.get('title').setValue(event.title)
    this.eventForm.get('description').setValue(event.description)
    this.eventForm.get('eventDate').setValue(new Date(event.eventDate))
    this.eventForm.get('endDate').setValue(new Date(event.endDate))
    this.eventForm.get('place').setValue(event.place)
    this.eventForm.get('participantsEstimation').setValue(event.participantsEstimation)
    this.eventForm.get('type').setValue(event.eventType)
    this.eventDialog = true;
  }

  deleteEvent(event){
    this.event = event;
    this.deleteEventDialog = true;
  }

  hideDialog(){
    this.eventDialog = false;
  }

  saveEvent(){
    this.event = {
      'id': this.eventForm.get('id').value,
      'title': this.eventForm.get('title').value,
      'description': this.eventForm.get('description').value,
      'eventDate': this.eventForm.get('eventDate').value,
      'endDate': this.eventForm.get('endDate').value,
      'place': this.eventForm.get('place').value,
      'participantsEstimation': this.eventForm.get('participantsEstimation').value,
      'eventType' : this.eventForm.get('type').value
    }

    this.eventService.saveEvent(this.event).subscribe({
      next: (response: Event) => {
        this.eventForm.reset();
        this.messageService.add({ severity: 'success', summary: 'Succès', detail: 'Teacher Added', life: 3000 });
        this.getEvents();
      },
      error: (e) => {
        this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Failed', life: 3000 });
      },
      complete: () => this.eventDialog = false
    })
  }

  confirmDelete() {
    this.eventService.deleteEvent(this.event.id).subscribe({
      next: (v) => 
      {
        this.getEvents();
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: "Event deleted", life: 3000 });
      },
      error: (e) => this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Delete Failed', life: 3000 }),
      complete: () => this.deleteEventDialog = false
    })
    this.event = {};
  }

  confirmDeleteSelected() {
    for (let s of this.selectedEvents) {
      this.eventService.deleteEvent(s.id).subscribe({
        next: (v) => this.getEvents(),
        error: (e) => this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Delete Failed', life: 3000 }),
      })
    }
    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Deleted Successfully', life: 3000 });
    this.deleteEventsDialog = false;
    this.selectedEvents = null;

  }


}
