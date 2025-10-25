import { Search, Users, Brain, Zap, Heart, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

const journeySteps = [
  {
    icon: Search,
    title: "Descoberta",
    description: "Seu público ainda não te conhece. Como estão suas campanhas de visibilidade e posicionamento?",
  },
  {
    icon: Users,
    title: "Atração",
    description: "Você atrai quem realmente tem intenção de compra ou apenas seguidores?",
  },
  {
    icon: Brain,
    title: "Consideração",
    description: "Seu conteúdo e seus anúncios realmente fazem o cliente confiar em sua solução?",
  },
  {
    icon: Zap,
    title: "Ação",
    description: "Sua estrutura digital incentiva o cliente a agir e comprar?",
  },
  {
    icon: Heart,
    title: "Apologia",
    description: "Seus clientes satisfeitos estão gerando novas vendas para você?",
  },
];

const JourneySection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % journeySteps.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + journeySteps.length) % journeySteps.length);
  };

  return (
    <section className="py-20 md:py-32 bg-[#F5EFE0] relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="text-center mb-16 space-y-4 animate-fade-in">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#424242]">
            Em que parte da jornada do seu cliente{" "}
            <span className="text-[#E57373]">você está perdendo dinheiro?</span>
          </h2>
          <p className="text-lg md:text-xl text-[#616161] max-w-3xl mx-auto">
            Cada negócio tem um ponto de fuga em sua jornada. Descubra onde você está e como podemos transformá-lo em lucro.
          </p>
        </div>

        {/* Desktop View - All Cards */}
        <div className="hidden lg:block">
          <div className="grid grid-cols-5 gap-6 relative">
            {journeySteps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={index} className="relative group animate-scale-in" style={{ animationDelay: `${index * 100}ms` }}>
                  {/* Big Number Background */}
                  <div className="absolute -top-4 -right-4 text-[120px] font-bold text-[#E57373] opacity-[0.03] pointer-events-none">
                    {index + 1}
                  </div>
                  
                  {/* Card */}
                  <div className="journey-card bg-white rounded-xl p-6 h-full border-2 border-dashed border-[#E57373] shadow-[0_4px_12px_rgba(229,115,115,0.15)] transition-all duration-300 hover:shadow-[0_8px_24px_rgba(229,115,115,0.3)] hover:border-[3px] hover:-translate-y-1 hover:journey-shake relative">
                    <div className="flex flex-col items-center text-center space-y-4">
                      <div className="w-16 h-16 rounded-full bg-[#E57373] flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-hover:animate-pulse">
                        <Icon className="w-8 h-8 text-white" strokeWidth={2} />
                      </div>
                      <div className="space-y-2">
                        <span className="text-xs font-semibold text-[#FFB74D] uppercase tracking-wider">
                          Etapa {index + 1}
                        </span>
                        <h3 className="font-bold text-lg text-[#424242]">{step.title}</h3>
                        <p className="text-sm text-[#616161] leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Connector Arrow */}
                  {index < journeySteps.length - 1 && (
                    <div className="absolute top-1/2 -right-3 transform -translate-y-1/2 z-10">
                      <svg width="24" height="24" viewBox="0 0 24 24" className="animate-arrow-draw">
                        <line
                          x1="0"
                          y1="12"
                          x2="20"
                          y2="12"
                          stroke="#E57373"
                          strokeWidth="2"
                          strokeDasharray="4 4"
                          className="animate-dash-move"
                        />
                        <polygon points="20,12 16,8 16,16" fill="#E57373" />
                      </svg>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Mobile/Tablet View - Carousel */}
        <div className="lg:hidden relative">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-300 ease-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {journeySteps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <div key={index} className="w-full flex-shrink-0 px-4">
                    <div className="journey-card bg-white rounded-xl p-8 border-2 border-dashed border-[#E57373] shadow-[0_4px_12px_rgba(229,115,115,0.15)]">
                      <div className="flex flex-col items-center text-center space-y-4">
                        <div className="w-20 h-20 rounded-full bg-[#E57373] flex items-center justify-center">
                          <Icon className="w-10 h-10 text-white" strokeWidth={2} />
                        </div>
                        <div className="space-y-2">
                          <span className="text-xs font-semibold text-[#FFB74D] uppercase tracking-wider">
                            Etapa {index + 1}
                          </span>
                          <h3 className="font-bold text-xl text-[#424242]">{step.title}</h3>
                          <p className="text-base text-[#616161] leading-relaxed">
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
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 w-10 h-10 rounded-full bg-white/80 shadow-lg flex items-center justify-center text-[#E57373] hover:bg-white transition-colors z-10"
            aria-label="Anterior"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 w-10 h-10 rounded-full bg-white/80 shadow-lg flex items-center justify-center text-[#E57373] hover:bg-white transition-colors z-10"
            aria-label="Próximo"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-6">
            {journeySteps.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  currentSlide === index
                    ? "bg-[#E57373] w-8 shadow-[0_0_8px_rgba(229,115,115,0.6)]"
                    : "bg-[#E57373]/30"
                }`}
                aria-label={`Ir para etapa ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* CSS Animations */}
      <style>{`
        @keyframes journey-shake {
          0%, 100% { transform: translateX(0) translateY(-4px); }
          25% { transform: translateX(-1px) translateY(-4px); }
          75% { transform: translateX(1px) translateY(-4px); }
        }

        @keyframes arrow-draw {
          from { stroke-dashoffset: 20; }
          to { stroke-dashoffset: 0; }
        }

        @keyframes dash-move {
          from { stroke-dashoffset: 0; }
          to { stroke-dashoffset: 8; }
        }

        .journey-card:hover {
          animation: journey-shake 0.3s ease-in-out;
        }

        .animate-arrow-draw line {
          stroke-dasharray: 20;
          animation: arrow-draw 1s ease-out forwards;
        }

        .animate-dash-move {
          animation: dash-move 1s linear infinite;
        }
      `}</style>
    </section>
  );
};

export default JourneySection;
