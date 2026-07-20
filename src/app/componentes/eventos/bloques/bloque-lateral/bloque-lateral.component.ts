import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-bloque-lateral',
  standalone: true,
  imports: [],
  templateUrl: './bloque-lateral.component.html',
  styleUrl: './bloque-lateral.component.css'
})
export class BloqueLateralComponent {
  @Input() imagenes: string[] = [];
  @Input() contenidos: string[] = [];
}
