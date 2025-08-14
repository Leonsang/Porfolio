export interface AnimationOptions {
  duration: number;
  easing: string;
  delay?: number;
  iterations?: number;
  direction?: 'normal' | 'reverse' | 'alternate' | 'alternate-reverse';
  fill?: 'none' | 'forwards' | 'backwards' | 'both';
}

export class AnimationManager {
  private animations: Map<HTMLElement, Animation[]> = new Map();
  private isEnabled: boolean = true;

  constructor() {
    this.init();
  }

  private init(): void {
    // Check if user prefers reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      this.isEnabled = false;
      console.log('⚠️ Animations disabled due to user preference');
    }

    console.log('✅ Animation Manager initialized');
  }

  /**
   * Add staggered animation to multiple elements
   */
  public addStaggeredAnimation(
    elements: HTMLElement[],
    options: AnimationOptions,
    staggerDelay: number = 100
  ): void {
    if (!this.isEnabled) return;

    elements.forEach((element, index) => {
      const delay = (options.delay || 0) + (index * staggerDelay);
      
      setTimeout(() => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        
        const animation = element.animate([
          {
            opacity: 0,
            transform: 'translateY(30px)'
          },
          {
            opacity: 1,
            transform: 'translateY(0)'
          }
        ], {
          duration: options.duration,
          easing: options.easing,
          fill: options.fill || 'forwards',
          delay: 0
        });

        this.trackAnimation(element, animation);
      }, delay);
    });
  }

  /**
   * Add floating animation to an element
   */
  public addFloatingAnimation(element: HTMLElement, amplitude: number = 5): void {
    if (!this.isEnabled) return;

    const keyframes = [
      { transform: 'translateY(0px)' },
      { transform: `translateY(-${amplitude}px)` },
      { transform: 'translateY(0px)' }
    ];
    
    const animation = element.animate(keyframes, {
      duration: 2000 + Math.random() * 1000,
      easing: 'ease-in-out',
      iterations: Infinity,
      delay: Math.random() * 1000
    });
    
    this.trackAnimation(element, animation);
    
    // Store animation reference for cleanup
    if (!element.dataset.floatingAnimation) {
      element.dataset.floatingAnimation = 'true';
      element.addEventListener('animationend', () => {
        // Restart animation with slight delay
        setTimeout(() => {
          if (element.dataset.floatingAnimation === 'true') {
            animation.play();
          }
        }, Math.random() * 2000);
      });
    }
  }

  /**
   * Add pulse effect to an element
   */
  public addPulseEffect(element: HTMLElement, scale: number = 1.05): void {
    if (!this.isEnabled) return;

    const keyframes = [
      { transform: 'scale(1)' },
      { transform: `scale(${scale})` },
      { transform: 'scale(1)' }
    ];
    
    const animation = element.animate(keyframes, {
      duration: 1500,
      easing: 'ease-in-out',
      iterations: Infinity,
      delay: Math.random() * 2000
    });
    
    this.trackAnimation(element, animation);
    
    // Store animation reference for cleanup
    if (!element.dataset.pulseAnimation) {
      element.dataset.pulseAnimation = 'true';
      element.addEventListener('animationend', () => {
        // Restart animation with slight delay
        setTimeout(() => {
          if (element.dataset.pulseAnimation === 'true') {
            animation.play();
          }
        }, Math.random() * 3000);
      });
    }
  }

  /**
   * Add fade in animation
   */
  public addFadeIn(element: HTMLElement, options: Partial<AnimationOptions> = {}): void {
    if (!this.isEnabled) return;

    const defaultOptions: AnimationOptions = {
      duration: 800,
      easing: 'ease-out',
      delay: 0,
      fill: 'forwards'
    };

    const finalOptions = { ...defaultOptions, ...options };

    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';

    const animation = element.animate([
      {
        opacity: 0,
        transform: 'translateY(20px)'
      },
      {
        opacity: 1,
        transform: 'translateY(0)'
      }
    ], finalOptions);

    this.trackAnimation(element, animation);
  }

  /**
   * Add slide in animation
   */
  public addSlideIn(element: HTMLElement, direction: 'left' | 'right' | 'up' | 'down' = 'up', options: Partial<AnimationOptions> = {}): void {
    if (!this.isEnabled) return;

    const defaultOptions: AnimationOptions = {
      duration: 600,
      easing: 'ease-out',
      delay: 0,
      fill: 'forwards'
    };

    const finalOptions = { ...defaultOptions, ...options };

    let startTransform = '';
    switch (direction) {
      case 'left':
        startTransform = 'translateX(-100%)';
        break;
      case 'right':
        startTransform = 'translateX(100%)';
        break;
      case 'up':
        startTransform = 'translateY(-100%)';
        break;
      case 'down':
        startTransform = 'translateY(100%)';
        break;
    }

    element.style.opacity = '0';
    element.style.transform = startTransform;

    const animation = element.animate([
      {
        opacity: 0,
        transform: startTransform
      },
      {
        opacity: 1,
        transform: 'translate(0, 0)'
      }
    ], finalOptions);

    this.trackAnimation(element, animation);
  }

  /**
   * Add bounce animation
   */
  public addBounce(element: HTMLElement, options: Partial<AnimationOptions> = {}): void {
    if (!this.isEnabled) return;

    const defaultOptions: AnimationOptions = {
      duration: 1000,
      easing: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
      delay: 0,
      fill: 'forwards'
    };

    const finalOptions = { ...defaultOptions, ...options };

    const animation = element.animate([
      { transform: 'scale(0.3)', opacity: 0.1 },
      { transform: 'scale(1.05)' },
      { transform: 'scale(0.9)' },
      { transform: 'scale(1.02)' },
      { transform: 'scale(1)', opacity: 1 }
    ], finalOptions);

    this.trackAnimation(element, animation);
  }

  /**
   * Track animation for cleanup
   */
  private trackAnimation(element: HTMLElement, animation: Animation): void {
    if (!this.animations.has(element)) {
      this.animations.set(element, []);
    }
    this.animations.get(element)!.push(animation);
  }

  /**
   * Stop all animations for an element
   */
  public stopElementAnimations(element: HTMLElement): void {
    const elementAnimations = this.animations.get(element);
    if (elementAnimations) {
      elementAnimations.forEach(animation => animation.cancel());
      this.animations.delete(element);
    }
  }

  /**
   * Stop all animations
   */
  public stopAllAnimations(): void {
    this.animations.forEach(animations => {
      animations.forEach(animation => animation.cancel());
    });
    this.animations.clear();
  }

  /**
   * Pause all animations
   */
  public pauseAllAnimations(): void {
    this.animations.forEach(animations => {
      animations.forEach(animation => animation.pause());
    });
  }

  /**
   * Resume all animations
   */
  public resumeAllAnimations(): void {
    this.animations.forEach(animations => {
      animations.forEach(animation => animation.play());
    });
  }

  /**
   * Enable animations
   */
  public enable(): void {
    this.isEnabled = true;
    console.log('✅ Animations enabled');
  }

  /**
   * Disable animations
   */
  public disable(): void {
    this.isEnabled = false;
    this.stopAllAnimations();
    console.log('⚠️ Animations disabled');
  }

  /**
   * Check if animations are enabled
   */
  public isAnimationsEnabled(): boolean {
    return this.isEnabled;
  }

  /**
   * Get animation count for an element
   */
  public getElementAnimationCount(element: HTMLElement): number {
    return this.animations.get(element)?.length || 0;
  }

  /**
   * Get total animation count
   */
  public getTotalAnimationCount(): number {
    let total = 0;
    this.animations.forEach(animations => {
      total += animations.length;
    });
    return total;
  }

  /**
   * Destroy animation manager
   */
  public destroy(): void {
    this.stopAllAnimations();
    this.animations.clear();
    this.isEnabled = false;
  }
}

