'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX, SkipBack, SkipForward, Minimize2 } from 'lucide-react';
import { CustomTooltip } from '@/components/ui/CustomTooltip';

interface Track {
  title: string;
  artist: string;
  src: string;
}

const tracks: Track[] = [
  {
    title: "Brocken Spectre",
    artist: "Ambient",
    src: "/sounds/Brocken+Spectre.mp3"
  },
  {
    title: "Climbers In The Dark",
    artist: "Atmospheric",
    src: "/sounds/Climbers+In+The+Dark-01.mp3"
  },
  {
    title: "Something Beautiful Is Going To Happen",
    artist: "Uplifting",
    src: "/sounds/Something+Beautiful+Is+Going+To+Happen.mp3"
  },
  {
    title: "Bush Week",
    artist: "Nihilore",
    src: "/sounds/bush-week-by-nihilore.mp3"
  }
];

export const AudioPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [volume, setVolume] = useState(0.1);
  const [isVisible, setIsVisible] = useState(true);
  const audioRef = useRef<HTMLAudioElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Autoplay disabled - user must manually start music
  // useEffect(() => {
  //   if (!hasStarted && audioRef.current) {
  //     const startAutoplay = async () => {
  //       try {
  //         const audio = audioRef.current;
  //         if (audio) {
  //           audio.volume = 0;
  //           await audio.play();
  //           setIsPlaying(true);
  //           setHasStarted(true);
  //           
  //           // Fade in effect
  //           let currentVol = 0;
  //           const targetVol = volume;
  //           const fadeInterval = setInterval(() => {
  //             currentVol += 0.02;
  //             if (currentVol >= targetVol) {
  //               currentVol = targetVol;
  //               clearInterval(fadeInterval);
  //             }
  //             if (audio && !isMuted) {
  //               audio.volume = currentVol;
  //             }
  //           }, 100);
  //         }
  //       } catch (error) {
  //         console.log('Autoplay prevented by browser:', error);
  //       }
  //     };
  //     
  //     // Start autoplay after a short delay
  //     const timer = setTimeout(startAutoplay, 1000);
  //     return () => clearTimeout(timer);
  //   }
  // }, [hasStarted, volume, isMuted]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play().catch(console.error);
    }
    setIsPlaying(!isPlaying);
  };

  const nextTrack = useCallback(() => {
    const nextIndex = (currentTrack + 1) % tracks.length;
    setCurrentTrack(nextIndex);
    if (isPlaying) {
      setTimeout(() => {
        audioRef.current?.play().catch(console.error);
      }, 100);
    }
  }, [currentTrack, isPlaying]);

  const prevTrack = useCallback(() => {
    const prevIndex = currentTrack === 0 ? tracks.length - 1 : currentTrack - 1;
    setCurrentTrack(prevIndex);
    if (isPlaying) {
      setTimeout(() => {
        audioRef.current?.play().catch(console.error);
      }, 100);
    }
  }, [currentTrack, isPlaying]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = isMuted ? 0 : volume;

    const handleEnded = () => {
      nextTrack();
    };

    audio.addEventListener('ended', handleEnded);
    return () => audio.removeEventListener('ended', handleEnded);
  }, [volume, isMuted, nextTrack]);

  // Handle clicks outside panel to close it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      
      if (isVisible && 
          panelRef.current && 
          buttonRef.current &&
          !panelRef.current.contains(target) &&
          !buttonRef.current.contains(target)) {
        // Add a small delay to prevent immediate closing
        setTimeout(() => {
          setIsVisible(false);
        }, 100);
      }
    };

    if (isVisible) {
      // Use a timeout to avoid immediate triggering
      const timeoutId = setTimeout(() => {
        document.addEventListener('mousedown', handleClickOutside);
      }, 200);
      
      return () => {
        clearTimeout(timeoutId);
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isVisible]);

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    
    // Si el volumen es 0, activar mute automáticamente
    if (newVolume === 0) {
      setIsMuted(true);
    } else if (isMuted) {
      // Si estaba muteado y el usuario mueve el slider, desmutear
      setIsMuted(false);
    }
  };

  return (
    <>
      <audio
        ref={audioRef}
        src={tracks[currentTrack].src}
        preload="metadata"
      />
      
      {/* Toggle Button */}
      <CustomTooltip content={isVisible ? "Minimizar reproductor" : "Maximizar reproductor"} place="left" delay={300}>
        <motion.button
          ref={buttonRef}
          id="audio-player-toggle"
          className={`backdrop-blur-sm border rounded-full transition-all duration-300 cursor-pointer ${
            isVisible 
              ? 'bg-primary/30 border-primary/50 p-2 hover:bg-primary/40' 
              : 'bg-primary/20 border-primary/30 p-3 hover:bg-primary/30'
          }`}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            console.log('AudioPlayer button clicked, current isVisible:', isVisible);
            const newVisibility = !isVisible;
            setIsVisible(newVisibility);
            console.log('AudioPlayer button clicked, new isVisible:', newVisibility);
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          style={{ 
            pointerEvents: 'auto', 
            touchAction: 'manipulation',
position: 'fixed',
bottom: '16px',
right: '16px',
top: 'auto',
left: 'auto',
            zIndex: 100000
          }}
        >
          {isVisible ? (
            <Minimize2 className="w-4 h-4 text-primary" />
          ) : (
            <Volume2 className="w-5 h-5 text-primary" />
          )}
        </motion.button>
      </CustomTooltip>

      {/* Audio Player Panel */}
      <motion.div
        ref={panelRef}
        className="bg-black/95 backdrop-blur-lg border border-primary/30 rounded-xl p-4 w-[320px] shadow-2xl shadow-primary/30 max-h-[400px] overflow-y-auto hover:shadow-primary/50 hover:border-primary/60 transition-all duration-300 ring-1 ring-primary/20"
        style={{ 
position: 'fixed',
bottom: '80px',
right: '16px',
top: 'auto',
left: 'auto',
          zIndex: 99999,
          pointerEvents: isVisible ? 'auto' : 'none'
        }}
        initial={{ opacity: 1, y: 0, scale: 1 }}
        animate={{
          opacity: isVisible ? 1 : 0,
          y: isVisible ? 0 : 20,
          scale: isVisible ? 1 : 0.95,
          pointerEvents: isVisible ? 'auto' : 'none'
        }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        onAnimationComplete={() => {
          console.log('Panel animation completed, isVisible:', isVisible);
        }}
      >
        {/* Track Info */}
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
            <span className="text-xs text-primary font-medium">REPRODUCTOR ACTIVO</span>
          </div>
          <h4 className="text-base font-semibold text-foreground truncate">
            {tracks[currentTrack].title}
          </h4>
          <p className="text-sm text-muted-foreground">
            {tracks[currentTrack].artist}
          </p>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between mb-4">
          <CustomTooltip content="Pista anterior" place="top" delay={300}>
            <motion.button
              id="prev-track-btn"
              className="p-3 hover:bg-primary/20 rounded-full transition-colors"
              onClick={prevTrack}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <SkipBack className="w-5 h-5 text-primary" />
            </motion.button>
          </CustomTooltip>

          <CustomTooltip content={isPlaying ? "Pausar" : "Reproducir"} place="top" delay={300}>
            <motion.button
              id="play-pause-btn"
              className="p-4 bg-primary/20 hover:bg-primary/30 rounded-full transition-colors"
              onClick={togglePlay}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {isPlaying ? (
                <Pause className="w-6 h-6 text-primary" />
              ) : (
                <Play className="w-6 h-6 text-primary ml-0.5" />
              )}
            </motion.button>
          </CustomTooltip>

          <CustomTooltip content="Siguiente pista" place="top" delay={300}>
            <motion.button
              id="next-track-btn"
              className="p-3 hover:bg-primary/20 rounded-full transition-colors"
              onClick={nextTrack}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <SkipForward className="w-5 h-5 text-primary" />
            </motion.button>
          </CustomTooltip>
        </div>

        {/* Volume Control */}
        <div className="flex items-center gap-3">
          <CustomTooltip content={isMuted ? "Activar sonido" : "Silenciar"} place="top" delay={300}>
            <motion.button
              id="mute-btn"
              onClick={toggleMute}
              className="p-2 hover:bg-primary/20 rounded transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {isMuted ? (
                <VolumeX className="w-5 h-5 text-muted-foreground" />
              ) : (
                <Volume2 className="w-5 h-5 text-primary" />
              )}
            </motion.button>
          </CustomTooltip>
          
          <CustomTooltip content={`Volumen: ${Math.round((isMuted ? 0 : volume) * 100)}%`} place="top" delay={300}>
            <input
              id="volume-slider"
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={isMuted ? 0 : volume}
              onChange={handleVolumeChange}
              className="flex-1 h-2 bg-muted rounded-lg appearance-none cursor-pointer slider"
              disabled={false}
            />
          </CustomTooltip>
        </div>

        {/* Track List Indicator */}
        <div className="flex gap-2 mt-4 justify-center">
          {tracks.map((track, index) => (
            <CustomTooltip 
              key={index}
              content={`${track.title} - ${track.artist}`} 
              place="top" 
              delay={300}
            >
              <motion.button
                id={`track-${index}`}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentTrack ? 'bg-primary' : 'bg-muted'
                }`}
                onClick={() => setCurrentTrack(index)}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.8 }}
              />
            </CustomTooltip>
          ))}
        </div>
      </motion.div>



      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: hsl(var(--primary));
          cursor: pointer;
        }
        
        .slider::-moz-range-thumb {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: hsl(var(--primary));
          cursor: pointer;
          border: none;
        }
      `}</style>
    </>
  );
};