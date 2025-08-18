/**
 * SplineBackground Test - Versión simplificada para pruebas
 * Esta versión se puede usar independientemente del portfolio principal
 */

import { Application } from '@splinetool/runtime';
import SplineLoader from '@splinetool/loader';

export class SplineBackgroundTest {
  private container: HTMLElement | null = null;
  private app: Application | null = null;
  private isLoaded: boolean = false;
  private currentTheme: string = 'retro';
  private animationFrame: number | null = null;
  private splineUrl: string = 'https://my.spline.design/synthwaveroad-1VHsiEVO3f6ROjJN0a1mrrJj/';

  constructor() {
    this.init();
  }

  /**
   * Inicializar el fondo de prueba
   */
  private async init(): Promise<void> {
    try {
      console.log('🧪 Initializing SplineBackground Test...');
      
      // Crear el contenedor
      this.createContainer();
      
      // Intentar cargar la escena real de Spline
      await this.loadSplineScene();
      
      // Si falla Spline, usar efectos básicos como fallback
      if (!this.app) {
        console.log('⚠️ Spline scene failed, using fallback effects');
        this.createBasicEffects();
      }
      
      // Marcar como cargado
      this.isLoaded = true;
      
      // Mostrar gradualmente
      setTimeout(() => {
        if (this.container) {
          this.container.style.opacity = '1';
        }
      }, 500);
      
      console.log('✅ SplineBackground Test initialized successfully');
      
    } catch (error) {
      console.error('❌ Error initializing SplineBackground Test:', error);
      // Fallback a efectos básicos
      this.createBasicEffects();
      this.isLoaded = true;
    }
  }

