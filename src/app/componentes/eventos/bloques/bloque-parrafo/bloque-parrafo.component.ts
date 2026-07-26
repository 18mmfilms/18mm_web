import { Component, Input } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { esVideo, esYoutube, getYoutubeEmbedUrl } from '../../../../utils/media.util';

@Component({
  selector: 'app-bloque-parrafo',
  standalone: true,
  imports: [],
  templateUrl: './bloque-parrafo.component.html',
  styleUrl: './bloque-parrafo.component.css'
})
export class BloqueParrafoComponent {
  @Input() bloque: any = null;

  constructor(private sanitizer: DomSanitizer) {}

  get posicionInvertida(): boolean {
    return this.bloque?.media?.posicion === 'derecha';
  }

  esVideo = esVideo;
  esYoutube = esYoutube;

  youtubeUrl(ruta: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(getYoutubeEmbedUrl(ruta));
  }
}
