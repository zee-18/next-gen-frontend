import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loginUrl = 'http://localhost:8000/api/login/';
  private loggedIn = false;

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<boolean> {
    const payload = { username, password };

    return this.http.post<{ success: boolean, access: string, role: string }>(this.loginUrl, payload).pipe(
      map(response => {
        if (response.access) {
          localStorage.setItem('authToken', response.access);
          localStorage.setItem('role', response.role);
          return true; 
        } else {
          return false;
        }
      }),
      catchError(() => {
        console.error('Login failed.');
        return of(false);
      })
    );
  }

  isAuthenticated(): boolean {
    return localStorage.getItem('authToken') !== null;
  }

  isAdmin(): boolean {
    return localStorage.getItem('role') === 'admin';
  }

  isViewer(): boolean {
    return localStorage.getItem('role') === 'viewer';
  }

  isEditor(): boolean {
    return localStorage.getItem('role') === 'editor';
  }

  getLoggedInUserRole() {
    return localStorage.getItem('role');
  }

  logout(): void {
    this.loggedIn = false;
    localStorage.removeItem('authToken');
    localStorage.removeItem('role');
  }
}
