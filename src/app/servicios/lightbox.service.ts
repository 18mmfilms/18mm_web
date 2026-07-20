import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LightboxService {
  images = signal<string[]>([]);
  currentIndex = signal(0);
  isOpen = signal(false);

  open(images: string[], index: number = 0): void {
    this.images.set(images);
    this.currentIndex.set(index);
    this.isOpen.set(true);
  }

  close(): void {
    this.isOpen.set(false);
  }

  next(): void {
    if (this.currentIndex() < this.images().length - 1) {
      this.currentIndex.update(i => i + 1);
    }
  }

  prev(): void {
    if (this.currentIndex() > 0) {
      this.currentIndex.update(i => i - 1);
    }
  }
}
