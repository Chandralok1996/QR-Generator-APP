import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AppService } from '../_service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent {
 userID:any;
 userDetails:any;
 user:any;
 userName:any;
 defaultpath:any;
 file:any;
 file1:any;
 details:any;
 userid:any;


  constructor(public accountService: AppService, 
    public dialog: MatDialog,public router: Router,public route:ActivatedRoute) { 
      this.userDetails=localStorage.getItem('user');
      this.user = JSON.parse(this.userDetails);
      this.userName = this.user.username;
    }
    ngOnInit(): void {
      this.route.paramMap.subscribe((params) => {
        this.userID = params.get('id');
       this.getUserProfileDetailsbyUserid(this.userID)
     
     });
     this.start();
    }
    start(){
      this.defaultpath='../../assets/';
      this.file = this.userName+'.jpg';
      this.file1=this.defaultpath+this.file;
    }

    getUserProfileDetailsbyUserid(userid:any){
      
      this.accountService.getUserProfileDetails(this.userID)
          .subscribe((response:any)=> {
            console.log(response);
              this.details = response.result;
              this.userid=this.details[0].user_id;
              // this.file= this.details[0].firstname+' '+this.details[0].firstname+'.png';
              // console.log(this.file)
            //  console.log(this.details[0].user_id)
          });
    }
    
    OpenUpdate(){
      this.router.navigate(['/update-user',this.details[0].user_id]);
    }
}
