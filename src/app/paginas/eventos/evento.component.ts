import { Component, OnInit, OnDestroy, inject, signal, effect } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventosService } from '../../servicios/eventos.service';
import { CabeceraComponent } from '../../componentes/globales/cabecera/cabecera.component';
import { SnippetCargaEventoComponent } from '../../componentes/globales/snippet-carga-evento/snippet-carga-evento.component';
import { HeroComponent } from '../../componentes/eventos/bloques/hero/hero.component';
import { BloqueParrafoComponent } from '../../componentes/eventos/bloques/bloque-parrafo/bloque-parrafo.component';
import { BloqueGaleriaComponent } from '../../componentes/eventos/bloques/bloque-galeria/bloque-galeria.component';
import { BloqueVideoComponent } from '../../componentes/eventos/bloques/bloque-video/bloque-video.component';
import { BloqueCitaComponent } from '../../componentes/eventos/bloques/bloque-cita/bloque-cita.component';
import { BloqueSeparadorComponent } from '../../componentes/eventos/bloques/bloque-separador/bloque-separador.component';
import { BloqueTituloComponent } from '../../componentes/eventos/bloques/bloque-titulo/bloque-titulo.component';
import { BloqueSubtituloComponent } from '../../componentes/eventos/bloques/bloque-subtitulo/bloque-subtitulo.component';
import { BloqueColumnasTextoComponent } from '../../componentes/eventos/bloques/bloque-columnas-texto/bloque-columnas-texto.component';
import { BloqueTextosConImagenComponent } from '../../componentes/eventos/bloques/bloque-textos-con-imagen/bloque-textos-con-imagen.component';
import { BloqueLateralComponent } from '../../componentes/eventos/bloques/bloque-lateral/bloque-lateral.component';
import { BloqueFotoComponent } from '../../componentes/eventos/bloques/bloque-foto/bloque-foto.component';
import { BloqueListaComponent } from '../../componentes/eventos/bloques/bloque-lista/bloque-lista.component';
import eventos from '../../datos/eventos.json';

@Component({
  selector: 'app-evento',
  standalone: true,
  imports: [
    CabeceraComponent,
    SnippetCargaEventoComponent,
    HeroComponent,
    BloqueParrafoComponent,
    BloqueGaleriaComponent,
    BloqueVideoComponent,
    BloqueCitaComponent,
    BloqueSeparadorComponent,
    BloqueTituloComponent,
    BloqueSubtituloComponent,
    BloqueColumnasTextoComponent,
    BloqueTextosConImagenComponent,
    BloqueLateralComponent,
    BloqueFotoComponent,
    BloqueListaComponent
  ],
  templateUrl: './evento.component.html',
  styleUrl: './evento.component.css'
})
export class EventoComponent implements OnInit, OnDestroy {
  private ruta = inject(ActivatedRoute);
  private eventosService = inject(EventosService);

  cargando = this.eventosService.cargando;
  datos = this.eventosService.datos;
  snippetVisible = signal(false);
  mostrarSnippet = signal(false);
  private timeoutId: ReturnType<typeof setTimeout> | undefined;

  constructor() {
    effect(() => {
      if (this.cargando()) {
        this.snippetVisible.set(true);
        this.mostrarSnippet.set(true);
      } else if (this.snippetVisible()) {
        this.mostrarSnippet.set(false);
        this.timeoutId = setTimeout(() => {
          this.snippetVisible.set(false);
        }, 500);
      }
    }, { allowSignalWrites: true });
  }

  ngOnInit(): void {
    this.ruta.paramMap.subscribe(params => {
      const tipo = params.get('tipo');
      if (!tipo) return;
      const evento = eventos.find(e => e.ruta === tipo);
      if (evento?.archivo) {
        this.eventosService.cargar(evento.archivo);
      }
    });
  }

  ngOnDestroy(): void {
    this.eventosService.limpiar();
    if (this.timeoutId) clearTimeout(this.timeoutId);
  }
}
