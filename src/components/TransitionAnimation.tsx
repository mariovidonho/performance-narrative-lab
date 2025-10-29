import { useEffect, useRef, useState } from "react";

const TransitionAnimation = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Scroll-based animation calculation
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const element = containerRef.current;
      const rect = element.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Calculate scroll progress (0 to 1)
      const scrollStart = rect.top - windowHeight;
      const scrollEnd = rect.bottom;
      const scrollRange = scrollEnd - scrollStart;
      const currentScroll = -scrollStart;

      const progress = Math.max(0, Math.min(1, currentScroll / scrollRange));
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial calculation
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Calculate phase progress (0-1 for each phase)
  const phase1 = Math.max(0, Math.min(1, scrollProgress / 0.25)); // 0-25%
  const phase2 = Math.max(0, Math.min(1, (scrollProgress - 0.25) / 0.25)); // 25-50%
  const phase3 = Math.max(0, Math.min(1, (scrollProgress - 0.5) / 0.25)); // 50-75%
  const phase4 = Math.max(0, Math.min(1, (scrollProgress - 0.75) / 0.25)); // 75-100%

  // Logo scale and opacity
  const logoScale = phase1;
  const logoOpacity = phase1;

  // Scanner progress
  const scannerProgress = phase2;

  // Portal expansion
  const portalScale = 1 + (phase3 * 19); // 1 to 20
  const portalOpacity = phase3 * (1 - phase4); // Fades out in phase 4

  // Background color transition
  const bgProgress = Math.max(0, Math.min(1, (scrollProgress - 0.5) / 0.3));
  const bgColor = {
    r: 245 + (255 - 245) * bgProgress,
    g: 239 + (255 - 239) * bgProgress,
    b: 224 + (255 - 224) * bgProgress,
  };

  // Particle opacity (simplified - fewer particles)
  const particlesOpacity = phase2 * (1 - phase3);

  // Text content based on phase
  const getText = () => {
    if (scrollProgress < 0.25) return "";
    if (scrollProgress < 0.5) return "Identificando pontos de vazamento...";
    if (scrollProgress < 0.75) return "Transformando em oportunidades...";
    return "O método que gera resultados.";
  };

  const textOpacity = scrollProgress > 0.2 ? Math.min(1, (scrollProgress - 0.2) / 0.1) : 0;

  return (
    <section
      ref={containerRef}
      className="relative w-full overflow-hidden"
      style={{
        minHeight: isMobile ? '200vh' : '300vh',
        backgroundColor: `rgb(${bgColor.r}, ${bgColor.g}, ${bgColor.b})`,
      }}
    >
      {/* Sticky container - stays fixed while scrolling */}
      <div 
        className="sticky top-0 w-full flex items-center justify-center"
        style={{ height: '100vh' }}
      >
        {/* Main content */}
        <div className="relative w-full h-full flex items-center justify-center">
          
          {/* Logo/Lupa - Phase 1 */}
          <div
            className="relative z-10"
            style={{
              transform: `scale(${logoScale})`,
              opacity: logoOpacity,
              transition: 'none',
            }}
          >
            {/* Lupa Circle - Minimalista */}
            <div 
              className="relative flex items-center justify-center"
              style={{
                width: isMobile ? '200px' : '300px',
                height: isMobile ? '200px' : '300px',
              }}
            >
              {/* Circle with subtle glow */}
              <div
                className="absolute inset-0 rounded-full border-4 bg-white/5 backdrop-blur-sm"
                style={{
                  borderColor: '#2C5F5F',
                  boxShadow: `0 0 ${40 * phase1}px rgba(76, 175, 80, ${0.4 * phase1})`,
                  transition: 'none',
                }}
              />

              {/* Scanner beam - Sutil */}
              {scannerProgress > 0 && (
                <div
                  className="absolute left-0 right-0 mx-8"
                  style={{
                    top: `${scannerProgress * 80 + 10}%`,
                    height: '2px',
                    background: 'linear-gradient(90deg, transparent, #4CAF50, transparent)',
                    opacity: scannerProgress * (1 - scannerProgress),
                    transition: 'none',
                    boxShadow: '0 0 10px rgba(76, 175, 80, 0.8)',
                  }}
                />
              )}

              {/* Logo Icon - Simplificado */}
              <svg
                className="w-24 h-24 md:w-32 md:h-32 text-[#2C5F5F] relative z-10"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
                style={{
                  opacity: logoOpacity,
                  transition: 'none',
                }}
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
              </svg>
            </div>
          </div>

          {/* Particles - REDUZIDAS e minimalistas */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {/* Apenas 6-8 partículas sutis */}
            {Array.from({ length: isMobile ? 6 : 8 }).map((_, i) => {
              const angle = (i / 8) * Math.PI * 2;
              const distance = 150 * particlesOpacity;
              const x = Math.cos(angle) * distance;
              const y = Math.sin(angle) * distance;

              return (
                <div
                  key={i}
                  className="absolute rounded-full"
                  style={{
                    width: '4px',
                    height: '4px',
                    background: scrollProgress < 0.5 ? '#E57373' : '#81C784',
                    left: '50%',
                    top: '50%',
                    transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                    opacity: particlesOpacity,
                    transition: 'none',
                    boxShadow: scrollProgress < 0.5 
                      ? '0 0 8px rgba(229, 115, 115, 0.8)'
                      : '0 0 8px rgba(129, 199, 132, 0.8)',
                  }}
                />
              );
            })}
          </div>

          {/* Portal effect - Minimalista */}
          {phase3 > 0 && (
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: `radial-gradient(circle, 
                  rgba(129, 199, 132, ${0.1 * portalOpacity}) 0%, 
                  rgba(129, 199, 132, ${0.05 * portalOpacity}) 30%, 
                  transparent 60%
                )`,
                transform: `scale(${portalScale})`,
                opacity: portalOpacity,
                transition: 'none',
              }}
            />
          )}

          {/* Text - Clean e minimalista */}
          <div 
            className="absolute bottom-16 md:bottom-24 left-0 right-0 text-center px-6"
            style={{
              opacity: textOpacity,
              transition: 'none',
            }}
          >
            <p 
              className="text-lg md:text-2xl lg:text-3xl font-light text-gray-700"
              style={{
                fontFamily: 'Poppins, sans-serif',
                letterSpacing: '0.02em',
              }}
            >
              {getText()}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TransitionAnimation;
