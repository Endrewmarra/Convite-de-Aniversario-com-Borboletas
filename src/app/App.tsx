import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Butterfly } from './components/Butterfly';
import { MusicPlayer } from './components/MusicPlayer';
import { toast } from 'sonner';
import { Toaster } from './components/ui/sonner';

export default function App() {
  const eventDate = new Date('2026-05-15T15:00:00');
  const [timeUntil, setTimeUntil] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [nome, setNome] = useState('');
  const [confirmado, setConfirmado] = useState(false);

  useEffect(() => {
    const calculateTime = () => {
      const today = new Date();
      const diffTime = eventDate.getTime() - today.getTime();

      const days = Math.floor(diffTime / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diffTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diffTime % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diffTime % (1000 * 60)) / 1000);

      setTimeUntil({ days, hours, minutes, seconds });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleConfirmar = (e: React.FormEvent) => {
    e.preventDefault();
    if (nome.trim()) {
      setConfirmado(true);
      toast.success(`Obrigada por confirmar, ${nome}! Até lá! 🦋`);
    }
  };

  return (
    <>
      <Toaster />
      <MusicPlayer />
      <div className="min-h-screen bg-gradient-to-br from-pink-200 via-pink-300 to-pink-400 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Borboletas animadas espalhadas */}
      <Butterfly delay={0} color="blue" index={0} />
      <Butterfly delay={3} color="purple" index={1} />
      <Butterfly delay={6} color="blue" index={2} />
      <Butterfly delay={9} color="pink" index={3} />
      <Butterfly delay={12} color="blue" index={4} />
      <Butterfly delay={15} color="purple" index={5} />
      <Butterfly delay={18} color="blue" index={6} />
      <Butterfly delay={21} color="pink" index={7} />
      <Butterfly delay={24} color="blue" index={8} />
      <Butterfly delay={27} color="purple" index={9} />
      <Butterfly delay={30} color="blue" index={10} />
      <Butterfly delay={33} color="pink" index={11} />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-none sm:max-w-2xl bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-4 sm:p-6 md:p-8 lg:p-12 relative z-10 mx-2"
      >
        {/* Cabeçalho do convite */}
        <div className="text-center mb-4 sm:mb-6 md:mb-8">
          <motion.h1
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-2 sm:mb-3 md:mb-4 text-purple-600"
          >
            Você está convidado para o meu aniversário
          </motion.h1>

          <div className="flex items-center justify-center gap-2 sm:gap-3 mb-3 sm:mb-4">
            <span className="text-xl sm:text-2xl md:text-3xl">🦋</span>
            <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-purple-500">
              Chá com Borboletas
            </h2>
            <span className="text-xl sm:text-2xl md:text-3xl">🦋</span>
          </div>

          <p className="text-sm sm:text-base text-gray-600 italic mb-4 sm:mb-6 max-w-md mx-auto">
            Venha celebrar comigo este dia especial! Prepare-se para uma tarde cheia de alegria, risadas e momentos inesquecíveis.
          </p>

          <div className="text-sm sm:text-base lg:text-lg text-gray-700 space-y-2 sm:space-y-3">
            <p className="flex items-center justify-center gap-2">
              <span className="text-lg sm:text-xl md:text-2xl">📅</span>
              <span>15 de Maio de 2026</span>
            </p>
            <p className="flex items-center justify-center gap-2">
              <span className="text-lg sm:text-xl md:text-2xl">🕒</span>
              <span>15:00h</span>
            </p>
            <p className="flex items-center justify-center gap-2">
              <span className="text-lg sm:text-xl md:text-2xl">📍</span>
              <span>Chácara das Flores</span>
            </p>
            <p className="flex items-center justify-center gap-2">
              <span className="text-lg sm:text-xl md:text-2xl">👕</span>
              <span>Traje: Casual</span>
            </p>
          </div>
        </div>

        {/* Contador regressivo */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl p-3 sm:p-4 md:p-6 mb-4 sm:mb-6 md:mb-8"
        >
          <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4 text-center">Faltam apenas</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 text-center">
            <div className="bg-white/50 rounded-xl p-2 sm:p-3">
              <div className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-bold text-purple-600">
                {timeUntil.days}
              </div>
              <p className="text-xs sm:text-sm text-gray-600 mt-1">
                {timeUntil.days === 1 ? 'dia' : 'dias'}
              </p>
            </div>
            <div className="bg-white/50 rounded-xl p-2 sm:p-3">
              <div className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-bold text-purple-600">
                {timeUntil.hours}
              </div>
              <p className="text-xs sm:text-sm text-gray-600 mt-1">
                {timeUntil.hours === 1 ? 'hora' : 'horas'}
              </p>
            </div>
            <div className="bg-white/50 rounded-xl p-2 sm:p-3">
              <div className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-bold text-purple-600">
                {timeUntil.minutes}
              </div>
              <p className="text-xs sm:text-sm text-gray-600 mt-1">min</p>
            </div>
            <div className="bg-white/50 rounded-xl p-2 sm:p-3">
              <div className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-bold text-purple-600">
                {timeUntil.seconds}
              </div>
              <p className="text-xs sm:text-sm text-gray-600 mt-1">seg</p>
            </div>
          </div>
        </motion.div>

        {/* Formulário de confirmação */}
        {!confirmado ? (
          <motion.form
            onSubmit={handleConfirmar}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="space-y-3 sm:space-y-4"
          >
            <div>
              <label htmlFor="nome" className="block text-sm sm:text-base text-gray-700 mb-2 text-center">
                Confirme sua presença
              </label>
              <input
                type="text"
                id="nome"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                placeholder="Digite seu nome"
                className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-xl border-2 border-purple-200 focus:border-purple-400 focus:outline-none transition-colors text-sm sm:text-base"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-2 sm:py-3 rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all transform hover:scale-105 shadow-lg text-sm sm:text-base"
            >
              Confirmar Presença 🦋
            </button>
          </motion.form>
        ) : (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="bg-green-50 border-2 border-green-200 rounded-2xl p-4 sm:p-6 text-center"
          >
            <p className="text-xl sm:text-2xl mb-2">✨</p>
            <p className="text-green-700 text-base sm:text-lg">
              Presença confirmada com sucesso!
            </p>
            <p className="text-gray-600 text-sm sm:text-base mt-2">
              Mal podemos esperar para te ver, {nome}!
            </p>
          </motion.div>
        )}

        {/* Decoração inferior */}
        <div className="mt-4 sm:mt-6 md:mt-8 text-center text-gray-500 text-xs sm:text-sm flex items-center justify-center gap-2">
          <span>🦋</span>
          <span>Traga sua melhor xícara de chá!</span>
          <span>🦋</span>
        </div>
      </motion.div>
    </div>
    </>
  );
}
