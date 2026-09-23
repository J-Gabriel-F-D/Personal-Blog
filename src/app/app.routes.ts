import { Routes } from '@angular/router';

import { Home } from './pages/home/home';
import { Post } from './pages/post/post';
import { Posts } from './pages/admin/posts/posts';
import { PostForm } from './pages/admin/post-form/post-form';
import { PostEdit } from './pages/admin/post-edit/post-edit';
import { Login } from './pages/login/login';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'home', component: Home },

  { path: 'login', component: Login },

  { path: 'posts/:id', component: Post },

  {
    path: 'admin/posts',
    component: Posts,
    canActivate: [authGuard]
  },

  {
    path: 'admin/posts/new',
    component: PostForm,
    canActivate: [authGuard]
  },

  {
    path: 'admin/posts/edit/:id',
    component: PostEdit,
    canActivate: [authGuard]
  }
];