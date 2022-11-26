import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Event } from 'src/app/models/Event';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  
  public host = environment.apiUrl + "event/";

  constructor( private http : HttpClient ) { }

  public getEvents(): Observable<Event[]>{
    return this.http.get<Event[]>(this.host);
  }

  public getEventById(id : number): Observable<Event>{
    return this.http.get<Event>(`${this.host}${id}`);
  }

  public saveEvent(event : Event):Observable<Event>{
    return this.http.post<Event>(this.host, event);
  }

  public deleteEvent(id : Number):Observable<Event>{
    return this.http.delete<Event>(`${this.host}${id}`);
  }

  public getEventsByClubId(id : number): Observable<Event[]>{
    return this.http.get<Event[]>(`${this.host}club/${id}`);
  }

  public updateEventStatus(eventId : number, status : boolean):Observable<Event>{
    return this.http.put<Event>(`${this.host}status/${eventId}`,status);
  }

  public getRequestedEvents(): Observable<Event[]>{
    return this.http.get<Event[]>(this.host + "requested");
  }

  public getApprovedEvents(): Observable<Event[]>{
    return this.http.get<Event[]>(this.host + "approved");
  }

  public getRejectedEvents(): Observable<Event[]>{
    return this.http.get<Event[]>(this.host + "rejected");
  }

  public getTotalEvents(): Observable<number>{
    return this.http.get<number>(this.host + "count");
  }

  public getTotalApprovedEvents(): Observable<number>{
    return this.http.get<number>(this.host + "count/approved");
  }
}
