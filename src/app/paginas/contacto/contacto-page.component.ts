import { Component } from '@angular/core';
import { CabeceraComponent } from '../../componentes/globales/cabecera/cabecera.component';
import { FormularioContactoComponent } from '../../componentes/globales/formulario-contacto/formulario-contacto.component';
import { WhatsappStickyComponent } from '../../componentes/globales/whatsapp-sticky/whatsapp-sticky.component';
import { FooterComponent } from '../../componentes/globales/footer/footer.component';

@Component({
  selector: 'app-contacto-page',
  standalone: true,
  imports: [
    CabeceraComponent,
    FormularioContactoComponent,
    WhatsappStickyComponent,
    FooterComponent
  ],
  templateUrl: './contacto-page.component.html',
  styleUrl: './contacto-page.component.css'
})
export class ContactoPageComponent {

}
