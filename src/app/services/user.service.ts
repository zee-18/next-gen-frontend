import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { User } from '../components/user-management/user-management.component';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = 'http://127.0.0.1:8000/api/';

  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.baseUrl + 'users/').pipe(
      catchError(this.handleError<User[]>('getUsers', []))
    );
  }

  updateUserRole(id: number, role: string): Observable<User> {
    const url = `${this.baseUrl}update-role/${id}/`;
    return this.http.put<User>(url, { role }).pipe(
      catchError(this.handleError<User>('updateUserRole'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return new Observable(observer => observer.next(result as T));
    };
  }
}
