import { useEffect, useRef, useCallback } from 'react';
import logoAnimation from "@/assets/vicommerce-logo-animation.mp4";

// Helper to parse 'rgb(r, g, b)' or 'rgba(r, g, b, a)' string to {r, g, b}
const parseRgbColor = (colorString: string) => {
  if (!colorString) return null;
  const match = colorString.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*[\d.]+)?\)/);
  if (match) {
    return {
      r: parseInt(match[1], 10),
      g: parseInt(match[2], 10),
      b: parseInt(match[3], 10),
    };
  }
  return null;
};

const HeroSection = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const targetRef = useRef<HTMLButtonElement>(null);
  const mousePosRef = useRef({ x: null as number | null, y: null as number | null });
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const animationFrameIdRef = useRef<number | null>(null);

  const resolvedCanvasColorsRef = useRef({
    strokeStyle: { r: 128, g: 128, b: 128 }, // Default mid-gray
  });

  const scrollToForm = () => {
    document.getElementById('diagnostico')?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    const tempElement = document.createElement('div');
    tempElement.style.display = 'none';
    document.body.appendChild(tempElement);

    const updateResolvedColors = () => {
      tempElement.style.color = 'var(--foreground)';
      const computedFgColor = getComputedStyle(tempElement).color;
      const parsedFgColor = parseRgbColor(computedFgColor);
      if (parsedFgColor) {
        resolvedCanvasColorsRef.current.strokeStyle = parsedFgColor;
      } else {
        console.warn("HeroSection: Could not parse --foreground for canvas arrow. Using fallback.");
        const isDarkMode = document.documentElement.classList.contains('dark');
        resolvedCanvasColorsRef.current.strokeStyle = isDarkMode ? { r: 250, g: 250, b: 250 } : { r: 10, g: 10, b: 10 };
      }
    };
    updateResolvedColors();
    const observer = new MutationObserver((mutationsList) => {
      for (const mutation of mutationsList) {
        if (mutation.type === 'attributes' && mutation.attributeName === 'class' && mutation.target === document.documentElement) {
          updateResolvedColors();
          break;
        }
      }
    });
    observer.observe(document.documentElement, { attributes: true });
    return () => {
      observer.disconnect();
      if (tempElement.parentNode) {
        tempElement.parentNode.removeChild(tempElement);
      }
    };
  }, []);

  const drawArrow = useCallback(() => {
    if (!canvasRef.current || !targetRef.current || !ctxRef.current) return;

    const targetEl = targetRef.current;
    const ctx = ctxRef.current;
    const mouse = mousePosRef.current;

    const x0 = mouse.x;
    const y0 = mouse.y;

    if (x0 === null || y0 === null) return;

    const rect = targetEl.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;

    const a = Math.atan2(cy - y0, cx - x0);
    const x1 = cx - Math.cos(a) * (rect.width / 2 + 12);
    const y1 = cy - Math.sin(a) * (rect.height / 2 + 12);

    const midX = (x0 + x1) / 2;
    const midY = (y0 + y1) / 2;
    const offset = Math.min(200, Math.hypot(x1 - x0, y1 - y0) * 0.5);
    const t = Math.max(-1, Math.min(1, (y0 - y1) / 200));
    const controlX = midX;
    const controlY = midY + offset * t;
    
    const r = Math.sqrt((x1 - x0)**2 + (y1 - y0)**2);
    const opacity = Math.min(1.0, (r - Math.max(rect.width, rect.height) / 2) / 500);

    const arrowColor = resolvedCanvasColorsRef.current.strokeStyle;
    ctx.strokeStyle = `rgba(${arrowColor.r}, ${arrowColor.g}, ${arrowColor.b}, ${opacity})`;
    ctx.lineWidth = 2;

    // Draw curve
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(x0, y0);
    ctx.quadraticCurveTo(controlX, controlY, x1, y1);
    ctx.setLineDash([10, 5]);
    ctx.stroke();
    ctx.restore();

    // Draw arrowhead
    const angle = Math.atan2(y1 - controlY, x1 - controlX);
    const headLength = 10 * (ctx.lineWidth / 1.5);
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(
      x1 - headLength * Math.cos(angle - Math.PI / 6),
      y1 - headLength * Math.sin(angle - Math.PI / 6)
    );
    ctx.moveTo(x1, y1);
    ctx.lineTo(
      x1 - headLength * Math.cos(angle + Math.PI / 6),
      y1 - headLength * Math.sin(angle + Math.PI / 6)
    );
    ctx.stroke();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !targetRef.current) return;

    ctxRef.current = canvas.getContext("2d");
    const ctx = ctxRef.current;

    const updateCanvasSize = () => {
      if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      mousePosRef.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener("resize", updateCanvasSize);
    window.addEventListener("mousemove", handleMouseMove);
    updateCanvasSize();

    const animateLoop = () => {
      if (ctx && canvas) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawArrow();
      }
      animationFrameIdRef.current = requestAnimationFrame(animateLoop);
    };
    
    animateLoop();

    return () => {
      window.removeEventListener("resize", updateCanvasSize);
      window.removeEventListener("mousemove", handleMouseMove);
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }
    };
  }, [drawArrow]);

  return (
    <div className="bg-background text-foreground min-h-screen flex flex-col">
      <main className="flex-grow flex flex-col items-center justify-center">
        <div className="mt-12 sm:mt-16 lg:mt-24 flex flex-col items-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-medium text-center px-4 max-w-4xl">
            Transforme sua presença digital em{" "}
            <span className="text-primary">resultados reais</span>
          </h1>
          <p className="mt-6 block text-muted-foreground text-center text-base sm:text-lg px-4 max-w-2xl">
            A Vicommerce é uma agência de marketing de performance focada em aumentar o faturamento das empresas através de estratégias inteligentes, dados e conversão.
          </p>
        </div>

        <div className="mt-8 flex justify-center">
          <button
            ref={targetRef}
            onClick={scrollToForm}
            className="py-3 px-6 rounded-xl border-2 border-primary/60 hover:border-primary bg-primary/5 hover:bg-primary/10 text-foreground font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-ring"
          >
            Quero aumentar meu faturamento
          </button>
        </div>

        <div className="mt-12 lg:mt-16 w-full max-w-screen-md mx-auto overflow-hidden px-4 sm:px-2">
          <div className="bg-border rounded-[2rem] p-[0.25rem]">
            <div className="relative h-64 sm:h-72 md:h-80 lg:h-[28rem] rounded-[1.75rem] bg-card flex items-center justify-center overflow-hidden">
              <video
                src={logoAnimation}
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </main>
      <div className="h-12 sm:h-16 md:h-24"></div>
      <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-10"></canvas>
    </div>
  );
};

export default HeroSection;
