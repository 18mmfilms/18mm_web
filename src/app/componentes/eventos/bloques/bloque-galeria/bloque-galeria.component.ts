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

  esVideo(ruta: string): boolean {
    return ruta?.toLowerCase().endsWith('.mp4');
  }

  abrirLightbox(index: number): void {
    const soloImagenes = this.imagenes.filter(i => !this.esVideo(i));
    const imgIndex = this.imagenes.slice(0, index).filter(i => !this.esVideo(i)).length;
    this.lightbox.open(soloImagenes, imgIndex);
  }
}
