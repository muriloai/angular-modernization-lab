import { AfterContentInit, Component, ContentChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-agro-card',
  templateUrl: './agro-card.component.html',
  styleUrls: ['./agro-card.component.css']
})
export class AgroCardComponent implements AfterContentInit {
  // No Angular 15, o compilador não suporta marcação padrão (fallback) dentro de <ng-content>.
  // A abordagem clássica requer inspecionar os nós projetados via @ContentChild e AfterContentInit.
  @ContentChild('customHeader') headerRef?: ElementRef;
  @ContentChild('customFooter') footerRef?: ElementRef;

  hasCustomHeader = false;
  hasCustomFooter = false;

  ngAfterContentInit(): void {
    this.hasCustomHeader = !!this.headerRef;
    this.hasCustomFooter = !!this.footerRef;
  }
}
