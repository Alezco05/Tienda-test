import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import * as moment from 'moment';
// import Echo from 'laravel-echo';

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
  headers2: HttpHeaders;
  private url = environment.url;
  private namedb = environment.namedb;
  constructor(private http: HttpClient) {
    this.getToken();
    this.headers = new HttpHeaders({
      namedb: this.namedb
    });
    this.headers2 = new HttpHeaders({
      namedb: this.namedb,
      'Content-Type': 'application/json',
      Authorization: this.token,
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
  getMenu(data){
    return this.http.post(`${this.url}/menu`,data, { headers: this.headers });
  }
 /*  getSockets(): Echo {
    this.echo = new Echo({
      broadcaster: 'pusher',
      key: environment.pusher_key,
      wsHost: environment.pusher_host,
      cluster: environment.pusher_cluster,
      authEndpoint: `${this.url}/broadcasting/auth`,
      auth: {
        headers: {
          namedb: this.namedb,
          'Content-Type': 'application/json',
          Authorization: this.token,
        }
      },
      wsPort: 6001,
      disableStats: true,
      enabledTransports: ['ws']
    });
    this.sessionID = this.echo.connector.pusher.sessionID;
    return this.echo;
  }
 */
}
