import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.scss'
})
export class WishlistComponent implements OnInit{


  private fb = inject(FormBuilder);
  constructor() {

  }
  ngOnInit(): void {
    this.getBooksMarks();
  }

  emailForm: FormGroup = this.fb.group({
    email: [''],
    password: ['']
  })

  getBooksMarks() {

  }

  editBookMark() {

  }

  createBookMark() {

  }

  submitEmail() {
    console.log(this.emailForm.value);
  }
}
