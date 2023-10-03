import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from '../material.module';
import { HttpClientModule } from '@angular/common/http';
import { appGuard } from '../app.guard';
import { updateUserComponent } from './update-user.component';



const routes: Routes = [
  { path: '', component: updateUserComponent },
 
]

@NgModule({
  declarations: [
 
    updateUserComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    HttpClientModule,
    MaterialModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
 
  
})
export class UpdateUserModule {
 
 }
