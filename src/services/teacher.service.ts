import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Teacher } from 'src/app/models/Teacher';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {

  public host = environment.apiUrl + "teacher/";

  constructor( private http : HttpClient ) { }

  public getTeachers(): Observable<Teacher[]>{
    return this.http.get<Teacher[]>(this.host);
  }

  public getTeacherById(id : number): Observable<Teacher>{
    return this.http.get<Teacher>(`${this.host}${id}`);
  }

  public saveTeacher(teacher : Teacher):Observable<Teacher>{
    return this.http.post<Teacher>(this.host, teacher);
  }

  public deleteTeacher(id : Number):Observable<Teacher>{
    return this.http.delete<Teacher>(`${this.host}${id}`);
  }
}
