import { Component, AfterViewInit, ElementRef, ViewChild, OnDestroy } from '@angular/core';
import EmblaCarousel from 'embla-carousel';
import { LightboxService } from '../../../servicios/lightbox.service';

@Component({
  selector: 'app-carrusel-secundario',
  standalone: true,
  imports: [],
  templateUrl: './carrusel-secundario.component.html',
  styleUrl: './carrusel-secundario.component.css'
})
export class CarruselSecundarioComponent implements AfterViewInit, OnDestroy {
  @ViewChild('emblaViewport') viewportRef!: ElementRef;
  embla: ReturnType<typeof EmblaCarousel> | null = null;

  imagenes = [
    { src: 'public/carrusel-secundario/1.png', alt: 'Galer\u00eda 18MM Films' },
    { src: 'public/carrusel-secundario/2.png', alt: 'Galer\u00eda 18MM Films' },
    { src: 'public/carrusel-secundario/3.png', alt: 'Galer\u00eda 18MM Films' },
    { src: 'public/carrusel-secundario/4.png', alt: 'Galer\u00eda 18MM Films' },
    { src: 'public/carrusel-secundario/5.png', alt: 'Galer\u00eda 18MM Films' },
    { src: 'public/carrusel-secundario/6.png', alt: 'Galer\u00eda 18MM Films' },
    { src: 'public/carrusel-secundario/7.png', alt: 'Galer\u00eda 18MM Films' },
    { src: 'public/carrusel-secundario/8.png', alt: 'Galer\u00eda 18MM Films' },
    { src: 'public/carrusel-secundario/9.png', alt: 'Galer\u00eda 18MM Films' },
    { src: 'public/carrusel-secundario/10.png', alt: 'Galer\u00eda 18MM Films' },
    { src: 'public/carrusel-secundario/11.png', alt: 'Galer\u00eda 18MM Films' },
    { src: 'public/carrusel-secundario/12.png', alt: 'Galer\u00eda 18MM Films' },
    { src: 'public/carrusel-secundario/13.png', alt: 'Galer\u00eda 18MM Films' },
    { src: 'public/carrusel-secundario/14.png', alt: 'Galer\u00eda 18MM Films' },
    { src: 'public/carrusel-secundario/15.png', alt: 'Galer\u00eda 18MM Films' }
  ];

  constructor(private lightbox: LightboxService) {}

  ngAfterViewInit(): void {
    this.embla = EmblaCarousel(this.viewportRef.nativeElement, {
      loop: true,
      align: 'start',
      containScroll: 'trimSnaps',
      dragFree: true
    });
  }

  ngOnDestroy(): void {
    this.embla?.destroy();
  }

  abrirLightbox(index: number): void {
    this.lightbox.open(this.imagenes.map(i => i.src), index);
  }
}
