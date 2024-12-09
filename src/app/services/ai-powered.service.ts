import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AiPoweredService {

  private apiUrl = 'http://127.0.0.1:8000/api/';

  constructor(private http: HttpClient) {}

  getSuggestions(content: string) {
    return this.http.post(this.apiUrl + 'suggestions/', { content });
  }

  saveBook(data: { title: string; content: string }): Observable<any> {
    return this.http.post(this.apiUrl + 'save-book/', data);
  }

  updateBook(data: { title: string; content: string }, id: number): Observable<any> {
    return this.http.put(this.apiUrl + 'books/' + id + '/update/', data);
  }

  getBooks(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + 'books/');
  }

  getWordsTrend() {
    return this.http.get<{ stats: any[] }>(this.apiUrl + 'writing-stats/');
  }
}
