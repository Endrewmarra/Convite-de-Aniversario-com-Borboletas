import { motion } from 'motion/react';

const pipPositions: Record<number, number[]> = {
  1: [4],
  2: [0, 8],
  3: [0, 4, 8],
  4: [0, 2, 6, 8],
  5: [0, 2, 4, 6, 8],
  6: [0, 2, 3, 5, 6, 8],
};

const dice = Array.from({ length: 26 }, (_, index) => ({
  id: index,
  value: (index % 6) + 1,
  left: 4 + ((index * 17) % 88),
  delay: (index * 0.72) % 9,
  duration: 8 + (index % 7) * 0.75,
  size: 28 + (index % 5) * 6,
  drift: index % 2 === 0 ? 16 + (index % 4) * 6 : -14 - (index % 5) * 5,
  pipColor: ['#0A0A0A', '#C1121F', '#00B8C8'][index % 3],
}));

export function DiceRain() {
  return (
    <div aria-hidden="true" className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      {dice.map((die) => (
        <motion.div
          key={die.id}
          initial={{
            y: '-18vh',
            rotate: die.id % 2 === 0 ? -35 : 35,
            opacity: 1,
          }}
          animate={{
            x: [0, die.drift / 2, die.drift],
            y: ['-18vh', '118vh'],
            rotate: [0, die.id % 2 === 0 ? 180 : -180, die.id % 2 === 0 ? 360 : -360],
            opacity: 1,
          }}
          transition={{
            duration: die.duration,
            delay: die.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="absolute top-0 left-0"
          style={{ left: `${die.left}%`, width: die.size, height: die.size }}
        >
          <div className="grid h-full w-full grid-cols-3 grid-rows-3 rounded-lg border border-white bg-white p-1.5 shadow-[0_8px_18px_rgba(0,0,0,0.35)]">
            {Array.from({ length: 9 }, (_, pipIndex) => (
              <span
                key={pipIndex}
                className="m-auto h-1.5 w-1.5 rounded-full"
                style={{
                  backgroundColor: pipPositions[die.value].includes(pipIndex) ? die.pipColor : 'transparent',
                }}
              />
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  );
}
