import { Component, Input } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { LightboxService } from '../../../../servicios/lightbox.service';
import { esVideo, esYoutube, getYoutubeEmbedUrl } from '../../../../utils/media.util';

@Component({
  selector: 'app-bloque-galeria',
  standalone: true,
  imports: [],
  templateUrl: './bloque-galeria.component.html',
  styleUrl: './bloque-galeria.component.css'
})
export class BloqueGaleriaComponent {
  @Input() imagenes: string[] = [];

  constructor(private lightbox: LightboxService, private sanitizer: DomSanitizer) {}

  esVideo = esVideo;
  esYoutube = esYoutube;

  youtubeUrl(ruta: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(getYoutubeEmbedUrl(ruta));
  }

  esMultimedia(ruta: string): boolean {
    return this.esVideo(ruta) || this.esYoutube(ruta);
  }

  abrirLightbox(index: number): void {
    const soloImagenes = this.imagenes.filter(i => !this.esMultimedia(i));
    const imgIndex = this.imagenes.slice(0, index).filter(i => !this.esMultimedia(i)).length;
    this.lightbox.open(soloImagenes, imgIndex);
  }
}
