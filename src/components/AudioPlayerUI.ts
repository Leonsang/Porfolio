import { AudioPlayer, Track } from './AudioPlayer';

export class AudioPlayerUI {
  private audioPlayer: AudioPlayer;
  private container!: HTMLElement;
  private isExpanded: boolean = false;
  private isVisible: boolean = false; // Cambiado a false para que esté oculto por defecto

  // UI Elements
  private playButton!: HTMLButtonElement;
  private prevButton!: HTMLButtonElement;
  private nextButton!: HTMLButtonElement;
  private progressBar!: HTMLDivElement;
  private progressFill!: HTMLDivElement;
  private timeDisplay!: HTMLSpanElement;
  private volumeSlider!: HTMLInputElement;
  private muteButton!: HTMLButtonElement;
  private trackInfo!: HTMLDivElement;
  private expandButton!: HTMLButtonElement;
  private playlistContainer!: HTMLDivElement;

  constructor(audioPlayer: AudioPlayer) {
    this.audioPlayer = audioPlayer;
    this.container = this.createContainer();
    this.setupEventListeners();
    this.render();
    this.attachToDOM();
    this.hide(); // Ocultar inmediatamente después de crear
  }

  private createContainer(): HTMLElement {
    const container = document.createElement('div');
    container.className = 'audio-player-container';
    container.innerHTML = `
      <div class="audio-player">
        <div class="audio-player-header">
          <div class="track-info">
            <div class="track-title">Loading...</div>
            <div class="track-artist">-</div>
          </div>
          <button class="expand-button" title="Expand/Collapse">
            <i class="fas fa-expand"></i>
          </button>
        </div>
        
        <div class="audio-controls">
          <button class="control-btn prev-btn" title="Previous Track">
            <i class="fas fa-step-backward"></i>
          </button>
          <button class="control-btn play-btn" title="Play/Pause">
            <i class="fas fa-play"></i>
          </button>
          <button class="control-btn next-btn" title="Next Track">
            <i class="fas fa-step-forward"></i>
          </button>
        </div>
        
        <div class="audio-progress">
          <div class="progress-bar">
            <div class="progress-fill"></div>
          </div>
          <span class="time-display">0:00 / 0:00</span>
        </div>
        
        <div class="audio-volume">
          <button class="control-btn mute-btn" title="Mute/Unmute">
            <i class="fas fa-volume-up"></i>
          </button>
          <input type="range" class="volume-slider" min="0" max="100" value="20" title="Volume">
        </div>
        
        <div class="playlist-container" style="display: none;">
          <div class="playlist-header">
            <h4>Playlist</h4>
            <div class="license-info">
              <span>🎵 Creative Commons</span>
              <a href="https://creativecommons.org/licenses/by/4.0/" target="_blank" title="CC BY 4.0 License">
                <i class="fas fa-external-link-alt"></i>
              </a>
            </div>
          </div>
          <div class="playlist-tracks"></div>
        </div>
      </div>
    `;

    // Get references to UI elements
    this.playButton = container.querySelector('.play-btn') as HTMLButtonElement;
    this.prevButton = container.querySelector('.prev-btn') as HTMLButtonElement;
    this.nextButton = container.querySelector('.next-btn') as HTMLButtonElement;
    this.progressBar = container.querySelector('.progress-bar') as HTMLDivElement;
    this.progressFill = container.querySelector('.progress-fill') as HTMLDivElement;
    this.timeDisplay = container.querySelector('.time-display') as HTMLSpanElement;
    this.volumeSlider = container.querySelector('.volume-slider') as HTMLInputElement;
    this.muteButton = container.querySelector('.mute-btn') as HTMLButtonElement;
    this.trackInfo = container.querySelector('.track-info') as HTMLDivElement;
    this.expandButton = container.querySelector('.expand-button') as HTMLButtonElement;
    this.playlistContainer = container.querySelector('.playlist-container') as HTMLDivElement;

    return container;
  }

  private setupEventListeners(): void {
    // Control buttons
    this.playButton.addEventListener('click', () => this.audioPlayer.togglePlay());
    this.prevButton.addEventListener('click', () => this.audioPlayer.previousTrack());
    this.nextButton.addEventListener('click', () => this.audioPlayer.nextTrack());
    this.muteButton.addEventListener('click', () => this.audioPlayer.toggleMute());
    this.expandButton.addEventListener('click', () => this.toggleExpanded());

    // Progress bar
    this.progressBar.addEventListener('click', (e) => this.onProgressClick(e));

    // Volume slider
    this.volumeSlider.addEventListener('input', (e) => {
      const target = e.target as HTMLInputElement;
      this.audioPlayer.setVolume(parseInt(target.value) / 100);
    });

    // Audio player events
    window.addEventListener('audioPlayer:playStateChanged', ((e: CustomEvent) => {
      this.updatePlayButton(e.detail.isPlaying);
    }) as EventListener);

    window.addEventListener('audioPlayer:trackChanged', ((e: CustomEvent) => {
      this.updateTrackInfo(e.detail.track);
      this.updatePlaylistSelection(e.detail.index);
    }) as EventListener);

    window.addEventListener('audioPlayer:timeUpdate', ((e: CustomEvent) => {
      this.updateProgress(e.detail.progress, e.detail.currentTime, e.detail.duration);
    }) as EventListener);

    window.addEventListener('audioPlayer:volumeChanged', ((e: CustomEvent) => {
      this.updateVolumeUI(e.detail.volume);
    }) as EventListener);

    window.addEventListener('audioPlayer:muteChanged', ((e: CustomEvent) => {
      this.updateMuteButton(e.detail.isMuted);
    }) as EventListener);

    // Music player toggle event
    window.addEventListener('musicPlayerToggle', () => {
      this.toggle();
    });
  }

