import { Component, signal, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { RouterLink } from '@angular/router';
import eventos from '../../../datos/eventos.json';

@Component({
  selector: 'app-cabecera',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './cabecera.component.html',
  styleUrl: './cabecera.component.css'
})
export class CabeceraComponent implements AfterViewInit, OnDestroy {
  eventos = eventos;
  menuAbierto = signal(false);
  eventosAbierto = signal(false);
  numeroTelefono = '000000000';

  @ViewChild('cabeceraEl') cabeceraEl!: ElementRef<HTMLElement>;
  private ro: ResizeObserver | null = null;

  toggleMenu(): void {
    this.menuAbierto.set(!this.menuAbierto());
  }

  cerrarMenu(): void {
    this.menuAbierto.set(false);
    this.eventosAbierto.set(false);
  }

  toggleEventos(): void {
    if (window.innerWidth <= 768) {
      this.eventosAbierto.set(!this.eventosAbierto());
    }
  }

  ngAfterViewInit(): void {
    this.ro = new ResizeObserver(entries => {
      for (const entry of entries) {
        const height = entry.borderBoxSize?.[0]?.blockSize ?? entry.contentRect.height;
        document.documentElement.style.setProperty('--header-height', `${height}px`);
      }
    });
    this.ro.observe(this.cabeceraEl.nativeElement);
  }

  ngOnDestroy(): void {
    this.ro?.disconnect();
  }
}
