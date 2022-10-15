import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Role } from 'src/app/models/Role';
import { RoleService } from 'src/services/role.service';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.scss'],
  providers: [MessageService]
})
export class RoleComponent implements OnInit {

  roles : Role[];
  selectedRoles : Role[];

  role : Role;

  roleDialog : boolean;
  
  deleteRoleDialog: boolean = false;
  deleteRolesDialog: boolean = false;

  roleForm: FormGroup;

  constructor(private messageService: MessageService, private roleService : RoleService) { }

  ngOnInit(): void {

    this.getRoles();

    this.roleForm = new FormGroup({
      id: new FormControl(''),
      name: new FormControl(''),
      description: new FormControl(''),
    })
  }

  getRoles(){
    this.roleService.getRoles().subscribe({
      next: (response: Role[]) => this.roles = response,
      error: (e) => this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Loadin failed', life: 3000 }),
    })
  }

  openNew(){
    this.role = {};
    this.roleForm.reset();
    this.roleDialog = true;

  }

  hideDialog(){
    this.roleDialog = false;
    // this.submitted = false;
  }

  saveRole(){
    this.role = {
      'id': this.roleForm.get('id').value,
      'name': this.roleForm.get('name').value,
      'description': this.roleForm.get('description').value
    }

    this.roleService.saveRole(this.role).subscribe({
      next: (response: Role) => {
        this.roleForm.reset();
        this.messageService.add({ severity: 'success', summary: 'Succès', detail: 'Role Added', life: 3000 });
        this.getRoles();
      },
      error: (e) => {
        this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Failed', life: 3000 });
      },
      complete: () => this.roleDialog = false
    })
  }

  editRole(role: Role){
    this.roleForm.reset()
    this.role = {...role};
    this.roleForm.get('id').setValue(role.id)
    this.roleForm.get('name').setValue(role.name)
    this.roleForm.get('description').setValue(role.description)
    this.roleDialog = true;
  }


  deleteRole(role: Role){
    this.role = role;
    this.deleteRoleDialog = true;
  }

  deleteSelectedRoles(){
    this.deleteRolesDialog = true;
  }


  confirmDelete() {
    this.roleService.deleteRole(this.role.id).subscribe({
      next: (v) => 
      {
        this.getRoles();
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: "Role deleted", life: 3000 });
      },
      error: (e) => this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Delete Failed', life: 3000 }),
      complete: () => this.deleteRoleDialog = false
    })
    this.role = {};
  }

  confirmDeleteSelected() {
    for (let s of this.selectedRoles) {
      this.roleService.deleteRole(s.id).subscribe({
        next: (v) => this.getRoles(),
        error: (e) => this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Delete Failed', life: 3000 }),
      })
    }
    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Deleted Successfully', life: 3000 });
    this.deleteRolesDialog = false;
    this.selectedRoles = null;

  }

}
