import HeroSection from "@/components/HeroSection";
import JourneySection from "@/components/JourneySection";
import TransitionAnimation from "@/components/TransitionAnimation";
import MethodSection from "@/components/MethodSection";
import ResultsSection from "@/components/ResultsSection";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <JourneySection />
      <TransitionAnimation />
      <MethodSection />
      <ResultsSection />
      <ContactForm />
      <Footer />
    </main>
  );
};

export default Index;
