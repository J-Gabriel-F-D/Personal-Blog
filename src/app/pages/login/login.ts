import { Component, ChangeDetectorRef, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  username = '';
  password = '';
  errorMessage = '';

  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly cdr = inject(ChangeDetectorRef);

  login(): void {

    this.errorMessage = '';

    this.authService.login(
      this.username,
      this.password
    ).subscribe({
      next: (token) => {

        this.authService.saveToken(token);

        this.router.navigate(['/admin/posts']);
      },

      error: (error) => {
        console.error('ERRO AO FAZER LOGIN:', error);

        this.errorMessage = 'Usuário ou senha inválidos';

        this.cdr.markForCheck();
      }
    });
  }
}