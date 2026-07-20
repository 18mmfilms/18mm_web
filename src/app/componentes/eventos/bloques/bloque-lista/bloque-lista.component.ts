import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-bloque-lista',
  standalone: true,
  imports: [],
  templateUrl: './bloque-lista.component.html',
  styleUrl: './bloque-lista.component.css'
})
export class BloqueListaComponent {
  @Input() items: string[] = [];
}
