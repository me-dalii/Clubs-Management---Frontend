import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Club } from 'src/app/models/Club';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClubService {

  public host = environment.apiUrl + "club/";

  constructor( private http : HttpClient ) { }

  public getClubs(): Observable<Club[]>{
    return this.http.get<Club[]>(this.host);
  }

  public getClubById(id : number): Observable<Club>{
    return this.http.get<Club>(`${this.host}${id}`);
  }

  public getClubByLeaderUsername(username : string): Observable<Club>{
    return this.http.get<Club>(`${this.host}leader/${username}`);
  }

  public saveClubDetails(club : Club):Observable<Club>{
     return this.http.post<Club>(this.host + "details", club);
   }

  public updateClubCoordinator(clubId : number, coordinatorId : number):Observable<Club>{
    return this.http.put<Club>(`${this.host}${clubId}/coordinator/${coordinatorId}`,null);
  }

  public saveClub(formData : FormData): Observable<Club>{
    return this.http.post<Club>(`${this.host}`,formData);
  }

  public deleteClub(id : Number):Observable<Club>{
    return this.http.delete<Club>(`${this.host}${id}`);
  }
}
