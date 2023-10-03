import { CommonModule } from "@angular/common";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { ActivatedRoute, Router, RouterModule } from "@angular/router";

import { AppService, ToasterService } from "src/app/_service";
import { MaterialModule } from "../material.module";

@Component({
  selector: "app-update-user",
  templateUrl: "./update-user.component.html",
  styleUrls: ["./update-user.component.css"]
})
export class updateUserComponent implements OnInit {
  @ViewChild("exampleModal", { static: true }) exampleModalRef!: ElementRef;
  @ViewChild("closeButton") closeButton: any;
  public buttonName: any = "Show";
  public sys: boolean = false;
  public contact: boolean = false;
  loading = false;
  form: any;
  submitted = false;

  products7: any;
  products8: any = [];
  products9: any = [];
  products10: any = [];
  products11: any = [];
  usergrp: any = [];
  role: any = [];
  designation: any = [];
  department: any = [];
  floors: any = [];
  usertype: any = [];
  reportingtoo: any = [];
  userType1: any;
  empid1: any;

  keyword1 = "username1";
  keyword2 = "concat";

  title1: any;
  fname: any;
  lname: any;
  mname: any;
  email: any;
  desig: any;
  mobile: any;

  div1: boolean = true;
  div2: boolean = true;
  div3: boolean = true;
  statusClass = "not-active";
  statusClasses = "not-active";
  statusClassess = "not-active";
  orga: any;
  item: any;
  userId: any;
  loginId: any;
  response: any;
  formData: any;
  userid: any;
  details:any; 
  companyName:any;

  constructor(
    public accountservice: AppService,
    public route: ActivatedRoute,
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    private toaster: ToasterService,
    public router: Router
  ) {}

  setActiveClass1() {
    this.statusClass = "active";
    this.statusClasses = "not-active";
    this.statusClassess = "not-active";
  }

  setActiveClass2() {
    this.statusClasses = "active";
    this.statusClass = "not-active";
    this.statusClassess = "not-active";
  }
  setActiveClass3() {
    this.statusClass = "not-active";
    this.statusClasses = "not-active";
    this.statusClassess = "active";
  }
  formSubmit(val: any) {
    console.log(val);
  }

  get f() {
    return this.form.controls;
  }

  ngOnInit(): void {
    ;
    
    this.form = this.formBuilder.group({
    
      first_name: ["", Validators.required],
      middle_name: [""],
      last_name: ["", Validators.required],
      loginname: [""],
    //  usertype: ["", Validators.required],
      mobile: ["", Validators.pattern("[0-9]{10}")],
      user_id: [""],
      company_name: [""],
      emailid: [
        "",
        [
          Validators.required,
          Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$"),
        ],
      ],
    });

    this.route.paramMap.subscribe((params) => {
      const user_id = params.get("id");
      this.userId = user_id;
      this.loginId = localStorage.getItem("user");
      this.loginId = JSON.parse(this.loginId);
      this.loginId = this.loginId.response.userId;
      console.log(this.loginId);
    });

    this.getUserProfileDetailsbyUserid(this.userId);
  }
  //get user 
  getUserProfileDetailsbyUserid(userid:any){
    
    this.accountservice.getUserProfileDetails(userid)
        .subscribe((response:any)=> {
          console.log(response);
            this.details = response.result;
        this.form.patchValue(this.details[0]);

            // this.userid=this.details[0].user_id;
            // this.fname = this.details[0].first_name;
            // this.lname = this.details[0].last_name;
            // this.mname = this.details[0].middle_name;
            // this.email = this.details[0].emailid;
            // this.mobile = this.details[0].mobile;
            // this.companyName = this.details[0].company_name;
        });
  }
  
  onSubmit() {
    
    if (this.form.invalid) {
      return;
    }
    this.loading = true;
    this.updateUser();
  }

  OnlyNumbersAllowed(event: any): boolean {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      console.log("charCode restricted is " + charCode);
      return false;
    }
    return true;
  }

  updateUser() {
    
    console.log(this.form);
    var matchValue = {
      first_name: this.form.value.first_name,
      middle_name: this.form.value.middle_name,
      last_name: this.form.value.last_name,
      company_name: this.form.value.company_name,
      loginname: this.form.value.loginname,
     // usertype: this.form.value.usertype,
      mobile: this.form.value.mobile,
      user_id: this.userId,
      emailid: this.form.value.emailid,
    };
    console.log(matchValue);
    this.accountservice.updateUserDetails(matchValue).subscribe((res: any) => {
      if(res.status == 200) {
        this.ngOnInit();
        this.toaster.success(res.message, "Success");
        this.router.navigate(['/user-profile',this.details[0].user_id]);
      } else {
        this.toaster.error(res.message, "Error");
      }
    }),
    (error: any) => {
      this.toaster.error(`Technical issue ${error}`, "Error");
    };
  }
 
}
