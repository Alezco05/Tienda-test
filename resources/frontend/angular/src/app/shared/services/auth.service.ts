import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  token: string;
  sessionID: number;
 // echo: Echo;
  usuario: {
    created_at: string;
    email: string;
    email_verified_at: string;
    id: number;
    name: string;
    updated_at: string;
    username: string;
  };
  headers: HttpHeaders;
  private url = environment.url;
  constructor(private http: HttpClient) {
    this.getToken();
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
  }
  login(data) {
    return this.http.post(`${this.url}/auth/login`, data, { headers: this.headers });
  }
  signup(data) {
    return this.http.post(`${this.url}/auth/signup`, data, { headers: this.headers });
  }
  forgotPassword(data) {
    return this.http.post(`${this.url}/forget`, data, { headers: this.headers });
  }
  resetPassword(data) {
    return this.http.post(`${this.url}/password/reset`, data, { headers: this.headers });
  }
  getUser() {
    const usuario = localStorage.getItem('usuario');
    if (!usuario) return null;
    const userJSON = JSON.parse(usuario);
    this.usuario = userJSON['user'];
  }
  getToken() {
    const usuario = localStorage.getItem('usuario');
    if (!usuario) return null;
    const userJSON = JSON.parse(usuario);
    this.token = userJSON['token_type'] + ' ' + userJSON['access_token'];
    this.getUser();
  }
  getInfoToken() {
    const userJSON = JSON.parse(localStorage.getItem('usuario'));
    if (!userJSON) return;
    moment().isAfter(userJSON['expires_at']) && this.deleteToken();
  }
  deleteToken() {
    localStorage.removeItem('usuario');
  }
 }
