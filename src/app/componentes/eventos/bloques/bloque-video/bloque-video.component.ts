import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-bloque-video',
  standalone: true,
  imports: [],
  templateUrl: './bloque-video.component.html',
  styleUrl: './bloque-video.component.css'
})
export class BloqueVideoComponent {
  @Input() archivo: string = '';
  @Input() poster: string = '';
}
