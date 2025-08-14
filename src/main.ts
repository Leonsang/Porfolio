import { AppManager } from './components/AppManager';
import './styles/main.css';

// Global app instance
let appManager: AppManager | null = null;

// Initialize the application
document.addEventListener('DOMContentLoaded', async () => {
  try {
    console.log('🚀 Starting Portfolio Application...');
    
    // Create and configure app manager
    appManager = new AppManager({
      enableParticles: true,
      enable3DEffects: true,
      enableAudio: true,
      enableAnimations: true,
      enableThemeSwitcher: true,
      enableLanguageSwitcher: true
    });
    
    // Initialize the application
    await appManager.init();
    
    // Export to global scope for debugging
    (window as any).portfolioApp = {
      appManager,
      getStatus: () => appManager?.getStatus(),
      refresh: () => appManager?.refresh(),
      destroy: () => appManager?.destroy()
    };
    
    console.log('✅ Portfolio Application ready!');
    console.log('🔧 Debug: window.portfolioApp.getStatus()');
    
  } catch (error) {
    console.error('❌ Failed to initialize Portfolio Application:', error);
    
    // Show error message to user
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) {
      loadingScreen.innerHTML = `
        <div class="loading-content">
          <div class="pixel-art">❌</div>
          <div class="loading-text">ERROR LOADING PORTFOLIO</div>
          <div class="error-details">${error instanceof Error ? error.message : 'Unknown error'}</div>
          <button onclick="location.reload()" style="margin-top: 20px; padding: 10px 20px; background: #ff6b35; color: white; border: none; border-radius: 5px; cursor: pointer;">
            Reload Page
          </button>
        </div>
      `;
    }
  }
});

// Handle page visibility changes
document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    console.log('👁️ Page hidden, pausing animations...');
    // Could pause animations here if needed
  } else {
    console.log('👁️ Page visible, resuming animations...');
    // Could resume animations here if needed
  }
});

// Handle beforeunload
window.addEventListener('beforeunload', () => {
  if (appManager) {
    appManager.destroy();
  }
});

// Export utility functions for global use
(window as any).portfolioUtils = {
  // Test navigation between sections
  testNavigation: () => {
    if (appManager) {
      const status = appManager.getStatus();
      console.log('🧪 Portfolio Status:', status);
      
      // Test section switching
      const portfolioManager = (appManager as any).portfolioManager;
      if (portfolioManager) {
        console.log('🚀 Testing section navigation...');
        
        // Switch to different sections
        setTimeout(() => portfolioManager.switchToSection('overview'), 1000);
        setTimeout(() => portfolioManager.switchToSection('technical'), 3000);
        setTimeout(() => portfolioManager.switchToSection('experience'), 5000);
        setTimeout(() => portfolioManager.switchToSection('projects'), 7000);
        setTimeout(() => portfolioManager.switchToSection('contact'), 9000);
        setTimeout(() => portfolioManager.switchToSection('about'), 11000);
      }
    } else {
      console.log('❌ AppManager not ready yet');
    }
  },
  
  // Get application status
  getStatus: () => appManager?.getStatus(),
  
  // Refresh the application
  refresh: () => appManager?.refresh(),
  
  // Destroy the application
  destroy: () => appManager?.destroy()
};
