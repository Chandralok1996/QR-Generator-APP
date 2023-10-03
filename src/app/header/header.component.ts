import { Component, EventEmitter, Output, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AppService } from 'src/app/_service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent {
//  @Output() SideNavToggle = new EventEmitter();  
date: Date = new Date();
  dataSource: any;
  user: any;
  userName: any;
  currentDateTime: any;
  userRole:any;
  userDetails:any;
  userid:any; 

  constructor(public router: Router,public service: AppService, 
    public dialog: MatDialog,) { 
      setInterval(() => {
        this.date = new Date()
      }, 1000)
    }

  ngOnInit() {
    this.userDetails=localStorage.getItem('user');
    this.user = JSON.parse(this.userDetails);
    this.userName = this.user.username;
    this.userid = this.user.userid;
     this.updateDateTime();
    setInterval(() => this.updateDateTime(), 1000); // Update every 1 second
  }

  private updateDateTime() {
    const now = new Date();
    this.currentDateTime = now.toLocaleString(); // Adjust the date format as needed 
  }

  signOut(): void {
    console.log("sign out");
    this.service.logout();
    
  }

 applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();
  if (this.dataSource.paginator) {
    this.dataSource.paginator.firstPage();
  }
}
}
