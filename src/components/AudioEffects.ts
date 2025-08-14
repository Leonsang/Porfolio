export interface AudioConfig {
  volume: number;
  loop: boolean;
  autoplay: boolean;
}

export class AudioEffects {
  private audioContext: AudioContext | null = null;
  private sounds: Map<string, HTMLAudioElement> = new Map();
  private isEnabled: boolean = true;
  private masterVolume: number = 0.3;
  private activeOscillators: Set<OscillatorNode> = new Set();

  constructor() {
    this.initAudioContext();
  }

  private initAudioContext(): void {
    try {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    } catch (error) {
      console.warn('Web Audio API not supported');
    }
  }

  public addSound(name: string, src: string, config: Partial<AudioConfig> = {}): void {
    const audio = new Audio(src);
    const defaultConfig: AudioConfig = {
      volume: 0.5,
      loop: false,
      autoplay: false,
      ...config
    };

    audio.volume = defaultConfig.volume * this.masterVolume;
    audio.loop = defaultConfig.loop;
    
    if (defaultConfig.autoplay) {
      audio.play().catch(console.error);
    }

    this.sounds.set(name, audio);
  }

  public playSound(name: string): void {
    if (!this.isEnabled) return;
    
    const sound = this.sounds.get(name);
    if (sound) {
      sound.currentTime = 0;
      sound.play().catch(console.error);
    }
  }

  public stopSound(name: string): void {
    const sound = this.sounds.get(name);
    if (sound) {
      sound.pause();
      sound.currentTime = 0;
    }
  }

  public playHoverSound(): void {
    this.playSound('hover');
  }

  public playClickSound(): void {
    this.playSound('click');
  }

  public playThemeChangeSound(): void {
    this.playSound('themeChange');
  }

  public createHoverSound(frequency: number = 800, duration: number = 0.1): void {
    if (!this.audioContext) return;

    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(this.audioContext.destination);

    oscillator.frequency.setValueAtTime(frequency, this.audioContext.currentTime);
    oscillator.type = 'sine';

    gainNode.gain.setValueAtTime(0, this.audioContext.currentTime);
    gainNode.gain.linearRampToValueAtTime(this.masterVolume * 0.1, this.audioContext.currentTime + 0.01);
    gainNode.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + duration);

    // Track active oscillator
    this.activeOscillators.add(oscillator);

    oscillator.start(this.audioContext.currentTime);
    oscillator.stop(this.audioContext.currentTime + duration);

