// Deep-sea animated background layers — lighthouse beacon, light rays, bubbles, mist, waves, storm.
import { useState } from 'react';

interface SeaBackgroundProps {
  isOffline?: boolean;
}

export default function SeaBackground({ isOffline = false }: SeaBackgroundProps) {
  const [poppedBubbles, setPoppedBubbles] = useState<Set<number>>(new Set());
  const [bubbles, setBubbles] = useState([
    { left: '8%',  size: 24, duration: 11, delay: 0 },
    { left: '22%', size: 18, duration: 9,  delay: 2 },
    { left: '37%', size: 32, duration: 13, delay: 4 },
    { left: '52%', size: 20, duration: 10, delay: 1 },
    { left: '66%', size: 28, duration: 14, delay: 6 },
    { left: '78%', size: 16, duration: 9,  delay: 3 },
    { left: '91%', size: 26, duration: 12, delay: 5 },
  ]);

  const popBubble = (index: number) => {
    setPoppedBubbles(prev => new Set(prev).add(index));
    // Respawn bubble after delay
    setTimeout(() => {
      setPoppedBubbles(prev => {
        const next = new Set(prev);
        next.delete(index);
        return next;
      });
    }, 2000);
  };

  // Generate rain drops
  const rainDrops = Array.from({ length: 60 }, (_, i) => ({
    left: `${Math.random() * 100}%`,
    delay: `${Math.random() * 0.8}s`,
    duration: `${0.6 + Math.random() * 0.4}s`,
  }));

  return (
    <div className={`absolute inset-0 -z-10 overflow-hidden ${isOffline ? 'storm-active' : ''}`}>
      {/* Lighthouse beacon (hide when offline) */}
      {!isOffline && <div className="beacon" />}

      {/* Underwater light rays (dim when offline) */}
      <div className={`light-rays ${isOffline ? 'opacity-30' : ''}`} />

      {/* Floating bubbles (fewer when offline) */}
      <div className="bubbles">
        {bubbles.filter((_, i) => isOffline ? i % 2 === 0 : true).map((b, i) => (
          <button
            key={i}
            type="button"
            aria-label="Pop bubble"
            className={`bubble ${poppedBubbles.has(i) ? 'popped' : ''}`}
            onClick={() => popBubble(i)}
            style={{
              left: b.left,
              width: b.size,
              height: b.size,
              animationDuration: `${b.duration}s`,
              animationDelay: `${b.delay}s`,
            }}
          />
        ))}
      </div>

      {/* Bottom waves */}
      <div className="sea-bg absolute inset-0" />

      {/* Drifting mist (more intense when offline) */}
      <div className={`mist ${isOffline ? 'opacity-80' : ''}`} />

      {/* Storm effect when offline */}
      {isOffline && (
        <>
          <div className="lightning-flash" />
          <div className="storm-overlay">
            {rainDrops.map((drop, i) => (
              <div
                key={i}
                className="rain-drop"
                style={{
                  left: drop.left,
                  animationDelay: drop.delay,
                  animationDuration: drop.duration,
                }}
              />
            ))}
          </div>
        </>
      )}

      {/* Ship wheel decoration */}
      <svg className="ship-wheel" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="50" cy="50" r="45" strokeOpacity="0.3" />
        <circle cx="50" cy="50" r="35" strokeOpacity="0.2" />
        <circle cx="50" cy="50" r="25" strokeOpacity="0.2" />
        <circle cx="50" cy="50" r="8" strokeOpacity="0.4" />
        {/* Spokes */}
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
          <line
            key={angle}
            x1="50"
            y1="50"
            x2={50 + 40 * Math.cos((angle * Math.PI) / 180)}
            y2={50 + 40 * Math.sin((angle * Math.PI) / 180)}
            strokeOpacity="0.3"
          />
        ))}
        {/* Handles */}
        {[0, 90, 180, 270].map((angle) => (
          <circle
            key={angle}
            cx={50 + 45 * Math.cos((angle * Math.PI) / 180)}
            cy={50 + 45 * Math.sin((angle * Math.PI) / 180)}
            r="5"
            strokeOpacity="0.4"
          />
        ))}
      </svg>
    </div>
  );
}
