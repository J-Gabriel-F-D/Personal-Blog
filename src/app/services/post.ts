import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'http://localhost:8080/posts';

  getPosts() {
    return this.http.get<any[]>(this.apiUrl);
  }

  getPost(id: number) {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  createPost(post: any) {
    return this.http.post<any>(this.apiUrl, post);
  }

  updatePost(id: number, post: any) {
    return this.http.put<any>(`${this.apiUrl}/${id}`, post);
  }

  deletePost(id: number) {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}