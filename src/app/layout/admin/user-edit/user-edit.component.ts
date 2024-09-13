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
  getRouteParams() {
    let id = this.route.snapshot.params['id'];
    if(id !== 'new') {
      this.type = "edit";
    }
  }

  getUserDetails(id: number) {
    
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
    this.createUser(user);
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


}
