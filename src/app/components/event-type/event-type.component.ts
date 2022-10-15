import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { MessageService } from 'primeng/api';
import { title } from 'process';

import { EventType } from 'src/app/models/EventType';
import { EventTypeService } from 'src/services/event-type.service';

@Component({
  selector: 'app-event-type',
  templateUrl: './event-type.component.html',
  styleUrls: ['./event-type.component.scss'],
  providers: [MessageService]
})
export class EventTypeComponent implements OnInit {

  selectedEventTypes : EventType[] ;
  eventTypes : EventType[] ;
  eventTypeDialog : Boolean ;
  eventTypeForm : FormGroup ;
  eventType: EventType ;
  deleteEventTypeDialog: boolean;


  constructor(private eventTypeService : EventTypeService, private messageService : MessageService) { }

  ngOnInit(): void {
    this.getEventTypes();

    this.eventTypeForm = new FormGroup({
      id: new FormControl(''),
      title: new FormControl(''),
      description: new FormControl('')
      
    })
  }

  deleteSelectedEventTypes() {


  }

  getEventTypes(){
    this.eventTypeService.getEventTypes().subscribe({
      next: (response: EventType[]) => this.eventTypes = response,
      error: (e) => this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Loading Failed', life: 3000 }),
    })

  }


  editEventType(eventType){

  }

  deleteEventType(eventType){
    this.deleteEventTypeDialog = true ;

  }

  hideDialog(){
    this.eventTypeDialog = false ;

  }
  saveEventType(){
    this.eventType = {
      "id" : this.eventTypeForm.get("id").value,
      "title" : this.eventTypeForm.get("title").value,
      "description" : this.eventTypeForm.get("description").value
    }
    
    this.eventTypeService.saveEventType(this.eventType).subscribe({
      next: (response: EventType) => {
        this.eventTypeForm.reset();
        this.messageService.add({ severity: 'success', summary: 'Succès', detail: 'Event Type Added', life: 3000 });
        this.getEventTypes();
      },
      error: (e) => {
        this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Failed', life: 3000 });
      },
      complete: () => this.eventTypeDialog = false
    })


  }

  openNew(){

    this.eventTypeDialog=true;
  }

  
  



  

}
