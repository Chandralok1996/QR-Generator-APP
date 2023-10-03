import { Component } from '@angular/core';

// import { AppService, ToasterService } from '../_services';
import { Subscription } from 'rxjs';
import { ToasterService } from '../_service/toster.service';
import { AppService } from '../_service/app.service';

import {
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { CustomValidators } from '../confirm-password.validator';

// import { UserService } from '../_service/user.service';
// import { MasterService } from '../_service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent {
  // username: any = [];
  // username1:any;
  showPass: boolean = true;
  showPass1: boolean = true;
  form: any;
  listData: any;
  userDetails: any;
  minPw = 8;
  pageLabel:any;


  constructor(private toaster: ToasterService, private service: AppService, public router: Router) { }

  ngOnInit(): void {
    if(this.router.url == '/reset-password')
    {
      this.pageLabel="Reset Password";
    }
    else{
      this.pageLabel="Change Password";
    }
    this.form = new FormGroup({
      loginname: new FormControl('',[(Validators.required)]),
      password: new FormControl('', [(Validators.required,Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{5,}$"))]),
      conpassword: new FormControl('',[(Validators.required)]),
    },
      [CustomValidators.MatchValidator('password', 'conpassword')]
    
    );


  }
  get formCtrl() {
    return this.form.controls;
  }
  get passwordMatchError() {
    return (
      this.form.getError('mismatch') &&
      this.form.get('conpassword')?.touched
    );
  }

  resetPassword() {

    this.userDetails = this.form.value;
    this.service.resetUserPassword(this.userDetails).subscribe((res: any) => {
      if (res.status == 200) {
        this.toaster.success(res.message, "Success");
        this.router.navigate(['/home']);
      } else {
        this.toaster.error(res.message, "Warning");
      }
    })
  }



}
