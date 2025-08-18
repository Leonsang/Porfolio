// Retro chat dog controller: typewriter phrases + 8-bit beeps
// Initializes on DOMContentLoaded from main.ts implicitly via HomeSection lifecycle.

const PHRASES_EN = [
  "Welcome, traveler!",
  "Deploy. Test. Deliver.",
  "Data never sleeps.",
  "Pipelines go brrr~",
  "Retro vibes, modern stack.",
];

const PHRASES_ES = [
  "¡Bienvenido, viajero!",
  "Desplegar. Probar. Entregar.",
  "Los datos no duermen.",
  "Pipelines al 100%",
  "Retro vibes, stack moderno.",
];

export class RetroChatDog {
  private bubble: HTMLElement | null;
  private dog: SVGElement | null;
  private phrases: string[];
  private idx = 0;
  private typing = false;
  private audioCtx: AudioContext | null = null;
  private langResolver: () => 'en' | 'es';

  constructor(langResolver: () => 'en' | 'es' = () => 'en') {
    this.bubble = document.getElementById('retro-chat-bubble');
    this.dog = document.getElementById('retro-dog') as unknown as SVGElement;
    this.langResolver = langResolver;
    this.phrases = this.pickPhrases();
  }

  init() {
    if (!this.bubble || !this.dog) return;
    // Bounce the dog a little
    this.dog.style.animation = 'floating 6s ease-in-out infinite';

    // Start cycle
    this.cycle();

    // React to language changes if your i18n emits a custom event
    window.addEventListener('languageChanged', () => {
      this.phrases = this.pickPhrases();
      this.idx = 0;
    });
  }

  private pickPhrases(): string[] {
    const lang = this.langResolver();
    return lang === 'es' ? PHRASES_ES : PHRASES_EN;
  }

  private async cycle() {
    // Show each phrase only once instead of infinite loop
    for (let i = 0; i < this.phrases.length; i++) {
      await this.showPhrase(this.phrases[i]);
      // Add a small delay between phrases
      if (i < this.phrases.length - 1) {
        await this.sleep(1400);
      }
    }
    
    // Optional: Hide the bubble after all phrases are shown
    setTimeout(() => {
      if (this.bubble) {
        this.bubble.classList.remove('show');
      }
    }, 2000);
  }

  private async showPhrase(text: string) {
    if (!this.bubble) return;
    this.typing = true;
    this.bubble.textContent = '';
    this.bubble.classList.add('show');

    for (let i = 0; i < text.length; i++) {
      if (!this.typing) break;
      this.bubble.textContent = (this.bubble.textContent || '') + text[i];
      this.beep(i);
      await this.sleep(45 + Math.random() * 40);
    }
    this.typing = false;
  }

  private beep(i: number) {
    // Respect global audio toggle if you dispatch audioToggled events
    // Here, we keep it simple and generate a short square-wave blip
    try {
      if (!this.audioCtx) {
        // Create on first user gesture; if Autoplay policies block, it will fail silently
        this.audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      if (!this.audioCtx) return;
      const ctx = this.audioCtx;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'square';
      // Slight random pitch around 1kHz for retro feel
      osc.frequency.value = 850 + ((i % 3) * 60) + Math.random() * 40;
      gain.gain.value = 0.03; // very soft
      osc.connect(gain);
      gain.connect(ctx.destination);
      const now = ctx.currentTime;
      osc.start(now);
      osc.stop(now + 0.04);
    } catch (_) {
      // ignore audio errors
    }
  }

  private sleep(ms: number) {
    return new Promise((res) => setTimeout(res, ms));
  }
}

