export abstract class BaseSection {
  protected sectionId: string;
  protected sectionElement: HTMLElement | null = null;

  constructor(sectionId: string) {
    this.sectionId = sectionId;
  }

  /**
   * Initialize the section
   */
  public init(): void {
    this.sectionElement = document.getElementById(this.sectionId);
    if (this.sectionElement) {
      this.setupEventListeners();
      this.render();
      console.log(`✅ Section ${this.sectionId} initialized`);
    } else {
      console.error(`❌ Section ${this.sectionId} not found in DOM`);
    }
  }

  /**
   * Show the section
   */
  public show(): void {
    if (this.sectionElement) {
      this.sectionElement.classList.add('active');
      this.onShow();
    }
  }

  /**
   * Hide the section
   */
  public hide(): void {
    if (this.sectionElement) {
      this.sectionElement.classList.remove('active');
      this.onHide();
    }
  }

  /**
   * Check if section is active
   */
  public isActive(): boolean {
    return this.sectionElement?.classList.contains('active') || false;
  }

  /**
   * Get section element
   */
  public getElement(): HTMLElement | null {
    return this.sectionElement;
  }

  /**
   * Setup event listeners for the section
   */
  protected abstract setupEventListeners(): void;

  /**
   * Render the section content
   */
  protected abstract render(): void;

  /**
   * Called when section is shown
   */
  protected onShow(): void {
    // Override in subclasses if needed
  }

  /**
   * Called when section is hidden
   */
  protected onHide(): void {
    // Override in subclasses if needed
  }

  /**
   * Destroy the section and cleanup
   */
  public destroy(): void {
    if (this.sectionElement) {
      this.cleanup();
      this.sectionElement = null;
    }
  }

  /**
   * Cleanup resources
   */
  protected cleanup(): void {
    // Override in subclasses if needed
  }
}
