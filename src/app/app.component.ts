import { Component, OnInit } from '@angular/core';
import { AppService } from './_service/app.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit  {

  title = 'QR Code App';
  name = 'Angular';
  login: any;
  constructor(public router: Router, private service: AppService) {}

  ngOnInit(): void {
    this.login=localStorage.getItem('user')
    console.log(this.login);
  }
}
