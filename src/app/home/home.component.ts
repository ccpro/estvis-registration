import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Event } from '@angular/router/src/events';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl } from '@angular/forms';
import { FormsModule, FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { InsuranceInfo, RoleInfo, UserInfo } from '../data/formData.model';
import { EvService } from '../ev.service';
import { UserComponent } from '../user/user.component';

@Component({
  selector: 'app-home-page',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  insurances: InsuranceInfo[] = [];
  formRoles: RoleInfo[] = [];
  selectedInsurance: number;
  errorMessage = '';
  isLoading = true;
  wasUploaded = false;

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
  adminPwd = '';
  adminCnfrmPwd = '';

  constructor(private router: Router,
    private fb: FormBuilder,
    private evService: EvService) {
  }

  ngOnInit() {
    this.callService();
  }

  private callService() {
    this.evService
      .getInsuranceList()
      .subscribe(
         /* happy path */ l => this.createFormEx(l),
         /* error path */ e => this.errorMessage = e,
         /* onCompleted */() => this.isLoading = false);
  }

  private updateValues(v: any) {
    this.insurances = v.list;
    this.formRoles = v.roles;

    for (let i = 0; i < this.insurances.length; ++i) {
      if (0 === this.insurances[i].id) {
        this.insurances[i].name = '-- please choose insurance group --';
        this.selectedInsurance = this.insurances[i].id;
      }
      // if (this.insurances[i].is_default) {
      //   this.selectedInsurance = this.insurances[i];
      //  break;
      // }
    }
  }

  createFormEx(v: any) {
    this.updateValues(v);
    this.createForm();
  }

  createForm() {
    this.rForm = this.fb.group({
      'companyName': ['', Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(128)])],
      'companyAddr': ['', Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(128)])],
      'companyAdminName': ['', Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(128)])],
      'companyPhone': ['', Validators.required],
      'companyFax': '',
      'companyInsurance': ['', Validators.required],
      'companyEmail': ['', Validators.email],
      'adminPwd': ['', Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(12)])],
      'adminCnfrmPwd': ['', Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(12)])],
      'users': this.fb.array([this.initUser()])
    });
  }

  initUser() {

    const roleGroup = new FormGroup({});
    this.formRoles.forEach(r => roleGroup.addControl(r.id + '', new FormControl('')));

    const rv = this.fb.group({
      name: ['', Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(128)])],
      email: ['', Validators.email],
      roles: roleGroup
    });
    return rv;
  }

  addUser() {
    const control = <FormArray>this.rForm.controls['users'];
    control.push(this.initUser());
  }

  removeUser(i: number) {
    const control = <FormArray>this.rForm.controls['users'];
    control.removeAt(i);
  }

  submit(data: any) {

    this.isLoading = true;

    console.log(data);
    this.evService
    .saveCompanyInfo(data)
    .subscribe(
      /* happy path */ l => this.wasUploaded = true,
      /* error path */ e => this.errorMessage = e,
      /* onCompleted */() => this.isLoading = false);
  }
}
