'use client';

import { useState, useEffect } from 'react';
import { useLocale } from 'next-intl';

interface AssistantMessage {
  id: string;
  title: string;
  message: string;
  image: string;
  frames: string[];
}

interface AssistantMessages {
  virtualAssistant: {
    welcome: string;
    contextual: {
      [key: string]: {
        title: string;
        message: string;
      };
    };
    tips: AssistantMessage[];
    states: {
      idle: string;
      talking: string;
      thinking: string;
    };
    actions: {
      close: string;
      nextTip: string;
      skipAnimation: string;
    };
  };
}

const useAssistantMessages = () => {
  const locale = useLocale();
  const [messages, setMessages] = useState<AssistantMessages | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadMessages = async () => {
      try {
        setLoading(true);
        setError(null);
        
        let messagesData;
        
        // Try to load messages for current locale
        try {
          if (locale === 'es') {
            messagesData = (await import('../messages/assistant-es.json')).default;
          } else {
            messagesData = (await import('../messages/assistant-en.json')).default;
          }
        } catch {
          // Fallback to English if current locale fails
          messagesData = (await import('../messages/assistant-en.json')).default;
        }
        
        setMessages(messagesData as AssistantMessages);
      } catch {
        setError('Failed to load assistant messages');
      } finally {
        setLoading(false);
      }
    };

    loadMessages();
  }, [locale]);

  // Helper functions
  const getRandomTip = (): AssistantMessage | null => {
    if (!messages?.virtualAssistant?.tips) return null;
    const tips = messages.virtualAssistant.tips;
    const randomIndex = Math.floor(Math.random() * tips.length);
    return tips[randomIndex];
  };

  const getTipById = (id: string): AssistantMessage | null => {
    if (!messages?.virtualAssistant?.tips) return null;
    return messages.virtualAssistant.tips.find(tip => tip.id === id) || null;
  };

  const getAllTips = (): AssistantMessage[] => {
    return messages?.virtualAssistant?.tips || [];
  };

  const getWelcomeMessage = (): AssistantMessage | null => {
    if (!messages?.virtualAssistant?.welcome) return null;
    
    return {
      id: 'welcome',
      title: 'Welcome',
      message: messages.virtualAssistant.welcome,
      image: '/images/1/athena_neutral_00.png',
      frames: [
        '/images/1/athena_neutral_00.png',
        '/images/1/athena_neutral_01.png',
        '/images/1/athena_neutral_02.png',
        '/images/1/athena_neutral_03.png',
        '/images/1/athena_neutral_04.png'
      ]
    };
  };

  const getStateText = (state: 'idle' | 'talking' | 'thinking'): string => {
    return messages?.virtualAssistant?.states?.[state] || state;
  };

  const getActionText = (action: 'close' | 'nextTip' | 'skipAnimation'): string => {
    return messages?.virtualAssistant?.actions?.[action] || action;
  };

  const getContextualMessage = (section: string): AssistantMessage | null => {
    if (!messages?.virtualAssistant?.contextual?.[section]) {
      return null;
    }
    
    const contextual = messages.virtualAssistant.contextual[section];
    
    return {
      id: `contextual-${section}`,
      title: contextual.title,
      message: contextual.message,
      image: '/images/1/athena_neutral_00.png',
      frames: [
        '/images/1/athena_neutral_00.png',
        '/images/1/athena_neutral_01.png',
        '/images/1/athena_neutral_02.png',
        '/images/1/athena_neutral_03.png',
        '/images/1/athena_neutral_04.png'
      ]
    };
  };

  // Preload images for better performance
  const preloadImages = (tip: AssistantMessage) => {
    if (tip.frames && tip.frames.length > 0) {
      tip.frames.forEach(frameSrc => {
        const img = new Image();
        img.src = frameSrc;
      });
    } else if (tip.image) {
      const img = new Image();
      img.src = tip.image;
    }
  };

  // Preload all images when messages are loaded
  useEffect(() => {
    if (messages?.virtualAssistant?.tips) {
      messages.virtualAssistant.tips.forEach(preloadImages);
    }
  }, [messages]);

  return {
    messages,
    loading,
    error,
    // Helper functions
    getRandomTip,
    getTipById,
    getAllTips,
    getWelcomeMessage,
    getStateText,
    getActionText,
    getContextualMessage,
    preloadImages
  };
};

export default useAssistantMessages;
export type { AssistantMessage, AssistantMessages };