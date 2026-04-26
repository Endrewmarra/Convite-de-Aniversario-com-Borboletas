import { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { motion } from 'motion/react';

export function MusicPlayer() {
  const [isMuted, setIsMuted] = useState(false); // Começa ligado
  const [isLoading, setIsLoading] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const playPromiseRef = useRef<Promise<void> | null>(null);
  const hasTriedAutoplay = useRef(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || hasTriedAutoplay.current) return;

    const handleCanPlay = () => {
      console.log('✅ Áudio carregado com sucesso');
    };

    const handleError = () => {
      console.warn('⚠️ Erro ao carregar áudio local, tentando fallback externo...');
    };

    const handleLoadStart = () => {
      console.log('📦 Iniciando carregamento de áudio...');
    };

    // Adicionar listeners
    audio.addEventListener('canplay', handleCanPlay);
    audio.addEventListener('error', handleError);
    audio.addEventListener('loadstart', handleLoadStart);

    // Tentar autoplay
    const playAudio = async () => {
      if (hasTriedAutoplay.current) return;
      hasTriedAutoplay.current = true;

      try {
        audio.volume = 0.3;
        console.log('▶️ Tentando autoplay...');
        const playPromise = audio.play();
        
        if (playPromise !== undefined) {
          await playPromise;
          setIsMuted(false);
          console.log('✅ Autoplay bem-sucedido');
        }
      } catch (error) {
        console.log('⚠️ Autoplay bloqueado pelo navegador - clique no botão para iniciar');
        setIsMuted(true);
      }
    };

    // Esperar um pouco para garantir que o áudio foi carregado
    const timer = setTimeout(playAudio, 800);

    // Cleanup
    return () => {
      clearTimeout(timer);
      audio.removeEventListener('canplay', handleCanPlay);
      audio.removeEventListener('error', handleError);
      audio.removeEventListener('loadstart', handleLoadStart);
    };
  }, []); // Dependência vazia - executa uma única vez

  const toggleMute = async () => {
    const audio = audioRef.current;
    if (!audio) {
      console.warn('⚠️ Referência de áudio não disponível');
      return;
    }

    setIsLoading(true);

    try {
      if (playPromiseRef.current) {
        await playPromiseRef.current;
      }

      if (isMuted) {
        // Reproduzir áudio
        console.log('▶️ Reproduzindo áudio...');
        audio.volume = 0.3;
        playPromiseRef.current = audio.play();
        await playPromiseRef.current;
        console.log('✅ Áudio ativado');
        setIsMuted(false);
      } else {
        // Pausar áudio
        console.log('⏸️ Pausando áudio...');
        audio.pause();
        audio.volume = 0;
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
