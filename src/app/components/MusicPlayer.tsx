import { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { motion } from 'motion/react';

export function MusicPlayer() {
  const [isMuted, setIsMuted] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [hasAudio, setHasAudio] = useState(true); // Começa como true para permitir tentar
  const audioRef = useRef<HTMLAudioElement>(null);
  const playPromiseRef = useRef<Promise<void> | null>(null);

  useEffect(() => {
    const setupAudio = () => {
      if (audioRef.current) {
        audioRef.current.addEventListener('canplay', () => {
          setHasAudio(true);
          console.log('✅ Áudio carregado com sucesso');
        });

        audioRef.current.addEventListener('error', (e) => {
          console.warn('⚠️ Erro ao carregar áudio local, usando fallback externo');
          // Não desativa o botão, o fallback externo vai funcionar
          setHasAudio(true);
        });

        audioRef.current.addEventListener('loadstart', () => {
          console.log('📦 Iniciando carregamento de áudio...');
        });
      }
    };

    setupAudio();

    const playAudio = async () => {
      if (audioRef.current) {
        audioRef.current.volume = 0.3;
        try {
          playPromiseRef.current = audioRef.current.play();
          await playPromiseRef.current;
          setIsMuted(false);
          console.log('▶️ Autoplay bem-sucedido');
        } catch (error) {
          console.log('⚠️ Autoplay bloqueado - clique no botão para iniciar a música');
          setIsMuted(true);
        }
      }
    };

    const timer = setTimeout(playAudio, 1500);
    return () => clearTimeout(timer);
  }, []);

  const toggleMute = async () => {
    if (!audioRef.current) {
      console.warn('⚠️ Referência de áudio não disponível');
      return;
    }

    setIsLoading(true);

    try {
      // Esperar qualquer operação anterior terminar
      if (playPromiseRef.current) {
        await playPromiseRef.current;
      }

      if (isMuted) {
        // Reproduzir áudio
        console.log('▶️ Reproduzindo áudio...');
        audioRef.current.volume = 0.3;
        playPromiseRef.current = audioRef.current.play();
        await playPromiseRef.current;
        console.log('✅ Áudio ativado');
        setIsMuted(false);
      } else {
        // Pausar áudio
        console.log('⏸️ Pausando áudio...');
        audioRef.current.pause();
        audioRef.current.volume = 0;
        console.log('✅ Áudio desativado');
        setIsMuted(true);
      }
    } catch (error) {
      console.error('❌ Erro ao alternar música:', error);
      setIsMuted(!isMuted);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <audio 
        ref={audioRef} 
        loop 
        preload="auto"
        crossOrigin="anonymous"
      >
        <source src="/Convite-de-Aniversario-com-Borboletas/audio/background.mp3" type="audio/mpeg" />
        <source src="https://www.bensound.com/bensound-music/bensound-littleidea.mp3" type="audio/mpeg" />
      </audio>
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1, type: 'spring' }}
        onClick={toggleMute}
        disabled={isLoading}
        className="fixed top-4 right-4 z-50 bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-xl hover:bg-white hover:scale-110 transition-all active:scale-95 disabled:opacity-50"
        aria-label={isMuted ? 'Ativar música' : 'Desativar música'}
        title={isMuted ? 'Ativar música' : 'Desativar música'}
      >
        <motion.div
          animate={{ rotate: isLoading ? 360 : 0 }}
          transition={{ duration: 0.6, repeat: isLoading ? Infinity : 0 }}
        >
          {isMuted ? (
            <VolumeX className="w-6 h-6 text-gray-600" />
          ) : (
            <Volume2 className="w-6 h-6 text-purple-600" />
          )}
        </motion.div>
      </motion.button>
    </>
  );
}
