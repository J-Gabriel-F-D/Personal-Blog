import { Component, ChangeDetectorRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { PostService } from '../../../services/post';

@Component({
  selector: 'app-post-form',
  imports: [CommonModule, FormsModule],
  templateUrl: './post-form.html',
  styleUrl: './post-form.css'
})
export class PostForm {

  post = {
    title: '',
    content: ''
  };

  private readonly postService = inject(PostService);
  private readonly router = inject(Router);
  private readonly cdr = inject(ChangeDetectorRef);

  createPost(): void {
    this.postService.createPost(this.post).subscribe({
      next: (post) => {
        console.log('POST CRIADO:', post);

        this.router.navigate(['/admin/posts']);
      },
      error: (error) => {
        console.error('ERRO AO CRIAR POST:', error);
      }
    });
  }
}