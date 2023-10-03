import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from '../material.module';
import { HttpClientModule } from '@angular/common/http';
import { UserProfileComponent } from './user-profile.component';

import { appGuard } from '../app.guard';



const routes: Routes = [
  { path: '', component: UserProfileComponent },

]

@NgModule({
  declarations: [
    UserProfileComponent,

  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    HttpClientModule,
    MaterialModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ]
})
export class UserProfileModule {
 
 }
