export class ImageCarousel {
  private container: HTMLElement;
  private images: string[];
  private currentIndex: number = 0;
  private autoPlayInterval: number | null = null;
  private isAutoPlaying: boolean = true;


  constructor(container: HTMLElement, images: string[]) {
    this.container = container;
    this.images = images;
    

    
    this.init();
  }

  private init(): void {
    this.render();
    this.startAutoPlay();
    this.addEventListeners();
  }

  private render(): void {
    console.log('Rendering carousel with images:', this.images);
    console.log('Container element:', this.container);
    console.log('Container dimensions:', this.container.offsetWidth, 'x', this.container.offsetHeight);
    
    this.container.innerHTML = `
      <div class="image-carousel">
        <div class="carousel-container">
          <div class="carousel-track">
            ${this.images.map((image, index) => `
              <div class="carousel-slide ${index === 0 ? 'active' : ''}" data-index="${index}">
                <img src="${image}" alt="Profile Image ${index + 1}" class="carousel-image" 
                     onerror="console.error('Failed to load image:', this.src); this.style.display='none'; this.nextElementSibling.style.display='block';">
                <div class="image-fallback" style="display: none; width: 100%; height: 100%; background: rgba(255,0,0,0.5); border: 3px solid red; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold;">
                  <div style="text-align: center;">
                    <i class="fas fa-image" style="font-size: 3rem; margin-bottom: 1rem;"></i>
                    <div>Image ${index + 1}</div>
                    <div style="font-size: 0.8rem; margin-top: 0.5rem;">${image}</div>
                  </div>
                </div>
              </div>
            `).join('')}
          </div>
          

          

        </div>
      </div>
    `;
    
    console.log('Carousel HTML rendered:', this.container.innerHTML);
  }

  private addEventListeners(): void {
    // Solo mantenemos el auto-play automático
    // No se necesitan event listeners adicionales
  }

  private next(): void {
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
    this.updateCarousel();
  }

  private updateCarousel(): void {
    const slides = this.container.querySelectorAll('.carousel-slide');

    // Update slides
    slides.forEach((slide, index) => {
      slide.classList.toggle('active', index === this.currentIndex);
    });
  }

  private startAutoPlay(): void {
    this.autoPlayInterval = window.setInterval(() => {
      this.next();
    }, 5000); // Change image every 5 seconds
  }

  private pauseAutoPlay(): void {
    if (this.autoPlayInterval) {
      clearInterval(this.autoPlayInterval);
      this.autoPlayInterval = null;
      this.isAutoPlaying = false;
    }
  }

  private resumeAutoPlay(): void {
    if (!this.isAutoPlaying) {
      this.startAutoPlay();
      this.isAutoPlaying = true;
    }
  }

  private handleClick(event: Event): void {
    // Handle click events if needed
    console.log('Carousel clicked:', event);
  }



  /**
   * Destroy the carousel
   */
  public destroy(): void {
    // Clear intervals
    if (this.autoPlayInterval) {
      clearInterval(this.autoPlayInterval);
      this.autoPlayInterval = null;
    }
    
    // Remove event listeners
    if (this.container) {
      this.container.removeEventListener('click', this.handleClick);
      this.container.removeEventListener('mouseenter', this.pauseAutoPlay);
      this.container.removeEventListener('mouseleave', this.resumeAutoPlay);
    }
    
    // Clear container content
    if (this.container) {
      this.container.innerHTML = '';
    }
    
    // Reset state
    this.currentIndex = 0;
    this.isAutoPlaying = false;
  }
}
