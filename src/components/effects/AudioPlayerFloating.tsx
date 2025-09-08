'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';

interface Track {
  title: string;
  artist: string;
  src: string;
}

interface AudioPlayerPanelProps {
  isOpen: boolean;
  onClose: () => void;
  currentTrack: number;
  setCurrentTrack: (i: number) => void;
  isPlaying: boolean;
  setIsPlaying: (b: boolean) => void;
  volume: number;
  setVolume: (v: number) => void;
  isMuted: boolean;
  setIsMuted: (b: boolean) => void;
  audioRef: React.RefObject<HTMLAudioElement | null>;
  currentTime: number;
  duration: number;
  onTimeUpdate: (t: number) => void;
}

const AudioPlayerPanel: React.FC<AudioPlayerPanelProps> = ({
  isOpen,
  onClose,
  currentTrack,
  setCurrentTrack,
  isPlaying,
  setIsPlaying,
  volume,
  setVolume,
  isMuted,
  setIsMuted,
  audioRef,
  currentTime,
  duration,
  onTimeUpdate,
}) => {
  const fmt = (s: number) => {
    const mm = Math.floor(s / 60).toString().padStart(2, '0');
    const ss = Math.floor(s % 60).toString().padStart(2, '0');
    return `${mm}:${ss}`;
  };

  const togglePlay = () => {
    const el = audioRef.current;
    if (!el) return;
    if (isPlaying) {
      el.pause();
      setIsPlaying(false);
    } else {
      el.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  const toggleMute = () => {
    const el = audioRef.current;
    if (!el) return;
    el.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const onChangeVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = Number(e.target.value);
    setVolume(v);
    const el = audioRef.current;
    if (el) el.volume = v;
    if (v > 0 && isMuted) {
      const el2 = audioRef.current;
      if (el2) el2.muted = false;
      setIsMuted(false);
    }
  };

  const onSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const t = Number(e.target.value);
    const el = audioRef.current;
    if (el && !Number.isNaN(t)) {
      el.currentTime = t;
      onTimeUpdate(t);
    }
  };

  const nextTrack = () => {
    const next = (currentTrack + 1) % tracks.length;
    setCurrentTrack(next);
    const el = audioRef.current;
    if (el) {
      el.src = tracks[next].src;
      el.load();
      if (isPlaying) el.play().catch(() => {});
    }
  };

  const prevTrack = () => {
    const prev = (currentTrack - 1 + tracks.length) % tracks.length;
    setCurrentTrack(prev);
    const el = audioRef.current;
    if (el) {
      el.src = tracks[prev].src;
      el.load();
      if (isPlaying) el.play().catch(() => {});
    }
  };

  if (!isOpen) return null;

  return (
    <div style={{ position: 'fixed', right: 16, bottom: 16, zIndex: 1050 }} className="bg-dark border border-primary/30 rounded-lg p-4 w-80 shadow-lg">
      <div className="flex items-center justify-between mb-2">
        <div>
          <div className="font-semibold text-primary">{tracks[currentTrack].title}</div>
          <div className="text-xs text-gray">{tracks[currentTrack].artist}</div>
        </div>
        <button onClick={onClose} className="hud-button">Close</button>
      </div>

      <div className="flex items-center justify-center gap-2 mb-3">
        <button onClick={prevTrack} className="hud-button">⏮</button>
        <button onClick={togglePlay} className="hud-button">{isPlaying ? '⏸' : '▶️'}</button>
        <button onClick={nextTrack} className="hud-button">⏭</button>
      </div>

      <div className="mb-2">
        <input type="range" min={0} max={duration || 0} value={Math.min(currentTime, duration || 0)} onChange={onSeek} className="w-full" />
        <div className="flex justify-between text-xs text-gray">
          <span>{fmt(currentTime)}</span>
          <span>{fmt(duration || 0)}</span>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button onClick={toggleMute} className="hud-button">{isMuted ? '🔇' : '🔊'}</button>
        <input type="range" min={0} max={1} step={0.01} value={isMuted ? 0 : volume} onChange={onChangeVolume} className="flex-1" />
      </div>
    </div>
  );
};

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

interface AudioPlayerFloatingProps {
  isOpen?: boolean;
  onClose?: () => void;
  onPlayingChange?: (playing: boolean) => void;
}

export const AudioPlayerFloating: React.FC<AudioPlayerFloatingProps> = ({ 
  isOpen = false, 
  onClose,
  onPlayingChange 
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [volume, setVolume] = useState(0.1);
  const [isModalOpen, setIsModalOpen] = useState(isOpen);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Update modal state when prop changes
  useEffect(() => {
    setIsModalOpen(isOpen);
  }, [isOpen]);

  // Notify parent of playing state changes
  useEffect(() => {
    if (onPlayingChange) {
      onPlayingChange(isPlaying);
    }
  }, [isPlaying, onPlayingChange]);

  // Autoplay disabled - user must manually start music
  // useEffect(() => {
  //   if (!hasStarted && audioRef.current) {
  //     const timer = setTimeout(() => {
  //       if (audioRef.current) {
  //         audioRef.current.volume = volume;
  //         audioRef.current.play().then(() => {
  //           setIsPlaying(true);
  //           setHasStarted(true);
  //         }).catch((error) => {
  //           console.log('Autoplay failed:', error);
  //           // Autoplay failed, user needs to interact
  //         });
  //       }
  //     }, 2000);

  //     return () => clearTimeout(timer);
  //   }
  // }, [hasStarted, volume]);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    if (onClose) {
      onClose();
    }
  }, [onClose]);

  return (
    <>
      {/* Hidden Audio Element */}
      <audio
        ref={audioRef}
        src={tracks[currentTrack].src}
        loop={false}
        onEnded={() => {
          const next = (currentTrack + 1) % tracks.length;
          setCurrentTrack(next);
          if (audioRef.current) {
            audioRef.current.src = tracks[next].src;
            audioRef.current.load();
            audioRef.current.play().catch((error) => {
              console.log('Play failed after track end:', error);
            });
          }
        }}
        onLoadedMetadata={() => {
          if (audioRef.current) {
            audioRef.current.volume = volume;
            setDuration(audioRef.current.duration || 0);
          }
        }}
        onTimeUpdate={() => {
          if (audioRef.current) {
            setCurrentTime(audioRef.current.currentTime);
          }
        }}
        onDurationChange={() => {
          if (audioRef.current) {
            setDuration(audioRef.current.duration || 0);
          }
        }}
      />

      {/* Audio Player Panel */}
      <AudioPlayerPanel
        isOpen={isModalOpen}
        onClose={closeModal}
        currentTrack={currentTrack}
        setCurrentTrack={setCurrentTrack}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        volume={volume}
        setVolume={setVolume}
        isMuted={isMuted}
        setIsMuted={setIsMuted}
        audioRef={audioRef}
        currentTime={currentTime}
        duration={duration}
        onTimeUpdate={setCurrentTime}
      />
    </>
  );
};
