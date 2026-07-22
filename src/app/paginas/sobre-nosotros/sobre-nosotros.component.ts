import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CabeceraComponent } from '../../componentes/globales/cabecera/cabecera.component';
import { BiografiaComponent } from '../../componentes/globales/biografia/biografia.component';
import { WhatsappStickyComponent } from '../../componentes/globales/whatsapp-sticky/whatsapp-sticky.component';
import { FooterComponent } from '../../componentes/globales/footer/footer.component';

@Component({
  selector: 'app-sobre-nosotros',
  standalone: true,
  imports: [
    RouterLink,
    CabeceraComponent,
    BiografiaComponent,
    WhatsappStickyComponent,
    FooterComponent
  ],
  templateUrl: './sobre-nosotros.component.html',
  styleUrl: './sobre-nosotros.component.css'
})
export class SobreNosotrosComponent {

}
