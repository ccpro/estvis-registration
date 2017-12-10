import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { UserInfo } from '../data/formData.model';

@Component({
  moduleId: module.id,
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  @Input() group: any[];
  public userForm: FormGroup;

  constructor() { }

  ngOnInit() {
  }

}
