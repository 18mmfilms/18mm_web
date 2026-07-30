import { Component, Input } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { LightboxService } from '../../../../servicios/lightbox.service';
import { esVideo, esYoutube, getYoutubeEmbedUrl } from '../../../../utils/media.util';

@Component({
  selector: 'app-bloque-foto',
  standalone: true,
  imports: [],
  templateUrl: './bloque-foto.component.html',
  styleUrl: './bloque-foto.component.css'
})
export class BloqueFotoComponent {
  @Input() archivo: string = '';

  constructor(private lightbox: LightboxService, private sanitizer: DomSanitizer) {}

  get src(): string {
    return this.archivo || 'public/no-imagen/no-imagen.jpg';
  }

  esVideo = esVideo;
  esYoutube = esYoutube;

  youtubeUrl(ruta: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(getYoutubeEmbedUrl(ruta));
  }

  abrirLightbox(): void {
    if (!this.esYoutube(this.archivo) && !this.esVideo(this.archivo)) {
      this.lightbox.open([this.src], 0);
    }
  }
}
