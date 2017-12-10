import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { AppComponent } from './app.component';
import { HomeModule } from './home/home.module';
import { UserComponent } from './user/user.component';
import { EvService } from './ev.service';

import {
  FooterComponent,
  HeaderComponent
} from './shared';

const rootRouting: ModuleWithProviders = RouterModule.forRoot([], { useHash: true });

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    UserComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    rootRouting,
    HomeModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [EvService],
  bootstrap: [AppComponent]
})
export class AppModule { }
