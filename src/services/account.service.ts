import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Account } from 'src/app/models/Account';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  public host = environment.apiUrl + "account/";

  constructor( private http : HttpClient ) { }

  public getAccounts(): Observable<Account[]>{
    return this.http.get<Account[]>(this.host);
  }

  public getAccountById(id : number): Observable<Account>{
    return this.http.get<Account>(`${this.host}${id}`);
  }

  public saveAccount(account : Account):Observable<Account>{
    return this.http.post<Account>(this.host, account);
  }

  public deleteAccount(id : Number):Observable<Account>{
    return this.http.delete<Account>(`${this.host}${id}`);
  }

  public updateAccountStatus(accountId : number, status : boolean):Observable<Account>{
    return this.http.put<Account>(`${this.host}status/${accountId}`,status);
  }
}
