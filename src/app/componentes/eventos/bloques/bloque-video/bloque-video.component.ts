import { Component, Input } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { esVideo, esYoutube, getYoutubeEmbedUrl } from '../../../../utils/media.util';

@Component({
  selector: 'app-bloque-video',
  standalone: true,
  imports: [],
  templateUrl: './bloque-video.component.html',
  styleUrl: './bloque-video.component.css'
})
export class BloqueVideoComponent {
  @Input() archivo: string = '';
  @Input() poster: string = '';

  constructor(private sanitizer: DomSanitizer) {}

  esVideo = esVideo;
  esYoutube = esYoutube;

  youtubeUrl(ruta: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(getYoutubeEmbedUrl(ruta));
  }
}
