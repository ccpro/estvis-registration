import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Event } from '@angular/router/src/events';
import {
  Component,
  OnInit
} from '@angular/core';
import {
  FormArray,
  FormControl
} from '@angular/forms';
import {
  FormsModule,
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule
} from '@angular/forms';
import {
  InsuranceInfo,
  RoleInfo,
  UserInfo
} from '../data/formData.model';
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

  rForm: FormGroup;
  roleGroup: FormGroup;
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

  constructor(private router: Router,
    private fb: FormBuilder,
    private evService: EvService) {
    // YP this.createForm();
  }

  ngOnInit() {
    this.callService();
  }

  private callService() {
    this.evService
      .getInsuranceList()
      .subscribe(
         /* happy path */ l => this.createFormEx(l), // YP this.updateValues(l),
         /* error path */ e => this.errorMessage = e,
         /* onCompleted */() => this.isLoading = false);
  }

  private updateValues(v: any) {
    this.insurances = v.list;
    this.formRoles = v.roles;

    console.log(this.formRoles);

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
      'companyAddr': ['', Validators.required],
      'companyAdminName': ['', Validators.required],
      'companyPhone': ['', Validators.required],
      'companyFax': ['', Validators.required],
      'companyEmail': ['', Validators.email],
      'companyInsurance': ['', Validators.required],
      'users': this.fb.array([this.initUser()])
    });
  }

  buildRolesControls(): any {
    const rv: any = [];
    this.formRoles.forEach(r => rv.push({ key: r.name, control: new FormControl('') }));
    return rv;
  }

  initUser() {
    const rv = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.email],
      roles: this.fb.array([])
    });

    const roleGroup = new FormGroup({});
    this.formRoles.forEach(r => roleGroup.addControl(r.name, new FormControl('')));
    rv.addControl('roles', roleGroup);

    return rv;
  }

  updateRole(index: number, roleIndex: number, roleId: number, checked: boolean) {
    console.log(index + ' - ' + roleIndex + ' - ' + roleId);

    const users = <FormArray>this.rForm.controls.users;
    const userRoles = <FormGroup>users.controls[index];
    const roles = <FormArray>userRoles.controls.roles;
    console.log(roles);

    if (checked) {
      roles[roleIndex] = roleId;
    } else {
      roles[roleIndex] = 0;
    }

    console.log(roles);
  }

  addUser() {
    const control = <FormArray>this.rForm.controls['users'];
    control.push(this.initUser());
  }

  removeUser(i: number) {
    const control = <FormArray>this.rForm.controls['users'];
    control.removeAt(i);
  }

  saveInfo(post: any) {
    this.companyName = post.companyName;
  }
}
