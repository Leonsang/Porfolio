import { Application } from '@splinetool/runtime';
import SplineLoader from '@splinetool/loader';

export class SplineBackground {
  private app: Application | null = null;
  private container: HTMLElement | null = null;
  private isLoaded: boolean = false;
  private currentTheme: string = 'cyberpunk';
  private splineUrl: string = 'https://my.spline.design/synthwaveroad-1VHsiEVO3f6ROjJN0a1mrrJj/';

  constructor() {
    this.init();
  }

  /**
   * Inicializar el fondo de Spline
   */
  private async init(): Promise<void> {
    try {
      console.log('🚀 Initializing Spline Background...');
      
      // Crear el contenedor
      this.createContainer();
      
      // NO cargar Spline automáticamente - solo se cargará con el tema cyberpunk
      // await this.loadSplineScene();
      
      // Configurar el tema por defecto (sin Spline)
      this.setupDefaultTheme();
      
      console.log('✅ Spline Background initialized successfully (waiting for cyberpunk theme)');
      
    } catch (error) {
      console.error('❌ Error initializing Spline Background:', error);
      this.showFallbackBackground();
    }
  }

  /**
   * Crear el contenedor para Spline
   */
  private createContainer(): void {
    this.container = document.createElement('div');
    this.container.id = 'spline-background';
    this.container.className = 'spline-background';
    
    // Estilos CSS inline para el contenedor
    this.container.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      z-index: -1;
      pointer-events: none;
      opacity: 0;
      transition: opacity 1s ease-in-out;
      background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 50%, #0a0a0a 100%);
    `;
    
    document.body.appendChild(this.container);
  }

  /**
   * Cargar la escena de Spline
   */
  private async loadSplineScene(): Promise<void> {
    if (!this.container) return;

    try {
      console.log('📡 Loading Spline scene from:', this.splineUrl);
      
      // Crear iframe para cargar la escena de Spline
      const iframe = document.createElement('iframe');
      iframe.src = this.splineUrl;
      iframe.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 1;
        border: none;
        background: transparent;
        pointer-events: none;
      `;
      
      // Configurar atributos del iframe para mejor integración
      iframe.setAttribute('frameborder', '0');
      iframe.setAttribute('allowfullscreen', 'false');
      iframe.setAttribute('scrolling', 'no');
      
      // Añadir evento de carga
      iframe.onload = () => {
        console.log('✅ Spline scene iframe loaded successfully');
        this.app = {} as Application; // Placeholder
        this.isLoaded = true;
        
        // Mostrar gradualmente
        setTimeout(() => {
          if (this.container) {
            this.container.style.opacity = '1';
          }
        }, 500);
      };
      
      // Añadir evento de error
      iframe.onerror = () => {
        console.error('❌ Error loading Spline scene iframe');
        this.app = null;
        this.createPlaceholderScene();
        this.isLoaded = true;
      };
      
      this.container.appendChild(iframe);
      
      // Timeout de seguridad
      setTimeout(() => {
        if (!this.app) {
          console.warn('⚠️ Spline scene loading timeout, using fallback');
          this.app = null;
          this.createPlaceholderScene();
          this.isLoaded = true;
        }
      }, 10000); // 10 segundos de timeout
      
    } catch (error) {
      console.error('❌ Error loading Spline scene:', error);
      this.createPlaceholderScene();
      this.isLoaded = true;
    }
  }

  /**
   * Crear una escena placeholder mientras se implementa Spline
   */
  private createPlaceholderScene(): void {
    if (!this.container) return;

    // Limpiar elementos existentes
    this.clearPlaceholderElements();

    // Crear elementos de fondo cyberpunk
    const cyberpunkElements = [
      this.createGrid(),
      this.createFloatingParticles(),
      this.createScanLines(),
      this.createGlitchEffect()
    ];

    cyberpunkElements.forEach(element => {
      this.container!.appendChild(element);
    });

    // Añadir keyframes CSS para las animaciones
    this.addKeyframes();
  }

  /**
   * Crear grid cyberpunk
   */
  private createGrid(): HTMLElement {
    const grid = document.createElement('div');
    grid.className = 'cyberpunk-grid';
    grid.style.cssText = `
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-image: 
        linear-gradient(rgba(0, 255, 65, 0.1) 1px, transparent 1px),
        linear-gradient(90deg, rgba(0, 255, 65, 0.1) 1px, transparent 1px);
      background-size: 50px 50px;
      animation: gridMove 20s linear infinite;
      opacity: 0.3;
    `;
    return grid;
  }

  /**
   * Crear partículas flotantes
   */
  private createFloatingParticles(): HTMLElement {
    const particles = document.createElement('div');
    particles.className = 'cyberpunk-particles';
    particles.style.cssText = `
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      overflow: hidden;
    `;

    // Crear múltiples partículas
    for (let i = 0; i < 20; i++) {
      const particle = document.createElement('div');
      particle.style.cssText = `
        position: absolute;
        width: 2px;
        height: 2px;
        background: #00ff41;
        border-radius: 50%;
        box-shadow: 0 0 10px #00ff41;
        animation: particleFloat ${3 + Math.random() * 4}s ease-in-out infinite;
        animation-delay: ${Math.random() * 2}s;
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
      `;
      particles.appendChild(particle);
    }

    return particles;
  }

  /**
   * Crear líneas de escaneo
   */
  private createScanLines(): HTMLElement {
    const scanLines = document.createElement('div');
    scanLines.className = 'cyberpunk-scan-lines';
    scanLines.style.cssText = `
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: repeating-linear-gradient(
        0deg,
        transparent,
        transparent 2px,
        rgba(0, 255, 65, 0.1) 2px,
        rgba(0, 255, 65, 0.1) 4px
      );
      animation: scanLines 10s linear infinite;
      opacity: 0.2;
    `;
    return scanLines;
  }

  /**
   * Crear efecto de glitch
   */
  private createGlitchEffect(): HTMLElement {
    const glitch = document.createElement('div');
    glitch.className = 'cyberpunk-glitch';
    glitch.style.cssText = `
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(45deg, transparent 30%, rgba(0, 255, 65, 0.05) 50%, transparent 70%);
      animation: glitchEffect 8s ease-in-out infinite;
      opacity: 0.1;
    `;
    return glitch;
  }

  /**
   * Limpiar elementos placeholder existentes
   */
  private clearPlaceholderElements(): void {
    if (!this.container) return;

    const elementsToRemove = [
      '.cyberpunk-grid',
      '.cyberpunk-particles',
      '.cyberpunk-scan-lines',
      '.cyberpunk-glitch',
      '.extra-particles'
    ];

    elementsToRemove.forEach(selector => {
      const elements = this.container!.querySelectorAll(selector);
      elements.forEach(element => element.remove());
    });
  }

  /**
   * Añadir keyframes CSS para las animaciones
   */
  private addKeyframes(): void {
    // Verificar si los keyframes ya existen
    if (document.querySelector('#spline-keyframes')) return;

    const style = document.createElement('style');
    style.id = 'spline-keyframes';
    style.textContent = `
      @keyframes gridMove {
        0% { transform: translate(0, 0); }
        100% { transform: translate(50px, 50px); }
      }
      
      @keyframes particleFloat {
        0%, 100% {
          transform: translateY(0px) translateX(0px);
          opacity: 0.6;
        }
        25% {
          transform: translateY(-20px) translateX(10px);
          opacity: 1;
        }
        50% {
          transform: translateY(-40px) translateX(0px);
          opacity: 0.8;
        }
        75% {
          transform: translateY(-20px) translateX(-10px);
          opacity: 0.9;
        }
      }
      
      @keyframes scanLines {
        0% { transform: translateY(-100%); }
        100% { transform: translateY(100%); }
      }
      
      @keyframes glitchEffect {
        0%, 90%, 100% {
          transform: translateX(0px);
          opacity: 0.1;
        }
        5% {
          transform: translateX(-2px);
          opacity: 0.2;
        }
        10% {
          transform: translateX(2px);
          opacity: 0.15;
        }
        15% {
          transform: translateX(-1px);
          opacity: 0.2;
        }
        20% {
          transform: translateX(1px);
          opacity: 0.15;
        }
      }
      
      @keyframes extraParticleFloat {
        0%, 100% {
          transform: translateY(0px) translateX(0px);
          opacity: 0.4;
        }
        25% {
          transform: translateY(-15px) translateX(8px);
          opacity: 0.8;
        }
        50% {
          transform: translateY(-30px) translateX(0px);
          opacity: 0.6;
        }
        75% {
          transform: translateY(-15px) translateX(-8px);
          opacity: 0.7;
        }
      }
    `;
    document.head.appendChild(style);
  }

  /**
   * Configurar el tema por defecto (sin Spline)
   */
  private setupDefaultTheme(): void {
    if (!this.container) return;

    // Aplicar efectos CSS básicos primero
    this.createPlaceholderScene();
    
    // Mostrar contenedor con opacidad baja
    this.container.style.opacity = '0.3';
    
    console.log('🎨 Default theme setup complete with CSS effects');
  }

  /**
   * Configurar el tema cyberpunk
   */
  private setupCyberpunkTheme(): void {
    if (!this.container) return;

    // NO aplicar filtros CSS que interfieran con Spline
    // this.container.style.filter = 'hue-rotate(120deg) saturate(1.2)';
    
    // Solo añadir efectos de luz sutiles que no interfieran
    this.addLightEffects();
  }

  /**
   * Añadir efectos de luz cyberpunk
   */
  private addLightEffects(): void {
    if (!this.container) return;

    // Efecto de luz superior
    const topLight = document.createElement('div');
    topLight.style.cssText = `
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 100px;
      background: linear-gradient(to bottom, rgba(0, 255, 65, 0.1), transparent);
      pointer-events: none;
    `;
    this.container.appendChild(topLight);

    // Efecto de luz inferior
    const bottomLight = document.createElement('div');
    bottomLight.style.cssText = `
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 100px;
      background: linear-gradient(to top, rgba(0, 255, 65, 0.1), transparent);
      pointer-events: none;
    `;
    this.container.appendChild(bottomLight);
  }

  /**
   * Mostrar fondo de respaldo
   */
  private showFallbackBackground(): void {
    if (this.container) {
      this.container.style.background = `
        linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 50%, #0a0a0a 100%),
        radial-gradient(circle at 50% 50%, rgba(0, 255, 65, 0.1) 0%, transparent 70%)
      `;
      this.container.style.opacity = '1';
    }
  }

  /**
   * Cambiar tema
   */
  public setTheme(theme: string): void {
    this.currentTheme = theme;
    
    switch (theme) {
      case 'cyberpunk':
        this.enableCyberpunkMode();
        // Activar Spline solo para cyberpunk
        this.activateSpline();
        break;
      case 'matrix':
        this.enableMatrixMode();
        // Desactivar Spline para otros temas
        this.deactivateSpline();
        break;
      case 'sunset':
        this.enableSunsetMode();
        // Desactivar Spline para otros temas
        this.deactivateSpline();
        break;
      default:
        this.disableCyberpunkMode();
        // Desactivar Spline para otros temas
        this.deactivateSpline();
        break;
    }
  }

  /**
   * Habilitar modo cyberpunk
   */
  private enableCyberpunkMode(): void {
    if (!this.container) return;
    
    this.container.style.opacity = '1';
    
    // Solo aplicar efectos CSS si Spline NO está cargado
    if (this.shouldApplyCSSEffects()) {
      this.container.style.filter = 'hue-rotate(120deg) saturate(1.2)';
    }
    
    // Solo añadir efectos sutiles que no interfieran
    this.addCyberpunkEffects();
  }

  /**
   * Deshabilitar modo cyberpunk
   */
  private disableCyberpunkMode(): void {
    if (!this.container) return;
    
    this.container.style.opacity = '0.3';
    this.container.style.filter = 'none';
    
    // Remover efectos adicionales
    this.removeCyberpunkEffects();
  }

  /**
   * Habilitar modo matrix
   */
  private enableMatrixMode(): void {
    if (!this.container) return;
    
    this.container.style.opacity = '1';
    
    // Solo aplicar efectos CSS si Spline NO está cargado
    if (this.shouldApplyCSSEffects()) {
      this.container.style.filter = 'hue-rotate(60deg) saturate(1.5)';
    }
    
    // Solo transformaciones sutiles
    this.container.style.transform = 'perspective(1000px) rotateY(0.5deg)';
  }

  /**
   * Habilitar modo sunset
   */
  private enableSunsetMode(): void {
    if (!this.container) return;
    
    this.container.style.opacity = '1';
    
    // Solo aplicar efectos CSS si Spline NO está cargado
    this.container.style.filter = 'hue-rotate(30deg) saturate(1.3)';
    
    // Solo transformaciones sutiles
    this.container.style.transform = 'perspective(1000px) rotateZ(0.5deg)';
  }

  /**
   * Añadir efectos cyberpunk adicionales
   */
  private addCyberpunkEffects(): void {
    if (!this.container) return;

    // Solo transformaciones sutiles que no interfieran con Spline
    if (this.shouldApplyCSSEffects()) {
      this.container.style.transform = 'perspective(1000px) rotateX(0.5deg)';
    }
    
    // Añadir más partículas solo si Spline NO está cargado
    if (this.shouldApplyCSSEffects()) {
      this.addMoreParticles();
    }
  }

  /**
   * Remover efectos cyberpunk
   */
  private removeCyberpunkEffects(): void {
    if (!this.container) return;

    this.container.style.transform = 'none';
    
    // Remover partículas adicionales
    const extraParticles = this.container.querySelectorAll('.extra-particle');
    extraParticles.forEach(particle => particle.remove());
  }

  /**
   * Añadir más partículas
   */
  private addMoreParticles(): void {
    if (!this.container) return;

    const extraParticles = document.createElement('div');
    extraParticles.className = 'extra-particles';
    extraParticles.style.cssText = `
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
    `;

    // Crear partículas adicionales
    for (let i = 0; i < 15; i++) {
      const particle = document.createElement('div');
      particle.className = 'extra-particle';
      particle.style.cssText = `
        position: absolute;
        width: 1px;
        height: 1px;
        background: #00ff41;
        border-radius: 50%;
        box-shadow: 0 0 8px #00ff41;
        animation: extraParticleFloat ${2 + Math.random() * 3}s ease-in-out infinite;
        animation-delay: ${Math.random() * 1.5}s;
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
      `;
      extraParticles.appendChild(particle);
    }

    this.container.appendChild(extraParticles);
  }

  /**
   * Limpiar recursos
   */
  public destroy(): void {
    if (this.app && typeof this.app.dispose === 'function') {
      this.app.dispose();
    }
    
    if (this.container) {
      // Remover iframe si existe
      const iframe = this.container.querySelector('iframe');
      if (iframe) {
        iframe.remove();
      }
      this.container.remove();
    }
  }

  /**
   * Verificar si está cargado
   */
  public isReady(): boolean {
    return this.isLoaded;
  }

  /**
   * Obtener tema actual
   */
  public getCurrentTheme(): string {
    return this.currentTheme;
  }

  /**
   * Cambiar la escena de Spline
   */
  public changeSplineScene(newUrl: string): void {
    this.splineUrl = newUrl;
    
    if (this.container) {
      // Remover escena anterior
      const oldIframe = this.container.querySelector('iframe');
      if (oldIframe) {
        oldIframe.remove();
      }
      
      // Cargar nueva escena
      this.loadSplineScene();
    }
  }

  /**
   * Obtener URL actual de la escena
   */
  public getCurrentSplineUrl(): string {
    return this.splineUrl;
  }

  /**
   * Verificar si Spline está cargado
   */
  public isSplineLoaded(): boolean {
    return this.container?.querySelector('iframe') !== null;
  }

  /**
   * Aplicar efectos solo si Spline NO está cargado
   */
  private shouldApplyCSSEffects(): boolean {
    return !this.isSplineLoaded();
  }

  /**
   * Activar Spline para el tema cyberpunk
   */
  private activateSpline(): void {
    if (!this.container) return;
    
    console.log('🚀 Activating Spline for cyberpunk theme...');
    
    // Si ya está cargado, solo mostrar
    if (this.isSplineLoaded()) {
      console.log('✅ Spline already loaded, just showing...');
      this.container.style.opacity = '1';
      return;
    }
    
    // Cargar Synthwave Road si no está cargado
    if (this.splineUrl !== 'https://my.spline.design/synthwaveroad-1VHsiEVO3f6ROjJN0a1mrrJN0a1mrrJj/') {
      console.log('📡 Loading Synthwave Road...');
      this.changeSplineScene('https://my.spline.design/synthwaveroad-1VHsiEVO3f6ROjJN0a1mrrJj/');
    } else {
      console.log('✅ Synthwave Road URL already set, just showing...');
      // Si ya tiene la URL correcta, solo mostrar
      this.container.style.opacity = '1';
    }
  }

  /**
   * Desactivar Spline para otros temas
   */
  private deactivateSpline(): void {
    if (!this.container) return;
    
    console.log('🔄 Deactivating Spline, switching to CSS effects...');
    
    // Ocultar Spline
    this.container.style.opacity = '0';
    
    // Remover iframe después de la transición
    setTimeout(() => {
      if (this.container) {
        const iframe = this.container.querySelector('iframe');
        if (iframe) {
          console.log('🗑️ Removing Spline iframe...');
          iframe.remove();
        }
        
        // Mostrar efectos CSS como fallback
        console.log('🎨 Creating CSS effects as fallback...');
        this.createPlaceholderScene();
        this.container.style.opacity = '0.3';
        console.log('✅ CSS effects activated');
      }
    }, 1000); // Esperar a que termine la transición de opacity
  }
}
