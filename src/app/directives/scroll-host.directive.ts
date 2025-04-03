// src/app/directives/scroll-host.directive.ts
import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[scrollHost]',
  exportAs: 'scrollHost',  // Export the directive instance
  standalone: true
})

export class ScrollHostDirective {
  constructor(public el: ElementRef) {}
}
