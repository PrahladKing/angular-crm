import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CrudService } from '../../../shared/services/crud.service';
import { User } from '../../../shared/models/user';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [JsonPipe],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent implements OnInit{

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private crud = inject(CrudService);
  constructor() {
    
  }
  ngOnInit(): void {
    this.getRouteParams();
  }

  getRouteParams() {
    let id: string = this.route.snapshot.params['id'];
    this.getUser(+id);
  }

  user!: User
  getUser(id: number) {
    this.crud.getUser(id).subscribe({
      next: (value) => {
        if(value.status === 200) {
          this.user = value.data;
        }
      },
      error: (err) => {
        
      },
    })
  }

}
