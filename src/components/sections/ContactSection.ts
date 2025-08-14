import { BaseSection } from './BaseSection';
import { i18n } from '../../i18n/i18n';

export class ContactSection extends BaseSection {
  private contactForm: HTMLFormElement | null = null;

  constructor() {
    super('contact-section');
  }

  protected setupEventListeners(): void {
    // Setup contact form
    this.setupContactForm();
    
    // Setup contact interactions
    this.setupContactInteractions();
  }

  protected render(): void {
    if (!this.sectionElement) return;

    // Update i18n content
    this.updateContent();
    
    // Setup animations and interactions
    this.setupAnimations();
  }

  /**
   * Update content with current language
   */
  private updateContent(): void {
    if (!this.sectionElement) return;

    // Update section header
    const title = this.sectionElement.querySelector('h2[data-i18n]');
    const subtitle = this.sectionElement.querySelector('p[data-i18n]');
    
    if (title) {
      const key = title.getAttribute('data-i18n');
      if (key) title.textContent = i18n.t(key);
    }
    
    if (subtitle) {
      const key = subtitle.getAttribute('data-i18n');
      if (key) subtitle.textContent = i18n.t(key);
    }

    // Update contact cards
    this.updateContactCards();
  }

  /**
   * Update contact cards content
   */
  private updateContactCards(): void {
    if (!this.sectionElement) return;

    // Update Contact Info card
    const contactInfoCard = this.sectionElement.querySelector('.contact-info-card');
    if (contactInfoCard) {
      const title = contactInfoCard.querySelector('h3[data-i18n]');
      const category = contactInfoCard.querySelector('.category-tag[data-i18n]');
      
      if (title) {
        const key = title.getAttribute('data-i18n');
        if (key) title.textContent = i18n.t(key);
      }
      
      if (category) {
        const key = category.getAttribute('data-i18n');
        if (key) category.textContent = i18n.t(key);
      }

      // Update location
      const location = contactInfoCard.querySelector('span[data-i18n="contact.info.location"]');
      if (location) {
        location.textContent = i18n.t('contact.info.location');
      }
    }

    // Update Contact Form card
    const contactFormCard = this.sectionElement.querySelector('.contact-form-card');
    if (contactFormCard) {
      const title = contactFormCard.querySelector('h3[data-i18n]');
      const category = contactFormCard.querySelector('.category-tag[data-i18n]');
      const submitButton = contactFormCard.querySelector('button[data-i18n]');
      
      if (title) {
        const key = title.getAttribute('data-i18n');
        if (key) title.textContent = i18n.t(key);
      }
      
      if (category) {
        const key = category.getAttribute('data-i18n');
        if (key) category.textContent = i18n.t(key);
      }

      if (submitButton) {
        const key = submitButton.getAttribute('data-i18n');
        if (key) submitButton.textContent = i18n.t(key);
      }

      // Update form placeholders
      this.updateFormPlaceholders();
    }
  }

  /**
   * Update form placeholders
   */
  private updateFormPlaceholders(): void {
    if (!this.sectionElement) return;

    const inputs = this.sectionElement.querySelectorAll('input[data-i18n-placeholder]');
    inputs.forEach(input => {
      if (input instanceof HTMLInputElement) {
        const key = input.getAttribute('data-i18n-placeholder');
        if (key) input.placeholder = i18n.t(key);
      }
    });

    const textareas = this.sectionElement.querySelectorAll('textarea[data-i18n-placeholder]');
    textareas.forEach(textarea => {
      if (textarea instanceof HTMLTextAreaElement) {
        const key = textarea.getAttribute('data-i18n-placeholder');
        if (key) textarea.placeholder = i18n.t(key);
      }
    });
  }

