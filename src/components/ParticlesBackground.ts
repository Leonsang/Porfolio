export interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  opacity: number;
}

export class ParticlesBackground {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private particles: Particle[] = [];
  private animationId: number | null = null;
  private mouseX: number = 0;
  private mouseY: number = 0;
  private isMouseActive: boolean = false;
  private currentTheme: {
    primary_color: string;
    secondary_color: string;
    accent_color: string;
  } = {
    primary_color: '#00ff41',
    secondary_color: '#ff6b35',
    accent_color: '#4ecdc4'
  };

  constructor(canvasId: string) {
    this.canvas = document.getElementById(canvasId) as HTMLCanvasElement;
    this.ctx = this.canvas.getContext('2d')!;
    this.init();
  }

  private init(): void {
    this.resizeCanvas();
    this.createParticles();
    this.bindEvents();
    this.animate();
  }

  private resizeCanvas(): void {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  private createParticles(): void {
    const particleCount = Math.floor((this.canvas.width * this.canvas.height) / 15000);
    
    for (let i = 0; i < particleCount; i++) {
      this.particles.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 1,
        color: this.getRandomColor(),
        opacity: Math.random() * 0.5 + 0.2
      });
    }
  }

  private getRandomColor(): string {
    const colors = [
      this.currentTheme.primary_color,
      this.currentTheme.secondary_color,
      this.currentTheme.accent_color,
      'var(--light-color)'
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  }

  private bindEvents(): void {
    window.addEventListener('resize', () => this.resizeCanvas());
    
    this.canvas.addEventListener('mousemove', (e) => {
      this.mouseX = e.clientX;
      this.mouseY = e.clientY;
      this.isMouseActive = true;
      
      // Clear mouse active state after 100ms
      setTimeout(() => {
        this.isMouseActive = false;
      }, 100);
    });

    this.canvas.addEventListener('mouseleave', () => {
      this.isMouseActive = false;
    });
  }

  private animate(): void {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    this.updateParticles();
    this.drawParticles();
    this.drawConnections();
    
    this.animationId = requestAnimationFrame(() => this.animate());
  }

  private updateParticles(): void {
    this.particles.forEach(particle => {
      // Update position
      particle.x += particle.vx;
      particle.y += particle.vy;
      
      // Mouse interaction
      if (this.isMouseActive) {
        const dx = this.mouseX - particle.x;
        const dy = this.mouseY - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 100) {
          const force = (100 - distance) / 100;
          particle.vx += dx * force * 0.001;
          particle.vy += dy * force * 0.001;
        }
      }
      
      // Bounce off edges
      if (particle.x <= 0 || particle.x >= this.canvas.width) {
        particle.vx *= -0.8;
        particle.x = Math.max(0, Math.min(this.canvas.width, particle.x));
      }
      
      if (particle.y <= 0 || particle.y >= this.canvas.height) {
        particle.vy *= -0.8;
        particle.y = Math.max(0, Math.min(this.canvas.height, particle.y));
      }
      
      // Add some randomness
      particle.vx += (Math.random() - 0.5) * 0.1;
      particle.vy += (Math.random() - 0.5) * 0.1;
      
      // Limit velocity
      const maxVelocity = 2;
      particle.vx = Math.max(-maxVelocity, Math.min(maxVelocity, particle.vx));
      particle.vy = Math.max(-maxVelocity, Math.min(maxVelocity, particle.vy));
    });
  }

  private drawParticles(): void {
    this.particles.forEach(particle => {
      this.ctx.save();
      this.ctx.globalAlpha = particle.opacity;
      this.ctx.fillStyle = particle.color;
      this.ctx.beginPath();
      this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      this.ctx.fill();
      this.ctx.restore();
    });
  }

  private drawConnections(): void {
    const maxDistance = 150;
    
    for (let i = 0; i < this.particles.length; i++) {
      for (let j = i + 1; j < this.particles.length; j++) {
        const dx = this.particles[i].x - this.particles[j].x;
        const dy = this.particles[i].y - this.particles[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < maxDistance) {
          const opacity = (maxDistance - distance) / maxDistance * 0.3;
          this.ctx.save();
          this.ctx.globalAlpha = opacity;
          this.ctx.strokeStyle = this.currentTheme.primary_color;
          this.ctx.lineWidth = 1;
          this.ctx.beginPath();
          this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
          this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
          this.ctx.stroke();
          this.ctx.restore();
        }
      }
    }
  }

  /**
   * Update theme colors
   */
  public updateTheme(primaryColor: string, secondaryColor: string, accentColor: string): void {
    this.currentTheme = {
      primary_color: primaryColor,
      secondary_color: secondaryColor,
      accent_color: accentColor
    };
    
    // Update particle colors
    this.particles.forEach(particle => {
      if (Math.random() < 0.3) { // 30% chance to change color
        particle.color = this.getRandomColor();
      }
    });
  }

  /**
   * Resize the canvas and recreate particles
   */
  public resize(): void {
    this.resizeCanvas();
    this.particles = [];
    this.createParticles();
  }

  /**
   * Pause the animation
   */
  public pause(): void {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
  }

  /**
   * Resume the animation
   */
  public resume(): void {
    if (!this.animationId) {
      this.animate();
    }
  }

  /**
   * Destroy the particles background
   */
  public destroy(): void {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
    
    // Clear canvas
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    // Remove event listeners
    window.removeEventListener('resize', () => this.resizeCanvas());
  }
}
