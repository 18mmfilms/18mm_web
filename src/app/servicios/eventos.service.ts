import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EventosService {
  cargando = signal(false);
  datos = signal<any>(null);

  private archivos: Record<string, () => Promise<any>> = {
    'bodas.json': () => import('../datos/eventos/bodas.json'),
    'despedidas.json': () => import('../datos/eventos/despedidas.json'),
    'parejas.json': () => import('../datos/eventos/parejas.json'),
    'embarazos.json': () => import('../datos/eventos/embarazos.json'),
    'familias.json': () => import('../datos/eventos/familias.json'),
    'estudio.json': () => import('../datos/eventos/estudio.json'),
    'conciertos.json': () => import('../datos/eventos/conciertos.json'),
    'festivales.json': () => import('../datos/eventos/festivales.json'),
    'bautizos-comuniones.json': () => import('../datos/eventos/bautizos-comuniones.json'),
    'colaboraciones.json': () => import('../datos/eventos/colaboraciones.json'),
    'prensa.json': () => import('../datos/eventos/prensa.json'),
    'premios.json': () => import('../datos/eventos/premios.json')
  };

  async cargar(archivo: string): Promise<void> {
    if (!archivo) return;
    this.cargando.set(true);
    this.datos.set(null);
    try {
      const modulo = await this.archivos[archivo]?.();
      this.datos.set(modulo?.default || modulo);
    } catch {
      this.datos.set(null);
    } finally {
      this.cargando.set(false);
    }
  }

  limpiar(): void {
    this.cargando.set(false);
    this.datos.set(null);
  }
}
