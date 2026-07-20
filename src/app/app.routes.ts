import { Routes } from '@angular/router';
import { InicioComponent } from './paginas/inicio/inicio.component';
import { EventoComponent } from './paginas/eventos/evento.component';
import { SobreNosotrosComponent } from './paginas/sobre-nosotros/sobre-nosotros.component';
import { ContactoPageComponent } from './paginas/contacto/contacto-page.component';
import { CondicionesComponent } from './paginas/condiciones/condiciones.component';
import { PoliticaPrivacidadComponent } from './paginas/politica-privacidad/politica-privacidad.component';
import { PoliticaCookiesComponent } from './paginas/politica-cookies/politica-cookies.component';

export const routes: Routes = [
  { path: '', component: InicioComponent },
  { path: 'sobre-nosotros', component: SobreNosotrosComponent },
  { path: 'contacto', component: ContactoPageComponent },
  { path: 'eventos/:tipo', component: EventoComponent },
  { path: 'condiciones', component: CondicionesComponent },
  { path: 'politica-privacidad', component: PoliticaPrivacidadComponent },
  { path: 'politica-cookies', component: PoliticaCookiesComponent },
  { path: '**', redirectTo: '' }
];
