import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToasterService, AppService } from 'src/app/_service';

@Component({
  selector: 'app-details-for-admin',
  templateUrl: './details-for-admin.component.html',
  styleUrls: ['./details-for-admin.component.css']
})
export class DetailsForAdminComponent {
  user_id: any;
  contactData: any;
  viewContactData: any;

  constructor(private toster: ToasterService, private route: ActivatedRoute, private service: AppService) {
    this.user_id = this.route.snapshot.paramMap.get('userid');
  }

  ngOnInit(): void {
    
    this.getData(this.user_id);
  }

  getData(match: number): void {
    
    this.service.getUserContactDetailsForAdmin(match).subscribe((res: any) => {
      if(res.status == 200) {
      this.contactData = res.data;
      console.log(this.contactData.key)
        this.toster.success(res.message, "Success");
      } else {
        this.toster.error(res.message, "Error");
      }
    }),
    (error: any) => {
      this.toster.error(`Technical issue ${error}`, "Error");
    };
  }

  // viewData(data: any): void {
  //   
  //   this.viewContactData = data;
  //   var k: any = [];
  //   var vKey: any = Object.keys(data[0]);
  //   vKey.forEach((i: any) => {
  //     this.viewContactData.forEach((j: any) => {
  //       k.push({key:i,value:j[i]})
  //     });
  //   });
  //   this.contactData = k;
  // }

  refresh(): void {
    this.ngOnInit();
  }
}
