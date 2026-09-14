import { Component, Input, Output, EventEmitter, HostBinding, HostListener, ViewChild, ElementRef, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { IrrigationPivot } from '../models/pivot.model';

@Component({
  selector: 'app-pivot-panel',
  templateUrl: './pivot-panel.component.html',
  styleUrls: ['./pivot-panel.component.css']
})
export class PivotPanelComponent {
  @Input() pivot!: IrrigationPivot;

  @Output() pressureChanged = new EventEmitter<{ id: string; delta: number }>();
  @Output() statusToggled = new EventEmitter<string>();

  @HostBinding('class.pivot-card') hostCard = true;
  @HostBinding('class.pivot-online') get isOnline() { return this.pivot.isActive; }
  @HostBinding('attr.aria-label') get ariaLabel() { return `Painel do ${this.pivot.name}`; }

  @ViewChild('pressureIndicator') pressureIndicator!: ElementRef;

  isHovered: boolean = false;

  constructor(@Inject(DOCUMENT) private document: Document) {}

  @HostListener('mouseenter')
  onMouseEnter(): void {
    this.isHovered = true;
  }

  @HostListener('mouseleave')
  onMouseLeave(): void {
    this.isHovered = false;
  }

  adjustPressure(delta: number): void {
    this.pressureChanged.emit({ id: this.pivot.id, delta });
  }

  togglePower(): void {
    this.statusToggled.emit(this.pivot.id);
  }
}
