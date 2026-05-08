import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { DiceRain } from './components/DiceRain';
import { MusicPlayer } from './components/MusicPlayer';
import { VinylRecord } from './components/VinylRecord';
import { toast } from 'sonner';
import { Toaster } from './components/ui/sonner';

const eventLocation = {
  name: 'Estância RRM',
  mapsUrl: 'https://maps.app.goo.gl/nyBX1DwLu9P8ztk7A',
};

const confirmationRecipientEmail = 'leydbento@gmail.com';

async function sendConfirmationEmail(guestName: string) {
  if (!confirmationRecipientEmail) {
    return { skipped: true };
  }

  const response = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(confirmationRecipientEmail)}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      nome: guestName,
      evento: 'Aniversário de 22 anos',
      data: '11 e 12 de Julho de 2026',
      horario: '16:30h',
      local: eventLocation.name,
      mensagem: `${guestName} confirmou presença no aniversário de 22 anos.`,
      _subject: `Confirmação de presença - ${guestName}`,
      _template: 'table',
      _captcha: 'false',
    }),
  });

  if (!response.ok) {
    throw new Error('Não foi possível enviar a confirmação.');
  }

  return response.json();
}

export default function App() {
  const eventDate = new Date('2026-07-11T16:30:00');
  const [timeUntil, setTimeUntil] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [nome, setNome] = useState('');
  const [confirmado, setConfirmado] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const handleConfirmar = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedName = nome.trim();

    if (!trimmedName || isSubmitting) return;

    setIsSubmitting(true);

    try {
      const result = await sendConfirmationEmail(trimmedName);
      setConfirmado(true);

      if (result.skipped) {
        toast.info('Presença confirmada no convite. Configure o e-mail para receber confirmações automáticas.');
      } else {
        toast.success(`Obrigada por confirmar, ${trimmedName}! Até lá!`);
      }
    } catch {
      toast.error('Não consegui enviar a confirmação agora. Tente novamente em instantes.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Toaster />
      <div className="fifties-atomic-bg relative flex min-h-dvh items-center justify-center overflow-x-hidden p-3 py-6 md:p-6">
      <DiceRain />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-16 md:h-24"
        style={{
          backgroundColor: '#050505',
          backgroundImage: `
            linear-gradient(45deg, #ffffff 25%, transparent 25%),
            linear-gradient(-45deg, #ffffff 25%, transparent 25%),
            linear-gradient(45deg, transparent 75%, #ffffff 75%),
            linear-gradient(-45deg, transparent 75%, #ffffff 75%)
          `,
          backgroundPosition: '0 0, 0 14px, 14px -14px, -14px 0',
          backgroundSize: '28px 28px',
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 mx-2 w-full max-w-none overflow-hidden rounded-2xl border-2 border-[#050505] bg-[#89D2D8] p-4 shadow-[0_24px_80px_rgba(0,0,0,0.42)] sm:max-w-2xl sm:p-5 md:p-6 lg:p-7"
      >
        {/* Cabeçalho do convite */}
        <div className="mb-4 pt-3 text-center sm:mb-5 md:mb-5">
          <motion.h1
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-2 text-2xl text-[#B80F1D] drop-shadow-[2px_2px_0_#FFFDF7] sm:mb-3 sm:text-3xl md:text-4xl"
          >
            Você está convidado para o meu aniversário de 22 anos
          </motion.h1>

          <MusicPlayer>
            {({ isPlaying, isLoading, togglePlayback }) => (
              <VinylRecord
                isPlaying={isPlaying}
                isLoading={isLoading}
                onToggle={togglePlayback}
              />
            )}
          </MusicPlayer>

          <div className="space-y-1.5 rounded-xl border border-white/70 bg-[#FFFDF7]/80 px-3 py-2 text-sm text-[#111111] shadow-[4px_4px_0_rgba(5,5,5,0.16)] sm:space-y-2 sm:text-base lg:text-lg">
            <p className="flex items-center justify-center gap-2">
              <span className="text-lg sm:text-xl md:text-2xl">📅</span>
              <span>11 e 12 de Julho de 2026</span>
            </p>
            <p className="flex items-center justify-center gap-2">
              <span className="text-lg sm:text-xl md:text-2xl">🕒</span>
              <span>16:30h</span>
            </p>
            <p className="flex items-center justify-center gap-2">
              <a
                href={eventLocation.mapsUrl}
                target="_blank"
                rel="noreferrer"
                aria-label={`Abrir localização da ${eventLocation.name} no Google Maps`}
                className="inline-flex items-center justify-center gap-2 text-[#008E9B] underline-offset-4 transition-colors hover:text-[#C1121F] hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00B8C8]"
              >
                <span className="text-lg sm:text-xl md:text-2xl">📍</span>
                <span>{eventLocation.name}</span>
              </a>
            </p>
            <p className="flex items-center justify-center gap-2">
              <span className="text-lg sm:text-xl md:text-2xl">👕</span>
              <span>Traje: anos 50</span>
            </p>
          </div>
        </div>

        {/* Contador regressivo */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mb-4 rounded-2xl border-2 border-[#050505] bg-[#0A0A0A] p-3 shadow-[6px_6px_0_rgba(184,15,29,0.65)] sm:mb-5 sm:p-4 md:mb-5"
        >
          <p className="mb-2 text-center text-sm text-white sm:mb-3 sm:text-base">Faltam apenas</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 text-center">
            <div className="rounded-xl border-2 border-[#050505] bg-[#FFFDF7] p-2 sm:p-3">
              <div className="text-lg font-bold text-[#C1121F] sm:text-2xl md:text-3xl">
                {timeUntil.days}
              </div>
              <p className="text-xs sm:text-sm text-[#111111] mt-1">
                {timeUntil.days === 1 ? 'dia' : 'dias'}
              </p>
            </div>
            <div className="rounded-xl border-2 border-[#050505] bg-[#FFFDF7] p-2 sm:p-3">
              <div className="text-lg font-bold text-[#00A7B5] sm:text-2xl md:text-3xl">
                {timeUntil.hours}
              </div>
              <p className="text-xs sm:text-sm text-[#111111] mt-1">
                {timeUntil.hours === 1 ? 'hora' : 'horas'}
              </p>
            </div>
            <div className="rounded-xl border-2 border-[#050505] bg-[#FFFDF7] p-2 sm:p-3">
              <div className="text-lg font-bold text-[#C1121F] sm:text-2xl md:text-3xl">
                {timeUntil.minutes}
              </div>
              <p className="text-xs sm:text-sm text-[#111111] mt-1">min</p>
            </div>
            <div className="rounded-xl border-2 border-[#050505] bg-[#FFFDF7] p-2 sm:p-3">
              <div className="text-lg font-bold text-[#00A7B5] sm:text-2xl md:text-3xl">
                {timeUntil.seconds}
              </div>
              <p className="text-xs sm:text-sm text-[#111111] mt-1">seg</p>
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
            className="space-y-3"
          >
            <div>
              <label htmlFor="nome" className="mb-2 block text-center text-sm text-[#111111] sm:text-base">
                Confirme sua presença
              </label>
              <input
                type="text"
                id="nome"
                name="nome"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                placeholder="Digite seu nome"
                className="w-full rounded-xl border-2 border-[#050505] bg-[#FFFDF7] px-3 py-2 text-sm text-[#111111] placeholder:text-[#555555] transition-colors focus:border-[#B80F1D] focus:outline-none sm:px-4 sm:py-3 sm:text-base"
                required
              />
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-xl border-2 border-[#050505] bg-[#B80F1D] py-2 text-sm text-white shadow-[4px_4px_0_#050505] transition-all hover:-translate-y-0.5 hover:bg-[#FFFDF7] hover:text-[#B80F1D] disabled:cursor-wait disabled:opacity-70 sm:py-3 sm:text-base"
            >
              {isSubmitting ? 'Enviando...' : 'Confirmar Presença'}
            </button>
          </motion.form>
        ) : (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="rounded-2xl border-2 border-[#050505] bg-[#FFFDF7] p-4 text-center shadow-[4px_4px_0_#050505] sm:p-6"
          >
            <p className="text-xl sm:text-2xl mb-2">✨</p>
            <p className="text-[#008E9B] text-base sm:text-lg">
              Presença confirmada com sucesso!
            </p>
            <p className="text-[#111111] text-sm sm:text-base mt-2">
              Mal posso esperar para te ver, {nome}!
            </p>
          </motion.div>
        )}

      </motion.div>
    </div>
    </>
  );
}
