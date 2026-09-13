import { Component, inject, input } from '@angular/core';
import { Router } from '@angular/router';
import { UpperCasePipe } from '@angular/common';
import { Talhao } from './models/talhao.model';

@Component({
  selector: 'app-talhao-detail',
  imports: [UpperCasePipe],
  templateUrl: './talhao-detail.html',
  styleUrl: './talhao-detail.css'
})
export class TalhaoDetail {
  private readonly router = inject(Router);

  // 1. O Angular 22 conecta automaticamente o parâmetro de caminho :id aqui
  readonly id = input.required<string>();

  // 2. Os query parameters (?safra e ?modo) são vinculados automaticamente como inputs
  readonly safra = input<string>('2026');
  readonly modo = input<string>('resumido');

  // 3. O resultado resolvido pelo talhaoResolver é atribuído diretamente a este input
  readonly talhao = input<Talhao>();

  voltar(): void {
    this.router.navigate(['/talhoes']);
  }
}
