import { Search, Users, Brain, Zap, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

const journeySteps = [
  {
    icon: Search,
    title: "Descoberta",
    description: "Seu público ainda não te conhece. Como estão suas campanhas de visibilidade e posicionamento?",
  },
  {
    icon: Users,
    title: "Atração",
    description: "Você atrai quem realmente tem intenção de compra ou só seguidores?",
  },
  {
    icon: Brain,
    title: "Consideração",
    description: "Seu conteúdo e seus anúncios realmente fazem o cliente confiar na sua solução?",
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
  const scrollToForm = () => {
    document.getElementById('diagnostico')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="py-20 md:py-32 gradient-section">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="text-center mb-16 space-y-4 animate-fade-in">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
            Em qual parte da jornada do seu cliente{" "}
            <span className="text-accent">você está perdendo dinheiro?</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Cada negócio tem um ponto de fuga na sua jornada. Descubra onde o seu está e como podemos transformá-lo em lucro.
          </p>
        </div>

        <div className="grid md:grid-cols-5 gap-6 mb-12">
          {journeySteps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={index}
                className="relative group animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="bg-card rounded-xl p-6 h-full shadow-soft hover:shadow-card transition-smooth border border-border">
                  <div className="flex flex-col items-center text-center space-y-4">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-secondary to-primary flex items-center justify-center">
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="font-semibold text-lg">{step.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
                
                {/* Arrow connector - hidden on last item and mobile */}
                {index < journeySteps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-3 transform -translate-y-1/2 z-10">
                    <div className="w-6 h-0.5 bg-primary"></div>
                    <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-0 h-0 border-l-[8px] border-l-primary border-t-[4px] border-t-transparent border-b-[4px] border-b-transparent"></div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="text-center animate-fade-in">
          <Button 
            variant="outline" 
            size="lg"
            onClick={scrollToForm}
            className="text-base border-2 hover:bg-primary hover:text-primary-foreground transition-smooth"
          >
            💬 Descubra onde você está perdendo oportunidades — fale com um especialista
          </Button>
        </div>
      </div>
    </section>
  );
};

export default JourneySection;
