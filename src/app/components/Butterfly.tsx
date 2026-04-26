import { motion } from 'motion/react';

interface ButterflyProps {
  delay?: number;
  color?: 'blue' | 'purple' | 'pink';
  index?: number;
}

export function Butterfly({ delay = 0, color = 'blue', index = 0 }: ButterflyProps) {
  const randomId = Math.random().toString(36).substring(7);
  const duration = 25 + Math.random() * 15;

  // Distribuir borboletas em um grid mais espalhado
  const positions = [
    { x: 5, y: 10 },
    { x: 85, y: 15 },
    { x: 15, y: 70 },
    { x: 75, y: 80 },
    { x: 50, y: 5 },
    { x: 90, y: 50 },
    { x: 10, y: 45 },
    { x: 60, y: 85 },
    { x: 30, y: 25 },
    { x: 70, y: 60 },
    { x: 40, y: 90 },
    { x: 20, y: 55 },
  ];

  const startPos = positions[index % positions.length];

  // Algumas borboletas passam por cima do convite
  const zIndex = index % 4 === 0 ? 50 : 0;

  const colors = {
    blue: {
      gradient1Start: '#2563eb',
      gradient1End: '#60a5fa',
      gradient2Start: '#1d4ed8',
      gradient2End: '#93c5fd',
      body: '#1e3a8a',
      spots: '#dbeafe',
    },
    purple: {
      gradient1Start: '#9333ea',
      gradient1End: '#c084fc',
      gradient2Start: '#7c3aed',
      gradient2End: '#e9d5ff',
      body: '#6b21a8',
      spots: '#f3e8ff',
    },
    pink: {
      gradient1Start: '#ec4899',
      gradient1End: '#f9a8d4',
      gradient2Start: '#db2777',
      gradient2End: '#fbcfe8',
      body: '#9f1239',
      spots: '#fce7f3',
    },
  };

  const currentColor = colors[color];

  // Movimento em formato de 8 ou infinito
  const pathX = [
    `${startPos.x}vw`,
    `${(startPos.x + 25) % 95}vw`,
    `${(startPos.x + 15) % 95}vw`,
    `${(startPos.x - 10 + 100) % 95}vw`,
    `${startPos.x}vw`,
  ];

  const pathY = [
    `${startPos.y}vh`,
    `${(startPos.y + 15) % 90}vh`,
    `${(startPos.y + 35) % 90}vh`,
    `${(startPos.y + 20) % 90}vh`,
    `${startPos.y}vh`,
  ];

  return (
    <motion.div
      initial={{ x: pathX[0], y: pathY[0], opacity: 0 }}
      animate={{
        x: pathX,
        y: pathY,
        opacity: 1,
      }}
      transition={{
        duration: duration,
        delay: delay,
        repeat: Infinity,
        ease: 'easeInOut',
        opacity: { duration: 1, delay: delay },
      }}
      className="absolute pointer-events-none"
      style={{ zIndex }}
    >
      <motion.div
        animate={{
          rotate: [0, 10, -10, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <svg
          width="70"
          height="70"
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.2))' }}
        >
          {/* Asa esquerda superior */}
          <motion.ellipse
            cx="30"
            cy="40"
            rx="25"
            ry="20"
            fill={`url(#gradient1-${randomId})`}
            stroke="white"
            strokeWidth="2"
            animate={{
              scaleY: [1, 1.1, 1],
              scaleX: [1, 1.2, 1],
            }}
            transition={{
              duration: 0.5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />

          {/* Asa esquerda inferior */}
          <motion.ellipse
            cx="35"
            cy="65"
            rx="20"
            ry="18"
            fill={`url(#gradient2-${randomId})`}
            stroke="white"
            strokeWidth="2"
            animate={{
              scaleY: [1, 1.1, 1],
              scaleX: [1, 1.2, 1],
            }}
            transition={{
              duration: 0.5,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 0.25,
            }}
          />

          {/* Asa direita superior */}
          <motion.ellipse
            cx="70"
            cy="40"
            rx="25"
            ry="20"
            fill={`url(#gradient1-${randomId})`}
            stroke="white"
            strokeWidth="2"
            animate={{
              scaleY: [1, 1.1, 1],
              scaleX: [1, 1.2, 1],
            }}
            transition={{
              duration: 0.5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />

          {/* Asa direita inferior */}
          <motion.ellipse
            cx="65"
            cy="65"
            rx="20"
            ry="18"
            fill={`url(#gradient2-${randomId})`}
            stroke="white"
            strokeWidth="2"
            animate={{
              scaleY: [1, 1.1, 1],
              scaleX: [1, 1.2, 1],
            }}
            transition={{
              duration: 0.5,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 0.25,
            }}
          />

          {/* Detalhes nas asas - manchinhas */}
          <circle cx="28" cy="38" r="4" fill={currentColor.spots} opacity="0.7" />
          <circle cx="72" cy="38" r="4" fill={currentColor.spots} opacity="0.7" />
          <circle cx="37" cy="63" r="3" fill={currentColor.spots} opacity="0.6" />
          <circle cx="63" cy="63" r="3" fill={currentColor.spots} opacity="0.6" />

          {/* Corpo */}
          <ellipse cx="50" cy="50" rx="6" ry="35" fill={currentColor.body} stroke="white" strokeWidth="1.5" />

          {/* Cabeça */}
          <circle cx="50" cy="25" r="8" fill={currentColor.body} stroke="white" strokeWidth="1.5" />

          {/* Antenas */}
          <path d="M 48 20 Q 45 10 43 5" stroke={currentColor.body} strokeWidth="2" fill="none" strokeLinecap="round" />
          <path d="M 52 20 Q 55 10 57 5" stroke={currentColor.body} strokeWidth="2" fill="none" strokeLinecap="round" />
          <circle cx="43" cy="5" r="2.5" fill={currentColor.body} />
          <circle cx="57" cy="5" r="2.5" fill={currentColor.body} />

          <defs>
            <linearGradient id={`gradient1-${randomId}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={currentColor.gradient1Start} />
              <stop offset="50%" stopColor={currentColor.gradient1End} />
              <stop offset="100%" stopColor={currentColor.gradient1Start} />
            </linearGradient>
            <linearGradient id={`gradient2-${randomId}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={currentColor.gradient2Start} />
              <stop offset="50%" stopColor={currentColor.gradient2End} />
              <stop offset="100%" stopColor={currentColor.gradient2Start} />
            </linearGradient>
          </defs>
        </svg>
      </motion.div>
    </motion.div>
  );
}
