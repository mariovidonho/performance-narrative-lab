import { Instagram, Linkedin, MessageCircle } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-primary text-white py-12">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          
          <div className="space-y-4">
            <h3 className="text-2xl font-bold">
              Vicommerce
            </h3>
            <p className="text-white opacity-80">
              Marketing de performance para negócios que querem crescer.
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold text-lg">
              Links
            </h4>
            <ul className="space-y-2 text-white opacity-80">
              <li>
                <a href="/politica-privacidade" className="hover:text-white transition-colors">
                  Política de Privacidade
                </a>
              </li>
              <li>
                <a href="/termos-uso" className="hover:text-white transition-colors">
                  Termos de Uso
                </a>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold text-lg">
              Redes Sociais
            </h4>
            <div className="flex gap-4">
              
              
                href="https://www.instagram.com/vicommerce_mkt/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white bg-opacity-10 hover:bg-opacity-20 flex items-center justify-center transition-all duration-300"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>

              
                href="#"
                className="w-10 h-10 rounded-full bg-white bg-opacity-10 hover:bg-opacity-20 flex items-center justify-center transition-all duration-300"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>

              
                href="https://wa.me/5591992686313"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white bg-opacity-10 hover:bg-opacity-20 flex items-center justify-center transition-all duration-300"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-5 h-5" />
              </a>

            </div>
          </div>

        </div>

        <div className="border-t border-white border-opacity-20 pt-8 text-center text-white opacity-60">
          <p>
            © 2025 Vicommerce - Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
