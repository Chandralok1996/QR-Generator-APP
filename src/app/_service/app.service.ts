import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs'
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ToasterService } from './toster.service';
export interface Users {
  name: string;
  password: string;
}
@Injectable({
  providedIn: 'root'
})

export class AppService {

  private userSubject: BehaviorSubject<any>;
  public user: Observable<any>;
  userData: any;
  public pagination: any = [10, 25, 50, 100];
  
  constructor( private _http: HttpClient, private router: Router, private _cookie: CookieService, private toaster: ToasterService ) {
    
    this.userSubject = new BehaviorSubject<any>(localStorage.getItem('user'));
    this.user = this.userSubject.asObservable();
    console.log(this.user);
   }




  userLogIn(data: Users): Observable<any[]> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this._http.post<any[]>( `${environment._url}/api/v1/userLogin`, data, httpOptions ).pipe(map((userData: any) => {
      if (userData.status) {
        localStorage.setItem('user', JSON.stringify(userData));
        this._cookie.set("token", userData.token)
        this.userSubject = userData;
        console.log(userData,"userdata")
        return userData;
        
      } else {
        return '';
      }
    }));
  }

  gettoken() {
    return !!(localStorage.getItem('user') && this._cookie.get('token'));
  }

  public get userValue(): any {
    return this.userSubject.value;
  }

  logout(): void {
    
     this._cookie.delete('token');
     this._cookie.deleteAll();
    localStorage.removeItem('user');
    localStorage.clear();
    // this.userSubject.next(null);
      this.toaster.success('Log out successfully.',"success");
      this.router.navigate(['/sign-in']);
   
  }

  createContact(data: any): Observable<any[]> {
    const httpOptions = { 
      headers: new HttpHeaders(
        { 
        'Content-Type': 'application/json',
        'auth-token': JSON.parse(localStorage.getItem('user') || '').token})
  };
    return this._http.post<any[]>(`${environment._url}/contact/create`, data, httpOptions);
  }
  registerUser(data: any): Observable<any[]> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'})};
    return this._http.post<any[]>(`${environment._url}/api/v1/userRegistration`, data, httpOptions);
  }
  getContactList(): Observable<any[]> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json','auth-token':JSON.parse(localStorage.getItem('user') || '').token})};
    return this._http.get<any[]>(`${environment._url}/contact`, httpOptions);
  }
  getAllUserContactListForAdmin(): Observable<any[]> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json','auth-token':JSON.parse(localStorage.getItem('user') || '').token})};
    return this._http.get<any[]>(`${environment._url}/user/api/v1/getuser`, httpOptions);
  }
  countryCode(): Observable<any[]> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'})};
    return this._http.get<any[]>(`../../assets/CountryCodes.json`, httpOptions);
  }

  getContactDetails(id: number): Observable<any[]> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json','auth-token': JSON.parse(localStorage.getItem('user') || '').token})};
    return this._http.get<any[]>(`${environment._url}/contact/${id}`, httpOptions);
  }
  getUserContactDetailsForAdmin(user_id: number): Observable<any[]> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json','auth-token': JSON.parse(localStorage.getItem('user') || '').token})};
  
    const params = new HttpParams({
    
          fromString: `user_id=${user_id}`
    
        });
    return this._http.get<any[]>(`${environment._url}/contact?${params}`, httpOptions);
  }
  getUserProfileDetails(user_id: number): Observable<any[]> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json','auth-token': JSON.parse(localStorage.getItem('user') || '').token})};
    return this._http.get<any[]>(`${environment._url}/user/api/v1/getUserDetails/${user_id}`, httpOptions);
  }
  getUserContactDetails(user_id: number): Observable<any[]> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json','auth-token': JSON.parse(localStorage.getItem('user') || '').token})};
    return this._http.get<any[]>(`${environment._url}/user/api/v1/getUserDetails/${user_id}`, httpOptions);
  }
  deleteContactData(id: number): Observable<any[]> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json','auth-token': JSON.parse(localStorage.getItem('user') || '').token})};
    return this._http.get<any[]>(`${environment._url}/contact/delete/${id}`, httpOptions);
  }

  updateContactData(data: any, id: number): Observable<any[]> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json','auth-token': JSON.parse(localStorage.getItem('user') || '').token})};
    return this._http.put<any[]>(`${environment._url}/contact/update/${id}`, data, httpOptions);
  }
  updateUserStatus(data: any): Observable<any[]> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json','auth-token': JSON.parse(localStorage.getItem('user') || '').token})};
    return this._http.put<any[]>(`${environment._url}/user/api/v1/updateUserStatus`, data, httpOptions);
  }
  updateUserDetails(data: any): Observable<any[]> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json','auth-token': JSON.parse(localStorage.getItem('user') || '').token})};
    return this._http.put<any[]>(`${environment._url}/user/api/v1/updateuser`, data, httpOptions);
  }
  
  resetUserPassword(data: any): Observable<any[]> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'})};
    return this._http.put<any[]>(`${environment._url}/api/v1/resetpassword`, data, httpOptions);
  }
  uploadFiles(data: any): Observable<any[]> {
    const httpOptions = { headers: new HttpHeaders({'auth-token': JSON.parse(localStorage.getItem('user') || '').token})};
    return this._http.post<any[]>(`${environment._url}/contact/upload`, data, httpOptions);
  }
}