  /**
   * Setup contact form
   */
  private setupContactForm(): void {
    if (!this.sectionElement) return;

    this.contactForm = this.sectionElement.querySelector('#contact-form') as HTMLFormElement;
    if (this.contactForm) {
      this.contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        this.handleFormSubmit();
      });
    }
  }

  /**
   * Handle form submission
   */
  private handleFormSubmit(): void {
    if (!this.contactForm) return;

    const formData = new FormData(this.contactForm);
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const subject = formData.get('subject') as string;
    const message = formData.get('message') as string;

    // Validate form
    if (!name || !email || !subject || !message) {
      this.showFormError('Please fill in all fields');
      return;
    }

    // Simulate form submission
    this.showFormSuccess(name);
    
    // Reset form
    this.contactForm.reset();
  }

  /**
   * Show form success message
   */
  private showFormSuccess(name: string): void {
    // Create success message
    const successMessage = document.createElement('div');
    successMessage.className = 'form-success';
    successMessage.textContent = i18n.t('contact.form.success').replace('{name}', name);
    successMessage.style.cssText = `
      background: #4CAF50;
      color: white;
      padding: 10px;
      border-radius: 5px;
      margin-top: 10px;
      text-align: center;
    `;

    // Insert after form
    if (this.contactForm) {
      this.contactForm.parentNode?.insertBefore(successMessage, this.contactForm.nextSibling);
      
      // Remove after 5 seconds
      setTimeout(() => {
        successMessage.remove();
      }, 5000);
    }
  }

  /**
   * Show form error message
   */
  private showFormError(message: string): void {
    // Create error message
    const errorMessage = document.createElement('div');
    errorMessage.className = 'form-error';
    errorMessage.textContent = message;
    errorMessage.style.cssText = `
      background: #f44336;
      color: white;
      padding: 10px;
      border-radius: 5px;
      margin-top: 10px;
      text-align: center;
    `;

    // Insert after form
    if (this.contactForm) {
      this.contactForm.parentNode?.insertBefore(errorMessage, this.contactForm.nextSibling);
      
      // Remove after 5 seconds
      setTimeout(() => {
        errorMessage.remove();
      }, 5000);
    }
  }

  /**
   * Setup contact interactions
   */
  private setupContactInteractions(): void {
    if (!this.sectionElement) return;

    // Add hover effects to contact cards
    const contactCards = this.sectionElement.querySelectorAll('.dashboard-card');
    contactCards.forEach(card => {
      card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-5px) scale(1.02)';
      });
      
      card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
      });
    });

    // Add click effects to contact items
    const contactItems = this.sectionElement.querySelectorAll('.contact-item');
    contactItems.forEach(item => {
      item.addEventListener('click', () => {
        this.animateContactItem(item as HTMLElement);
      });
    });
  }

  /**
   * Setup animations
   */
  private setupAnimations(): void {
    if (!this.sectionElement) return;

    // Add entrance animations to contact cards
    const contactCards = this.sectionElement.querySelectorAll('.dashboard-card');
    contactCards.forEach((card, index) => {
      (card as HTMLElement).style.opacity = '0';
      (card as HTMLElement).style.transform = 'translateY(30px)';
      
      setTimeout(() => {
        (card as HTMLElement).style.transition = 'all 0.6s ease-out';
        (card as HTMLElement).style.opacity = '1';
        (card as HTMLElement).style.transform = 'translateY(0)';
      }, index * 200);
    });
  }

  /**
   * Animate contact item
   */
  private animateContactItem(item: HTMLElement): void {
    item.style.transform = 'scale(1.05) rotate(1deg)';
    item.style.transition = 'transform 0.3s ease-out';
    
    setTimeout(() => {
      item.style.transform = 'scale(1) rotate(0deg)';
    }, 300);
  }

  protected onShow(): void {
    console.log('📧 Contact section shown');
    this.setupAnimations();
  }

  protected onHide(): void {
    console.log('📧 Contact section hidden');
  }

  protected cleanup(): void {
    // Remove event listeners
    if (!this.sectionElement) return;

    const contactCards = this.sectionElement.querySelectorAll('.dashboard-card');
    contactCards.forEach(card => {
      card.removeEventListener('mouseenter', () => {});
      card.removeEventListener('mouseleave', () => {});
    });

    const contactItems = this.sectionElement.querySelectorAll('.contact-item');
    contactItems.forEach(item => {
      item.removeEventListener('click', () => {});
    });

    if (this.contactForm) {
      this.contactForm.removeEventListener('submit', () => {});
    }
  }
}
