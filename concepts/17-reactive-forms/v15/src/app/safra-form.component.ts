import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormArray,
  Validators,
  AbstractControl,
  ValidationErrors
} from '@angular/forms';

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
  templateUrl: './safra-form.component.html',
  styleUrls: ['./safra-form.component.css']
})
export class SafraFormComponent implements OnInit {
  readonly maxAreaFazenda = 2500;

  // Typed Form do Angular 15
  safraForm = this.fb.group({
    safraAno: ['2025/2026', [Validators.required, Validators.pattern(/^\d{4}\/\d{4}$/)]],
    culturaPrincipal: ['Soja', [Validators.required]],
    responsavelAgronomo: ['Mariana Silva', [Validators.required, Validators.minLength(5)]],
    talhoes: this.fb.array<FormGroup>([], [validadorAreaTotal(this.maxAreaFazenda)])
  });

  areaTotalCalculada = 0;
  submetidoComSucesso = false;
  ultimoRegistroSalvo: SafraFormValue | null = null;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    // Popula talhões iniciais
    this.adicionarTalhao('Talhão Norte 01', 450, 'Argiloso');
    this.adicionarTalhao('Talhão Oeste 02', 620, 'Misto');

    // Monitoramento reativo clássico via Observable valueChanges
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
    this.areaTotalCalculada = total;
  }

  submeter(): void {
    if (this.safraForm.invalid) {
      this.safraForm.markAllAsTouched();
      return;
    }

    this.ultimoRegistroSalvo = this.safraForm.value as SafraFormValue;
    this.submetidoComSucesso = true;

    setTimeout(() => {
      this.submetidoComSucesso = false;
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
    this.submetidoComSucesso = false;
    this.ultimoRegistroSalvo = null;
  }
}
