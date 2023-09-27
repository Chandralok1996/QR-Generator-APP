import { SelectionModel } from '@angular/cdk/collections';
import { HttpParams } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
//import { IncidentService } from 'src/app/_services/incident.service';
import * as XLSX from 'xlsx';
import * as QRCode from 'qrcode';
import { AppService, ToasterService } from '../_service';
const vCardsJS = require('vcards-js');
const download = require('downloadjs');

@Component({
  selector: 'app-contact-master-admin',
  templateUrl: './contact-master-admin.component.html',
  styleUrls: ['./contact-master-admin.component.css']
})
export class ContactMasterAdminComponent {
  excel: any;
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  displayedColumns: string[] = ['select','fullname','loginname', 'status'];

  selection = new SelectionModel<any>(true, []);
  tabledata: any = [];
  value: any;
  length = 32;
  pageSize = 8;
  pageSizeOptions: number[] = [8, 16, 24, 32];
  qrCodeSize: number = 400;
  listData: any;
  searchData: any;
  isExcelDownload: boolean = false;
  id: any;
  vCard: any = vCardsJS();
  excelFile: any;
  deleteContactID: any;
  editContact: boolean = false;
  imageURL: any;
  countryCode: any;
  paramData:any;
  userContactDetails:any;
  status = 'ACTIVE';
  selectedData:any;
  userDetails:any = [];
  user_id:any;

  constructor( private common: AppService, private toaster: ToasterService,private route: ActivatedRoute,public router: Router) {
    this.vCard.workAddress.label = 'Firmenanschrift';
    this.vCard.version = '3.0';
  }

  ngOnInit(): void {
    
    this.paramData = this.route.snapshot.params;
    this.getDataList();
    this.getCountryCode();
  }
 /** Whether the number of selected elements matches the total number of rows. */
 isAllSelected() {
  const numSelected = this.selection.selected.length;
  this.selectedData=this.selection.selected;
  const numRows = this.dataSource.data.length;
  return numSelected === numRows;
}

/** Selects all rows if they are not all selected; otherwise clear selection. */
masterToggle() {

  this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
}
  onFileSelect(target: any) {
    this.excelFile = [];
    var files = target.files;
    for (let i = 0; i < files.length; i++) {
      this.excelFile.push(files[i]);
    }
  }

  getCountryCode(): void {
    this.common.countryCode().subscribe((res: any) => {
      this.countryCode = res;
    }),
    (error: any) => {
      this.toaster.error("Some technical error "+error, "Error");
    }
  }
  applyFilter(event: any) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  uploadResume(): void {
    debugger
    let formData: FormData = new FormData();
    for (let i = 0; i < this.excelFile.length; i++) {
      formData.append('images', this.excelFile[i]);
    }
    this.common.uploadFiles(formData).subscribe((res: any) => {
      if(res.status == 200) {
        this.ngOnInit();
        this.toaster.success(res.message, "Success");
      } else {
        this.toaster.error(res.message, "Error");
      }
    }),
    (error: any) => {
      this.toaster.error("Some technical error "+error, "Error");
    }
  }
  changeStatus(data:any){
   
    //let result = this.selectedData.map((a:any) => a.user_id && a.status);
    this.selectedData.forEach((element:any) => {
      this.userDetails.push({
        "user_id":element.user_id,
        "status":data
      })
    });
    console.log(this.userDetails);

    this.common.updateUserStatus(this.userDetails).subscribe((res: any) => {
      if(res.status == 200) {
        this.status = "ACTIVE";
        this.ngOnInit();
        this.toaster.success(res.message, "Success");
      } else {
        this.toaster.error(res.message, "Error");
      }
    })
  }
  generateQr(data: any) {
    this.id = data.contact_id;
    this.user_id = data.user_id;
    this.vCard.loginname = data.loginname;
    this.vCard.fullname = data.fullname;
    this.vCard.status = data.status;
    // this.vCard.workPhone = data.phonenumber;
    // this.vCard.organization = data.companyname;
    // this.vCard.title = data.jobprofile;
    // this.vCard.url = data.website;
    // this.vCard.workAddress.street = data.street;
    // this.vCard.workAddress.city = data.city;
    // this.vCard.workAddress.stateProvince = data.state;
    // this.vCard.workAddress.postalCode = data.pincode;
    // this.vCard.workAddress.countryRegion = data.country;
    // this.vCard.workEmail = data.email;
    // this.vCard.workFax = data.faxnumber;
    // this.vCard.workPhone = `${data.countrycode ? '+'+data.countrycode : ''}${data.contactnumber}`;
    var opts = {
      errorCorrectionLevel: 'H',
      type: 'image/jpeg',
      quality: 0.3,
      margin: 1,
      color: {
        dark:"#010599FF",
        light:"#FFBF60FF"
      }
    }
    QRCode.toDataURL(this.vCard.getFormattedString()).then((url: any) => {
      this.imageURL = url;
    }).catch((err: any) => {
      console.log(err);
      this.toaster.warning("Please select contact", "Warning");
    });

  }

