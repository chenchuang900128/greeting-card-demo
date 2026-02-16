import { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const RED_PACKET_COUNT = 40;
const FALL_DURATION = 4;

interface RedPacket {
  id: number;
  x: number;
  delay: number;
  duration: number;
  size: number;
  rotation: number;
}

function createRedPackets(): RedPacket[] {
  return Array.from({ length: RED_PACKET_COUNT }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    delay: Math.random() * 1.5,
    duration: FALL_DURATION + Math.random() * 2,
    size: 28 + Math.random() * 24,
    rotation: (Math.random() - 0.5) * 180,
  }));
}

function RedPacketRain({ onComplete }: { onComplete: () => void }) {
  const [packets] = useState(createRedPackets);
  const maxTimeMs =
    Math.max(...packets.map((p) => (p.duration + p.delay) * 1000)) + 200;

  useEffect(() => {
    const t = setTimeout(onComplete, maxTimeMs);
    return () => clearTimeout(t);
  }, [onComplete, maxTimeMs]);

  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden z-50"
      aria-hidden
    >
      {packets.map((p) => (
        <motion.div
          key={p.id}
          className="absolute text-2xl select-none"
          style={{
            left: `${p.x}vw`,
            top: -50,
            fontSize: `${p.size}px`,
          }}
          initial={{ y: 0, opacity: 1, rotate: 0 }}
          animate={{
            y: '100vh',
            opacity: [1, 1, 0.8],
            rotate: p.rotation,
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            ease: 'linear',
          }}
        >
          🧧
        </motion.div>
      ))}
    </div>
  );
}

interface GreetingCardProps {
  message?: string;
}

export default function GreetingCard({
  message = '除夕快乐！',
}: GreetingCardProps) {
  const [isRaining, setIsRaining] = useState(false);

  const triggerRedPacketRain = useCallback(() => {
    if (isRaining) return;
    setIsRaining(true);
  }, [isRaining]);

  const stopRain = useCallback(() => {
    setIsRaining(false);
  }, []);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative w-full max-w-md mx-auto p-6 bg-gradient-to-r from-red-600 to-orange-500 rounded-xl text-white text-center shadow-lg"
      >
        <h1 className="text-3xl font-bold mb-4">🎉 {message}</h1>
        <p className="text-sm opacity-90">
          —— 前端组件开发 · 与你共赴技术新年
        </p>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={triggerRedPacketRain}
          className="mt-4 px-4 py-2 bg-yellow-400 text-red-800 font-bold rounded-full"
        >
          🧧 点我领红包
        </motion.button>
      </motion.div>

      <AnimatePresence>
        {isRaining && (
          <RedPacketRain key="rain" onComplete={stopRain} />
        )}
      </AnimatePresence>
    </>
  );
}
