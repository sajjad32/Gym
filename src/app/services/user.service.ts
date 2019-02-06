import { Injectable } from '@angular/core';
import { User } from '../User';
import { USERS } from '../mock-users';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {NgForm} from '@angular/forms';

@Injectable({
  providedIn: 'root'
})

export class UserService {
  formData: User;
  paymentPrice = null;
  paymentMethod = '';
  readonly rootURL = 'http://localhost:8000/';
  httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private http: HttpClient) { }

  getUsers(): Observable<any> {
    return this.http.get(this.rootURL + 'users/', {headers: this.httpHeaders});
  }

  getUser(id: number): Observable<any> {
    return this.http.get(this.rootURL + 'users/' + id, {headers: this.httpHeaders});
  }

  addUser(user: User) {
    const data = JSON.stringify({user});
    return this.http.post(this.rootURL + 'users/add', data, {headers: this.httpHeaders});
  }

  updateUser(user: User, id: number): Observable<any> {
    const data = JSON.stringify({user});
    return this.http.post(this.rootURL + 'users/update/' + id, data,  {headers: this.httpHeaders});
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete(this.rootURL + 'users/delete/' + id, {headers: this.httpHeaders});
  }

  getTodayPresence(): Observable<any> {
    return this.http.get(this.rootURL + 'presents/', {headers: this.httpHeaders});
  }

  addUserEnter(id: number): Observable<any> {
    const date = new Date();
    const currentDate = date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2);
    const currentTime = date.getHours() + ':' + ('0' + (date.getMinutes() + 1)).slice(-2) + ':' + ('0' + date.getSeconds()).slice(-2);
    const present = {'enterTime': currentTime, 'date': currentDate};
    const data = JSON.stringify({present});
    return this.http.post(this.rootURL + 'presents/enter/' + id, data, {headers: this.httpHeaders} );
  }

  addUserOut(id: number): Observable<any> {
    const date = new Date();
    const currentTime = date.getHours() + ':' + ('0' + (date.getMinutes() + 1)).slice(-2) + ':' + ('0' + date.getSeconds()).slice(-2);
    const absence = {'outTime': currentTime};
    const data = JSON.stringify({absence});
    return this.http.post(this.rootURL + 'presents/out/' + id, data, {headers: this.httpHeaders} );
  }

  getPaymentList(): Observable<any> {
    return this.http.get(this.rootURL + 'payments/', {headers: this.httpHeaders});
  }

  addPayment(payment, id): Observable<any> {
    const data = JSON.stringify({payment});
    return this.http.post(this.rootURL + 'payments/add/' + id, data, {headers: this.httpHeaders});
  }

  getUsersNo(startDate: string, endDate: string): Observable<any> {
    const data = {'startDate': startDate, 'endDate': endDate};
    const req = JSON.stringify({data});
    return this.http.post(this.rootURL + 'user-diagram/', req, {headers: this.httpHeaders});
  }
}
