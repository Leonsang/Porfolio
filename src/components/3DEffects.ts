export interface Transform3D {
  rotateX: number;
  rotateY: number;
  rotateZ: number;
  translateZ: number;
  scale: number;
}

export class ThreeDEffects {
  private elements: Set<HTMLElement> = new Set();
  private isEnabled: boolean = true;
  private mouseX: number = 0;
  private mouseY: number = 0;
  private isMouseActive: boolean = false;

  constructor() {
    this.init();
  }

  private init(): void {
    // Initialize mouse tracking
    document.addEventListener('mousemove', (e) => {
      this.mouseX = e.clientX;
      this.mouseY = e.clientY;
      this.isMouseActive = true;
      
      // Clear mouse active state after 100ms
      setTimeout(() => {
        this.isMouseActive = false;
      }, 100);
    });

    console.log('✅ 3D Effects initialized');
  }

  /**
   * Add element to 3D effects system
   */
  public addElement(element: HTMLElement): void {
    if (!this.elements.has(element)) {
      this.elements.add(element);
      console.log('✅ Added element to 3D effects:', element);
    }
  }

  /**
   * Add subtle hover 3D effect
   */
  public addSubtleHover3D(element: HTMLElement, scale: number = 1.02, rotation: number = 8): void {
    this.addElement(element);
    
    element.addEventListener('mouseenter', () => {
      element.style.transition = 'transform 0.3s ease-out';
      element.style.transform = `perspective(1000px) rotateX(${rotation}deg) rotateY(${rotation}deg) scale(${scale})`;
    });
    
    element.addEventListener('mouseleave', () => {
      element.style.transition = 'transform 0.3s ease-out';
      element.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)';
    });
  }

  /**
   * Add floating 3D effect
   */
  public addFloating3D(element: HTMLElement, amplitude: number = 6): void {
    this.addElement(element);
    
    const keyframes = [
      { transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)' },
      { transform: `perspective(1000px) rotateX(${amplitude}deg) rotateY(${amplitude}deg) translateZ(20px)` },
      { transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)' }
    ];
    
    const animation = element.animate(keyframes, {
      duration: 3000 + Math.random() * 2000,
      easing: 'ease-in-out',
      iterations: Infinity,
      delay: Math.random() * 2000
    });
    
    // Store animation reference
    element.dataset.floating3DAnimation = 'true';
  }

  /**
   * Add parallax 3D effect
   */
  public addParallax3D(element: HTMLElement, intensity: number = 15): void {
    this.addElement(element);
    
    element.addEventListener('mousemove', (e) => {
      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const mouseX = e.clientX;
      const mouseY = e.clientY;
      
      const deltaX = (mouseX - centerX) / (window.innerWidth / 2);
      const deltaY = (mouseY - centerY) / (window.innerHeight / 2);
      
      const rotateX = -deltaY * intensity;
      const rotateY = deltaX * intensity;
      
      element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });
    
    element.addEventListener('mouseleave', () => {
      element.style.transition = 'transform 0.5s ease-out';
      element.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
    });
  }

  public enable(): void {
    this.isEnabled = true;
  }

  public disable(): void {
    this.isEnabled = false;
    this.elements.forEach((element) => {
      element.style.transform = '';
    });
  }

  public destroy(): void {
    this.elements.forEach((element) => {
      if (element.dataset.parallaxCleanup) {
        window.removeEventListener('scroll', () => {});
        delete element.dataset.parallaxCleanup;
      }
      element.style.transform = '';
    });
    
    this.elements.clear();
  }
}
