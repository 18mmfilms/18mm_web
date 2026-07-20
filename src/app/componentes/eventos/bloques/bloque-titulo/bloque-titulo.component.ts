import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-bloque-titulo',
  standalone: true,
  imports: [],
  templateUrl: './bloque-titulo.component.html',
  styleUrl: './bloque-titulo.component.css'
})
export class BloqueTituloComponent {
  @Input() contenido: string = '';
}
