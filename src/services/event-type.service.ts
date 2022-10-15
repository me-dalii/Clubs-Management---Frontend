import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EventType } from 'src/app/models/EventType';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EventTypeService {
  
  public host = environment.apiUrl + "event_type/";

  constructor( private http : HttpClient ) { }

  public getEventTypes(): Observable<EventType[]>{
    return this.http.get<EventType[]>(this.host);
  }

  public getEventTypeById(id : number): Observable<EventType>{
    return this.http.get<EventType>(`${this.host}${id}`);
  }

  public saveEventType(eventType : EventType):Observable<EventType>{
    return this.http.post<EventType>(this.host, eventType);
  }

  public deleteEventType(id : Number):Observable<EventType>{
    return this.http.delete<EventType>(`${this.host}${id}`);
  }
}