  downloadQRCode(type: any) {
    if (!this.vCard) {
      return;
    }
    var fileName = `${this.vCard.firstName} ${this.vCard.lastName}`;
    if (type === 'SVG') {
      QRCode.toString(this.vCard.getFormattedString(), { type: 'svg' }, (error: any, string: any) => {
        if (error) {
          console.error(error);
          return;
        }
        download(string, `${fileName}.svg`, 'image/svg+xm');
      });
    } else if (type === 'PNG') {
      QRCode.toDataURL(this.vCard.getFormattedString(), (error: any, string: any) => {
        if (error) {
          console.error(error);
          return;
        }
        download(string, `${fileName}.png`, 'image/png');
      });
    } else if (type === 'vcf') {
      download(this.vCard.getFormattedString(), `${fileName}.vcf`, 'text/vcard');
    }
  }
  getUserDetails(userid:any){
    
 this.router.navigate(['/contact-master-admin',userid]);
  }
  newContact(): void {
    this.vCard = vCardsJS();
    this.vCard.workAddress.label = 'Firmenanschrift';
    this.vCard.version = '3.0';
    console.log(this.vCard);
    this.editContact = false;
  }

  createQRCode() {
    
    console.log(this.vCard);
    var contData: any = {
      phonenumber :  (this.vCard.cellPhone) ? this.vCard.cellPhone : '',
      firstname :  (this.vCard.firstName) ? this.vCard.firstName : '',
      lastname :  (this.vCard.lastName) ? this.vCard.lastName : '',
      companyname :  (this.vCard.organization) ? this.vCard.organization : '',
      jobprofile :  (this.vCard.title) ? this.vCard.title : '',
      street: (this.vCard.workAddress.street) ? this.vCard.workAddress.street : '',
      city: (this.vCard.workAddress.city) ? this.vCard.workAddress.city : '',
      state: (this.vCard.workAddress.stateProvince) ? this.vCard.workAddress.stateProvince : '',
      country: (this.vCard.workAddress.countryRegion) ? this.vCard.workAddress.countryRegion : '',
      pincode: (this.vCard.workAddress.postalCode) ? this.vCard.workAddress.postalCode : '',
      website: (this.vCard.url) ? this.vCard.url : '',
      email :  (this.vCard.workEmail) ? this.vCard.workEmail : '',
      faxnumber :  (this.vCard.workFax) ? this.vCard.workFax : '',
      contactnumber :  (this.vCard.workPhone) ? this.vCard.workPhone : '',
      countrycode :  (this.vCard.note) ? this.vCard.note : ''
    }
    let keys = Object.keys(contData);
    let match: any = {};
    keys.forEach((item: any) => {
      if(contData[item]) {
        match[item] = contData[item];
      }
    });
    if(this.editContact) {
      this.common.updateContactData(contData, this.id).subscribe((res: any) => {
        if(res.status == 200) {
          this.ngOnInit();
          this.toaster.success(res.message, "Success");
        } else {
          this.toaster.error(res.message, "Error");
        }
      }),
      (error: any) => {
        this.toaster.error(`Technical issue ${error}`, "Error");
      };
      this.editContact = false;
    } else {
      
      this.common.createContact(contData).subscribe((res: any) => {
        if(res.status == 200) {
          this.ngOnInit();
          this.toaster.success(res.message, "Success");
        } else {
          this.toaster.error(res.message, "Error");
        }
      }),
      (error: any) => {
        this.toaster.error(`Technical issue ${error}`, "Error");
      };
    }
  }

