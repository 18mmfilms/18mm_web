import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-bloque-textos-con-imagen',
  standalone: true,
  imports: [],
  templateUrl: './bloque-textos-con-imagen.component.html',
  styleUrl: './bloque-textos-con-imagen.component.css'
})
export class BloqueTextosConImagenComponent {
  @Input() contenidos: string[] = [];
  @Input() bloque: any = null;

  get posicionInvertida(): boolean {
    return this.bloque?.media?.posicion === 'derecha';
  }
}
