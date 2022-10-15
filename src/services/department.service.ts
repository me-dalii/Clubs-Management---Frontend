import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Department } from 'src/app/models/Depatment';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  public host = environment.apiUrl + "department/";

  constructor( private http : HttpClient ) { }

  public getDepartments(): Observable<Department[]>{
    return this.http.get<Department[]>(this.host);
  }

  public getDepartmentById(id : number): Observable<Department>{
    return this.http.get<Department>(`${this.host}${id}`);
  }

  public saveDepartment(Department : Department):Observable<Department>{
    return this.http.post<Department>(this.host, Department);
  }

  public deleteDepartment(id : Number):Observable<Department>{
    return this.http.delete<Department>(`${this.host}${id}`);
  }
}
