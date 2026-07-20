import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import eventos from '../../../datos/eventos.json';

@Component({
  selector: 'app-nuestros-servicios',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './nuestros-servicios.component.html',
  styleUrl: './nuestros-servicios.component.css'
})
export class NuestrosServiciosComponent {
  eventos = eventos;
  eventosCompletos = signal(false);

  toggleCompletos(): void {
    this.eventosCompletos.set(!this.eventosCompletos());
  }
}
