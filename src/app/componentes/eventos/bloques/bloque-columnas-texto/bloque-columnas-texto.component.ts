import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-bloque-columnas-texto',
  standalone: true,
  imports: [],
  templateUrl: './bloque-columnas-texto.component.html',
  styleUrl: './bloque-columnas-texto.component.css'
})
export class BloqueColumnasTextoComponent {
  @Input() izquierda: string = '';
  @Input() derecha: string = '';
}
