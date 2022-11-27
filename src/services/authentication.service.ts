import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Account } from 'src/app/models/Account';
import { environment } from 'src/environments/environment';
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  public host = environment.apiUrl + "login" ;

  private loggedInUsername : string;

  private access_token : string;
  private refreshtoken : string;

  
  private jwtHelper = new JwtHelperService();

  constructor( private http : HttpClient) {}

  public login(account : Account):Observable<HttpResponse<any> | HttpErrorResponse |any>{
    return this.http.post<HttpResponse<any> | HttpErrorResponse|any>(`${this.host}?username=${account.username}&&password=${account.password}`, null ,{observe : 'response'});
  }

  public saveAccessToken(token : string): void {
    this.access_token = token;
    localStorage.setItem('access_token', token);
  }

  public saveRefreshToken(refreshtoken : string): void {
    this.refreshtoken = refreshtoken;
    localStorage.setItem('refresh_token', refreshtoken);
  }

  public loadToken() : void{
    this.access_token = localStorage.getItem("access_token");
  }

  public loadRefreshToken() : void{
    this.refreshtoken = localStorage.getItem("refresh_token");
  }

  public getAccessToken() : string{
    return this.access_token;
  }

  public getRefreshToken() : string{
    return this.refreshtoken;
  }

  public addAccountRoleToLocalCache() : void{
    let payload = JSON.parse(atob(this.access_token.split('.')[1]))
    console.log("payload");
    console.log(payload);
    console.log(payload["role"]);

    localStorage.setItem('role',payload["role"]);
  }

  public getAccountRoleFromLocalCache() : string{
    this.loadToken();
    return localStorage.getItem('role');
  }

  public getAccountUsername() : string{
    this.loadToken();
    let payload = JSON.parse(atob(this.access_token.split('.')[1]))
    return payload["sub"];
  }

  public logOut(): void{
    this.access_token = null;
    this.loggedInUsername = null;
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("role");

  }

  public isLoggedIn(): boolean {
    this.loadToken();
    if((this.access_token != null && this.access_token !== '') && ((this.jwtHelper.decodeToken(this.access_token).sub != null || '') && !this.jwtHelper.isTokenExpired(this.access_token))){
          this.loggedInUsername = this.jwtHelper.decodeToken(this.access_token).sub;
          return true;
    }else{

      this.logOut();
      return false;
    }
  }

  public isAdmin(){
    return this.getAccountRoleFromLocalCache() == "ADMIN";
  }

}
