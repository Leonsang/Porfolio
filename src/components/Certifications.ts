import { ChartComponent, CertificationData } from './ChartComponent';

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  image: string;
  credentialId: string;
  url: string;
  category: 'cloud' | 'data' | 'programming' | 'other';
  skills: string[];
}

export class Certifications {
  private certifications: Certification[];
  private currentCategory: string = 'all';
  private certificationsChart: ChartComponent | null = null;

  constructor(certifications: Certification[]) {
    this.certifications = certifications;
    this.init();
  }

  private init(): void {
    this.createCertificationsSection();
    this.bindEvents();
    this.initializeCertificationsChart();
  }

  private createCertificationsSection(): void {
    const container = document.getElementById('certifications-section');
    if (!container) return;

    container.innerHTML = `
      <div class="certifications-header">
        <h2>Certifications & Achievements</h2>
        <p>Professional credentials that validate my expertise</p>
        <div class="cert-filters">
          <button class="cert-filter-btn active" data-category="all">All</button>
          <button class="cert-filter-btn" data-category="cloud">Cloud</button>
          <button class="cert-filter-btn" data-category="data">Data</button>
          <button class="cert-filter-btn" data-category="programming">Programming</button>
          <button class="cert-filter-btn" data-category="other">Other</button>
        </div>
      </div>
      
      <!-- Certifications Chart -->
      <div class="certifications-chart-container">
        <h3>Certifications Overview</h3>
        <div class="chart-controls">
          <select id="cert-chart-type" class="chart-type-selector">
            <option value="line">Line Chart</option>
            <option value="bar">Bar Chart</option>
            <option value="radar">Radar Chart</option>
          </select>
        </div>
        <div id="certifications-chart" class="chart-container">
          <canvas id="certifications-canvas" width="400" height="300"></canvas>
        </div>
      </div>
      
      <div class="certifications-grid">
        ${this.certifications.map(cert => this.createCertificationCard(cert)).join('')}
      </div>
      <div class="cert-stats">
        <div class="stat-item">
          <span class="stat-number">${this.certifications.length}</span>
          <span class="stat-label">Total Certifications</span>
        </div>
        <div class="stat-item">
          <span class="stat-number">${this.getUniqueSkills().length}</span>
          <span class="stat-label">Skills Validated</span>
        </div>
        <div class="stat-item">
          <span class="stat-number">${this.getLatestYear()}</span>
          <span class="stat-label">Latest Achievement</span>
        </div>
      </div>
    `;
  }

  private createCertificationCard(cert: Certification): string {
    return `
      <div class="certification-card" data-category="${cert.category}">
        <div class="cert-image">
          <img src="${cert.image}" alt="${cert.name}" loading="lazy">
          <div class="cert-overlay">
            <div class="overlay-content">
              <h4>${cert.name}</h4>
              <p>${cert.issuer}</p>
              <span class="credential-id">ID: ${cert.credentialId}</span>
            </div>
          </div>
        </div>
        <div class="cert-details">
          <h4>${cert.name}</h4>
          <p class="cert-issuer">${cert.issuer}</p>
          <p class="cert-date">${cert.date}</p>
          <div class="cert-skills">
            ${cert.skills.slice(0, 3).map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
            ${cert.skills.length > 3 ? `<span class="skill-more">+${cert.skills.length - 3}</span>` : ''}
          </div>
          <div class="cert-actions">
            <a href="${cert.url}" target="_blank" class="verify-btn">Verify</a>
            <button class="details-btn" data-cert-id="${cert.id}">Details</button>
          </div>
        </div>
      </div>
    `;
  }

