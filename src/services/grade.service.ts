import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Grade } from 'src/app/models/Grade';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GradeService {

  public host = environment.apiUrl + "grade/";

  constructor( private http : HttpClient ) { }

  public getGrades(): Observable<Grade[]>{
    return this.http.get<Grade[]>(this.host);
  }

  public getGradeById(id : number): Observable<Grade>{
    return this.http.get<Grade>(`${this.host}${id}`);
  }

  public saveGrade(Grade : Grade):Observable<Grade>{
    return this.http.post<Grade>(this.host, Grade);
  }

  public deleteGrade(id : Number):Observable<Grade>{
    return this.http.delete<Grade>(`${this.host}${id}`);
  }
}
