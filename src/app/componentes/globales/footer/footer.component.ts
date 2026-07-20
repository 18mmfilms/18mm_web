import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  redes = [
    { nombre: 'Instagram', url: 'https://www.instagram.com/18mm_films?igsh=bXJzM21yMzIwNjBm&utm_source=qr', imagen: 'public/redes-sociales/instagram.svg' },
    { nombre: 'TikTok', url: 'https://www.tiktok.com/@18mm_films?_r=1&_t=ZN-97oUQUz20hO', imagen: 'public/redes-sociales/tiktok.avif' },
    { nombre: 'Bodas.net', url: 'https://www.bodas.net/fotografos/18mm-films--e277453', imagen: 'public/redes-sociales/bodas-net.png' }
  ];
}