  /**
   * Cargar la escena real de Spline
   */
  private async loadSplineScene(): Promise<void> {
    try {
      console.log('📡 Loading Spline scene from:', this.splineUrl);
      
      if (!this.container) return;
      
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
      };
      
      // Añadir evento de error
      iframe.onerror = () => {
        console.error('❌ Error loading Spline scene iframe');
        this.app = null;
      };
      
      this.container.appendChild(iframe);
      
      // Timeout de seguridad
      setTimeout(() => {
        if (!this.app) {
          console.warn('⚠️ Spline scene loading timeout, using fallback');
          this.app = null;
        }
      }, 10000); // 10 segundos de timeout
      
    } catch (error) {
      console.error('❌ Error loading Spline scene:', error);
      this.app = null;
    }
  }

  /**
   * Crear el contenedor
   */
  private createContainer(): void {
    this.container = document.createElement('div');
    this.container.id = 'spline-background-test';
    this.container.className = 'spline-background-test';
    
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
      overflow: hidden;
    `;
    
    document.body.appendChild(this.container);
  }

  /**
   * Crear efectos básicos
   */
  private createBasicEffects(): void {
    if (!this.container) return;

    // Crear elementos de fondo
    const effects = [
      this.createGrid(),
      this.createParticles(),
      this.createScanLines(),
      this.createGlitchEffect()
    ];

    effects.forEach(effect => {
      this.container!.appendChild(effect);
    });

    // Iniciar animaciones
    this.startAnimations();
  }

  /**
   * Crear grid básico
   */
  private createGrid(): HTMLElement {
    const grid = document.createElement('div');
    grid.className = 'test-grid';
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
      animation: testGridMove 20s linear infinite;
      opacity: 0.3;
    `;
    return grid;
  }

  /**
   * Crear partículas básicas
   */
  private createParticles(): HTMLElement {
    const particles = document.createElement('div');
    particles.className = 'test-particles';
    particles.style.cssText = `
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      overflow: hidden;
    `;

    // Crear partículas
    for (let i = 0; i < 15; i++) {
      const particle = document.createElement('div');
      particle.style.cssText = `
        position: absolute;
        width: 2px;
        height: 2px;
        background: #00ff41;
        border-radius: 50%;
        box-shadow: 0 0 10px #00ff41;
        animation: testParticleFloat ${3 + Math.random() * 4}s ease-in-out infinite;
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
    scanLines.className = 'test-scan-lines';
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
      animation: testScanLines 10s linear infinite;
      opacity: 0.2;
    `;
    return scanLines;
  }

  /**
   * Crear efecto de glitch
   */
  private createGlitchEffect(): HTMLElement {
    const glitch = document.createElement('div');
    glitch.className = 'test-glitch';
    glitch.style.cssText = `
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(45deg, transparent 30%, rgba(0, 255, 65, 0.05) 50%, transparent 70%);
      animation: testGlitchEffect 8s ease-in-out infinite;
      opacity: 0.1;
    `;
    return glitch;
  }

  /**
   * Iniciar animaciones
   */
  private startAnimations(): void {
    // Añadir keyframes CSS dinámicamente
    this.addKeyframes();
  }

  /**
   * Añadir keyframes CSS
   */
  private addKeyframes(): void {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes testGridMove {
        0% { transform: translate(0, 0); }
        100% { transform: translate(50px, 50px); }
      }
      
      @keyframes testParticleFloat {
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
      
      @keyframes testScanLines {
        0% { transform: translateY(-100%); }
        100% { transform: translateY(100%); }
      }
      
      @keyframes testGlitchEffect {
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
    `;
    document.head.appendChild(style);
  }

  /**
   * Cambiar tema
   */
  public setTheme(theme: string): void {
    this.currentTheme = theme;
    
    if (!this.container) return;
    
    switch (theme) {
      case 'cyberpunk':
        this.enableCyberpunkMode();
        break;
      case 'matrix':
        this.enableMatrixMode();
        break;
      case 'sunset':
        this.enableSunsetMode();
        break;
      default:
        this.enableRetroMode();
        break;
    }
  }

  /**
   * Habilitar modo cyberpunk
   */
  private enableCyberpunkMode(): void {
    if (!this.container) return;
    
    this.container.style.filter = 'hue-rotate(120deg) saturate(1.2)';
    this.container.style.transform = 'perspective(1000px) rotateX(1deg)';
    
    // Añadir efectos adicionales
    this.addCyberpunkEffects();
  }

  /**
   * Habilitar modo matrix
   */
  private enableMatrixMode(): void {
    if (!this.container) return;
    
    this.container.style.filter = 'hue-rotate(60deg) saturate(1.5)';
    this.container.style.transform = 'perspective(1000px) rotateY(1deg)';
  }

  /**
   * Habilitar modo sunset
   */
  private enableSunsetMode(): void {
    if (!this.container) return;
    
    this.container.style.filter = 'hue-rotate(30deg) saturate(1.3)';
    this.container.style.transform = 'perspective(1000px) rotateZ(1deg)';
  }

  /**
   * Habilitar modo retro
   */
  private enableRetroMode(): void {
    if (!this.container) return;
    
    this.container.style.filter = 'none';
    this.container.style.transform = 'none';
    
    // Remover efectos adicionales
    this.removeExtraEffects();
  }

  /**
   * Añadir efectos cyberpunk
   */
  private addCyberpunkEffects(): void {
    if (!this.container) return;

    // Crear partículas adicionales
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
    for (let i = 0; i < 10; i++) {
      const particle = document.createElement('div');
      particle.className = 'extra-particle';
      particle.style.cssText = `
        position: absolute;
        width: 1px;
        height: 1px;
        background: #00ff41;
        border-radius: 50%;
        box-shadow: 0 0 8px #00ff41;
        animation: testExtraParticleFloat ${2 + Math.random() * 3}s ease-in-out infinite;
        animation-delay: ${Math.random() * 1.5}s;
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
      `;
      extraParticles.appendChild(particle);
    }

    this.container.appendChild(extraParticles);
  }

  /**
   * Remover efectos adicionales
   */
  private removeExtraEffects(): void {
    if (!this.container) return;

    const extraParticles = this.container.querySelectorAll('.extra-particles');
    extraParticles.forEach(particle => particle.remove());
  }

  /**
   * Limpiar recursos
   */
  public destroy(): void {
    if (this.animationFrame) {
      cancelAnimationFrame(this.animationFrame);
    }
    
    if (this.app && typeof this.app.dispose === 'function') {
      this.app.dispose();
    }
    
    if (this.container) {
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
   * Obtener contenedor
   */
  public getContainer(): HTMLElement | null {
    return this.container;
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
}