    // Clean up after completion
    oscillator.onended = () => {
      this.activeOscillators.delete(oscillator);
      oscillator.disconnect();
      gainNode.disconnect();
    };
  }

  public createClickSound(frequency: number = 1200, duration: number = 0.15): void {
    if (!this.audioContext) return;

    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(this.audioContext.destination);

    oscillator.frequency.setValueAtTime(frequency, this.audioContext.currentTime);
    oscillator.type = 'square';

    gainNode.gain.setValueAtTime(0, this.audioContext.currentTime);
    gainNode.gain.linearRampToValueAtTime(this.masterVolume * 0.2, this.audioContext.currentTime + 0.01);
    gainNode.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + duration);

    // Track active oscillator
    this.activeOscillators.add(oscillator);

    oscillator.start(this.audioContext.currentTime);
    oscillator.stop(this.audioContext.currentTime + duration);

    // Clean up after completion
    oscillator.onended = () => {
      this.activeOscillators.delete(oscillator);
      oscillator.disconnect();
      gainNode.disconnect();
    };
  }

  public createThemeChangeSound(): void {
    if (!this.audioContext) return;

    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(this.audioContext.destination);

    // Ascending tone
    oscillator.frequency.setValueAtTime(400, this.audioContext.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(800, this.audioContext.currentTime + 0.3);
    oscillator.type = 'sine';

    gainNode.gain.setValueAtTime(0, this.audioContext.currentTime);
    gainNode.gain.linearRampToValueAtTime(this.masterVolume * 0.15, this.audioContext.currentTime + 0.01);
    gainNode.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + 0.3);

    // Track active oscillator
    this.activeOscillators.add(oscillator);

    oscillator.start(this.audioContext.currentTime);
    oscillator.stop(this.audioContext.currentTime + 0.3);

    // Clean up after completion
    oscillator.onended = () => {
      this.activeOscillators.delete(oscillator);
      oscillator.disconnect();
      gainNode.disconnect();
    };
  }

  /**
   * Create hover sound effect
   */
  public createHoverSound(): void {
    if (!this.audioContext || this.isMuted) return;
    
    try {
      const oscillator = this.audioContext.createOscillator();
      const gainNode = this.audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(this.audioContext.destination);
      
      oscillator.frequency.setValueAtTime(800, this.audioContext.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(600, this.audioContext.currentTime + 0.1);
      
      gainNode.gain.setValueAtTime(0.1, this.audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.1);
      
      oscillator.start(this.audioContext.currentTime);
      oscillator.stop(this.audioContext.currentTime + 0.1);
      
    } catch (error) {
      console.warn('⚠️ Failed to create hover sound:', error);
    }
  }

  public setMasterVolume(volume: number): void {
    this.masterVolume = Math.max(0, Math.min(1, volume));
    
    // Update all existing sounds
    this.sounds.forEach(sound => {
      sound.volume = sound.volume / (sound.volume / this.masterVolume);
    });
  }

  public getMasterVolume(): number {
    return this.masterVolume;
  }

  public enable(): void {
    this.isEnabled = true;
  }

  public disable(): void {
    this.isEnabled = false;
    // Stop all active oscillators
    this.stopAllOscillators();
  }

  public isAudioEnabled(): boolean {
    return this.isEnabled;
  }

  private stopAllOscillators(): void {
    this.activeOscillators.forEach(oscillator => {
      try {
        oscillator.stop();
        oscillator.disconnect();
      } catch (error) {
        // Oscillator might already be stopped
      }
    });
    this.activeOscillators.clear();
  }

  public addAudioToElement(element: HTMLElement, soundType: 'hover' | 'click' | 'both' = 'both'): void {
    if (soundType === 'hover' || soundType === 'both') {
      element.addEventListener('mouseenter', () => {
        this.createHoverSound();
      });
    }

    if (soundType === 'click' || soundType === 'both') {
      element.addEventListener('click', () => {
        this.createClickSound();
      });
    }
  }

  public createAudioVisualizer(canvasId: string): void {
    const canvas = document.getElementById(canvasId) as HTMLCanvasElement;
    if (!canvas || !this.audioContext) return;

    const ctx = canvas.getContext('2d')!;
    const analyser = this.audioContext.createAnalyser();
    
    // Create a simple tone for visualization (not connected to speakers)
    const oscillator = this.audioContext.createOscillator();
    oscillator.connect(analyser);
    // Don't connect to destination to avoid hearing it
    
    analyser.fftSize = 256;
    const dataArray = new Uint8Array(analyser.frequencyBinCount);

    oscillator.frequency.setValueAtTime(440, this.audioContext.currentTime);
    oscillator.start();

    const draw = () => {
      requestAnimationFrame(draw);
      
      analyser.getByteFrequencyData(dataArray);
      
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      const barWidth = (canvas.width / dataArray.length) * 2.5;
      let barHeight;
      let x = 0;
      
      for (let i = 0; i < dataArray.length; i++) {
        barHeight = dataArray[i] / 2;
        
        const hue = (i / dataArray.length) * 360;
        ctx.fillStyle = `hsl(${hue}, 100%, 50%)`;
        ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
        
        x += barWidth + 1;
      }
    };
    
    draw();

    // Store for cleanup
    canvas.dataset.visualizerOscillator = 'true';
  }

  public destroy(): void {
    this.sounds.forEach(sound => {
      sound.pause();
      sound.src = '';
    });
    this.sounds.clear();
    
    // Stop all oscillators
    this.stopAllOscillators();
    
    if (this.audioContext) {
      this.audioContext.close();
    }
  }
}
