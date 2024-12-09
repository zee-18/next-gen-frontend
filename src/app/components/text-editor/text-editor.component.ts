import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { AiPoweredService } from 'src/app/services/ai-powered.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-text-editor',
  templateUrl: './text-editor.component.html',
  styleUrls: ['./text-editor.component.scss']
})
export class TextEditorComponent implements OnInit {
  content: string = '';
  title: string = '';
  bookId: number = 0;
  quillEditor: any;  

  constructor(private aiSuggestionsService: AiPoweredService, private snackBar: MatSnackBar, private router: Router, private route: ActivatedRoute) {
    const state = this.router.getCurrentNavigation()?.extras.state;
    console.log('state ', state);
    if (state) {
      this.title = state['title'] || '';
      this.content = state['content'] || '';
    }
  }

  onEditorCreated(quillInstance: any) {
    this.quillEditor = quillInstance;
    this.setQuillContent();
  }

  setQuillContent() {
    if (this.quillEditor && this.content) {
      this.quillEditor.clipboard.dangerouslyPasteHTML(0, this.content);
    }
  }
  

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    console.log(id)
    if(id) {
      this.bookId = id;
    }
    
  }

  onTextChange(event: any) {
    console.log('Text changed:', event.text);
  }

  getSuggestions() {
    this.aiSuggestionsService.getSuggestions(this.content).subscribe((response: any) => {
      console.log(response);
      const snackBarRef = this.snackBar.open(response.suggestions, 'Close', {
        duration: 0,
        verticalPosition: 'top',
        horizontalPosition: 'right',
      });
      snackBarRef.onAction().subscribe(() => {
        snackBarRef.dismiss();
      });
    });
  }

  saveContent() {
    if (!this.title || !this.content) {
      this.snackBar.open('Title and Content are required!', 'Close', { duration: 3000 });
      return;
    }

    if(!this.bookId) {
      const data = {
        title: this.title,
        content: this.content
      };
  
      this.aiSuggestionsService.saveBook(data).subscribe({
        next: (response) => {
          this.snackBar.open('Content saved successfully!', 'Close', { duration: 3000 });
          this.title = '';
          this.content = '';
        },
        error: (error) => {
          console.error('Error saving content:', error);
          this.snackBar.open('Failed to save content. Try again.', 'Close', { duration: 3000 });
        }
      });
    }
    else {
      const data = {
        title: this.title,
        content: this.content
      };
  
      this.aiSuggestionsService.updateBook(data, this.bookId).subscribe({
        next: (response) => {
          this.snackBar.open('Content saved successfully!', 'Close', { duration: 3000 });
          this.title = '';
          this.content = '';
        },
        error: (error) => {
          console.error('Error saving content:', error);
          this.snackBar.open('Failed to save content. Try again.', 'Close', { duration: 3000 });
        }
      });
    }
  }
}