import { Component, OnInit, ChangeDetectorRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { PostService } from '../../../services/post';

@Component({
  selector: 'app-posts',
  imports: [CommonModule, RouterLink],
  templateUrl: './posts.html',
  styleUrl: './posts.css'
})
export class Posts implements OnInit {

  posts: any[] = [];

  private readonly postService = inject(PostService);
  private readonly cdr = inject(ChangeDetectorRef);

  ngOnInit(): void {
    this.postService.getPosts().subscribe({
      next: (posts) => {
        this.posts = posts;
        this.cdr.markForCheck();
      },
      error: (error) => {
        console.error('ERRO AO BUSCAR POSTS:', error);
      }
    });
  }

  deletePost(id: number): void {
    const confirmed = confirm('Tem certeza que deseja excluir este post?');

    if (!confirmed) {
      return;
    }

    this.postService.deletePost(id).subscribe({
      next: () => {
        console.log('POST EXCLUÍDO:', id);

        this.posts = this.posts.filter(post => post.id !== id);

        this.cdr.markForCheck();
      },
      error: (error) => {
        console.error('ERRO AO EXCLUIR POST:', error);
      }
    });
  }
}