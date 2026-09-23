import { Component, OnInit, ChangeDetectorRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PostService } from '../../../services/post';

@Component({
  selector: 'app-post-edit',
  imports: [CommonModule, FormsModule],
  templateUrl: './post-edit.html',
  styleUrl: './post-edit.css'
})
export class PostEdit implements OnInit {

  post: any = {
    title: '',
    content: ''
  };

  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly postService = inject(PostService);
  private readonly cdr = inject(ChangeDetectorRef);

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.postService.getPost(id).subscribe({
      next: (post) => {
        this.post = post;
        this.cdr.markForCheck();
      },
      error: (error) => {
        console.error('ERRO AO BUSCAR POST:', error);
      }
    });
  }

  updatePost(): void {
    this.postService.updatePost(this.post.id, this.post).subscribe({
      next: (post) => {
        console.log('POST ATUALIZADO:', post);

        this.router.navigate(['/admin/posts']);
      },
      error: (error) => {
        console.error('ERRO AO ATUALIZAR POST:', error);
      }
    });
  }
}