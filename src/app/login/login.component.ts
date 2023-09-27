import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
// import { AppService, ToasterService } from '../_services';
import { Subscription } from 'rxjs';
import { ToasterService } from '../_service/toster.service';
import { AppService } from '../_service/app.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  showPass: boolean = true;
  form: any;
  match:any;

  private subscription: Subscription = new Subscription();

  constructor(private toaster: ToasterService, private service: AppService, public router: Router) {
    // this.service.user.subscribe((res: any) => {
    //   const response = JSON.parse(res);
    //   if(response?.roleName) {
    //     if(response.roleName == 'developer') {
    //       this.router.navigate(['/home']);
    //     } else {
    //       console.log(response)
    //       this.router.navigate(['/home']);
    //     }
    //   }
    // }, (error: any) => {
    //   console.log(error);
    // }); 
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
  }

  // ngAfterViewInit(): void {
  //   this.service.logout();    
  // }

  get formCtrl() {
    return this.form.controls;
  }

  createForm(): void {
    
    if(!this.form.valid) {
      this.toaster.error("Please enter valid user and password!","error");
      return;
    }
    this.match = this.form.value;
    // this.router.navigate(['/contact-master'])
    // this.toaster.success('User login successful!',"success");
  //  window.location.reload();
   this.subscription.add(
      this.service.userLogIn(this.match).subscribe((res: any) => {
        if (res.status == 200) {
          this.toaster.success('User login successful!',"success");
          if(res.rolename == "Administrator"){
          this.router.navigate(['/contact-master-admin']);
          }
          else{
          this.router.navigate(['/contact-master']);
          }
        } else {
         this.toaster.error(res.message,"Warning");
        }
      }, 
      // (error: any) => {
      //   this.toaster.error('Please enter a valid username and password!' + error);
      // }
    ));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
