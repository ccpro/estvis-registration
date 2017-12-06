import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule, FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home-page',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  rForm: FormGroup;
  post: any;

  //
  // form fields for company
  //
  companyName = '';
  companyAddr = '';
  companyAdminName = '';
  companyPhone = '';
  companyFax = '';
  companyEmail = '';

  constructor(
    private router: Router,
    private fb: FormBuilder
  ) {
    this.createForm();
  }

  createForm() {
    this.rForm = this.fb.group({
      'companyName': ['', Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(128)])],
      'companyAddr': ['', Validators.required],
      'companyAdminName': ['', Validators.required],
      'companyPhone': ['', Validators.required],
      'companyFax': ['', Validators.required],
      'companyEmail': ['', Validators.email]
    });
  }

  saveInfo(post) {
    this.companyName = post.companyName;
  }
}