  getDataList(): void {
    
    this.common.getAllUserContactListForAdmin().subscribe((res: any) => {
      
      if(res.status) {
        this.listData = res.result;
        this.dataSource = new MatTableDataSource( this.listData );       
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator; 
        this.isExcelDownload = true;
        this.excel=this.listData;
       // this.limits.push({ key: 'ALL', value: this.listData.length });
        this.toaster.success(res.message, "Success");
      } else {
        this.toaster.error(res.message, "Error");
      }
    }),
    (error: any) => {
      this.toaster.error(`Technical issue ${error}`, "Error");
    };
  }

  selectQRCode(data: any, method: string): void {
    
    if (method === 'EDIT') {
      this.common.getContactDetails(data.contact_id).subscribe((res: any) => {
        if(res.status == 200) {
           this.userContactDetails = res.data[0];
          this.toaster.success(res.message, "Success");
          this.vCard.id = this.userContactDetails.contact_id;
        this.vCard.cellPhone = this.userContactDetails.phonenumber;
        this.vCard.firstName = this.userContactDetails.firstname;
        this.vCard.lastName = this.userContactDetails.lastname;
        this.vCard.middleName = this.userContactDetails.middlename;
        this.vCard.workPhone = this.userContactDetails.contactnumber;
        this.vCard.note = this.userContactDetails.countrycode;
        this.vCard.organization = this.userContactDetails.companyname;
        this.vCard.title = this.userContactDetails.jobprofile;
        this.vCard.url = this.userContactDetails.website;
        this.vCard.workAddress.street = this.userContactDetails.street;
        this.vCard.workAddress.city = this.userContactDetails.city;
        this.vCard.workAddress.stateProvince = this.userContactDetails.state;
        this.vCard.workAddress.postalCode = this.userContactDetails.pincode;
        this.vCard.workAddress.countryRegion = this.userContactDetails.countrycode;
        this.vCard.workEmail = this.userContactDetails.email;
        this.vCard.workFax = this.userContactDetails.faxnumber;
        this.vCard.workPhone = this.userContactDetails.contactnumber;
        console.log(this.vCard);
        this.newContact();
        this.editContact = true;
        } else {
          this.toaster.error(res.message, "Error");
        }
      }),
      (error: any) => {
        this.toaster.error(`Technical issue ${error}`, "Error");
      };
    
   } 
   
   else {
      this.deleteContactID = this.userContactDetails.contact_id;
      
    }
  }

  deleteContact(): void {
    this.common.deleteContactData(this.deleteContactID).subscribe((res: any) => {
      if(res.status == 200) {
        this.ngOnInit();
        this.toaster.success(res.message, "Success");
      } else {
        this.toaster.error(res.message, "Error");
      }
    }),
    (error: any) => {
      this.toaster.error(`Technical issue ${error}`, "Error");
    };
  }

  qrSize(data: any) {
    this.qrCodeSize = data.value;
  }

  refresh(): void {
    this.ngOnInit();
  }

  dataLimit(): void{
 //   this.limit = ( document.getElementById('limit') as HTMLInputElement).value;
  }

  // download(): void {
  //   let wb = XLSX.utils.table_to_book(document.getElementById('export'), { display: false, raw: true });
  //   XLSX.writeFile(wb, "Contact Data export.xlsx");
  // }
  exportAsXLSX() {
    var ws = XLSX.utils.json_to_sheet(this.excel);
    var wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "data");
    XLSX.writeFile(wb, "Contact Data Report.xlsx");
  }

}
