'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, Send, MessageCircle, Minimize2 } from 'lucide-react';
import Image from 'next/image';

interface AssistantMessage {
  id: string;
  title: string;
  message: string;
  image: string;
  frames: string[];
}

interface ChatMessage {
  id: string;
  message: string;
  sentTime: string;
  sender: string;
  direction: 'incoming' | 'outgoing';
  isTyping?: boolean;
}

interface UnifiedChatAssistantProps {
  isVisible?: boolean;
  onClose?: () => void;
  onSendMessage?: (message: string) => Promise<string>;
  messages?: AssistantMessage[];
  characterFrames?: string[];
  initialMessage?: string;
}

const UnifiedChatAssistant: React.FC<UnifiedChatAssistantProps> = ({
  isVisible = true,
  onClose,
  onSendMessage,
  messages = [],
  characterFrames = ['/images/1/athena_neutral_00.png'],
  initialMessage = '¡Hola! Soy Athena, tu asistente virtual. ¿En qué puedo ayudarte?'
}) => {
  // Chat state
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>(() => [
    {
      id: '1',
      message: initialMessage,
      sentTime: new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' }),
      sender: 'Athena',
      direction: 'incoming'
    }
  ]);
  
  // UI state
  const [isMinimized, setIsMinimized] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [isAITyping, setIsAITyping] = useState(false);
  const [assistantState, setAssistantState] = useState<'idle' | 'talking' | 'thinking'>('idle');
  const [avatarFrameIndex, setAvatarFrameIndex] = useState(0);
  
  // Tips system state
  const [showTipDialog, setShowTipDialog] = useState(false);
  const [currentTip, setCurrentTip] = useState<AssistantMessage | null>(null);
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [showSkipButton, setShowSkipButton] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const typewriterSpeed = 50;

  // Auto scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages]);

  // Get random tip
  const getRandomTip = useCallback(() => {
    if (!messages || messages.length === 0) return null;
    const randomIndex = Math.floor(Math.random() * messages.length);
    return messages[randomIndex];
  }, [messages]);

  // Auto-show tips every 30 seconds
  useEffect(() => {
    if (!isVisible || showChat || showTipDialog) return;

    const interval = setInterval(() => {
      const randomTip = getRandomTip();
      if (randomTip) {
        setCurrentTip(randomTip);
        setShowTipDialog(true);
        setAssistantState('talking');
      }
    }, 30000);

    return () => clearInterval(interval);
  }, [isVisible, showChat, showTipDialog, getRandomTip]);

  // Typewriter effect for tips
  useEffect(() => {
    if (!currentTip) return;
    setDisplayedText('');
    setCurrentIndex(0);
    setIsTyping(true);
    setShowSkipButton(false);
  }, [currentTip]);

  useEffect(() => {
    if (!isTyping || !currentTip || currentIndex >= currentTip.message.length) {
      setIsTyping(false);
      return;
    }

    const timer = setTimeout(() => {
      setDisplayedText(currentTip.message.slice(0, currentIndex + 1));
      setCurrentIndex(prev => prev + 1);
    }, typewriterSpeed);

    return () => clearTimeout(timer);
  }, [currentIndex, currentTip, isTyping, typewriterSpeed]);

  // Show skip button after 2 seconds
  useEffect(() => {
    if (isTyping) {
      const timer = setTimeout(() => setShowSkipButton(true), 2000);
      return () => clearTimeout(timer);
    }
  }, [isTyping]);

  // Handle chat message sending
  const handleSendMessage = async () => {
    if (!inputValue.trim() || isAITyping) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      message: inputValue.trim(),
      sentTime: new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' }),
      sender: 'Usuario',
      direction: 'outgoing'
    };

    setChatMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsAITyping(true);
    setAssistantState('thinking');

    try {
      let aiResponse = 'Lo siento, no pude procesar tu mensaje.';
      
      if (onSendMessage) {
        aiResponse = await onSendMessage(userMessage.message);
      } else {
        // Fallback responses
        const responses = [
          'Entiendo tu consulta. ¿Necesitas más información?',
          'Interesante pregunta. ¿Te gustaría explorar más sobre este tema?',
          'Puedo ayudarte con eso. ¿Qué más te gustaría saber?',
          'Excelente punto. ¿Hay algo específico que te interese?'
        ];
        aiResponse = responses[Math.floor(Math.random() * responses.length)];
      }

      setTimeout(() => {
        const aiMessage: ChatMessage = {
          id: (Date.now() + 1).toString(),
          message: aiResponse,
          sentTime: new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' }),
          sender: 'Athena',
          direction: 'incoming'
        };

        setChatMessages(prev => [...prev, aiMessage]);
        setIsAITyping(false);
        setAssistantState('idle');
        
        // Rotate avatar frame
        if (characterFrames.length > 0) {
          setAvatarFrameIndex(prev => (prev + 1) % characterFrames.length);
        }
      }, 1500);
    } catch (error) {
      console.error('Error getting AI response:', error);
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        message: 'Lo siento, estoy teniendo problemas técnicos. Intenta más tarde.',
        sentTime: new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' }),
        sender: 'Athena',
        direction: 'incoming'
      };
      setChatMessages(prev => [...prev, errorMessage]);
      setIsAITyping(false);
      setAssistantState('idle');
    }
  };

  // Event handlers
  const handleAssistantClick = () => {
    if (showTipDialog) {
      setShowTipDialog(false);
      setCurrentTip(null);
      setAssistantState('idle');
    } else {
      setShowChat(!showChat);
    }
  };

  const handleSkip = () => {
    if (currentTip) {
      setDisplayedText(currentTip.message);
      setCurrentIndex(currentTip.message.length);
      setIsTyping(false);
      setShowSkipButton(false);
    }
  };

  const handleTipClose = () => {
    setShowTipDialog(false);
    setCurrentTip(null);
    setAssistantState('idle');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!isVisible) return null;

  return (
    <div className="unified-chat-assistant" role="region" aria-label="Asistente de chat">
      {/* Floating particles */}
      {Array.from({ length: 8 }).map((_, i) => (
        <motion.div
          key={`particle-${i}`}
          className="floating-particle"
          animate={{
            y: [-10, -20, -10],
            x: [-5, 5, -5],
            opacity: [0.3, 0.7, 0.3]
          }}
          transition={{
            duration: 3 + i * 0.5,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
          style={{
            left: `${20 + i * 10}%`,
            top: `${30 + (i % 3) * 20}%`
          }}
        />
      ))}

      {/* Assistant Character */}
      <motion.div
        className={`assistant-character ${assistantState}`}
        onClick={handleAssistantClick}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        role="button"
        tabIndex={0}
        aria-label={showTipDialog ? 'Cerrar consejo' : showChat ? 'Cerrar chat' : 'Abrir chat'}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleAssistantClick();
          }
        }}
      >
        <Image
          src={characterFrames[avatarFrameIndex]}
          alt="Athena Assistant"
          width={60}
          height={60}
          className="assistant-image"
        />
        
        {/* Status indicator */}
        <div className={`status-indicator ${assistantState}`} />
        
        {/* Notification badge */}
        {showTipDialog && (
          <motion.div
            className="notification-badge"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
          >
            !
          </motion.div>
        )}
      </motion.div>

      {/* Tip Dialog */}
      <AnimatePresence>
        {showTipDialog && currentTip && (
          <motion.div
            className="tip-dialog"
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            transition={{ duration: 0.3 }}
          >
            <div className="dialog-header">
              <div className="dialog-title">
                <div className="dialog-avatar">
                  <Image
                    src={currentTip.image}
                    alt="Assistant"
                    width={32}
                    height={32}
                    className="rounded-full"
                  />
                </div>
                <h3 id="tip-title">{currentTip.title}</h3>
              </div>
              <button onClick={handleTipClose} className="dialog-close-btn" aria-label="Cerrar consejo">
                <X className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>
            
            <div className="dialog-content">
              <div className="typewriter-text">
                {displayedText}
                {isTyping && <span className="typewriter-cursor">|</span>}
              </div>
            </div>
            
            <div className="dialog-footer">
              {showSkipButton && isTyping && (
                <motion.button
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  onClick={handleSkip}
                  className="skip-button"
                >
                  Skip Animation
                  <ChevronRight className="w-3 h-3 ml-1" />
                </motion.button>
              )}
              
              {!isTyping && (
                <motion.button
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  onClick={handleTipClose}
                  className="continue-button"
                >
                  Got it!
                  <ChevronRight className="w-3 h-3 ml-1" />
                </motion.button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Interface */}
      <AnimatePresence>
        {showChat && (
          <motion.div
            className="chat-interface"
            initial={{ opacity: 0, x: 300, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 300, scale: 0.9 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            role="dialog"
            aria-labelledby="chat-title"
            aria-modal="true"
          >
            {/* Chat Header */}
            <div className="chat-header">
              <div className="chat-title">
                <MessageCircle className="w-5 h-5" aria-hidden="true" />
                <span id="chat-title">ATHENA SYSTEM</span>
              </div>
              <div className="chat-controls">
                <button
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="control-btn"
                  aria-label={isMinimized ? 'Expandir chat' : 'Minimizar chat'}
                >
                  <Minimize2 className="w-4 h-4" aria-hidden="true" />
                </button>
                <button onClick={() => setShowChat(false)} className="control-btn" aria-label="Cerrar chat">
                  <X className="w-4 h-4" aria-hidden="true" />
                </button>
              </div>
            </div>

            {/* Chat Messages */}
            {!isMinimized && (
              <>
                <div className="chat-messages" role="log" aria-live="polite" aria-label="Historial de mensajes">
                  <div className="chat-scan-line" />
                  
                  {chatMessages.map((message) => (
                    <motion.div
                      key={message.id}
                      className={`message ${message.direction}`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      role="article"
                      aria-label={`Mensaje de ${message.sender === 'Usuario' ? 'usuario' : 'asistente'}`}
                    >
                      <div className="message-content">
                        <div className="message-text">{message.message}</div>
                        <div className="message-time">{message.sentTime}</div>
                      </div>
                    </motion.div>
                  ))}
                  
                  {isAITyping && (
                    <motion.div
                      className="message incoming typing"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <div className="typing-indicator">
                        <span className="dot" />
                        <span className="dot" />
                        <span className="dot" />
                      </div>
                      <span className="typing-text">Athena está escribiendo...</span>
                    </motion.div>
                  )}
                  
                  <div ref={messagesEndRef} />
                </div>

                {/* Chat Input */}
                <div className="chat-input-section">
                  <div className="chat-input-container">
                    <input
                      type="text"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder={isAITyping ? "Athena está escribiendo..." : "Escribe tu mensaje..."}
                      disabled={isAITyping}
                      className="chat-input"
                      aria-label="Escribir mensaje"
                      aria-describedby="input-help"
                    />
                    <button
                      onClick={handleSendMessage}
                      disabled={!inputValue.trim() || isAITyping}
                      className="send-button"
                      aria-label="Enviar mensaje"
                    >
                      <Send className="w-4 h-4" aria-hidden="true" />
                    </button>
                  </div>
                  <div id="input-help" className="sr-only">
                    Presiona Enter para enviar el mensaje
                  </div>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Close button */}
      {onClose && (
        <button onClick={onClose} className="close-assistant-btn" aria-label="Cerrar asistente">
          <X className="w-4 h-4" aria-hidden="true" />
        </button>
      )}
    </div>
  );
};

export default UnifiedChatAssistant;