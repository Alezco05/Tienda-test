import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpClientModule,
  HttpHeaders,
} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import * as moment from 'moment';
import { AuthService } from './auth.service';

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
    const headers = this.headers;
    headers.append('Authorization', this.authService.token);
    return this.http.post(`${this.url}/${route}`, data, { headers });
  }
  putData(route: string, id: number, data) {
    const headers = this.headers;
    headers.append('Authorization', this.authService.token);
    return this.http.put(`${this.url}/${route}/${id}`, data, { headers });
  }
  uploadImage(route: string, myFormData: FormData) {
    const headers = new HttpHeaders().set('Authorization', this.token);
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');
    return this.http.post(`${this.url}/${route}`, myFormData, { headers });
  }
}