  private bindEvents(): void {
    // Filter buttons
    const filterBtns = document.querySelectorAll('.cert-filter-btn');
    filterBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const target = e.target as HTMLElement;
        const category = target.dataset.category;
        
        // Update active filter
        filterBtns.forEach(b => b.classList.remove('active'));
        target.classList.add('active');
        
        // Filter certifications
        if (category) {
          this.filterCertifications(category);
        }
      });
    });

    // Detail buttons
    const detailBtns = document.querySelectorAll('.details-btn');
    detailBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const target = e.target as HTMLElement;
        const certId = target.dataset.certId;
        if (certId) {
          this.showCertificationDetails(certId);
        }
      });
    });

    // Certification cards hover effects
    const certCards = document.querySelectorAll('.certification-card');
    certCards.forEach(card => {
      card.addEventListener('mouseenter', () => {
        card.classList.add('hover');
      });
      
      card.addEventListener('mouseleave', () => {
        card.classList.remove('hover');
      });
    });
  }

  private filterCertifications(category: string): void {
    const certCards = document.querySelectorAll('.certification-card');
    
    certCards.forEach(card => {
      const cardElement = card as HTMLElement;
      const certCategory = cardElement.dataset.category;
      
      if (category === 'all' || certCategory === category) {
        cardElement.style.display = 'block';
        cardElement.style.animation = 'fadeInUp 0.6s ease';
      } else {
        cardElement.style.display = 'none';
      }
    });

    this.currentCategory = category;
    this.updateStats();
    this.updateCertificationsChart(); // Update chart when filters change
  }

  private showCertificationDetails(certId: string): void {
    const cert = this.certifications.find(c => c.id === certId);
    if (!cert) return;

    // Create modal for certification details
    const modal = document.createElement('div');
    modal.className = 'cert-modal';
    modal.innerHTML = `
      <div class="modal-content">
        <span class="close-modal">&times;</span>
        <div class="modal-body">
          <div class="cert-header">
            <img src="${cert.image}" alt="${cert.name}">
            <div class="cert-info">
              <h3>${cert.name}</h3>
              <p class="issuer">${cert.issuer}</p>
              <p class="date">Issued: ${cert.date}</p>
              <p class="credential">Credential ID: ${cert.credentialId}</p>
            </div>
          </div>
          <div class="cert-skills-full">
            <h4>Skills Validated</h4>
            <div class="skills-grid">
              ${cert.skills.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
            </div>
          </div>
          <div class="cert-actions">
            <a href="${cert.url}" target="_blank" class="verify-btn">Verify Credential</a>
            <button class="close-btn">Close</button>
          </div>
        </div>
      </div>
    `;

    document.body.appendChild(modal);

    // Add modal events
    const closeBtn = modal.querySelector('.close-modal');
    const closeModalBtn = modal.querySelector('.close-btn');
    
    if (closeBtn) {
      closeBtn.addEventListener('click', () => this.closeCertModal(modal));
    }
    
    if (closeModalBtn) {
      closeModalBtn.addEventListener('click', () => this.closeCertModal(modal));
    }

    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        this.closeCertModal(modal);
      }
    });

    // Add modal animations
    setTimeout(() => modal.classList.add('modal-open'), 10);
  }

  private closeCertModal(modal: HTMLElement): void {
    modal.classList.remove('modal-open');
    setTimeout(() => {
      modal.remove();
    }, 300);
  }

  private getUniqueSkills(): string[] {
    const allSkills = this.certifications.flatMap(cert => cert.skills);
    return [...new Set(allSkills)];
  }

  private getLatestYear(): string {
    const years = this.certifications.map(cert => {
      const date = new Date(cert.date);
      return date.getFullYear();
    });
    return Math.max(...years).toString();
  }

  private updateStats(): void {
    const filteredCerts = this.currentCategory === 'all' 
      ? this.certifications 
      : this.certifications.filter(cert => cert.category === this.currentCategory);

    const totalCerts = document.querySelector('.cert-stats .stat-item:first-child .stat-number');
    if (totalCerts) {
      totalCerts.textContent = filteredCerts.length.toString();
    }

    const uniqueSkills = document.querySelector('.cert-stats .stat-item:nth-child(2) .stat-number');
    if (uniqueSkills) {
      const skills = filteredCerts.flatMap(cert => cert.skills);
      uniqueSkills.textContent = [...new Set(skills)].length.toString();
    }
  }

  /**
   * Initialize certifications chart
   */
  private initializeCertificationsChart(): void {
    const canvas = document.getElementById('certifications-canvas');
    if (!canvas) return;

    // Prepare chart data
    const chartData = this.prepareChartData();
    
    // Create chart
    this.certificationsChart = ChartComponent.createCertificationsChart(
      'certifications-canvas',
      chartData
    );

    // Setup chart type switcher
    this.setupChartControls();
  }

  /**
   * Prepare chart data from certifications
   */
  private prepareChartData(): CertificationData {
    const categories = ['cloud', 'data', 'programming', 'other'];
    
    const count = categories.map(cat => 
      this.certifications.filter(c => c.category === cat).length
    );
    
    const averageScore = categories.map(cat => {
      const certs = this.certifications.filter(c => c.category === cat);
      return certs.length > 0 ? Math.round(Math.random() * 20 + 80) : 0; // Simulated scores
    });
    
    const totalHours = categories.map(cat => {
      const certs = this.certifications.filter(c => c.category === cat);
      return certs.length * 40; // Simulated hours per certification
    });

    return {
      labels: categories.map(cat => cat.charAt(0).toUpperCase() + cat.slice(1)),
      count,
      averageScore,
      totalHours
    };
  }

  /**
   * Setup chart controls
   */
  private setupChartControls(): void {
    const chartTypeSelector = document.getElementById('cert-chart-type') as HTMLSelectElement;
    if (chartTypeSelector && this.certificationsChart) {
      chartTypeSelector.addEventListener('change', (e) => {
        const target = e.target as HTMLSelectElement;
        this.certificationsChart!.changeType(target.value as any);
      });
    }
  }

  /**
   * Update certifications chart
   */
  private updateCertificationsChart(): void {
    if (!this.certificationsChart) return;

    const chartData = this.prepareChartData();
    
    this.certificationsChart.updateData(chartData.labels, [
      {
        label: 'Number of Certifications',
        data: chartData.count,
        borderColor: '#00ff41',
        backgroundColor: 'rgba(0, 255, 65, 0.2)',
        borderWidth: 3,
        fill: true
      },
      {
        label: 'Average Score (%)',
        data: chartData.averageScore,
        borderColor: '#ff6b35',
        backgroundColor: 'rgba(255, 107, 53, 0.2)',
        borderWidth: 3,
        fill: false
      },
      {
        label: 'Total Hours',
        data: chartData.totalHours,
        borderColor: '#4ecdc4',
        backgroundColor: 'rgba(78, 205, 196, 0.2)',
        borderWidth: 3,
        fill: false
      }
    ]);
  }

  public destroy(): void {
    // Cleanup event listeners
    const filterBtns = document.querySelectorAll('.cert-filter-btn');
    filterBtns.forEach(btn => {
      btn.replaceWith(btn.cloneNode(true));
    });

    // Cleanup chart
    if (this.certificationsChart) {
      this.certificationsChart.destroy();
      this.certificationsChart = null;
    }
  }
}
