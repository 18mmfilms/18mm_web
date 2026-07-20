import { Component, ElementRef, HostListener, signal } from '@angular/core';

@Component({
  selector: 'app-whatsapp-sticky',
  standalone: true,
  imports: [],
  templateUrl: './whatsapp-sticky.component.html',
  styleUrl: './whatsapp-sticky.component.css'
})
export class WhatsappStickyComponent {
  protected numeroTelefono = '34679504194';
  protected chatAbierto = signal(false);
  protected notificacionVisible = signal(true);
  protected cargando = signal(false);

  constructor(private elementRef: ElementRef) {}

  toggleChat(): void {
    if (!this.chatAbierto()) {
      this.chatAbierto.set(true);
      this.notificacionVisible.set(false);
      this.cargando.set(true);
      setTimeout(() => this.cargando.set(false), 3000);
    } else {
      this.chatAbierto.set(false);
    }
  }

  irAWhatsApp(): void {
    window.open('https://wa.me/' + this.numeroTelefono, '_blank');
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent): void {
    if (this.chatAbierto()) {
      const target = event.target as HTMLElement;
      if (!this.elementRef.nativeElement.contains(target)) {
        this.chatAbierto.set(false);
      }
    }
  }
}
