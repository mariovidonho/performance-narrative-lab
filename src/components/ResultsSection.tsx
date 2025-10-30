import { Users, Target, DollarSign, TrendingUp } from "lucide-react";
import { useEffect, useState, useRef } from "react";

const results = [
  {
    icon: Users,
    value: 80000,
    suffix: "+",
    label: "Pessoas alcançadas",
  },
  {
    icon: Target,
    value: 1000,
    suffix: "+",
    label: "Conversões geradas",
  },
  {
    icon: DollarSign,
    value: 1.23,
    prefix: "R$ ",
    suffix: "",
    label: "CPC médio",
  },
  {
    icon: TrendingUp,
    value: 6.21,
    suffix: "%",
    label: "CTR",
  },
];

// COMPONENTE COUNTUP CORRIGIDO
const CountUp = ({ 
  end, 
  duration = 2000, 
  prefix = "", 
  suffix = "" 
}: { 
  end: number; 
  duration?: number; 
  prefix?: string; 
  suffix?: string;
}) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const countRef = useRef<HTMLSpanElement>(null);
  
  // Detectar se é número decimal
  const isDecimal = end % 1 !== 0;
  const decimalPlaces = isDecimal ? 2 : 0;

  // IntersectionObserver para detectar quando entra na tela
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 } // Trigger quando 30% do elemento está visível
    );

    if (countRef.current) {
      observer.observe(countRef.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  // Animação do contador
  useEffect(() => {
    if (!isVisible) return;

    let startTime: number | null = null;
    let animationFrame: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      
      // Easing function para animação mais suave (easeOutExpo)
      const easeOutExpo = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const currentValue = easeOutExpo * end;

      setCount(currentValue);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCount(end); // Garantir valor exato no final
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [end, duration, isVisible]);

  // Formatação do número
  const formattedCount = isDecimal
    ? count.toFixed(decimalPlaces)
    : Math.floor(count).toLocaleString('pt-BR');

  return (
    <span 
      ref={countRef} 
      className="font-bold text-4xl md:text-5xl"
      style={{ fontFamily: 'Poppins, sans-serif' }}
    >
      {prefix}{formattedCount}{suffix}
    </span>
  );
};

const ResultsSection = () => {
  return (
    <section className="py-20 md:py-32 bg-gradient-to-br from-slate-700 via-slate-600 to-amber-800 text-white relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-64 h-64 bg-white rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-white rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
        {/* Título */}
        <div className="text-center mb-16 space-y-4">
          <h2 
            className="text-3xl md:text-4xl lg:text-5xl font-bold"
            style={{ fontFamily: 'Poppins, sans-serif' }}
          >
            Resultados que já obtivemos para nossos clientes
          </h2>
        </div>

        {/* Grid de resultados */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {results.map((result, index) => {
            const Icon = result.icon;
            return (
              <div
                key={index}
                className="text-center"
              >
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105">
                  <div className="flex flex-col items-center space-y-4">
                    {/* Ícone */}
                    <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center">
                      <Icon className="w-8 h-8" />
                    </div>
                    
                    {/* Número animado */}
                    <CountUp 
                      end={result.value} 
                      prefix={result.prefix || ""}
                      suffix={result.suffix || ""}
                      duration={2500}
                    />
                    
                    {/* Label */}
                    <p 
                      className="text-lg font-medium opacity-90"
                      style={{ fontFamily: 'Poppins, sans-serif' }}
                    >
                      {result.label}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Texto final */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <p 
            className="text-xl md:text-2xl font-medium leading-relaxed"
            style={{ fontFamily: 'Poppins, sans-serif' }}
          >
            Esse foi um dos resultados gerados para um de nossos clientes.
            <br />
            <span className="text-green-400">Já pensou se fosse na sua empresa?</span>
          </p>
          <p 
            className="text-lg opacity-90"
            style={{ fontFamily: 'Poppins, sans-serif' }}
          >
            Quantas oportunidades você precisa que nós geremos para que você venda mais?
          </p>
        </div>
      </div>
    </section>
  );
};

export default ResultsSection;
