import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CrudService } from '../../../shared/services/crud.service';
import { User } from '../../../shared/models/user';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-edit',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './user-edit.component.html',
  styleUrl: './user-edit.component.scss'
})
export class UserEditComponent implements OnInit{

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private crud = inject(CrudService);
  private fb = inject(FormBuilder);
  
  constructor() {
    
  }
  ngOnInit(): void {
    this.getRouteParams();
  }

  type = 'create';
  id: number = 0;
  getRouteParams() {
    let id = this.route.snapshot.params['id'];
    if(id !== 'new') {
      this.type = "edit";
      this.id = +id;
      this.getUserDetails(+id);
    }
  }

  getUserDetails(id: number) {
    this.crud.getUser(id).subscribe({
      next: (value) => {
        if(value.status === 200) {
          this.fillUserForm(value.data);
        }
      },
      error: (err) => {
        
      },
    })
  }

  fillUserForm(user: User) {
    this.userForm.patchValue({
      name: user.name,
      age: user.age,
      email: user.email,
      mobile: user.mobile,
      framework: user.framework
    })
  }

  userForm: FormGroup = this.fb.group({
    name: [''],
    age: [''],
    email: [''],
    mobile: [''],
    framework: ['']
  })

  submit(fd: any) {
    let user: User = {
      name: fd.name ?? "",
      age: parseInt(fd.age) ?? 0,
      email: fd.email ?? "",
      mobile: parseInt(fd.mobile) ?? 0,
      framework: fd.framework ?? ""
    };
    // console.log(user);
    if(this.type === "create") {
      this.createUser(user);
    } else {
      this.editUser(user, this.id)
    }
  }

  createUser(user: User) {
    this.crud.createUser(user).subscribe({
      next: (value) => {
        if(value.status === 201) {
          this.router.navigateByUrl("/home/admin");
        }
      },
      error: (err) => {
        
      },
    })
  }

  editUser(user: User, id: number) {
    this.crud.editUser(user, id).subscribe({
      next: (value) => {
        if(value.status === 200) {
          this.router.navigateByUrl("/home/admin");
        }
      },
      error: (err) => {
        
      },
    })
  }


}
