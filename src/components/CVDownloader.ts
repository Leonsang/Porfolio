import { cvConfigs, getCVByLanguage, CVConfig, getCVPath } from '../config/cv';
import { i18n } from '../i18n/i18n';

export class CVDownloader {
  private container: HTMLElement | null = null;
  private currentLanguage: 'en' | 'es' = 'en';

  constructor(containerId: string) {
    this.container = document.getElementById(containerId);
    this.currentLanguage = i18n.getCurrentLanguage() as 'en' | 'es';
    this.init();
  }

  private init(): void {
    if (!this.container) return;

    // Subscribe to i18n language changes directly (single source of truth)
    i18n.addLanguageChangeListener((language: string) => {
      this.currentLanguage = (language as 'en' | 'es');
      this.render();
    });

    this.render();
    this.setupEventListeners();
  }

  public render(): void {
    if (!this.container) return;

    const cvsForLanguage = getCVByLanguage(this.currentLanguage);

    // Only grid and info; modal header/subtitle are provided by the static modal
    this.container.innerHTML = `
      <div class="cv-downloader">
        <div class="cv-grid">
          ${cvsForLanguage.map(cv => this.renderCVCard(cv)).join('')}
        </div>
        
        <div class="cv-info">
          <div class="cv-tip">
            <i class="fas fa-lightbulb"></i>
            <div>
              <strong>${i18n.t('cv.atsTip')}:</strong>
              ${i18n.t('cv.atsDescription')}
            </div>
          </div>
        </div>
      </div>
    `;
  }

  private renderCVCard(cv: CVConfig): string {
    const isATS = cv.type === 'ats';
    const iconClass = isATS ? 'fas fa-robot' : 'fas fa-file-alt';
    const badgeClass = isATS ? 'ats-badge' : 'standard-badge';
    const badgeText = isATS 
      ? i18n.t('cv.atsBadge')
      : i18n.t('cv.standardBadge');

    return `
      <div class="cv-card ${cv.type}" data-cv-id="${cv.id}">
        <div class="cv-card-header">
          <div class="cv-icon">
            <i class="${iconClass}"></i>
          </div>
          <div class="cv-badge ${badgeClass}">
            ${badgeText}
          </div>
        </div>
        
        <div class="cv-card-content">
          <h4 class="cv-title">${cv.displayName}</h4>
          <p class="cv-description">${cv.description}</p>
          
          <div class="cv-meta">
            <div class="cv-meta-item">
              <i class="fas fa-calendar"></i>
              <span>${cv.lastUpdated}</span>
            </div>
            <div class="cv-meta-item">
              <i class="fas fa-file-pdf"></i>
              <span>PDF</span>
            </div>
          </div>
        </div>
        
        <div class="cv-card-actions">
          <button class="btn btn-primary cv-download-btn" data-cv-id="${cv.id}">
            <i class="fas fa-download"></i>
            ${i18n.t('cv.download')}
          </button>
          
          <button class="btn btn-secondary cv-preview-btn" data-cv-id="${cv.id}">
            <i class="fas fa-eye"></i>
            ${i18n.t('cv.preview')}
          </button>
        </div>
      </div>
    `;
  }

  private setupEventListeners(): void {
    if (!this.container) return;

    // Download buttons
    this.container.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;
      
      if (target.closest('.cv-download-btn')) {
        const button = target.closest('.cv-download-btn') as HTMLElement;
        const cvId = button.getAttribute('data-cv-id');
        if (cvId) {
          this.downloadCV(cvId);
        }
      }
      
      if (target.closest('.cv-preview-btn')) {
        const button = target.closest('.cv-preview-btn') as HTMLElement;
        const cvId = button.getAttribute('data-cv-id');
        if (cvId) {
          this.previewCV(cvId);
        }
      }
    });
  }

  private downloadCV(cvId: string): void {
    const cv = cvConfigs.find(c => c.id === cvId);
    if (!cv) return;

    const cvPath = getCVPath(cv);
    
    // Create download link
    const link = document.createElement('a');
    link.href = cvPath;
    link.download = cv.filename;
    link.target = '_blank';
    
    // Trigger download
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Show success message
    this.showNotification(
      i18n.t('cv.downloadSuccess'),
      'success'
    );
  }

  private previewCV(cvId: string): void {
    const cv = cvConfigs.find(c => c.id === cvId);
    if (!cv) return;

    const cvPath = getCVPath(cv);
    
    // Open CV in new tab for preview
    window.open(cvPath, '_blank');
  }

  private showNotification(message: string, type: 'success' | 'error' | 'info'): void {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `cv-notification ${type}`;
    notification.innerHTML = `
      <div class="notification-content">
        <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
        <span>${message}</span>
      </div>
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
      notification.classList.add('show');
    }, 100);
    
    // Hide and remove after 3 seconds
    setTimeout(() => {
      notification.classList.remove('show');
      setTimeout(() => {
        if (notification.parentNode) {
          notification.parentNode.removeChild(notification);
        }
      }, 300);
    }, 3000);
  }

  public destroy(): void {
    if (this.container) {
      this.container.innerHTML = '';
    }
  }
}
