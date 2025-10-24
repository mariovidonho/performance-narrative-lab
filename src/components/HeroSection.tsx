import { Button } from "@/components/ui/button";
import heroDashboard from "@/assets/hero-dashboard.png";

const HeroSection = () => {
  const scrollToForm = () => {
    document.getElementById('diagnostico')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      <div className="absolute inset-0 gradient-hero opacity-20"></div>
      
      <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8 animate-fade-in">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Transforme sua presença digital em{" "}
              <span className="text-primary">resultados reais</span>.
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl">
              A Vicommerce é uma agência de marketing de performance focada em aumentar o faturamento das empresas através de estratégias inteligentes, dados e conversão.
            </p>
            
            <Button 
              size="lg" 
              onClick={scrollToForm}
              className="text-lg px-8 py-6 bg-primary hover:bg-primary/90 shadow-soft hover:shadow-card transition-smooth"
            >
              Quero aumentar meu faturamento
            </Button>
          </div>
          
          {/* Right Mockup */}
          <div className="relative animate-slide-in-right">
            <div className="relative rounded-2xl overflow-hidden shadow-card">
              <img 
                src={heroDashboard} 
                alt="Dashboard de Performance" 
                className="w-full h-auto"
              />
            </div>
            
            {/* Floating elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-secondary rounded-full blur-3xl opacity-50 animate-pulse"></div>
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-accent rounded-full blur-3xl opacity-30 animate-pulse"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
