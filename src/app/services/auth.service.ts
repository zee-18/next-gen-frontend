import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loginUrl = 'http://localhost:8000/api/login/';

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<boolean> {
    const payload = { username, password };

    // Simulate HTTP API call for authentication
    return this.http.post<{ success: boolean }>(this.loginUrl, payload).pipe(
      map(response => response.success),
      catchError(() => {
        console.error('Login failed.');
        return of(false); // Simulate failed login
      })
    );
  }
}
