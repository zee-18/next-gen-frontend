import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  isAdmin: boolean = false;
  isViewer: boolean = false;
  isEditor: boolean = false;

  constructor(private router: Router, private authService: AuthService) {
    
  }

  ngOnInit(): void {
    this.isAdmin = this.authService.isAdmin();
    this.isViewer = this.authService.isViewer();
    this.isEditor = this.authService.isEditor();
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}
