import { Component, Input } from '@angular/core';
import { LightboxService } from '../../../../servicios/lightbox.service';

@Component({
  selector: 'app-bloque-galeria',
  standalone: true,
  imports: [],
  templateUrl: './bloque-galeria.component.html',
  styleUrl: './bloque-galeria.component.css'
})
export class BloqueGaleriaComponent {
  @Input() imagenes: string[] = [];

  constructor(private lightbox: LightboxService) {}

  abrirLightbox(index: number): void {
    this.lightbox.open(this.imagenes, index);
  }
}
