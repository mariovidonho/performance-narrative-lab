import { Compass, Target, MessageSquare, ShoppingCart, Award } from "lucide-react";

const methodSteps = [
  {
    icon: Compass,
    title: "Descoberta",
    description: "Análise de mercado e posicionamento para ser encontrado por quem importa.",
  },
  {
    icon: Target,
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
    description: "Páginas e funis otimizados para conversão e geração de vendas.",
  },
  {
    icon: Award,
    title: "Apologia",
    description: "Estratégias de recompra e fidelização para transformar clientes em promotores.",
  },
];

const MethodSection = () => {
  return (
    <section className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="text-center mb-16 space-y-4 animate-fade-in">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
            O método que transforma{" "}
            <span className="text-primary">marketing em faturamento</span>.
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-4xl mx-auto">
            Cada profissional da Vicommerce atua em uma etapa da jornada do seu cliente — desde o reconhecimento até a fidelização — garantindo que nenhum centavo do seu investimento seja desperdiçado.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
          {methodSteps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={index}
                className="group animate-scale-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="bg-card rounded-2xl p-8 h-full shadow-soft hover:shadow-card transition-smooth border border-border hover:border-primary">
                  <div className="flex flex-col items-start space-y-4">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-accent to-primary flex items-center justify-center group-hover:scale-110 transition-smooth">
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-muted-foreground">
                          Etapa {index + 1}
                        </span>
                      </div>
                      <h3 className="font-bold text-xl">{step.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
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
    </section>
  );
};

export default MethodSection;
