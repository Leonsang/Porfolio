// Script to initialize theme before React hydration
// This prevents flash of unstyled content

export function initializeTheme() {
  if (typeof window === 'undefined') return;

  interface Theme {
    name: string;
    primary_color: string;
    secondary_color: string;
    accent_color: string;
    dark_color: string;
    light_color: string;
    gray_color: string;
  }

  const themes: Record<string, Theme> = {
    retro: {
      name: 'retro',
      primary_color: '#00ff41',
      secondary_color: '#ff6b35',
      accent_color: '#4ecdc4',
      dark_color: '#1a1a1a',
      light_color: '#ffffff',
      gray_color: '#888888'
    },
    cyberpunk: {
      name: 'cyberpunk',
      primary_color: '#ff00ff',
      secondary_color: '#00ffff',
      accent_color: '#ffff00',
      dark_color: '#0a0a0a',
      light_color: '#ffffff',
      gray_color: '#666666'
    },
    matrix: {
      name: 'matrix',
      primary_color: '#00ff00',
      secondary_color: '#003300',
      accent_color: '#00cc00',
      dark_color: '#000000',
      light_color: '#00ff00',
      gray_color: '#004400'
    },
    sunset: {
      name: 'sunset',
      primary_color: '#ff6b35',
      secondary_color: '#f7931e',
      accent_color: '#ffd23f',
      dark_color: '#2c1810',
      light_color: '#ffffff',
      gray_color: '#8b7355'
    }
  };

  const applyTheme = (theme: Theme) => {
    console.log('🎨 Applying theme:', theme.name);
    const root = document.documentElement;
    root.style.setProperty('--primary-color', theme.primary_color);
    root.style.setProperty('--secondary-color', theme.secondary_color);
    root.style.setProperty('--accent-color', theme.accent_color);
    root.style.setProperty('--dark-color', theme.dark_color);
    root.style.setProperty('--light-color', theme.light_color);
    root.style.setProperty('--gray-color', theme.gray_color);
    console.log('✅ Theme variables applied');
  };

  // Load saved theme from localStorage
  const savedTheme = localStorage.getItem('portfolio-theme');
  console.log('🔍 Saved theme from localStorage:', savedTheme);
  
  if (savedTheme && themes[savedTheme as keyof typeof themes]) {
    console.log('✅ Loading saved theme:', savedTheme);
    applyTheme(themes[savedTheme as keyof typeof themes]);
  } else {
    console.log('🎨 No saved theme, applying default retro theme');
    // Apply default theme
    applyTheme(themes.retro);
  }
}
