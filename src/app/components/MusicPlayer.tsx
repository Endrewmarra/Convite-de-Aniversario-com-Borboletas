import { useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { motion } from 'motion/react';

interface MusicPlayerControls {
  isPlaying: boolean;
  isLoading: boolean;
  togglePlayback: () => Promise<void>;
}

interface MusicPlayerProps {
  children?: (controls: MusicPlayerControls) => ReactNode;
}

export function MusicPlayer({ children }: MusicPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const playPromiseRef = useRef<Promise<void> | null>(null);
  const hasTriedAutoplay = useRef(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleEnded = () => setIsPlaying(false);

    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
      audio.removeEventListener('ended', handleEnded);
    };
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || hasTriedAutoplay.current) return;

    const playAudio = async () => {
      if (hasTriedAutoplay.current) return;
      hasTriedAutoplay.current = true;

      try {
        audio.volume = 0.3;
        playPromiseRef.current = audio.play();
        await playPromiseRef.current;
        setIsPlaying(true);
      } catch {
        setIsPlaying(false);
      } finally {
        playPromiseRef.current = null;
      }
    };

    const timer = setTimeout(playAudio, 800);
    return () => clearTimeout(timer);
  }, []);

  const togglePlayback = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    setIsLoading(true);

    try {
      if (playPromiseRef.current) {
        await playPromiseRef.current;
      }

      if (audio.paused) {
        audio.volume = 0.3;
        playPromiseRef.current = audio.play();
        await playPromiseRef.current;
        setIsPlaying(true);
      } else {
        audio.pause();
        setIsPlaying(false);
      }
    } catch {
      setIsPlaying(false);
    } finally {
      playPromiseRef.current = null;
      setIsLoading(false);
    }
  };

  const controls = { isPlaying, isLoading, togglePlayback };

  return (
    <>
      <audio ref={audioRef} loop preload="auto" crossOrigin="anonymous">
        <source src="/Convite-de-Aniversario-com-Borboletas/audio/background.mp3" type="audio/mpeg" />
        <source src="https://www.bensound.com/bensound-music/bensound-littleidea.mp3" type="audio/mpeg" />
      </audio>

      {children ? (
        children(controls)
      ) : (
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 1, type: 'spring' }}
          onClick={togglePlayback}
          disabled={isLoading}
          className="fixed top-4 right-4 z-50 bg-white/95 backdrop-blur-sm p-3 rounded-full border border-[#00B8C8] shadow-xl hover:bg-[#00B8C8] hover:scale-110 transition-all active:scale-95 disabled:opacity-50"
          aria-label={isPlaying ? 'Pausar música' : 'Ativar música'}
          title={isPlaying ? 'Pausar música' : 'Ativar música'}
        >
          <motion.div
            animate={{ rotate: isLoading ? 360 : 0 }}
            transition={{ duration: 0.6, repeat: isLoading ? Infinity : 0 }}
          >
            {isPlaying ? (
              <Volume2 className="w-6 h-6 text-[#C1121F]" />
            ) : (
              <VolumeX className="w-6 h-6 text-[#111111]" />
            )}
          </motion.div>
        </motion.button>
      )}
    </>
  );
}
