import { Component } from '@angular/core';
import { CabeceraComponent } from '../../componentes/globales/cabecera/cabecera.component';
import { CarruselPrincipalComponent } from '../../componentes/landing/carrusel-principal/carrusel-principal.component';
import { BiografiaComponent } from '../../componentes/globales/biografia/biografia.component';
import { CarruselSecundarioComponent } from '../../componentes/landing/carrusel-secundario/carrusel-secundario.component';
import { NuestrosServiciosComponent } from '../../componentes/landing/nuestros-servicios/nuestros-servicios.component';
import { ServiciosComponent } from '../../componentes/landing/servicios/servicios.component';
import { PacksComponent } from '../../componentes/landing/packs/packs.component';
import { ContactoComponent } from '../../componentes/globales/contacto/contacto.component';
import { WhatsappStickyComponent } from '../../componentes/globales/whatsapp-sticky/whatsapp-sticky.component';
import { FooterComponent } from '../../componentes/globales/footer/footer.component';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [
    CabeceraComponent,
    CarruselPrincipalComponent,
    BiografiaComponent,
    CarruselSecundarioComponent,
    NuestrosServiciosComponent,
    ServiciosComponent,
    PacksComponent,
    ContactoComponent,
    WhatsappStickyComponent,
    FooterComponent
  ],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent {

}
