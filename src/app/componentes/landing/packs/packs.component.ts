import { Component } from '@angular/core';

@Component({
  selector: 'app-packs',
  standalone: true,
  imports: [],
  templateUrl: './packs.component.html',
  styleUrl: './packs.component.css'
})
export class PacksComponent {
  packs = [
    {
      nombre: 'CAJA DE MADERA CON SU PEN',
      descripcion: 'Vuestro reportaje digital entregado en un soporte físico elegante y seguro.',
      imagen: 'public/packs/caja_madera.png'
    },
    {
      nombre: 'FOTOGRAFÍAS IMPRESAS',
      descripcion: 'Una selección de los mejores momentos en papel de alta calidad.',
      imagen: 'public/packs/fotografias_impresas.png'
    },
    {
      nombre: 'ALBUM DIGITAL O ALBUM IMPRESOS',
      descripcion: 'Un diseño cuidado y profesional para mirar vuestro gran día siempre que queráis.',
      imagen: 'public/packs/album.png'
    }
  ];
}
