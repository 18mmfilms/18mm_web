import { Component } from '@angular/core';
import { CabeceraComponent } from '../../componentes/globales/cabecera/cabecera.component';
import { FooterComponent } from '../../componentes/globales/footer/footer.component';
import { WhatsappStickyComponent } from '../../componentes/globales/whatsapp-sticky/whatsapp-sticky.component';

@Component({
  selector: 'app-politica-cookies',
  standalone: true,
  imports: [CabeceraComponent, FooterComponent, WhatsappStickyComponent],
  templateUrl: './politica-cookies.component.html',
  styleUrl: './politica-cookies.component.css'
})
export class PoliticaCookiesComponent {}
