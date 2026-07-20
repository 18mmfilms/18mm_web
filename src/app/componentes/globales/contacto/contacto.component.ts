import { Component } from '@angular/core';
import { FormularioContactoComponent } from '../formulario-contacto/formulario-contacto.component';

@Component({
  selector: 'app-contacto',
  standalone: true,
  imports: [FormularioContactoComponent],
  templateUrl: './contacto.component.html',
  styleUrl: './contacto.component.css'
})
export class ContactoComponent {

}
