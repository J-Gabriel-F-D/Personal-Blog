import { Component, OnInit, ChangeDetectorRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostService } from '../../services/post';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [CommonModule, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit {
  posts: any[] = [];

  private readonly postService = inject(PostService);
  private readonly cdr = inject(ChangeDetectorRef);

  ngOnInit(): void {
    console.log('1 - COMPONENTE INICIOU');
    console.log('2 - POSTS INICIAL:', this.posts);

    this.postService.getPosts().subscribe({
      next: (posts) => {
        console.log('3 - API RESPONDEU:', posts);
        console.log('4 - ANTES DE ATRIBUIR:', this.posts);

        this.posts = posts;

        console.log('5 - DEPOIS DE ATRIBUIR:', this.posts);
        console.log('6 - QUANTIDADE:', this.posts.length);

        this.cdr.markForCheck();
      },
      error: (error) => {
        console.error('ERRO AO BUSCAR POSTS:', error);
      }
    });
  }
}