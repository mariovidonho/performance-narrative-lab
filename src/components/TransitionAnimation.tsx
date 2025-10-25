import { useEffect, useRef, useState, useMemo } from "react";

// Throttle helper for performance
const throttle = (func: Function, delay: number) => {
  let lastCall = 0;
  return (...args: any[]) => {
    const now = Date.now();
    if (now - lastCall >= delay) {
      lastCall = now;
      func(...args);
    }
  };
};

// Interpolate between two colors
const interpolateColor = (color1: string, color2: string, progress: number) => {
  const c1 = color1.match(/\d+/g)?.map(Number) || [245, 239, 224];
  const c2 = color2.match(/\d+/g)?.map(Number) || [255, 255, 255];
  const r = Math.round(c1[0] + (c2[0] - c1[0]) * progress);
  const g = Math.round(c1[1] + (c2[1] - c1[1]) * progress);
  const b = Math.round(c1[2] + (c2[2] - c1[2]) * progress);
  return `rgb(${r}, ${g}, ${b})`;
};

const TransitionAnimation = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [skipAnimation, setSkipAnimation] = useState(false);

  // Detect reduced motion preference
  const prefersReducedMotion = useMemo(() => 
    window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  []);

  // Generate particles once
  const redParticles = useMemo(() => 
    Array.from({ length: prefersReducedMotion ? 5 : 25 }).map((_, i) => ({
      size: Math.random() * 4 + 2,
      velocity: Math.random() * 0.5 + 0.5,
      angle: (i / 25) * Math.PI * 2,
    })),
  [prefersReducedMotion]);

  const greenParticles = useMemo(() => 
    Array.from({ length: prefersReducedMotion ? 10 : 50 }).map((_, i) => ({
      size: Math.random() * 6 + 2,
      velocity: Math.random() * 0.5 + 0.8,
      angle: (i / 50) * Math.PI * 2,
    })),
  [prefersReducedMotion]);

  // Calculate scroll progress
  useEffect(() => {
    const handleScroll = throttle(() => {
      if (!containerRef.current) return;

      const element = containerRef.current;
      const rect = element.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Calculate progress: 0 when top enters bottom of screen, 1 when bottom exits top
      const scrollStart = rect.top - windowHeight;
      const scrollEnd = rect.bottom;
      const scrollRange = scrollEnd - scrollStart;
      const currentScroll = -scrollStart;

      const progress = Math.max(0, Math.min(1, currentScroll / scrollRange));
      setScrollProgress(progress);
    }, 16); // ~60fps

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial calculation

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Map progress to phases
  const phase1Progress = Math.max(0, Math.min(1, (scrollProgress - 0) / 0.2)); // 0-20%
  const phase2Progress = Math.max(0, Math.min(1, (scrollProgress - 0.2) / 0.2)); // 20-40%
  const phase3Progress = Math.max(0, Math.min(1, (scrollProgress - 0.4) / 0.2)); // 40-60%
  const phase4Progress = Math.max(0, Math.min(1, (scrollProgress - 0.6) / 0.2)); // 60-80%
  const phase5Progress = Math.max(0, Math.min(1, (scrollProgress - 0.8) / 0.2)); // 80-100%

  // Calculate animation values
  const logoScale = phase1Progress;
  const logoOpacity = phase1Progress;
  const scannerTop = phase2Progress * 100;
  const scannerOpacity = phase2Progress * (1 - phase3Progress * 0.5);
  const portalScale = 1 + phase3Progress * 49; // 1 → 50
  const portalOpacity = phase3Progress;
  const bgColorProgress = Math.max(0, Math.min(1, (scrollProgress - 0.4) / 0.4));
  const backgroundColor = interpolateColor('#F5EFE0', '#FFFFFF', bgColorProgress);
  const redParticlesOpacity = Math.max(0, phase2Progress - phase3Progress);
  const greenParticlesOpacity = phase4Progress * (1 - phase4Progress * 0.5);

  // Text content based on progress
  const getText = () => {
    if (scrollProgress < 0.2) {
      const text = "Identificando os pontos de vazamento...";
      const charCount = Math.floor(phase1Progress * text.length);
      return text.substring(0, charCount);
    } else if (scrollProgress < 0.4) {
      return "Identificando os pontos de vazamento...";
    } else if (scrollProgress < 0.6) {
      const text = "E se cada vazamento virasse lucro?";
      const charCount = Math.floor(phase3Progress * text.length);
      return text.substring(0, charCount);
    } else {
      const text = "O método que transforma marketing em faturamento.";
      const charCount = Math.floor(phase4Progress * text.length);
      return text.substring(0, charCount);
    }
  };

  const handleSkip = () => {
    setSkipAnimation(true);
  };

  if (skipAnimation) {
    return null;
  }

  const isMobile = window.innerWidth < 768;
  const lupaSize = isMobile ? 200 : 400;

  return (
    <section
      ref={containerRef}
      className="relative overflow-hidden"
      style={{
        minHeight: prefersReducedMotion ? '100vh' : (isMobile ? '200vh' : '300vh'),
        backgroundColor,
        transition: 'none',
      }}
    >
      {/* Skip Button */}
      <button
        onClick={handleSkip}
        className="fixed top-4 right-4 z-50 px-4 py-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
        aria-label="Pular animação"
      >
        Pular animação →
      </button>

      {/* Sticky Content Container */}
      <div
        ref={contentRef}
        className="sticky top-0 h-screen flex items-center justify-center"
      >
        {/* Logo/Lupa Circle */}
        <div
          className="relative"
          style={{
            transform: `scale(${logoScale})`,
            opacity: logoOpacity,
            transition: 'none',
            willChange: 'transform, opacity',
          }}
        >
          <div
            className="rounded-full border-8 border-[#2C5F5F] bg-white/10 backdrop-blur-sm"
            style={{
              width: lupaSize,
              height: lupaSize,
              boxShadow: `0 0 ${30 * phase1Progress}px rgba(76,175,80,${0.6 * phase1Progress})`,
              transition: 'none',
            }}
          >
            {/* Scanner Beam */}
            <div
              className="absolute left-0 right-0 h-1"
              style={{
                top: `${scannerTop}%`,
                opacity: scannerOpacity,
                background: 'linear-gradient(180deg, transparent 0%, #4CAF50 50%, transparent 100%)',
                transition: 'none',
                willChange: 'top, opacity',
              }}
            />

            {/* Logo Icon */}
            <div className="absolute inset-0 flex items-center justify-center">
              <svg
                className="w-32 h-32 md:w-40 md:h-40 text-[#2C5F5F]"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
                style={{
                  transform: `rotate(${phase1Progress * 360}deg)`,
                  transition: 'none',
                }}
              >
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.35-4.35"></path>
              </svg>
            </div>
          </div>
        </div>

        {/* Red Problem Particles */}
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
          {redParticles.map((particle, i) => {
            // Phase 2: Float animation
            const floatX = Math.sin(phase2Progress * Math.PI * 2 + i * 0.5) * 30;
            const floatY = Math.cos(phase2Progress * Math.PI * 2 + i * 0.3) * 30;

            // Phase 3: Spiral inward
            const radius = (lupaSize / 2) * (1 - phase3Progress);
            const angle = particle.angle + phase3Progress * Math.PI * 4;
            const spiralX = Math.cos(angle) * radius;
            const spiralY = Math.sin(angle) * radius;

            // Combine: use float in phase 2, spiral in phase 3
            const finalX = phase3Progress > 0.1 ? spiralX : floatX;
            const finalY = phase3Progress > 0.1 ? spiralY : floatY;

            return (
              <div
                key={`red-${i}`}
                className="absolute rounded-full bg-[#E57373]"
                style={{
                  width: `${particle.size}px`,
                  height: `${particle.size}px`,
                  transform: `translate(${finalX}px, ${finalY}px)`,
                  opacity: redParticlesOpacity,
                  transition: 'none',
                  willChange: 'transform, opacity',
                }}
              />
            );
          })}
        </div>

        {/* Green Solution Particles */}
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
          {greenParticles.map((particle, i) => {
            const spread = 300 * phase4Progress;
            const distance = spread * particle.velocity;
            const x = Math.cos(particle.angle) * distance;
            const y = Math.sin(particle.angle) * distance - spread * 0.3; // Parabola

            return (
              <div
                key={`green-${i}`}
                className="absolute rounded-full bg-[#81C784]"
                style={{
                  width: `${particle.size}px`,
                  height: `${particle.size}px`,
                  transform: `translate(${x}px, ${y}px)`,
                  opacity: greenParticlesOpacity,
                  transition: 'none',
                  willChange: 'transform, opacity',
                }}
              />
            );
          })}
        </div>

        {/* Portal Effect */}
        <div
          className="absolute inset-0 pointer-events-none flex items-center justify-center"
          style={{
            transform: `scale(${portalScale})`,
            opacity: portalOpacity,
            background: `radial-gradient(circle, 
              rgba(229,115,115,${phase3Progress}), 
              rgba(245,239,224,${0.5}), 
              rgba(102,187,106,${phase3Progress})
            )`,
            transition: 'none',
            willChange: 'transform, opacity',
          }}
        />

        {/* Text */}
        <div className="absolute bottom-20 left-0 right-0 text-center px-4">
          <p
            className="text-lg md:text-xl font-medium text-gray-800"
            style={{
              opacity: scrollProgress > 0.05 ? 1 : 0,
              transition: 'none',
            }}
          >
            {getText()}
          </p>
        </div>
      </div>

      {/* Debug Info (remove in production) */}
      {process.env.NODE_ENV === 'development' && (
        <div
          className="fixed top-20 right-4 bg-black/70 text-white p-3 rounded text-xs font-mono z-50"
          style={{ maxWidth: '200px' }}
        >
          <div>Scroll: {(scrollProgress * 100).toFixed(1)}%</div>
          <div>Phase 1: {(phase1Progress * 100).toFixed(0)}%</div>
          <div>Phase 2: {(phase2Progress * 100).toFixed(0)}%</div>
          <div>Phase 3: {(phase3Progress * 100).toFixed(0)}%</div>
          <div>Phase 4: {(phase4Progress * 100).toFixed(0)}%</div>
          <div>Phase 5: {(phase5Progress * 100).toFixed(0)}%</div>
        </div>
      )}

      {/* Minimal CSS for performance */}
      <style>{`
        @media (prefers-reduced-motion: reduce) {
          /* Simplified for accessibility */
        }
      `}</style>
    </section>
  );
};

export default TransitionAnimation;
