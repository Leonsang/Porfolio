'use client';

import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';

interface CustomTooltipProps {
  children: React.ReactNode;
  content: string;
  place?: 'top' | 'bottom' | 'left' | 'right';
  delay?: number;
  className?: string;
}

export function CustomTooltip({ 
  children, 
  content, 
  place = 'top', 
  delay = 300,
  className = ''
}: CustomTooltipProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const triggerRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const showTooltip = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    timeoutRef.current = setTimeout(() => {
      if (triggerRef.current) {
        const rect = triggerRef.current.getBoundingClientRect();
        const tooltipWidth = 200; // Approximate tooltip width
        const tooltipHeight = 40; // Approximate tooltip height
        const offset = 8;

        let x = 0;
        let y = 0;

        switch (place) {
          case 'top':
            x = rect.left + rect.width / 2 - tooltipWidth / 2;
            y = rect.top - tooltipHeight - offset;
            break;
          case 'bottom':
            x = rect.left + rect.width / 2 - tooltipWidth / 2;
            y = rect.bottom + offset;
            break;
          case 'left':
            x = rect.left - tooltipWidth - offset;
            y = rect.top + rect.height / 2 - tooltipHeight / 2;
            break;
          case 'right':
            x = rect.right + offset;
            y = rect.top + rect.height / 2 - tooltipHeight / 2;
            break;
        }

        // Ensure tooltip stays within viewport
        x = Math.max(8, Math.min(x, window.innerWidth - tooltipWidth - 8));
        y = Math.max(8, Math.min(y, window.innerHeight - tooltipHeight - 8));

        setPosition({ x, y });
        setIsVisible(true);
      }
    }, delay);
  };

  const hideTooltip = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsVisible(false);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const tooltipElement = isVisible && (
    <div
      ref={tooltipRef}
      className={`
        fixed z-[10001] px-3 py-2 text-sm text-white bg-black/90 
        rounded-lg shadow-lg pointer-events-none
        border border-primary/30 backdrop-blur-sm
        ${className}
      `}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: 'translateZ(0)', // Force hardware acceleration
      }}
    >
      {content}
      {/* Arrow */}
      <div
        className={`
          absolute w-2 h-2 bg-black/90 border-primary/30
          ${place === 'top' ? 'bottom-[-4px] left-1/2 transform -translate-x-1/2 rotate-45 border-r border-b' : ''}
          ${place === 'bottom' ? 'top-[-4px] left-1/2 transform -translate-x-1/2 rotate-45 border-l border-t' : ''}
          ${place === 'left' ? 'right-[-4px] top-1/2 transform -translate-y-1/2 rotate-45 border-t border-r' : ''}
          ${place === 'right' ? 'left-[-4px] top-1/2 transform -translate-y-1/2 rotate-45 border-b border-l' : ''}
        `}
      />
    </div>
  );

  return (
    <>
      <div
        ref={triggerRef}
        onMouseEnter={showTooltip}
        onMouseLeave={hideTooltip}
        onFocus={showTooltip}
        onBlur={hideTooltip}
        className="inline-block"
        style={{ pointerEvents: 'auto' }}
      >
        {children}
      </div>
      {typeof window !== 'undefined' && createPortal(tooltipElement, document.body)}
    </>
  );
}
