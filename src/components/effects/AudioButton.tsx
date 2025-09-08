'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Music } from 'lucide-react';
import { CustomTooltip } from '@/components/ui/CustomTooltip';

interface AudioButtonProps {
  onOpenPlayer: () => void;
  isPlaying: boolean;
}

export const AudioButton: React.FC<AudioButtonProps> = ({ onOpenPlayer, isPlaying }) => {
  return (
    <CustomTooltip content="Abrir reproductor de música" place="bottom" delay={300}>
      <motion.button
        onClick={onOpenPlayer}
        className="p-2 hover:bg-primary/20 rounded-lg transition-all duration-200 border border-transparent hover:border-primary/30 relative"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Music className="w-4 h-4 text-primary" />
        {isPlaying && (
          <div className="absolute -top-1 -right-1 w-1.5 h-1.5 bg-primary rounded-full animate-pulse"></div>
        )}
      </motion.button>
    </CustomTooltip>
  );
};
