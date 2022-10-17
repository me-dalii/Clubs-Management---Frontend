import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Account } from 'src/app/models/Account';
import { AuthenticationService } from 'src/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [MessageService],
})
export class LoginComponent implements OnInit {

  account : Account;
  username: string;
  password: string;
  badCred : String;

  showLoading : boolean = false;


  constructor(
    private authenticationService: AuthenticationService,
    private messageService: MessageService,
    private router: Router) { }

  ngOnInit(): void {

    if(this.authenticationService.isLoggedIn()){
      this.router.navigateByUrl('/');
    }else{
      //just to be safe
      this.router.navigateByUrl('/login');
    }

  }

  onSubmit() {

    this.showLoading = true


    this.account = {
      'username': this.username,
      'password': this.password,
    }

    this.authenticationService.login(this.account).subscribe({
      next: (response: any) => {
        console.log(response);
        this.authenticationService.saveAccessToken(response.headers.get("access_token"));
        this.authenticationService.saveRefreshToken(response.headers.get("refresh_token"));
        this.authenticationService.addAccountRoleToLocalCache();
        this.router.navigate(['/dashboard']);
      },
      error: (e) => {
        this.badCred = "Username or Password is incorrect";
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed Authentication', life: 3000 })
      },
      complete: () => this.showLoading = false
      
    })
    
  }

  resetPassword(){
    this.messageService.add({ severity: 'info', summary: 'Info', detail: 'Contact 4c', life: 3000 })
  }

  onRegister(){
    this.router.navigate(['/register']);
  }

}
