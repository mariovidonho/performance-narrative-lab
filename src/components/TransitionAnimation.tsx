import { useEffect, useRef, useState } from "react";

const TransitionAnimation = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [animationStarted, setAnimationStarted] = useState(false);
  const [skipAnimation, setSkipAnimation] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !animationStarted) {
            setAnimationStarted(true);
          }
        });
      },
      { threshold: 0.5 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [animationStarted]);

  const handleSkip = () => {
    setSkipAnimation(true);
  };

  if (skipAnimation) {
    return null;
  }

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#F5EFE0] transition-colors duration-1000"
      style={{
        backgroundColor: animationStarted ? "#FFFFFF" : "#F5EFE0",
      }}
    >
      {/* Skip Button */}
      <button
        onClick={handleSkip}
        className="absolute top-4 right-4 z-50 px-4 py-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
        aria-label="Pular animação"
      >
        Pular animação →
      </button>

      {/* Main Animation Container */}
      <div className="relative w-full h-full flex items-center justify-center">
        {/* Phase 1-2: Lupa with Scanner */}
        <div
          className={`transition-all duration-2000 ease-in-out ${
            animationStarted ? "lupa-container animate-lupa-discovery" : "opacity-0 scale-0"
          }`}
        >
          {/* Lupa Circle */}
          <div className="relative lupa-circle">
            <div className="w-64 h-64 md:w-96 md:h-96 lg:w-[400px] lg:h-[400px] rounded-full border-8 border-[#2C5F5F] bg-white/10 backdrop-blur-sm animate-lupa-glow">
              {/* Scanner Beam */}
              {animationStarted && (
                <div className="scanner-beam absolute left-0 right-0 h-1 animate-scanner-scan"></div>
              )}

              {/* Logo/Lupa Icon */}
              <div className="absolute inset-0 flex items-center justify-center">
                <svg
                  className="w-32 h-32 md:w-40 md:h-40 text-[#2C5F5F] animate-lupa-search"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <circle cx="11" cy="11" r="8"></circle>
                  <path d="m21 21-4.35-4.35"></path>
                </svg>
              </div>
            </div>
          </div>

          {/* Red Problem Particles */}
          {animationStarted && (
            <div className="particles-container absolute inset-0 pointer-events-none">
              {Array.from({ length: 25 }).map((_, i) => (
                <div
                  key={`red-${i}`}
                  className="particle-red absolute rounded-full bg-[#E57373] animate-particle-float"
                  style={{
                    width: `${Math.random() * 4 + 2}px`,
                    height: `${Math.random() * 4 + 2}px`,
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    opacity: Math.random() * 0.3 + 0.6,
                    animationDelay: `${Math.random() * 2}s`,
                    animationDuration: `${Math.random() * 3 + 2}s`,
                  }}
                />
              ))}
            </div>
          )}

          {/* Green Solution Particles (Phase 3) */}
          {animationStarted && (
            <div className="particles-container absolute inset-0 pointer-events-none">
              {Array.from({ length: 50 }).map((_, i) => (
                <div
                  key={`green-${i}`}
                  className="particle-green absolute rounded-full bg-[#81C784] animate-particle-explode"
                  style={{
                    width: `${Math.random() * 6 + 2}px`,
                    height: `${Math.random() * 6 + 2}px`,
                    left: "50%",
                    top: "50%",
                    opacity: 0,
                    animationDelay: `${5 + Math.random() * 0.5}s`,
                    animationDuration: "2s",
                    transform: `translate(-50%, -50%)`,
                  }}
                />
              ))}
            </div>
          )}
        </div>

        {/* Portal Effect (Phase 3) */}
        {animationStarted && (
          <div className="portal-overlay absolute inset-0 pointer-events-none animate-portal-expand"></div>
        )}

        {/* Text Phases */}
        {animationStarted && (
          <div className="absolute bottom-20 left-0 right-0 text-center px-4">
            <p className="text-phase text-lg md:text-xl font-medium text-gray-800 animate-text-phase-1">
              Identificando os pontos de vazamento...
            </p>
            <p className="text-phase text-lg md:text-xl font-medium text-gray-800 animate-text-phase-2">
              E se cada vazamento virasse lucro?
            </p>
            <p className="text-phase text-xl md:text-2xl font-bold text-[#2C5F5F] animate-text-phase-3">
              O método que transforma marketing em faturamento.
            </p>
          </div>
        )}
      </div>

      {/* CSS Animations */}
      <style>{`
        @keyframes lupa-glow {
          0%, 100% {
            box-shadow: 0 0 30px rgba(76, 175, 80, 0.6);
          }
          50% {
            box-shadow: 0 0 60px rgba(76, 175, 80, 0.8);
          }
        }

        @keyframes lupa-search {
          0%, 100% { transform: rotate(0deg) translateY(0); }
          25% { transform: rotate(5deg) translateY(-2px); }
          75% { transform: rotate(-5deg) translateY(2px); }
        }

        @keyframes lupa-discovery {
          0% { transform: scale(0); opacity: 0; }
          20% { transform: scale(1); opacity: 1; }
          80% { transform: scale(1); opacity: 1; }
          100% { transform: scale(50); opacity: 0; }
        }

        @keyframes scanner-scan {
          0% { top: 0; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }

        @keyframes particle-float {
          0%, 100% { transform: translate(0, 0); }
          25% { transform: translate(10px, -10px); }
          50% { transform: translate(-5px, 5px); }
          75% { transform: translate(5px, 10px); }
        }

        @keyframes particle-explode {
          0% {
            transform: translate(-50%, -50%) scale(0);
            opacity: 0;
          }
          20% {
            opacity: 1;
          }
          100% {
            transform: translate(
              calc(-50% + ${Math.random() * 400 - 200}px),
              calc(-50% + ${Math.random() * 400 - 200}px)
            ) scale(1);
            opacity: 0;
          }
        }

        @keyframes portal-expand {
          0% {
            background: radial-gradient(circle, transparent 0%, transparent 100%);
            transform: scale(0);
            opacity: 0;
          }
          60% {
            opacity: 0;
          }
          65% {
            background: radial-gradient(circle, #E57373 0%, #F5EFE0 30%, #66BB6A 60%, transparent 100%);
            transform: scale(0.1);
            opacity: 1;
          }
          85% {
            background: radial-gradient(circle, #E57373 0%, #F5EFE0 20%, #66BB6A 40%, transparent 70%);
            transform: scale(3);
            opacity: 1;
          }
          100% {
            background: radial-gradient(circle, transparent 0%, transparent 100%);
            transform: scale(10);
            opacity: 0;
          }
        }

        @keyframes text-phase-1 {
          0% { opacity: 0; transform: translateY(20px); }
          20% { opacity: 1; transform: translateY(0); }
          35% { opacity: 1; transform: translateY(0); }
          45% { opacity: 0; transform: translateY(-20px); }
          100% { opacity: 0; }
        }

        @keyframes text-phase-2 {
          0%, 45% { opacity: 0; transform: translateY(20px); }
          55% { opacity: 1; transform: translateY(0); }
          70% { opacity: 1; transform: translateY(0); }
          80% { opacity: 0; transform: translateY(-20px); }
          100% { opacity: 0; }
        }

        @keyframes text-phase-3 {
          0%, 80% { opacity: 0; transform: translateY(20px); }
          90% { opacity: 1; transform: translateY(0); }
          100% { opacity: 1; transform: translateY(0); }
        }

        .animate-lupa-glow {
          animation: lupa-glow 2s ease-in-out infinite;
        }

        .animate-lupa-search {
          animation: lupa-search 3s ease-in-out infinite;
        }

        .animate-lupa-discovery {
          animation: lupa-discovery 8s ease-in-out forwards;
        }

        .scanner-beam {
          background: linear-gradient(180deg, transparent 0%, #4CAF50 50%, transparent 100%);
          animation: scanner-scan 3s linear 2s 2;
        }

        .animate-particle-float {
          animation: particle-float linear infinite;
        }

        .animate-particle-explode {
          animation: particle-explode ease-out forwards;
        }

        .animate-portal-expand {
          animation: portal-expand 8s ease-in-out forwards;
        }

        .text-phase {
          position: absolute;
          left: 0;
          right: 0;
          opacity: 0;
        }

        .animate-text-phase-1 {
          animation: text-phase-1 8s ease-in-out forwards;
        }

        .animate-text-phase-2 {
          animation: text-phase-2 8s ease-in-out forwards;
        }

        .animate-text-phase-3 {
          animation: text-phase-3 8s ease-in-out forwards;
        }

        @media (prefers-reduced-motion: reduce) {
          .animate-lupa-discovery {
            animation-duration: 2s;
          }
          .scanner-beam,
          .animate-particle-float,
          .animate-particle-explode,
          .animate-portal-expand {
            animation: none;
          }
        }

        @media (max-width: 768px) {
          .animate-lupa-discovery {
            animation-duration: 3s;
          }
        }
      `}</style>
    </section>
  );
};

export default TransitionAnimation;
