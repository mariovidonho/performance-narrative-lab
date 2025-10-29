import { Target, Crosshair, MessageSquare, ShoppingCart, Award, ChevronLeft, ChevronRight, MessageCircle } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const methodSteps = [
  {
    icon: Target,
    title: "Descoberta",
    description: "Análise de mercado e posicionamento para ser encontrada por quem importa.",
  },
  {
    icon: Crosshair,
    title: "Atração",
    description: "Campanhas de tráfego com foco em intenção, não em vaidade.",
  },
  {
    icon: MessageSquare,
    title: "Consideração",
    description: "Estratégias de nutrição e remarketing para aumentar a confiança e a percepção de valor.",
  },
  {
    icon: ShoppingCart,
    title: "Ação",
    description: "Páginas e funções otimizadas para conversão e geração de vendas.",
  },
  {
    icon: Award,
    title: "Apologia",
    description: "Estratégias de recompra e fidelização para transformar clientes em promotores.",
  },
];

const MethodSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % methodSteps.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + methodSteps.length) % methodSteps.length);
  };

  const scrollToForm = () => {
    document.getElementById('diagnostico')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative z-10 py-20 md:py-32 bg-white overflow-hidden -mt-1">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="text-center mb-16 space-y-4 animate-fade-in">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#424242] tracking-tight leading-tight">
            O método que transforma{" "}
            <span className="text-[#81C784] font-bold">marketing em faturamento</span>.
          </h2>
          <p className="text-lg md:text-xl lg:text-2xl font-light text-[#616161] max-w-4xl mx-auto leading-relaxed">
            Cada profissional da Vicommerce atua em uma etapa da jornada do seu cliente — desde o reconhecimento até a fidelização — garantindo que nenhum centavo do seu investimento seja desperdiçado.
          </p>
        </div>

        {/* Desktop View - All Cards */}
        <div className="hidden lg:block mb-12">
          <div className="grid grid-cols-5 gap-6 relative">
            {methodSteps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={index} className="relative group animate-scale-in" style={{ animationDelay: `${index * 100}ms` }}>
                  {/* Card */}
                  <div className="method-card bg-white rounded-xl p-6 h-full border-2 border-solid border-[#81C784] shadow-[0_4px_12px_rgba(129,199,132,0.15)] transition-all duration-300 hover:shadow-[0_8px_24px_rgba(129,199,132,0.4)] hover:border-[3px] hover:-translate-y-2 relative overflow-hidden">
                    {/* Checkmark on Hover */}
                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <svg className="w-5 h-5 text-[#81C784] animate-check-draw" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>

                    {/* Sparkles on Hover */}
                    <div className="sparkles absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100">
                      {[...Array(3)].map((_, i) => (
                        <div
                          key={i}
                          className="absolute w-1 h-1 bg-[#81C784] rounded-full animate-sparkle"
                          style={{
                            top: `${20 + i * 30}%`,
                            left: `${10 + i * 35}%`,
                            animationDelay: `${i * 0.2}s`,
                          }}
                        />
                      ))}
                    </div>

                    <div className="flex flex-col items-center text-center space-y-4">
                      <div className="w-16 h-16 rounded-full bg-[#81C784] flex items-center justify-center transition-all duration-300 group-hover:scale-115 group-hover:shadow-[0_0_20px_rgba(129,199,132,0.5)]">
                        <Icon className="w-8 h-8 text-white" fill="currentColor" strokeWidth={0} />
                      </div>
                      <div className="space-y-2">
                        <span className="text-xs font-medium text-[#64B5F6] uppercase tracking-widest">
                          Etapa {index + 1}
                        </span>
                        <h3 className="font-semibold text-xl text-[#424242] tracking-tight">{step.title}</h3>
                        <p className="text-sm font-light text-[#616161] leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Connector Arrow with Shimmer */}
                  {index < methodSteps.length - 1 && (
                    <div className="absolute top-1/2 -right-3 transform -translate-y-1/2 z-10">
                      <svg width="24" height="24" viewBox="0 0 24 24" className="shimmer-arrow">
                        <defs>
                          <linearGradient id={`gradient-${index}`} x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#81C784" stopOpacity="0.3">
                              <animate attributeName="offset" values="-1;1" dur="2s" repeatCount="indefinite" />
                            </stop>
                            <stop offset="50%" stopColor="#81C784" stopOpacity="1">
                              <animate attributeName="offset" values="-0.5;1.5" dur="2s" repeatCount="indefinite" />
                            </stop>
                            <stop offset="100%" stopColor="#81C784" stopOpacity="0.3">
                              <animate attributeName="offset" values="0;2" dur="2s" repeatCount="indefinite" />
                            </stop>
                          </linearGradient>
                        </defs>
                        <line x1="0" y1="12" x2="20" y2="12" stroke={`url(#gradient-${index})`} strokeWidth="2" />
                        <polygon points="20,12 16,8 16,16" fill="#81C784" />
                      </svg>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Mobile/Tablet View - Carousel */}
        <div className="lg:hidden relative mb-12">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-300 ease-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {methodSteps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <div key={index} className="w-full flex-shrink-0 px-4">
                    <div className="method-card bg-white rounded-xl p-8 border-2 border-solid border-[#81C784] shadow-[0_4px_12px_rgba(129,199,132,0.15)]">
                      <div className="flex flex-col items-center text-center space-y-4">
                        <div className="w-20 h-20 rounded-full bg-[#81C784] flex items-center justify-center shadow-[0_0_20px_rgba(129,199,132,0.3)]">
                          <Icon className="w-10 h-10 text-white" fill="currentColor" strokeWidth={0} />
                        </div>
                        <div className="space-y-2">
                          <span className="text-xs font-medium text-[#64B5F6] uppercase tracking-widest">
                            Etapa {index + 1}
                          </span>
                          <h3 className="font-semibold text-2xl text-[#424242] tracking-tight">{step.title}</h3>
                          <p className="text-base font-light text-[#616161] leading-relaxed">
                            {step.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 w-10 h-10 rounded-full bg-white/80 shadow-lg flex items-center justify-center text-[#81C784] hover:bg-white transition-colors z-10"
            aria-label="Anterior"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 w-10 h-10 rounded-full bg-white/80 shadow-lg flex items-center justify-center text-[#81C784] hover:bg-white transition-colors z-10"
            aria-label="Próximo"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-6">
            {methodSteps.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  currentSlide === index
                    ? "bg-[#81C784] w-8 shadow-[0_0_8px_rgba(129,199,132,0.6)]"
                    : "bg-[#81C784]/30"
                }`}
                aria-label={`Ir para etapa ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* CTA Button */}
        <div className="text-center animate-fade-in px-4">
          <Button
            onClick={scrollToForm}
            size="lg"
            className="w-full max-w-3xl mx-auto bg-[#81C784] text-white hover:bg-[#66BB6A] shadow-[0_4px_16px_rgba(129,199,132,0.3)] hover:shadow-[0_8px_24px_rgba(129,199,132,0.5)] transition-all duration-300 animate-pulse-subtle px-6 py-5 md:px-8 md:py-6 text-base md:text-lg font-medium whitespace-normal text-center leading-snug md:leading-relaxed break-words overflow-wrap-anywhere min-h-[80px] md:min-h-[72px] flex flex-col sm:flex-row items-center justify-center gap-3"
          >
            <MessageCircle className="w-6 h-6 flex-shrink-0" />
            <span className="block leading-snug">Descubra onde você está perdendo oportunidades — fale com um especialista</span>
          </Button>
        </div>
      </div>

      {/* CSS Animations */}
      <style>{`
        @keyframes check-draw {
          from {
            stroke-dasharray: 24;
            stroke-dashoffset: 24;
          }
          to {
            stroke-dasharray: 24;
            stroke-dashoffset: 0;
          }
        }

        @keyframes sparkle {
          0%, 100% {
            opacity: 0;
            transform: scale(0) translateY(0);
          }
          50% {
            opacity: 1;
            transform: scale(1) translateY(-10px);
          }
        }

        @keyframes pulse-subtle {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.02);
          }
        }

        .animate-check-draw {
          stroke-dasharray: 24;
          stroke-dashoffset: 24;
          animation: check-draw 0.6s ease-out forwards;
        }

        .animate-sparkle {
          animation: sparkle 1.5s ease-out infinite;
        }

        .animate-pulse-subtle {
          animation: pulse-subtle 2s ease-in-out infinite;
        }

        .method-card:hover .animate-check-draw {
          animation: check-draw 0.6s ease-out forwards;
        }
      `}</style>
    </section>
  );
};

export default MethodSection;
