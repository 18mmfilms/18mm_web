import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LightboxComponent } from './componentes/globales/lightbox/lightbox.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LightboxComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

}
