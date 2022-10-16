import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Event } from 'src/app/models/Event';
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


  eventForm : FormGroup;
  event: Event

  constructor(private eventService : EventService, private messageService : MessageService) { }

  ngOnInit(): void {

    this.getEvents();


    this.eventForm = new FormGroup({
      id: new FormControl(''),
      title: new FormControl(''),
      description: new FormControl(''),
      eventDate: new FormControl(''),
      endDate: new FormControl(''),
      place: new FormControl(''),
      participantsEstimation: new FormControl(''),
    })

  }

  openNew(){
    this.eventDialog = true;
  }

  deleteSelectedEvents(){

  }

  getEvents() {
    this.eventService.getEvents().subscribe({
      next: (response: Event[]) => this.events = response,
      error: (e) => this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Chargement échoué', life: 3000 }),
    })
  }

  editEvent(){

  }

  deleteEvent(){

  }

  hideDialog(){

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


}
