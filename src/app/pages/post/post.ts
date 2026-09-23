import { Component, OnInit, ChangeDetectorRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { PostService } from '../../services/post';

@Component({
  selector: 'app-post',
  imports: [CommonModule],
  templateUrl: './post.html',
  styleUrl: './post.css'
})
export class Post implements OnInit {

  post: any = null;

  private readonly route = inject(ActivatedRoute);
  private readonly postService = inject(PostService);
  private readonly cdr = inject(ChangeDetectorRef);

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.postService.getPost(id).subscribe({
      next: (post) => {
        console.log('POST RECEBIDO:', post);

        this.post = post;

        console.log('POST ATRIBUÍDO:', this.post);

        this.cdr.markForCheck();
      },
      error: (error) => {
        console.error('ERRO AO BUSCAR POST:', error);
      }
    });
  }
}