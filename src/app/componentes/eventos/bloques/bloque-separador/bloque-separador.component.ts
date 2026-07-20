import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-bloque-separador',
  standalone: true,
  imports: [],
  templateUrl: './bloque-separador.component.html',
  styleUrl: './bloque-separador.component.css'
})
export class BloqueSeparadorComponent {
  @Input() estilo: string = 'linea';
}
