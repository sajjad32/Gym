import { Injectable } from '@angular/core';
import { User } from '../User';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {NgForm} from '@angular/forms';

@Injectable({
  providedIn: 'root'
})

export class UserService {
  monthes = [
    'فروردین',
    'اردیبهشت',
    'خرداد',
    'تیر',
    'مرداد',
    'شهریور',
    'مهر',
    'آبان',
    'آذر',
    'دی',
    'بهمن',
    'اسفند'
  ];
  formData = new User;
  paymentPrice = null;
  paymentMethod = '';
  readonly rootURL = 'http://localhost:8000/';
  httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private http: HttpClient) { }

  getUsers(startIndex, recordsPerPage): Observable<any> {
    const users_id = {'startIndex': startIndex, 'recordsPerPage': recordsPerPage};
    const data = JSON.stringify({users_id});
    return this.http.post(this.rootURL + 'users/', data, {headers: this.httpHeaders});
  }

  searchUsers(): Observable<any> {
    return this.http.get(this.rootURL + 'search-users/', {headers: this.httpHeaders});
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

  getTodayPresence(startIndex, recordsPerPage): Observable<any> {
    const today = {'startIndex': startIndex, 'recordsPerPage': recordsPerPage};
    const data = JSON.stringify({today});
    return this.http.post(this.rootURL + 'presents/', data, {headers: this.httpHeaders});
  }

  addUserEnter(id: number): Observable<any> {
    const date = new Date();
    const currentTime = date.getHours() + ':' + ('0' + (date.getMinutes() + 1)).slice(-2) + ':' + ('0' + date.getSeconds()).slice(-2);
    const present = {'enterTime': currentTime};
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

  getPaymentList(start_month: string, end_month: string): Observable<any> {
    const req_month = {'start_month': start_month, 'end_month': end_month};
    const data = JSON.stringify({req_month});
    return this.http.post(this.rootURL + 'payments/', data, {headers: this.httpHeaders});
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

  uploadImage(image: any, id: number) {
    const data = {'image': image, 'user_id': id};
    const req = JSON.stringify({data});
    return this.http.post(this.rootURL + 'upload-user-image/', req, {headers: this.httpHeaders});
  }

  addExercise(exercise: any, user_id: number) {
    exercise['user_id'] = user_id;
    const req = JSON.stringify({exercise});
    return this.http.post(this.rootURL + 'exercise/add', req, {headers: this.httpHeaders})
  }
}
