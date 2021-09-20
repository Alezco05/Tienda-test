import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from '../../models/user';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: ['']
})
export class NavbarComponent{
  constructor(public authService: AuthService, private router: Router) {
  }
  logout(){
    localStorage.clear();
    this.router.navigate(['']);
  }
}
