import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { HomeComponent } from './home.component';

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
    CommonModule
  ],
  declarations: [
    HomeComponent
  ],
  providers: []
})
export class HomeModule { }
