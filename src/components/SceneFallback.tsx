export function SceneFallback() {
  return (
    <div
      className="absolute inset-0 z-0 pointer-events-none"
      style={{
        background: `
          radial-gradient(ellipse 70% 50% at 50% 45%, rgba(139, 61, 255, 0.25) 0%, transparent 65%),
          linear-gradient(180deg, #05020B 0%, #0B0715 50%, #05020B 100%)
        `,
      }}
    />
  );
}
