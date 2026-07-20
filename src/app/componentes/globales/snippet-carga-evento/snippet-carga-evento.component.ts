import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-snippet-carga-evento',
  standalone: true,
  imports: [],
  templateUrl: './snippet-carga-evento.component.html',
  styleUrl: './snippet-carga-evento.component.css'
})
export class SnippetCargaEventoComponent {
  @Input() mostrar = true;
}
