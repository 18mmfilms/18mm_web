import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-bloque-parrafo',
  standalone: true,
  imports: [],
  templateUrl: './bloque-parrafo.component.html',
  styleUrl: './bloque-parrafo.component.css'
})
export class BloqueParrafoComponent {
  @Input() bloque: any = null;

  get posicionInvertida(): boolean {
    return this.bloque?.media?.posicion === 'derecha';
  }
}
