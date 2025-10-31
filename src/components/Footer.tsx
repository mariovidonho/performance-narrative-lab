import { Instagram, Linkedin, MessageCircle } from "lucide-react";

const Footer = () => {
  const socialLinks = {
    instagram: "https://www.instagram.com/vicommerce_mkt/",
    linkedin: "#",
    whatsapp: "5591992686313"
  };

  return (
    <footer className="bg-primary text-white py-12">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          
          <div className="space-y-4">
            <h3 
              className="text-2xl font-bold"
              style={{ fontFamily: 'Poppins, sans-serif' }}
            >
              Vicommerce
            </h3>
            <p 
              className="text-white/80 font-light"
              style={{ fontFamily: 'Poppins, sans-serif' }}
            >
              Marketing de performance para negócios que querem crescer.
            </p>
          </div>

          <div className="space-y-4">
            <h4 
              className="font-semibold text-lg"
              style={{ fontFamily: 'Poppins, sans-serif' }}
            >
              Links
            </h4>
            <ul className="space-y-2 text-white/80">
              <li>
                <a 
                  href="/politica-privacidade" 
                  className="hover:text-white transition-smooth font-light"
                  style={{ fontFamily: 'Poppins, sans-serif' }}
                >
                  Política de Privacidade
                </a>
              </li>
              <li>
                <a 
                  href="/termos-uso" 
                  className="hover:text-white transition-smooth font-light"
                  style={{ fontFamily: 'Poppins, sans-serif' }}
                >
                  Termos de Uso
                </a>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 
              className="font-semibold text-lg"
              style={{ fontFamily: 'Poppins, sans-serif' }}
            >
              Redes Sociais
            </h4>
            <div className="flex gap-4">
              
              
                href={socialLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all duration-300 hover:scale-110"
                aria-label="Instagram da Vicommerce"
              >
                <Instagram className="w-5 h-5" />
              </a>

              
                href={socialLinks.linkedin}
                target={socialLinks.linkedin === "#" ? "_self" : "_blank"}
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all duration-300 hover:scale-110"
                aria-label="LinkedIn da Vicommerce"
                title={socialLinks.linkedin === "#" ? "Em breve" : "LinkedIn da Vicommerce"}
              >
                <Linkedin className="w-5 h-5" />
              </a>

              
                href={`https://wa.me/${socialLinks.whatsapp}?text=${encodeURIComponent("Olá! Gostaria de saber mais sobre os serviços da Vicommerce.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all duration-300 hover:scale-110"
                aria-label="WhatsApp da Vicommerce"
              >
                <MessageCircle className="w-5 h-5" />
              </a>

            </div>
          </div>

        </div>

        <div className="border-t border-white/20 pt-8 text-center text-white/60">
          <p 
            className="font-light"
            style={{ fontFamily: 'Poppins, sans-serif' }}
          >
            &copy; {new Date().getFullYear()} Vicommerce &ndash; Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
