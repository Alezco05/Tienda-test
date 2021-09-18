import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpClientModule,
  HttpHeaders,
} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import * as moment from 'moment';
import { AuthService } from './auth.service';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  token: string;
  headers: HttpHeaders;
  private url = environment.url;
  constructor(private http: HttpClient, private authService: AuthService) {
    //
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json',
      // Authorization: this.token,
    });
  }
  presentSwall(title, html, icon, timer) {
    Swal.fire({ title, html, icon, timer, timerProgressBar: true });
  }
  setHeaders() {
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json',
       Authorization: this.authService.token,
    });
  }
  getAllData(route: string) {
    return this.http.get(`${this.url}/${route}`, {
      headers: this.headers,
    });
  }
  getData(route: string, id: number) {
    return this.http.get(`${this.url}/${route}/${id}`, {
      headers: this.headers,
    });
  }

  postData(route: string, data) {
    this.setHeaders();
    return this.http.post(`${this.url}/${route}`, data, { headers: this.headers });
  }
  putData(route: string, id: number, data) {
    this.setHeaders();
    return this.http.put(`${this.url}/${route}/${id}`, data, { headers: this.headers });
  }
  deleteData(route: string, id: number) {
    this.setHeaders();
    return this.http.delete(`${this.url}/${route}/${id}`, { headers: this.headers });
  }
  uploadImage(route: string, myFormData: FormData) {
    const headers = new HttpHeaders().set('Authorization', this.authService.token);
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');
    return this.http.post(`${this.url}/${route}`, myFormData, { headers });
  }
}
