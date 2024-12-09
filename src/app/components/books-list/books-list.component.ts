import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AiPoweredService } from 'src/app/services/ai-powered.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.scss']
})
export class BooksListComponent implements OnInit {
  books: any[] = [];
  isLoading = true;
  userRole: string | null = '';


  constructor(private aiSuggestionsService: AiPoweredService, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.fetchBooks();
    this.userRole = this.authService.getLoggedInUserRole();
  }

  fetchBooks(): void {
    this.aiSuggestionsService.getBooks().subscribe({
      next: (response) => {
        this.books = response;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error fetching books:', error);
        this.isLoading = false;
      },
    });
  }

  editBook(book: any) {
    console.log('book  ', book);
    this.router.navigate(['/editor', book.id], {
      state: { title: book.title, content: book.content },
    });
  }
}