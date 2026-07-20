import { Component, Input } from '@angular/core';
import { LightboxService } from '../../../../servicios/lightbox.service';

@Component({
  selector: 'app-bloque-foto',
  standalone: true,
  imports: [],
  templateUrl: './bloque-foto.component.html',
  styleUrl: './bloque-foto.component.css'
})
export class BloqueFotoComponent {
  @Input() archivo: string = '';

  constructor(private lightbox: LightboxService) {}

  get src(): string {
    return this.archivo || 'public/no-imagen/no-imagen.jpg';
  }

  abrirLightbox(): void {
    this.lightbox.open([this.src], 0);
  }
}
