import { motion } from 'motion/react';

export function FloatingFish() {
  const fishes = [
    { delay: 0, duration: 20, top: '20%', startX: -100 },
    { delay: 5, duration: 25, top: '40%', startX: -150 },
    { delay: 10, duration: 22, top: '60%', startX: -120 },
    { delay: 3, duration: 18, top: '75%', startX: -80 },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {fishes.map((fish, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{ top: fish.top }}
          initial={{ x: fish.startX, opacity: 0.4 }}
          animate={{
            x: ['calc(100vw + 100px)'],
            y: [0, -20, 20, 0],
            opacity: [0.4, 0.7, 0.4],
          }}
          transition={{
            x: { duration: fish.duration, repeat: Infinity, delay: fish.delay, ease: 'linear' },
            y: { duration: 4, repeat: Infinity, ease: 'easeInOut' },
            opacity: { duration: 3, repeat: Infinity, ease: 'easeInOut' },
          }}
        >
          <svg width="60" height="30" viewBox="0 0 60 30" fill="none">
            <path
              d="M2 15C2 15 10 5 25 5C35 5 45 10 52 15C45 20 35 25 25 25C10 25 2 15 2 15Z"
              fill="rgba(78, 205, 196, 0.3)"
              stroke="rgba(78, 205, 196, 0.6)"
              strokeWidth="1"
            />
            <path
              d="M52 15L58 10L56 15L58 20L52 15Z"
              fill="rgba(78, 205, 196, 0.4)"
            />
            <circle cx="20" cy="13" r="2" fill="rgba(11, 61, 145, 0.6)" />
          </svg>
        </motion.div>
      ))}
    </div>
  );
}
