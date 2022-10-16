import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { MessageService } from 'primeng/api';

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
  deleteEventTypesDialog : boolean;



  constructor(private eventTypeService : EventTypeService, private messageService : MessageService) { }

  ngOnInit(): void {
    this.getEventTypes();

    this.eventTypeForm = new FormGroup({
      id: new FormControl(''),
      title: new FormControl(''),
      description: new FormControl('')
      
    })
  }

  

  getEventTypes(){
    this.eventTypeService.getEventTypes().subscribe({
      next: (response: EventType[]) => this.eventTypes = response,
      error: (e) => this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Loading Failed', life: 3000 }),
    })

  }


  editEventType(eventType){

    this.eventTypeForm.reset();
    this.eventType = eventType;

    this.eventTypeForm.get('id').setValue(eventType.id);
    this.eventTypeForm.get('title').setValue(eventType.title);
    this.eventTypeForm.get('description').setValue(eventType.description);
    
    this.eventTypeDialog=true;

  }

  
  deleteEventType(eventType : EventType){
    this.eventType = eventType;
    this.deleteEventTypeDialog = true;
  }

  deleteSelectedEventTypes() {
    this.deleteEventTypesDialog = true ;
    
  }
  



  confirmDeleteEventType(){
    this.eventTypeService.deleteEventType(this.eventType.id).subscribe({
      next: (v) => 
      {
        this.getEventTypes();
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: "L'Attachement a été Supprimés", life: 3000 });
      },
      error: (e) => this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Delete Failed', life: 3000 }),
      complete: () => this.deleteEventTypeDialog = false
    })
    this.eventType = {};
  }
  confirmDeleteEventTypeSelected(){


for (let s of this.selectedEventTypes) {
  this.eventTypeService.deleteEventType(s.id).subscribe({
    next: (v) => this.getEventTypes(),
    error: (e) => this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Delete Failed', life: 3000 }),
  })
}
this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Deleted Successfully', life: 3000 });
this.selectedEventTypes = null;

this.deleteEventTypeDialog = false ;
this.eventTypeForm.reset();
this.getEventTypes();


  }


  hideDialog(){
    this.eventTypeDialog = false ;

  }
  closeEventTypeDialog(){
    this.deleteEventTypeDialog = false ;
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