  private onProgressClick(e: MouseEvent): void {
    const rect = this.progressBar.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const progress = clickX / rect.width;
    const duration = this.audioPlayer.getDuration();
    this.audioPlayer.seekTo(progress * duration);
  }

  private updatePlayButton(isPlaying: boolean): void {
    const icon = this.playButton.querySelector('i');
    if (icon) {
      icon.className = isPlaying ? 'fas fa-pause' : 'fas fa-play';
    }
    this.playButton.title = isPlaying ? 'Pause' : 'Play';
  }

  private updateTrackInfo(track: Track): void {
    const titleElement = this.trackInfo.querySelector('.track-title');
    const artistElement = this.trackInfo.querySelector('.track-artist');
    
    if (titleElement) titleElement.textContent = track.title;
    if (artistElement) artistElement.textContent = track.artist;
  }

  private updateProgress(progress: number, currentTime: number, duration: number): void {
    this.progressFill.style.width = `${progress}%`;
    this.timeDisplay.textContent = `${this.formatTime(currentTime)} / ${this.formatTime(duration)}`;
  }

  private updateVolumeUI(volume: number): void {
    this.volumeSlider.value = (volume * 100).toString();
  }

  private updateMuteButton(isMuted: boolean): void {
    const icon = this.muteButton.querySelector('i');
    if (icon) {
      icon.className = isMuted ? 'fas fa-volume-mute' : 'fas fa-volume-up';
    }
    this.muteButton.title = isMuted ? 'Unmute' : 'Mute';
  }

  private updatePlaylistSelection(index: number): void {
    const tracks = this.playlistContainer.querySelectorAll('.playlist-track');
    tracks.forEach((track, i) => {
      track.classList.toggle('active', i === index);
    });
  }

  private toggleExpanded(): void {
    this.isExpanded = !this.isExpanded;
    this.playlistContainer.style.display = this.isExpanded ? 'block' : 'none';
    
    const icon = this.expandButton.querySelector('i');
    if (icon) {
      icon.className = this.isExpanded ? 'fas fa-compress' : 'fas fa-expand';
    }
    
    this.container.classList.toggle('expanded', this.isExpanded);
  }

  private formatTime(seconds: number): string {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  }

  private render(): void {
    this.renderPlaylist();
    this.updateTrackInfo(this.audioPlayer.getCurrentTrack());
  }

  private renderPlaylist(): void {
    const playlistTracks = this.playlistContainer.querySelector('.playlist-tracks');
    if (!playlistTracks) return;

    const tracks = this.audioPlayer.getPlaylist();
    playlistTracks.innerHTML = tracks.map((track, index) => `
      <div class="playlist-track ${index === 0 ? 'active' : ''}" data-index="${index}">
        <div class="track-info">
          <div class="track-title">${track.title}</div>
          <div class="track-artist">${track.artist}</div>
        </div>
        <div class="track-duration">${this.formatTime(track.duration)}</div>
        <div class="track-category">${track.category}</div>
      </div>
    `).join('');

    // Add click listeners to playlist tracks
    playlistTracks.querySelectorAll('.playlist-track').forEach((trackElement, index) => {
      trackElement.addEventListener('click', () => {
        this.audioPlayer.setTrack(index);
      });
    });
  }

  private attachToDOM(): void {
    // Insert after the navbar
    const navbar = document.querySelector('.navbar');
    if (navbar && navbar.parentNode && this.container) {
      try {
        navbar.parentNode.insertBefore(this.container, navbar.nextSibling);
      } catch (error) {
        console.warn('Could not attach audio player to DOM:', error);
        // Fallback: append to body
        document.body.appendChild(this.container);
      }
    } else {
      console.warn('Navbar not found, appending audio player to body');
      document.body.appendChild(this.container);
    }
  }

  public show(): void {
    this.container.style.display = 'block';
    this.isVisible = true;
  }

  public hide(): void {
    this.container.style.display = 'none';
    this.isVisible = false;
  }

  public toggle(): void {
    if (this.isVisible) {
      this.hide();
    } else {
      this.show();
    }
  }

  public destroy(): void {
    this.container.remove();
    this.audioPlayer.destroy();
  }
}
