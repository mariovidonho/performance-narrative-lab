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

  // Scroll-based animation
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Calculate progress (0 to 1)
      const scrollStart = rect.top - windowHeight;
      const scrollEnd = rect.bottom;
      const scrollRange = scrollEnd - scrollStart;
      const currentScroll = -scrollStart;
      
      const progress = Math.max(0, Math.min(1, currentScroll / scrollRange));
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Phase calculations (smooth transitions)
  const logoPhase = Math.max(0, Math.min(1, scrollProgress / 0.3)); // 0-30%
  const scannerPhase = Math.max(0, Math.min(1, (scrollProgress - 0.3) / 0.2)); // 30-50%
  const fadePhase = Math.max(0, Math.min(1, (scrollProgress - 0.5) / 0.3)); // 50-80%
  const exitPhase = Math.max(0, Math.min(1, (scrollProgress - 0.8) / 0.2)); // 80-100%

  // Logo transform
  const logoScale = 0.3 + (logoPhase * 0.7); // 0.3 to 1
  const logoOpacity = logoPhase * (1 - exitPhase);

  // Scanner position (horizontal line)
  const scannerX = scannerPhase * 100; // 0% to 100%

  // Background transition
  const bgProgress = Math.max(0, Math.min(1, (scrollProgress - 0.4) / 0.4));
  const bgColor = {
    r: 245 + (255 - 245) * bgProgress,
    g: 239 + (255 - 239) * bgProgress,
    b: 224 + (255 - 224) * bgProgress,
  };

  // Text content based on phase
  const getText = () => {
    if (scrollProgress < 0.3) return "";
    if (scrollProgress < 0.6) return "Analisando sua jornada...";
    if (scrollProgress < 0.85) return "Identificando oportunidades...";
    return "Transformando em resultados.";
  };

  const textOpacity = scrollProgress > 0.25 
    ? Math.min(1, (scrollProgress - 0.25) / 0.15) * (1 - Math.max(0, (scrollProgress - 0.85) / 0.15))
    : 0;

  return (
    <section
      ref={containerRef}
      className="relative w-full"
      style={{
        minHeight: isMobile ? '200vh' : '250vh',
        backgroundColor: `rgb(${bgColor.r}, ${bgColor.g}, ${bgColor.b})`,
        transition: 'background-color 0.3s ease',
      }}
    >
      {/* Sticky container - ISSO CRIA O EFEITO "FIXO" */}
      <div 
        className="sticky top-0 w-full flex items-center justify-center overflow-hidden"
        style={{ 
          height: '100vh',
        }}
      >
        {/* Main content */}
        <div className="relative w-full h-full flex flex-col items-center justify-center px-6">
          
          {/* Logo Vicommerce - MINIMALISTA */}
          <div
            className="relative z-10 transition-none"
            style={{
              transform: `scale(${logoScale})`,
              opacity: logoOpacity,
            }}
          >
            {/* Logo real da Vicommerce */}
            <div className="text-[#2C5F5F] flex flex-col items-center gap-2">
              {/* Lupa simplificada */}
              <svg
                className="w-20 h-20 md:w-24 md:h-24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
              >
                <circle cx="11" cy="11" r="7" />
                <path d="m21 21-4.35-4.35" strokeLinecap="round" />
              </svg>
              
              {/* Texto Vicommerce */}
              <div className="text-center">
                <h2 
                  className="text-2xl md:text-3xl font-semibold tracking-tight"
                  style={{ fontFamily: 'Poppins, sans-serif' }}
                >
                  Vicommerce
                </h2>
                <p 
                  className="text-xs md:text-sm font-light uppercase tracking-widest text-gray-600"
                  style={{ fontFamily: 'Poppins, sans-serif' }}
                >
                  Marketing Digital
                </p>
              </div>
            </div>

            {/* Scanner line - HORIZONTAL E MINIMALISTA */}
            {scannerPhase > 0 && scannerPhase < 1 && (
              <div 
                className="absolute top-1/2 left-0 right-0 -translate-y-1/2 overflow-hidden"
                style={{
                  opacity: scannerPhase * (1 - scannerPhase) * 2, // Fade in/out suave
                }}
              >
                <div
                  className="h-[1px] w-full relative"
                  style={{
                    background: 'linear-gradient(90deg, transparent, #4CAF50, transparent)',
                    transform: `translateX(${scannerX - 50}%)`,
                    boxShadow: '0 0 10px rgba(76, 175, 80, 0.5)',
                  }}
                />
              </div>
            )}
          </div>

          {/* Text - CLEAN E MINIMAL */}
          <div 
            className="absolute bottom-16 md:bottom-24 left-0 right-0 text-center px-6"
            style={{
              opacity: textOpacity,
            }}
          >
            <p 
              className="text-lg md:text-2xl font-light text-gray-700 max-w-2xl mx-auto"
              style={{
                fontFamily: 'Poppins, sans-serif',
                letterSpacing: '0.02em',
                lineHeight: '1.6',
              }}
            >
              {getText()}
            </p>
          </div>

          {/* Subtle gradient overlay (opcional - para profundidade) */}
          {fadePhase > 0 && (
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: `radial-gradient(circle at center, transparent 40%, rgba(255,255,255,${fadePhase * 0.3}) 80%)`,
              }}
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default TransitionAnimation;
