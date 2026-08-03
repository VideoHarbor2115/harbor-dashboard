// Deep-sea animated background layers — lighthouse beacon, light rays, bubbles, mist, waves.
export default function SeaBackground() {
  const bubbles = [
    { left: '8%',  size: 10, duration: 11, delay: 0 },
    { left: '22%', size: 6,  duration: 9,  delay: 2 },
    { left: '37%', size: 14, duration: 13, delay: 4 },
    { left: '52%', size: 8,  duration: 10, delay: 1 },
    { left: '66%', size: 12, duration: 14, delay: 6 },
    { left: '78%', size: 7,  duration: 9,  delay: 3 },
    { left: '91%', size: 11, duration: 12, delay: 5 },
  ];

  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      {/* Lighthouse beacon */}
      <div className="beacon" />

      {/* Underwater light rays */}
      <div className="light-rays" />

      {/* Floating bubbles */}
      <div className="bubbles">
        {bubbles.map((b, i) => (
          <span
            key={i}
            className="bubble"
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

      {/* Drifting mist */}
      <div className="mist" />
    </div>
  );
}
