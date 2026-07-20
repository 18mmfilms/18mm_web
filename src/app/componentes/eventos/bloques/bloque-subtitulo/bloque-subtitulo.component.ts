import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-bloque-subtitulo',
  standalone: true,
  imports: [],
  templateUrl: './bloque-subtitulo.component.html',
  styleUrl: './bloque-subtitulo.component.css'
})
export class BloqueSubtituloComponent {
  @Input() contenido: string = '';
  @Input() nivel: 'h3' | 'h4' = 'h3';
}
