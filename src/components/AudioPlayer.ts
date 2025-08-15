export interface Track {
  id: string;
  title: string;
  artist: string;
  url: string;
  duration: number;
  license: string;
  licenseUrl: string;
  category: 'ambient' | 'electronic' | 'chill' | 'focus';
}

export class AudioPlayer {
  private audio: HTMLAudioElement;
  private playlist: Track[];
  private currentTrackIndex: number = 0;
  private isPlaying: boolean = false;
  private volume: number = 0.2; // Cambiado de 0.7 a 0.2 (20%)
  private isMuted: boolean = false;
  private previousVolume: number = 0.2; // Cambiado de 0.7 a 0.2 (20%)
  private audioContext: AudioContext | null = null;
  private gainNode: GainNode | null = null;

  constructor() {
    this.audio = new Audio();
    this.playlist = this.initializePlaylist();
    this.setupAudio();
    this.setupEventListeners();
    this.loadTrack(0);
  }

  private initializePlaylist(): Track[] {
    return [
      {
        id: 'nihilore-1',
        title: 'Something Beautiful Is Going To Happen',
        artist: 'Nihilore',
        url: '/sounds/Something+Beautiful+Is+Going+To+Happen.mp3',
        duration: 300, // 5 minutes (aproximado)
        license: 'CC BY 4.0',
        licenseUrl: 'https://creativecommons.org/licenses/by/4.0/',
        category: 'ambient'
      },
      {
        id: 'nihilore-2',
        title: 'Bush Week',
        artist: 'Nihilore',
        url: '/sounds/bush-week-by-nihilore.mp3',
        duration: 240, // 4 minutes (aproximado)
        license: 'CC BY 4.0',
        licenseUrl: 'https://creativecommons.org/licenses/by/4.0/',
        category: 'electronic'
      }
    ];
  }

  private setupAudio(): void {
    this.audio.volume = this.volume;
    this.audio.preload = 'auto';
    
    // Setup Web Audio API for better control
    try {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      this.gainNode = this.audioContext.createGain();
      this.gainNode.gain.value = this.volume;
    } catch (error) {
      console.warn('Web Audio API not supported, using fallback');
    }
  }

  private setupEventListeners(): void {
    this.audio.addEventListener('ended', () => this.nextTrack());
    this.audio.addEventListener('timeupdate', () => this.onTimeUpdate());
    this.audio.addEventListener('loadedmetadata', () => this.onTrackLoaded());
    this.audio.addEventListener('error', (e) => this.onTrackError(e));
  }

  public play(): void {
    if (this.audio.readyState >= 2) {
      this.audio.play();
      this.isPlaying = true;
      this.dispatchEvent('playStateChanged', { isPlaying: true });
    }
  }

  public pause(): void {
    this.audio.pause();
    this.isPlaying = false;
    this.dispatchEvent('playStateChanged', { isPlaying: false });
  }

  public togglePlay(): void {
    if (this.isPlaying) {
      this.pause();
    } else {
      this.play();
    }
  }

  /**
   * Play next track
   */
  public nextTrack(): void {
    if (this.playlist.length === 0) return;
    
    const wasPlaying = this.isPlaying;
    this.currentTrackIndex = (this.currentTrackIndex + 1) % this.playlist.length;
    this.loadTrack(this.currentTrackIndex);
    
    // Auto-play the new track if it was playing before
    if (wasPlaying) {
      this.autoPlayAfterLoad();
    }
  }

  /**
   * Play previous track
   */
  public previousTrack(): void {
    if (this.playlist.length === 0) return;
    
    const wasPlaying = this.isPlaying;
    this.currentTrackIndex = this.currentTrackIndex === 0 
      ? this.playlist.length - 1 
      : this.currentTrackIndex - 1;
    this.loadTrack(this.currentTrackIndex);
    
    // Auto-play the new track if it was playing before
    if (wasPlaying) {
      this.autoPlayAfterLoad();
    }
  }

  /**
   * Set track by index
   */
  public setTrack(index: number): void {
    if (index < 0 || index >= this.playlist.length) return;
    
    const wasPlaying = this.isPlaying;
    this.currentTrackIndex = index;
    this.loadTrack(index);
    
    // Auto-play the new track if it was playing before
    if (wasPlaying) {
      this.autoPlayAfterLoad();
    }
  }

  private loadTrack(index: number): void {
    const track = this.playlist[index];
    this.audio.src = track.url;
    this.audio.load();
    this.dispatchEvent('trackChanged', { track, index });
  }

  public setVolume(volume: number): void {
    this.volume = Math.max(0, Math.min(1, volume));
    this.audio.volume = this.volume;
    
    if (this.gainNode) {
      this.gainNode.gain.value = this.volume;
    }
    
    this.dispatchEvent('volumeChanged', { volume: this.volume });
  }

  public toggleMute(): void {
    if (this.isMuted) {
      this.audio.volume = this.previousVolume;
      this.volume = this.previousVolume;
      this.isMuted = false;
    } else {
      this.previousVolume = this.volume;
      this.audio.volume = 0;
      this.volume = 0;
      this.isMuted = true;
    }
    
    this.dispatchEvent('muteChanged', { isMuted: this.isMuted });
  }

  public seekTo(time: number): void {
    if (this.audio.readyState >= 1) {
      this.audio.currentTime = time;
    }
  }

  public getCurrentTrack(): Track {
    return this.playlist[this.currentTrackIndex];
  }

  public getPlaylist(): Track[] {
    return [...this.playlist];
  }

  public getCurrentTime(): number {
    return this.audio.currentTime;
  }

  public getDuration(): number {
    return this.audio.duration || 0;
  }

  public getProgress(): number {
    if (this.audio.duration) {
      return (this.audio.currentTime / this.audio.duration) * 100;
    }
    return 0;
  }

  public isTrackLoaded(): boolean {
    return this.audio.readyState >= 2;
  }

  private onTimeUpdate(): void {
    this.dispatchEvent('timeUpdate', {
      currentTime: this.audio.currentTime,
      duration: this.audio.duration,
      progress: this.getProgress()
    });
  }

  private onTrackLoaded(): void {
    this.dispatchEvent('trackLoaded', { track: this.getCurrentTrack() });
  }

  private onTrackError(error: Event): void {
    console.error('Audio track error:', error);
    this.dispatchEvent('trackError', { error });
  }

  private dispatchEvent(eventName: string, data: any): void {
    const event = new CustomEvent(`audioPlayer:${eventName}`, { detail: data });
    window.dispatchEvent(event);
  }

  public destroy(): void {
    this.audio.pause();
    this.audio.src = '';
    this.audio.load();
    
    if (this.audioContext) {
      this.audioContext.close();
    }
  }

  /**
   * Auto-play after track is loaded
   */
  private autoPlayAfterLoad(): void {
    // Wait for the track to be ready before playing
    const checkReady = () => {
      if (this.audio.readyState >= 2) {
        this.play();
      } else {
        // Check again in 100ms if not ready
        setTimeout(checkReady, 100);
      }
    };
    checkReady();
  }
}
