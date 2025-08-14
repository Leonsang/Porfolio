export interface AnimationConfig {
  duration: number;
  easing: string;
  delay?: number;
  threshold?: number;
}

export class AnimationManager {
  private observer!: IntersectionObserver;
  private animatedElements: Map<HTMLElement, AnimationConfig>;

  constructor() {
    this.animatedElements = new Map();
    this.initIntersectionObserver();
  }

  private initIntersectionObserver(): void {
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.animateElement(entry.target as HTMLElement);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );
  }

  public addElement(element: HTMLElement, config: AnimationConfig): void {
    this.animatedElements.set(element, config);
    this.observer.observe(element);
    
    // Add initial state
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    element.style.transition = `all ${config.duration}ms ${config.easing}`;
    
    if (config.delay) {
      element.style.transitionDelay = `${config.delay}ms`;
    }
  }

  private animateElement(element: HTMLElement): void {
    const config = this.animatedElements.get(element);
    if (!config) return;

    element.style.opacity = '1';
    element.style.transform = 'translateY(0)';

    // Remove from observer after animation
    setTimeout(() => {
      this.observer.unobserve(element);
      this.animatedElements.delete(element);
    }, config.duration + (config.delay || 0));
  }

  public addStaggeredAnimation(elements: HTMLElement[], baseConfig: AnimationConfig, staggerDelay: number = 100): void {
    elements.forEach((element, index) => {
      const config = {
        ...baseConfig,
        delay: (baseConfig.delay || 0) + (index * staggerDelay)
      };
      this.addElement(element, config);
    });
  }

  public addTypewriterEffect(element: HTMLElement, text: string, speed: number = 50): void {
    element.textContent = '';
    element.style.overflow = 'hidden';
    element.style.borderRight = '2px solid var(--primary-color)';
    
    let index = 0;
    const typeInterval = setInterval(() => {
      element.textContent += text[index];
      index++;
      
      if (index >= text.length) {
        clearInterval(typeInterval);
        element.style.borderRight = 'none';
      }
    }, speed);
  }

  public addFloatingAnimation(element: HTMLElement, intensity: number = 10): void {
    element.style.animation = `floating ${3 + Math.random() * 2}s ease-in-out infinite`;
    element.style.animationDelay = `${Math.random() * 2}s`;
    
    // Add floating keyframes if they don't exist
    if (!document.querySelector('#floating-keyframes')) {
      const style = document.createElement('style');
      style.id = 'floating-keyframes';
      style.textContent = `
        @keyframes floating {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          25% { transform: translateY(-${intensity}px) rotate(1deg); }
          50% { transform: translateY(-${intensity/2}px) rotate(0deg); }
          75% { transform: translateY(-${intensity}px) rotate(-1deg); }
        }
      `;
      document.head.appendChild(style);
    }
  }

  public addGlitchEffect(element: HTMLElement, intensity: number = 5): void {
    const glitchInterval = setInterval(() => {
      const originalTransform = element.style.transform;
      const glitchX = (Math.random() - 0.5) * intensity;
      const glitchY = (Math.random() - 0.5) * intensity;
      
      element.style.transform = `translate(${glitchX}px, ${glitchY}px)`;
      
      setTimeout(() => {
        element.style.transform = originalTransform;
      }, 50);
    }, 2000);

    // Stop glitch after 10 seconds
    setTimeout(() => {
      clearInterval(glitchInterval);
    }, 10000);
  }

  public addPulseEffect(element: HTMLElement, scale: number = 1.1): void {
    element.addEventListener('mouseenter', () => {
      element.style.transform = `scale(${scale})`;
      element.style.transition = 'transform 0.3s ease';
    });

    element.addEventListener('mouseleave', () => {
      element.style.transform = 'scale(1)';
    });
  }

  public destroy(): void {
    this.observer.disconnect();
    this.animatedElements.clear();
  }
}
