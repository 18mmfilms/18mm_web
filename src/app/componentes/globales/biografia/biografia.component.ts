import { Component, Input, signal } from '@angular/core';

@Component({
  selector: 'app-biografia',
  standalone: true,
  imports: [],
  templateUrl: './biografia.component.html',
  styleUrl: './biografia.component.css'
})
export class BiografiaComponent {
  @Input() textoCompleto = false;
  esMovil = signal(false);

  constructor() {
    if (typeof window !== 'undefined') {
      const mq = window.matchMedia('(max-width: 768px)');
      this.esMovil.set(mq.matches);
      mq.addEventListener('change', (e) => this.esMovil.set(e.matches));
    }
  }
}
