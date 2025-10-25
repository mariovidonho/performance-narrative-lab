import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Send } from "lucide-react";

const formSchema = z.object({
  nome: z.string().min(2, "Nome deve ter no mínimo 2 caracteres").max(100),
  empresa: z.string().min(2, "Nome da empresa deve ter no mínimo 2 caracteres").max(100),
  segmento: z.string().min(2, "Segmento deve ter no mínimo 2 caracteres").max(100),
  faturamento: z.string().min(1, "Faturamento é obrigatório"),
  telefone: z.string().min(10, "Telefone inválido").max(15),
});

type FormData = z.infer<typeof formSchema>;

const ContactForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    console.log("Form data:", data);
    toast.success("Diagnóstico solicitado com sucesso! Em breve entraremos em contato.");
    reset();
    setIsSubmitting(false);
  };

  return (
    <section id="diagnostico" className="py-20 md:py-32 gradient-section">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12 space-y-4 animate-fade-in">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
              Vamos descobrir juntos onde está o{" "}
              <span className="text-accent">potencial escondido</span> da sua empresa
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground">
              Preencha o formulário abaixo e receba um diagnóstico gratuito do seu funil digital.
            </p>
          </div>

          <div className="bg-card rounded-2xl p-8 md:p-12 shadow-card border border-border animate-scale-in">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="nome">Nome completo</Label>
                <Input
                  id="nome"
                  placeholder="Seu nome"
                  {...register("nome")}
                  className="h-12"
                />
                {errors.nome && (
                  <p className="text-sm text-destructive">{errors.nome.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="empresa">Empresa</Label>
                <Input
                  id="empresa"
                  placeholder="Nome da sua empresa"
                  {...register("empresa")}
                  className="h-12"
                />
                {errors.empresa && (
                  <p className="text-sm text-destructive">{errors.empresa.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="segmento">Segmento</Label>
                <Input
                  id="segmento"
                  placeholder="Ex: E-commerce, Serviços, SaaS..."
                  {...register("segmento")}
                  className="h-12"
                />
                {errors.segmento && (
                  <p className="text-sm text-destructive">{errors.segmento.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="faturamento">Faturamento mensal</Label>
                <Input
                  id="faturamento"
                  placeholder="Ex: R$ 50.000"
                  {...register("faturamento")}
                  className="h-12"
                />
                {errors.faturamento && (
                  <p className="text-sm text-destructive">{errors.faturamento.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="telefone">Telefone</Label>
                <Input
                  id="telefone"
                  placeholder="(00) 00000-0000"
                  {...register("telefone")}
                  className="h-12"
                />
                {errors.telefone && (
                  <p className="text-sm text-destructive">{errors.telefone.message}</p>
                )}
              </div>

              <Button
                type="submit"
                size="lg"
                disabled={isSubmitting}
                className="w-full min-h-[56px] px-6 py-4 text-base md:text-lg bg-accent hover:bg-accent/90 shadow-soft hover:shadow-card transition-smooth whitespace-normal text-center leading-relaxed break-words flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  "Enviando..."
                ) : (
                  <>
                    <Send className="h-5 w-5 flex-shrink-0" />
                    <span>Solicitar diagnóstico gratuito</span>
                  </>
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
