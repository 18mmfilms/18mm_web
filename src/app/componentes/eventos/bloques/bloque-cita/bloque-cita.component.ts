import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-bloque-cita',
  standalone: true,
  imports: [],
  templateUrl: './bloque-cita.component.html',
  styleUrl: './bloque-cita.component.css'
})
export class BloqueCitaComponent {
  @Input() texto: string = '';
  @Input() autor: string = '';
}
