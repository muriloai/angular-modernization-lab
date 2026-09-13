import { Component, inject, signal } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormArray,
  Validators,
  ReactiveFormsModule,
  AbstractControl,
  ValidationErrors
} from '@angular/forms';
import { JsonPipe } from '@angular/common';

export interface TalhaoItem {
  nomeTalhao: string;
  areaHectares: number;
  tipoSolo: string;
}

export interface SafraFormValue {
  safraAno: string;
  culturaPrincipal: string;
  responsavelAgronomo: string;
  talhoes: TalhaoItem[];
}

// Validador customizado síncrono para o FormArray de talhões
export function validadorAreaTotal(maxArea: number) {
  return (control: AbstractControl): ValidationErrors | null => {
    const formArray = control as FormArray;
    if (!formArray || formArray.length === 0) {
      return { semTalhoes: true };
    }

    let soma = 0;
    for (const item of formArray.controls) {
      const area = Number(item.get('areaHectares')?.value) || 0;
      soma += area;
    }

    if (soma > maxArea) {
      return {
        areaExcedida: {
          soma,
          maxArea,
          excesso: soma - maxArea
        }
      };
    }

    return null;
  };
}

@Component({
  selector: 'app-safra-form',
  imports: [ReactiveFormsModule, JsonPipe],
  templateUrl: './safra-form.html',
  styleUrls: ['./safra-form.css']
})
export class SafraForm {
  private readonly fb = inject(FormBuilder);
  readonly maxAreaFazenda = 2500;

  // Typed Form do Angular 22 com tipagem inferida estrita
  readonly safraForm = this.fb.group({
    safraAno: ['2025/2026', [Validators.required, Validators.pattern(/^\d{4}\/\d{4}$/)]],
    culturaPrincipal: ['Soja', [Validators.required]],
    responsavelAgronomo: ['Mariana Silva', [Validators.required, Validators.minLength(5)]],
    talhoes: this.fb.array<FormGroup>([], [validadorAreaTotal(this.maxAreaFazenda)])
  });

  readonly areaTotalCalculada = signal(0);
  readonly submetidoComSucesso = signal(false);
  readonly ultimoRegistroSalvo = signal<SafraFormValue | null>(null);

  constructor() {
    // Popula talhões iniciais
    this.adicionarTalhao('Talhão Norte 01', 450, 'Argiloso');
    this.adicionarTalhao('Talhão Oeste 02', 620, 'Misto');

    // Listener moderno de eventos de valor para sincronizar o Signal de área total
    this.safraForm.valueChanges.subscribe(() => {
      this.recalcularAreaTotal();
    });

    this.recalcularAreaTotal();
  }

  get talhoes(): FormArray {
    return this.safraForm.get('talhoes') as FormArray;
  }

  criarGrupoTalhao(nome = '', area: number | null = null, tipo = 'Argiloso'): FormGroup {
    return this.fb.group({
      nomeTalhao: [nome, [Validators.required, Validators.minLength(3)]],
      areaHectares: [area, [Validators.required, Validators.min(10), Validators.max(1000)]],
      tipoSolo: [tipo, [Validators.required]]
    });
  }

  adicionarTalhao(nome = '', area: number | null = null, tipo = 'Argiloso'): void {
    this.talhoes.push(this.criarGrupoTalhao(nome, area, tipo));
  }

  removerTalhao(index: number): void {
    this.talhoes.removeAt(index);
  }

  recalcularAreaTotal(): void {
    let total = 0;
    for (const ctrl of this.talhoes.controls) {
      const v = Number(ctrl.get('areaHectares')?.value) || 0;
      total += v;
    }
    this.areaTotalCalculada.set(total);
  }

  submeter(): void {
    if (this.safraForm.invalid) {
      this.safraForm.markAllAsTouched();
      return;
    }

    this.ultimoRegistroSalvo.set(this.safraForm.value as SafraFormValue);
    this.submetidoComSucesso.set(true);

    setTimeout(() => {
      this.submetidoComSucesso.set(false);
    }, 5000);
  }

  limpar(): void {
    this.safraForm.reset({
      safraAno: '2025/2026',
      culturaPrincipal: 'Soja',
      responsavelAgronomo: '',
      talhoes: []
    });
    this.talhoes.clear();
    this.recalcularAreaTotal();
    this.submetidoComSucesso.set(false);
    this.ultimoRegistroSalvo.set(null);
  }
}
