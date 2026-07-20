import { Component, HostListener, computed } from '@angular/core';
import { LightboxService } from '../../../servicios/lightbox.service';

@Component({
  selector: 'app-lightbox',
  standalone: true,
  imports: [],
  templateUrl: './lightbox.component.html',
  styleUrl: './lightbox.component.css'
})
export class LightboxComponent {
  protected touchStartX = 0;

  constructor(protected service: LightboxService) {}

  protected get isOpen(): boolean {
    return this.service.isOpen();
  }

  protected get currentImage(): string {
    return this.service.images()[this.service.currentIndex()] ?? '';
  }

  protected get hasPrev(): boolean {
    return this.service.currentIndex() > 0;
  }

  protected get hasNext(): boolean {
    return this.service.currentIndex() < this.service.images().length - 1;
  }

  close(): void {
    this.service.close();
  }

  prev(): void {
    this.service.prev();
  }

  next(): void {
    this.service.next();
  }

  onTouchStart(event: TouchEvent): void {
    this.touchStartX = event.changedTouches[0].screenX;
  }

  onTouchEnd(event: TouchEvent): void {
    const diff = event.changedTouches[0].screenX - this.touchStartX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        this.prev();
      } else {
        this.next();
      }
    }
  }

  @HostListener('document:keydown', ['$event'])
  handleKeydown(event: KeyboardEvent): void {
    if (!this.isOpen) return;
    if (event.key === 'Escape') this.close();
    if (event.key === 'ArrowRight') this.next();
    if (event.key === 'ArrowLeft') this.prev();
  }
}
