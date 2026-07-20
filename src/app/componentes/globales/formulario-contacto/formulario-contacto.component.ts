import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import eventos from '../../../datos/eventos.json';

@Component({
  selector: 'app-formulario-contacto',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './formulario-contacto.component.html',
  styleUrl: './formulario-contacto.component.css'
})
export class FormularioContactoComponent {
  eventos = eventos;

  estado = signal<'idle' | 'enviando' | 'enviado' | 'error'>('idle');

  formData = {
    nombre: '',
    email: '',
    telefono: '',
    evento: '',
    provincia: '',
    fecha: '',
    mensaje: ''
  };

  async enviarFormulario(): Promise<void> {
    this.estado.set('enviando');
    try {
      const response = await fetch('https://formsubmit.co/ajax/films18mm@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(this.formData)
      });
      if (response.ok) {
        this.estado.set('enviado');
        this.formData = { nombre: '', email: '', telefono: '', evento: '', provincia: '', fecha: '', mensaje: '' };
      } else {
        this.estado.set('error');
      }
    } catch {
      this.estado.set('error');
    }
  }
}
