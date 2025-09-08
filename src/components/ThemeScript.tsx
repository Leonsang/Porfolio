'use client';

import { useEffect } from 'react';
import { initializeTheme } from '@/scripts/theme-init';

export function ThemeScript() {
  useEffect(() => {
    initializeTheme();
  }, []);

  return null;
}
