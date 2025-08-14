export interface ProjectImage {
  src: string;
  alt: string;
  caption: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  images: ProjectImage[];
  githubUrl?: string;
  liveUrl?: string;
  category: 'data' | 'web' | 'mobile' | 'ai';
}

export class ProjectGallery {
  private projects: Project[];
  private currentProjectIndex: number = 0;
  private isModalOpen: boolean = false;

  constructor(projects: Project[]) {
    this.projects = projects;
    this.init();
  }

  private init(): void {
    this.createGallery();
    this.bindEvents();
  }

  private createGallery(): void {
    const galleryContainer = document.getElementById('projects-gallery');
    if (!galleryContainer) return;

    galleryContainer.innerHTML = `
      <div class="gallery-header">
        <h2>Featured Projects</h2>
        <div class="gallery-filters">
          <button class="filter-btn active" data-category="all">All</button>
          <button class="filter-btn" data-category="data">Data</button>
          <button class="filter-btn" data-category="web">Web</button>
          <button class="filter-btn" data-category="mobile">Mobile</button>
          <button class="filter-btn" data-category="ai">AI</button>
        </div>
      </div>
      <div class="gallery-grid">
        ${this.projects.map(project => this.createProjectCard(project)).join('')}
      </div>
      <div class="gallery-modal" id="project-modal">
        <div class="modal-content">
          <span class="close-modal">&times;</span>
          <div class="modal-body">
            <div class="project-images">
              <div class="image-slider">
                <button class="slider-btn prev">‹</button>
                <div class="image-container">
                  <img src="" alt="" id="modal-image">
                </div>
                <button class="slider-btn next">›</button>
              </div>
              <div class="image-thumbnails"></div>
            </div>
            <div class="project-info">
              <h3 id="modal-title"></h3>
              <p id="modal-description"></p>
              <div class="project-tech" id="modal-tech"></div>
              <div class="project-links" id="modal-links"></div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  private createProjectCard(project: Project): string {
    const mainImage = project.images[0] || { src: '/placeholder.jpg', alt: project.title };
    
    return `
      <div class="project-card" data-category="${project.category}" data-project-id="${project.id}">
        <div class="project-image">
          <img src="${mainImage.src}" alt="${mainImage.alt}" loading="lazy">
          <div class="project-overlay">
            <div class="overlay-content">
              <h3>${project.title}</h3>
              <p>${project.description.substring(0, 100)}...</p>
              <div class="project-tech-preview">
                ${project.technologies.slice(0, 3).map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
              </div>
              <button class="view-project-btn">View Project</button>
            </div>
          </div>
        </div>
        <div class="project-details">
          <h4>${project.title}</h4>
          <p>${project.description.substring(0, 80)}...</p>
          <div class="project-actions">
            ${project.githubUrl ? `<a href="${project.githubUrl}" target="_blank" class="project-link github">GitHub</a>` : ''}
            ${project.liveUrl ? `<a href="${project.liveUrl}" target="_blank" class="project-link live">Live Demo</a>` : ''}
          </div>
        </div>
      </div>
    `;
  }

  private bindEvents(): void {
    // Filter buttons
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const target = e.target as HTMLElement;
        const category = target.dataset.category;
        
        // Update active filter
        filterBtns.forEach(b => b.classList.remove('active'));
        target.classList.add('active');
        
        // Filter projects
        this.filterProjects(category);
      });
    });

    // Project cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
      card.addEventListener('click', (e) => {
        const projectId = (card as HTMLElement).dataset.projectId;
        if (projectId) {
          this.openProjectModal(projectId);
        }
      });
    });

    // Modal events
    this.bindModalEvents();
  }

  private filterProjects(category: string): void {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
      const cardElement = card as HTMLElement;
      const projectCategory = cardElement.dataset.category;
      
      if (category === 'all' || projectCategory === category) {
        cardElement.style.display = 'block';
        cardElement.style.animation = 'fadeInUp 0.6s ease';
      } else {
        cardElement.style.display = 'none';
      }
    });
  }

  private openProjectModal(projectId: string): void {
    const project = this.projects.find(p => p.id === projectId);
    if (!project) return;

    this.currentProjectIndex = 0;
    this.isModalOpen = true;
    
    const modal = document.getElementById('project-modal');
    if (modal) {
      modal.style.display = 'flex';
      this.updateModalContent(project);
      this.createImageThumbnails(project.images);
      
      // Add modal animations
      modal.classList.add('modal-open');
    }
  }

  private updateModalContent(project: Project): void {
    const modalImage = document.getElementById('modal-image') as HTMLImageElement;
    const modalTitle = document.getElementById('modal-title');
    const modalDescription = document.getElementById('modal-description');
    const modalTech = document.getElementById('modal-tech');
    const modalLinks = document.getElementById('modal-links');

    if (modalImage && project.images[0]) {
      modalImage.src = project.images[0].src;
      modalImage.alt = project.images[0].alt;
    }

    if (modalTitle) modalTitle.textContent = project.title;
    if (modalDescription) modalDescription.textContent = project.description;
    
    if (modalTech) {
      modalTech.innerHTML = project.technologies.map(tech => 
        `<span class="tech-tag">${tech}</span>`
      ).join('');
    }

    if (modalLinks) {
      let linksHtml = '';
      if (project.githubUrl) {
        linksHtml += `<a href="${project.githubUrl}" target="_blank" class="project-link github">GitHub</a>`;
      }
      if (project.liveUrl) {
        linksHtml += `<a href="${project.liveUrl}" target="_blank" class="project-link live">Live Demo</a>`;
      }
      modalLinks.innerHTML = linksHtml;
    }
  }

  private createImageThumbnails(images: ProjectImage[]): void {
    const thumbnailsContainer = document.querySelector('.image-thumbnails');
    if (!thumbnailsContainer) return;

    thumbnailsContainer.innerHTML = images.map((image, index) => `
      <div class="thumbnail ${index === 0 ? 'active' : ''}" data-index="${index}">
        <img src="${image.src}" alt="${image.alt}">
      </div>
    `).join('');

    // Add thumbnail click events
    const thumbnails = thumbnailsContainer.querySelectorAll('.thumbnail');
    thumbnails.forEach(thumb => {
      thumb.addEventListener('click', (e) => {
        const target = e.target as HTMLElement;
        const index = parseInt(target.dataset.index || '0');
        this.showImage(index);
      });
    });
  }

  private showImage(index: number): void {
    const project = this.projects[this.currentProjectIndex];
    if (!project || !project.images[index]) return;

    this.currentProjectIndex = index;
    
    const modalImage = document.getElementById('modal-image') as HTMLImageElement;
    if (modalImage) {
      modalImage.src = project.images[index].src;
      modalImage.alt = project.images[index].alt;
    }

    // Update active thumbnail
    const thumbnails = document.querySelectorAll('.thumbnail');
    thumbnails.forEach((thumb, i) => {
      thumb.classList.toggle('active', i === index);
    });
  }

  private bindModalEvents(): void {
    const modal = document.getElementById('project-modal');
    const closeBtn = document.querySelector('.close-modal');
    const prevBtn = document.querySelector('.slider-btn.prev');
    const nextBtn = document.querySelector('.slider-btn.next');

    if (closeBtn) {
      closeBtn.addEventListener('click', () => this.closeModal());
    }

    if (modal) {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          this.closeModal();
        }
      });
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', () => this.previousImage());
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => this.nextImage());
    }

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (!this.isModalOpen) return;
      
      switch (e.key) {
        case 'Escape':
          this.closeModal();
          break;
        case 'ArrowLeft':
          this.previousImage();
          break;
        case 'ArrowRight':
          this.nextImage();
          break;
      }
    });
  }

  private previousImage(): void {
    const project = this.projects[this.currentProjectIndex];
    if (!project) return;

    const newIndex = this.currentProjectIndex > 0 ? this.currentProjectIndex - 1 : project.images.length - 1;
    this.showImage(newIndex);
  }

  private nextImage(): void {
    const project = this.projects[this.currentProjectIndex];
    if (!project) return;

    const newIndex = this.currentProjectIndex < project.images.length - 1 ? this.currentProjectIndex + 1 : 0;
    this.showImage(newIndex);
  }

  private closeModal(): void {
    const modal = document.getElementById('project-modal');
    if (modal) {
      modal.classList.remove('modal-open');
      setTimeout(() => {
        modal.style.display = 'none';
      }, 300);
    }
    this.isModalOpen = false;
  }

  public destroy(): void {
    // Cleanup event listeners
    const modal = document.getElementById('project-modal');
    if (modal) {
      modal.remove();
    }
  }
}
