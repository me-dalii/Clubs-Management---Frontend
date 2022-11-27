import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { User } from 'src/app/models/User';
import { Role } from 'src/enums/Role';
import { RoleService } from 'src/services/role.service';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  providers: [MessageService]
})
export class UserComponent implements OnInit {

  users : User[];
  selectedUsers : User[];

  
  
  user: User;

  userDialog : boolean;
  
  deleteUserDialog: boolean = false;
  deleteUsersDialog: boolean = false;

  role = Role;
  roles = [];

  userForm: FormGroup;

  constructor(private messageService: MessageService, private userService : UserService, private roleService : RoleService) { }

  ngOnInit(): void {

    this.getUsers();
    
    this.roles = Object.keys(this.role);


    this.userForm = new FormGroup({
      id: new FormControl(''),
      cin: new FormControl(''),
      firstName: new FormControl(''),
      lastName: new FormControl(''),
      email: new FormControl(''),
      phone: new FormControl(''),
      dob: new FormControl(''),
      gender : new FormControl(''),
      role : new FormControl(''),
      
    })
  }

  getUsers(){
    this.userService.getUsers().subscribe({
      next: (response: User[]) => {
        this.users = response;
        console.log(this.users)

      //filter users remove admin
        this.users = this.users.filter(user => user.account.role != Role.ADMIN)
      },
      error: (e) => this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Loadin failed', life: 3000 }),
      complete: () => this.users = this.users.filter(user => user.account.role != Role.ADMIN)
    })
  }


  openNew(){
    this.user = {};
    this.userForm.reset();
    this.userDialog = true;

  }

  hideDialog(){
    this.userDialog = false;
    // this.submitted = false;
  }

  saveUser(){
    this.user = {
      'id': this.userForm.get('id').value,
      'cin': this.userForm.get('cin').value,
      'firstName': this.userForm.get('firstName').value,
      'lastName': this.userForm.get('lastName').value,
      'email': this.userForm.get('email').value,
      'phone': this.userForm.get('phone').value,
      'dob': this.userForm.get('dob').value,
      'grade' : this.user.grade,
      'account' : this.user.account
    }

    this.userService.saveUser(this.user).subscribe({
      next: (response: User) => {
        this.userForm.reset();
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'User Added', life: 3000 });
        this.getUsers();
      },
      error: (e) => {
        this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Failed', life: 3000 });
      },
      complete: () => this.userDialog = false
    })
  }

  editUser(user: User){
    this.userForm.reset()
    this.user = {...user};
    this.userForm.get('id').setValue(user.id)
    this.userForm.get('cin').setValue(user.cin)
    this.userForm.get('firstName').setValue(user.firstName)
    this.userForm.get('lastName').setValue(user.lastName)
    this.userForm.get('email').setValue(user.email)
    this.userForm.get('phone').setValue(user.phone)
    this.userForm.get('dob').setValue(new Date(user.dob))

    this.userDialog = true;
  }


  deleteUser(user: User){
    this.user = user;
    this.deleteUserDialog = true;
  }

  deleteSelectedUsers(){
    this.deleteUsersDialog = true;
  }


  confirmDelete() {
    this.userService.deleteUser(this.user.id).subscribe({
      next: (v) => 
      {
        this.getUsers();
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: "User deleted", life: 3000 });
      },
      error: (e) => this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Delete Failed', life: 3000 }),
      complete: () => this.deleteUserDialog = false
    })
    this.user = {};
  }

  confirmDeleteSelected() {
    for (let s of this.selectedUsers) {
      this.userService.deleteUser(s.id).subscribe({
        next: (v) => this.getUsers(),
        error: (e) => this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Delete Failed', life: 3000 }),
      })
    }
    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Deleted Successfully', life: 3000 });
    this.deleteUsersDialog = false;
    this.selectedUsers = null;

  }

}
