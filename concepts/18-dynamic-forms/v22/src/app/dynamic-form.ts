import { Component, computed, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { JsonPipe } from '@angular/common';

export interface FieldOption {
  value: string;
  label: string;
}

export interface DynamicFieldConfig {
  key: string;
  label: string;
  controlType: 'textbox' | 'dropdown' | 'checkbox';
  type?: string;
  options?: FieldOption[];
  defaultValue?: any;
  required?: boolean;
  min?: number;
  max?: number;
  unidade?: string;
}

export interface SensorSchema {
  tipoId: string;
  nomeExibicao: string;
  descricao: string;
  fields: DynamicFieldConfig[];
}

@Component({
  selector: 'app-dynamic-form',
  imports: [ReactiveFormsModule, JsonPipe],
  templateUrl: './dynamic-form.html',
  styleUrls: ['./dynamic-form.css']
})
export class DynamicForm {
  // Catálogo imutável de esquemas de sensores da Fazenda Santa Maria
  readonly schemas: SensorSchema[] = [
    {
      tipoId: 'umidade',
      nomeExibicao: 'Sensor de Umidade e Temperatura do Solo (FDR)',
      descricao: 'Sonda volumétrica com medição em múltiplas camadas radiculares.',
      fields: [
        {
          key: 'profundidadeCm',
          label: 'Profundidade da Instalação (cm)',
          controlType: 'textbox',
          type: 'number',
          defaultValue: 40,
          required: true,
          min: 10,
          max: 120,
          unidade: 'cm'
        },
        {
          key: 'frequenciaAmostragem',
          label: 'Frequência de Leitura Telemétrica',
          controlType: 'dropdown',
          defaultValue: '15',
          required: true,
          options: [
            { value: '5', label: 'A cada 5 minutos (Alta Precisão)' },
            { value: '15', label: 'A cada 15 minutos (Padrão Operacional)' },
            { value: '60', label: 'A cada 1 hora (Economia de Bateria)' }
          ]
        },
        {
          key: 'compensacaoSalinidade',
          label: 'Ativar calibração dielétrica automática contra salinidade do adubo',
          controlType: 'checkbox',
          defaultValue: true
        }
      ]
    },
    {
      tipoId: 'ph',
      nomeExibicao: 'Sonda de pH e Condutividade Elétrica (CE)',
      descricao: 'Monitoramento geoespacial da acidez do solo e fertilidade química.',
      fields: [
        {
          key: 'faixaPhEsperada',
          label: 'Faixa Alvo de pH',
          controlType: 'dropdown',
          defaultValue: 'neutro',
          required: true,
          options: [
            { value: 'acido', label: 'Solo Ácido (pH 4.5 a 5.5)' },
            { value: 'neutro', label: 'Solo Corrigido (pH 5.8 a 6.5)' },
            { value: 'alcalino', label: 'Solo Alcalino (pH > 7.0)' }
          ]
        },
        {
          key: 'calibracaoTampao',
          label: 'Solução Tampão Utilizada na Calibração',
          controlType: 'textbox',
          type: 'text',
          defaultValue: 'Solução pH 7.00 NIST',
          required: true
        },
        {
          key: 'alarmeAcidez',
          label: 'Emitir alerta automático se o pH divergir mais de 0.8 pontos',
          controlType: 'checkbox',
          defaultValue: true
        }
      ]
    },
    {
      tipoId: 'clima',
      nomeExibicao: 'Microestação Meteorológica Autônoma',
      descricao: 'Torre de vento, radiação solar e pluviometria para manejo de pivô.',
      fields: [
        {
          key: 'alturaTorre',
          label: 'Altura da Haste Anemométrica (metros)',
          controlType: 'textbox',
          type: 'number',
          defaultValue: 2.5,
          required: true,
          min: 1,
          max: 10,
          unidade: 'm'
        },
        {
          key: 'modeloPiranometro',
          label: 'Sensor de Radiação Solar (Piranômetro)',
          controlType: 'dropdown',
          defaultValue: 'silicio',
          required: true,
          options: [
            { value: 'silicio', label: 'Fotodiodo de Silício (Econômico)' },
            { value: 'termopilha', label: 'Termopilha Espectral Classe A (ISO 9060)' }
          ]
        },
        {
          key: 'areaSensorPluvio',
          label: 'Área do Bocal Pluviométrico (cm²)',
          controlType: 'textbox',
          type: 'number',
          defaultValue: 200,
          required: true,
          min: 100,
          max: 500,
          unidade: 'cm²'
        }
      ]
    }
  ];

  readonly selectedTypeId = signal('umidade');

  // Esquema reativo computado através de Signal
  readonly activeSchema = computed(() => {
    return this.schemas.find(s => s.tipoId === this.selectedTypeId()) || this.schemas[0];
  });

  form!: FormGroup;
  readonly dadosConfigurados = signal<any>(null);
  readonly salvoComSucesso = signal(false);

  constructor() {
    this.reconstruirFormulario(this.activeSchema().fields);
  }

  selecionarEsquema(tipoId: string): void {
    this.selectedTypeId.set(tipoId);
    this.reconstruirFormulario(this.activeSchema().fields);
  }

  reconstruirFormulario(fields: DynamicFieldConfig[]): void {
    const group: Record<string, FormControl> = {};

    fields.forEach(field => {
      const validadores = [];
      if (field.required) {
        validadores.push(Validators.required);
      }
      if (field.min !== undefined) {
        validadores.push(Validators.min(field.min));
      }
      if (field.max !== undefined) {
        validadores.push(Validators.max(field.max));
      }

      group[field.key] = new FormControl(
        field.defaultValue !== undefined ? field.defaultValue : '',
        validadores
      );
    });

    this.form = new FormGroup(group);
    this.dadosConfigurados.set(null);
    this.salvoComSucesso.set(false);
  }

  salvar(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.dadosConfigurados.set({
      tipoSensor: this.activeSchema().nomeExibicao,
      valoresCalibracao: this.form.value
    });
    this.salvoComSucesso.set(true);

    setTimeout(() => {
      this.salvoComSucesso.set(false);
    }, 5000);
  }
}
