import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/User';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public host = environment.apiUrl + "user/";

  constructor( private http : HttpClient ) { }

  public getUsers(): Observable<User[]>{
    return this.http.get<User[]>(this.host);
  }

  public getUserById(id : number): Observable<User>{
    return this.http.get<User>(`${this.host}${id}`);
  }

  public saveUser(user : User):Observable<User>{
    return this.http.post<User>(this.host, user);
  }

  public deleteUser(id : Number):Observable<User>{
    return this.http.delete<User>(`${this.host}${id}`);
  }
}
