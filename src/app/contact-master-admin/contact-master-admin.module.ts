import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { MaterialModule } from '../material.module';
import { ContactMasterAdminComponent } from './contact-master-admin.component';
import { DetailsForAdminComponent } from './details-for-admin/details-for-admin.component';

const routes: Routes = [
  {path: '', component: ContactMasterAdminComponent},
  {path:':userid', component: DetailsForAdminComponent,pathMatch: 'full'}
];

@NgModule({
  declarations: [
    ContactMasterAdminComponent,
    DetailsForAdminComponent,
    
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    MaterialModule,
    Ng2SearchPipeModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ]
})
export class ContactMasterAdminModule { }
