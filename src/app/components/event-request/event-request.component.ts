import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { EventService } from 'src/services/event.service';
import { Event } from 'src/app/models/Event';

@Component({
  selector: 'app-event-request',
  templateUrl: './event-request.component.html',
  styleUrls: ['./event-request.component.scss'],
  providers: [MessageService]
})
export class EventRequestComponent implements OnInit {

  rejectedEvents : Event[];
  requestedEvents : Event[];
  approvedEvents : Event[];

  event : Event;

  statusOptions: any[];

  statusValue : boolean;

  eventStatusDialog : boolean;

  constructor(private eventService : EventService, private messageService : MessageService,) { }

  ngOnInit(): void {
    this.getRequestedEvents();
    this.getApprovedEvents();
    this.getRejectedEvents();

    this.statusOptions = [{label: 'Approve', value: true}, {label: 'Reject', value: false}];

  }

  getRequestedEvents() {
    this.eventService.getRequestedEvents().subscribe({
      next: (response: Event[]) => this.requestedEvents = response,
      error: (e) => this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Chargement échoué', life: 3000 }),
    })
  }

  getApprovedEvents() {
    this.eventService.getApprovedEvents().subscribe({
      next: (response: Event[]) => this.approvedEvents = response,
      error: (e) => this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Chargement échoué', life: 3000 }),
    })
  }

  getRejectedEvents() {
    this.eventService.getRejectedEvents().subscribe({
      next: (response: Event[]) => this.rejectedEvents = response,
      error: (e) => this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Chargement échoué', life: 3000 }),
    })
  }

  viewEvent(event){
    this.event = event;
    this.eventStatusDialog = true;
    this.statusValue = event.status;
  }

  saveStatus(){
    this.event.status = this.statusValue;
    this.eventService.saveEvent(this.event).subscribe({
      next: (response: Event) => {
        this.messageService.add({ severity: 'success', summary: 'Succès', detail: 'Modification effectuée', life: 3000 });
        this.eventStatusDialog = false;
        this.getRequestedEvents();
        this.getApprovedEvents();
        this.getRejectedEvents();
      },
      error: (e) => this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Modification échouée', life: 3000 }),
    })
  }

}
