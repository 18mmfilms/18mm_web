import { Component } from '@angular/core';
import servicios from '../../../datos/servicios.json';

@Component({
  selector: 'app-servicios',
  standalone: true,
  imports: [],
  templateUrl: './servicios.component.html',
  styleUrl: './servicios.component.css'
})
export class ServiciosComponent {
  servicios = servicios;
}
