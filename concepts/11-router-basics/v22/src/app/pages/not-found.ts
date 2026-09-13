import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.html',
  styleUrl: './not-found.css'
})
export class NotFound {
  private readonly router = inject(Router);

  voltarInicio(): void {
    this.router.navigate(['/fazendas']);
  }
}
