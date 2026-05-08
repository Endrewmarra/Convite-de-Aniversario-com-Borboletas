import { Loader2, Pause, Play } from 'lucide-react';
import { motion } from 'motion/react';

interface VinylRecordProps {
  isPlaying: boolean;
  isLoading: boolean;
  onToggle: () => Promise<void>;
}

export function VinylRecord({ isPlaying, isLoading, onToggle }: VinylRecordProps) {
  return (
    <motion.button
      type="button"
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.35, type: 'spring', stiffness: 180, damping: 16 }}
      onClick={onToggle}
      disabled={isLoading}
      aria-label={isPlaying ? 'Pausar música' : 'Tocar música'}
      title={isPlaying ? 'Pausar música' : 'Tocar música'}
      className="group relative mx-auto mb-3 mt-1 flex h-28 w-28 items-center justify-center rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#00B8C8] disabled:cursor-wait sm:mb-4 sm:h-32 sm:w-32"
    >
      <span className="absolute -inset-2 rounded-full bg-[#00B8C8]/35 opacity-80 blur-md transition-opacity group-hover:opacity-100 sm:-inset-3" />
      <span
        className="relative h-full w-full animate-spin overflow-hidden rounded-full border border-white/70 shadow-xl shadow-black/40 ring-4 ring-white/80"
        style={{
          animationDuration: '3.8s',
          animationPlayState: isPlaying ? 'running' : 'paused',
          backgroundImage: `
            radial-gradient(circle at center, #ffffff 0 9%, #00B8C8 9.5% 11%, #C1121F 11.5% 15%, #171717 15.5% 100%),
            repeating-radial-gradient(circle at center, rgba(255,255,255,0.1) 0 1px, transparent 1px 5px),
            radial-gradient(circle at 34% 26%, rgba(255,255,255,0.2), transparent 18%),
            radial-gradient(circle at 68% 72%, rgba(0,184,200,0.16), transparent 22%),
            linear-gradient(135deg, #050505 0%, #222222 45%, #050505 100%)
          `,
        }}
      >
        <span className="absolute inset-[17%] rounded-full border border-white/10" />
        <span className="absolute inset-[25%] rounded-full border border-white/10" />
        <span className="absolute inset-[34%] rounded-full border border-white/10" />
        <span className="absolute inset-[43%] rounded-full border border-black/20" />
        <span className="absolute left-[17%] top-[20%] h-px w-16 rotate-[-24deg] rounded-full bg-white/24 blur-[0.5px]" />
        <span className="absolute right-[16%] top-[34%] h-px w-12 rotate-[18deg] rounded-full bg-white/18 blur-[0.5px]" />
        <span className="absolute bottom-[24%] left-[24%] h-px w-14 rotate-[32deg] rounded-full bg-white/16 blur-[0.5px]" />
        <span className="absolute left-[18%] top-[16%] h-4 w-12 rotate-[-28deg] rounded-full bg-white/12 blur-[2px]" />
      </span>
      <span className="absolute flex h-11 w-11 items-center justify-center rounded-full border border-[#00B8C8] bg-white text-[#C1121F] shadow-lg shadow-black/20 sm:h-14 sm:w-14">
        {isLoading ? (
          <Loader2 className="h-5 w-5 animate-spin sm:h-6 sm:w-6" />
        ) : isPlaying ? (
          <Pause className="h-5 w-5 fill-current sm:h-6 sm:w-6" />
        ) : (
          <Play className="ml-0.5 h-5 w-5 fill-current sm:h-6 sm:w-6" />
        )}
      </span>
    </motion.button>
  );
}
