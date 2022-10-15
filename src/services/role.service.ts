import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Role } from 'src/app/models/Role';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  public host = environment.apiUrl + "role/";

  constructor( private http : HttpClient ) { }

  public getRoles(): Observable<Role[]>{
    return this.http.get<Role[]>(this.host);
  }

  public getRoleById(id : number): Observable<Role>{
    return this.http.get<Role>(`${this.host}${id}`);
  }

  public saveRole(role : Role):Observable<Role>{
    return this.http.post<Role>(this.host, role);
  }

  public deleteRole(id : Number):Observable<Role>{
    return this.http.delete<Role>(`${this.host}${id}`);
  }
}
