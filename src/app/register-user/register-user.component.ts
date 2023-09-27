import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
// import { AppService, ToasterService } from '../_services';
import { Subscription } from 'rxjs';
import { ToasterService } from '../_service/toster.service';
import { AppService } from '../_service/app.service';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})
export class RegisterUserComponent {
  showPass: boolean = true;
  form: any;
 // private subscription: Subscription = new Subscription();
  gender: any[] = [
    {value: 'male', viewValue: 'Male'},
    {value: 'female', viewValue: 'Female'},
   // {value: 'tacos-2', viewValue: 'Tacos'},
  ];
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
      first_name: new FormControl('', [Validators.required]),
      last_name: new FormControl('', [Validators.required]),
     // emailid: new FormControl('', [Validators.required,Validators.pattern('/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*#?&^_-]).{8,}/')]),
     emailid: new FormControl('', [Validators.required,Validators.email,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]), 
     mobile: new FormControl('', [Validators.required,Validators.pattern('[0-9]{10}')]),
      password: new FormControl('', [Validators.required,Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{5,}$")]),
      gender : new FormControl(''),
      company_name: new FormControl(''),
    });
  }

  // ngAfterViewInit(): void {
  //   this.service.logout();    
  // }

  get formCtrl() {
    return this.form.controls;
  }
  // onPasswordInput() {
  //   if (this.form.hasError('passwordMismatch'))
  //     this.password.setErrors([{'passwordMismatch': true}]);
   
  // }
  registerUser(): void {
    
    if(!this.form.valid) {
      this.toaster.error("Please enter required fields","Warning");
      return;
    }
    let match = this.form.value;
    this.service.registerUser(match).subscribe((res: any) => {
      if(res.status == 200) {
       // this.ngOnInit();
        this.toaster.success(res.message,"Success");
      this.router.navigate(['/home']);
      } else {
        this.toaster.error(res.message, "Warning");
      }

    })
    // (error: any) => {
    //   this.toaster.error(`Technical issue ${error}`, "Warning");
    // };
  }

  // ngOnDestroy(): void {
  //   this.subscription.unsubscribe();
  // }
}
