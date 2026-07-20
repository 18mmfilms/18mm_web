import { Component, AfterViewInit, ElementRef, ViewChild, OnDestroy, signal } from '@angular/core';
import EmblaCarousel from 'embla-carousel';
import Autoplay from 'embla-carousel-autoplay';

@Component({
  selector: 'app-carrusel-principal',
  standalone: true,
  imports: [],
  templateUrl: './carrusel-principal.component.html',
  styleUrl: './carrusel-principal.component.css'
})
export class CarruselPrincipalComponent implements AfterViewInit, OnDestroy {
  @ViewChild('emblaViewport') viewportRef!: ElementRef;
  embla: ReturnType<typeof EmblaCarousel> | null = null;

  imagenes = [
    { src: 'public/carrusel-principal/bienvenidos.jpeg', alt: 'Bienvenidos', titulo: 'BIENVENIDOS A 18MM FILMS', subtitulo: 'FOTOGRAFÍA Y VIDEO PROFESIONAL' },
    { src: 'public/carrusel-principal/bodas.png', alt: 'Bodas', titulo: 'FOTOGRAFÍAS DE BODAS' },
    { src: 'public/carrusel-principal/parejas.jpeg', alt: 'Parejas', titulo: 'FOTOGRAFÍAS DE PAREJAS' },
    { src: 'public/carrusel-principal/embarazos.jpg', alt: 'Embarazos', titulo: 'FOTOGRAFÍAS DE EMBARAZOS' },
    { src: 'public/carrusel-principal/familia.JPG', alt: 'Familias', titulo: 'FOTOGRAFÍAS DE FAMILIAS' }
  ];

  selectedIndex = signal(0);

  ngAfterViewInit(): void {
    this.embla = EmblaCarousel(this.viewportRef.nativeElement, {
      loop: true,
      align: 'center',
      containScroll: 'trimSnaps'
    }, [
      Autoplay({ delay: 4000, stopOnInteraction: false })
    ]);

    this.embla.on('select', () => {
      this.selectedIndex.set(this.embla?.selectedScrollSnap() ?? 0);
    });
  }

  scrollPrev(): void {
    this.embla?.scrollPrev();
  }

  scrollNext(): void {
    this.embla?.scrollNext();
  }

  ngOnDestroy(): void {
    this.embla?.destroy();
  }
}
