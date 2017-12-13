import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { HomeComponent } from './home.component';
import { UserComponent } from '../user/user.component';
import { EvService } from '../ev.service';

import { EqualValidator } from '../data/equal-validator.directive';

const homeRouting: ModuleWithProviders = RouterModule.forChild([
  {
    path: '',
    component: HomeComponent,
  }
]);

@NgModule({
  imports: [
    homeRouting,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
  ],
  declarations: [
    HomeComponent,
    EqualValidator
  ],
  providers: [EvService]
})
export class HomeModule { }
