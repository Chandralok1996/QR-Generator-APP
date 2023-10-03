import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { appGuard } from './app.guard';




const routes: Routes = [
 // { path: '', redirectTo: 'helmet-detector', pathMatch: 'full' },
  { path: '', redirectTo: 'sign-in', pathMatch: 'full' },
  { path: 'sign-in', loadChildren:()=>import('./login/login.module').then(m => m.LoginModule) },
  { path: 'contact-master', loadChildren: () => import('./contact-master/contact-master.module').then(m => m.ContactMasterModule)},
  { path: 'contact-master-admin', loadChildren: () => import('./contact-master-admin/contact-master-admin.module').then(m => m.ContactMasterAdminModule)},
  //{ path: 'helmet-detector', loadChildren: () => import('./helmet-detector/helmet-detector.module').then(m => m.HelmetDetectorModule)},
  { path: 'reset-password', loadChildren:()=>import('./reset-password/reset-password.module').then(m => m.ResetPasswordModule) , canActivate: [appGuard] },
  { path: 'reset-password/:id', loadChildren:()=>import('./reset-password/reset-password.module').then(m => m.ResetPasswordModule) , canActivate: [appGuard] },
 
  { path: 'register-user', loadChildren:()=>import('./register-user/register-user.module').then(m => m.RegisterUserModule) , canActivate: [appGuard] },
 // {path: 'update-user/:id', component: UpdateUserComponent, pathMatch: 'full', canActivate: [appGuard]},
  { path: 'update-user/:id', loadChildren:()=>import('./update-user/update-user.module').then(m => m.UpdateUserModule) , canActivate: [appGuard]},
  { path: 'user-profile/:id', loadChildren:()=>import('./user-profile/user-profile.module').then(m => m.UserProfileModule) , canActivate: [appGuard] },
  
  { path: '**', redirectTo: 'sign-in', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
