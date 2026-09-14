import { Component, EventEmitter, HostBinding, HostListener, Input, Output } from '@angular/core';
import { Machine } from '../models/machine.model';

@Component({
  selector: 'app-machine-action-card',
  templateUrl: './machine-action-card.component.html',
  styleUrls: ['./machine-action-card.component.css']
})
export class MachineActionCardComponent {
  @Input() machine!: Machine;
  @Output() statusAlternado = new EventEmitter<Machine>();

  // Vinculação de atributos de acessibilidade ao hospedeiro
  @HostBinding('attr.role') role = 'button';
  @HostBinding('attr.tabindex') tabindex = 0;
  @HostBinding('attr.aria-pressed') get ariaPressed(): boolean {
    return this.isSelected;
  }

  // Vinculação de classes CSS no elemento hospedeiro com @HostBinding
  @HostBinding('class.is-hovered') isHovered = false;
  @HostBinding('class.is-selected') isSelected = false;

  // Vinculação de estilos diretos com @HostBinding
  @HostBinding('style.borderColor') get borderColor(): string {
    if (this.isSelected) return '#16a34a';
    if (this.isHovered) return '#2563eb';
    return '#cbd5e1';
  }

  // Escuta de eventos do mouse no elemento hospedeiro com @HostListener
  @HostListener('mouseenter')
  onMouseEnter(): void {
    this.isHovered = true;
  }

  @HostListener('mouseleave')
  onMouseLeave(): void {
    this.isHovered = false;
  }

  // Escuta de cliques e eventos de teclado no hospedeiro
  @HostListener('click')
  @HostListener('keydown.enter')
  toggleSelecionado(): void {
    this.isSelected = !this.isSelected;
    this.statusAlternado.emit(this.machine);
  }
}
