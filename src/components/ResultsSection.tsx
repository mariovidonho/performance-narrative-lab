
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
    label: "CPC médio",
  },
  {
    icon: TrendingUp,
    value: 6.21,
    suffix: "%",
    label: "CTR",
  },
];


const CountUp = ({ end, duration = 2000, prefix = "", suffix = "" }: { 
  end: number; 
  duration?: number; 
  prefix?: string; 
  suffix?: string;
}) => {
  const [count, setCount] = useState(0);
  const isDecimal = end % 1 !== 0;
  const decimalPlaces = isDecimal ? end.toString().split(".")[1]?.length || 2 : 0;
  const countRef = useRef<HTMLSpanElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (countRef.current) {
      observer.observe(countRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let startTime: number;
    let animationFrame: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      const currentValue = progress * end;

      setCount(currentValue);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration, isVisible]);

  return (
    <span ref={countRef} className="font-bold text-4xl md:text-5xl">
      {prefix}{count.toLocaleString('pt-BR', { minimumFractionDigits: decimalPlaces, maximumFractionDigits: decimalPlaces })}{suffix}
    </span>
  );
};

const ResultsSection = () => {
  return (
    <section className="py-20 md:py-32 bg-gradient-to-br from-primary via-accent to-primary text-white relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-64 h-64 bg-white rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-white rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16 space-y-4 animate-fade-in">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
            Resultados que já obtivemos para nossos clientes
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {results.map((result, index) => {
            const Icon = result.icon;
            return (
              <div
                key={index}
                className="text-center animate-scale-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:bg-white/15 transition-smooth">
                  <div className="flex flex-col items-center space-y-4">
                    <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center">
                      <Icon className="w-8 h-8" />
                    </div>
                    <CountUp 
                      end={result.value} 
                      prefix={result.prefix}
                      suffix={result.suffix}
                    />
                    <p className="text-lg font-medium opacity-90">
                      {result.label}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center space-y-4 max-w-3xl mx-auto animate-fade-in">
          <p className="text-xl md:text-2xl font-medium leading-relaxed">
            Esse foi um dos resultados gerados para um de nossos clientes.
            <br />
            <span className="text-secondary">Já pensou se fosse na sua empresa?</span>
          </p>
          <p className="text-lg opacity-90">
            Quantas oportunidades você precisa que nós geremos para que você venda mais?
          </p>
        </div>
      </div>
    </section>
  );
};

export default ResultsSection;
