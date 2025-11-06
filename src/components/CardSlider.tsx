import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";

interface Card {
  id: string;
  title: string;
  description: string;
  image: string;
  details: string;
}

interface CardSliderProps {
  cards: Card[];
  onCardClick: (card: Card) => void;
  direction?: "left" | "right";
  auto?: boolean;
  speedPxPerSecond?: number; // animation speed
}

export default function CardSlider({ cards, onCardClick, auto = true, speedPxPerSecond = 40 }: CardSliderProps) {
  const [isPaused, setIsPaused] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const animationRef = useRef<number | null>(null);
  const lastTsRef = useRef<number | null>(null);
  const pauseTimeoutRef = useRef<number | null>(null);

  const scrollByAmount = (direction: "next" | "prev") => {
    const container = containerRef.current;
    if (!container) return;
    const delta = container.clientWidth * 0.9 * (direction === "next" ? 1 : -1);

    // Temporarily pause auto-ticker so manual scroll isn't immediately overridden
    setIsPaused(true);
    if (pauseTimeoutRef.current) {
      window.clearTimeout(pauseTimeoutRef.current);
      pauseTimeoutRef.current = null;
    }

    container.scrollBy({ left: delta, behavior: "smooth" });

    pauseTimeoutRef.current = window.setTimeout(() => {
      setIsPaused(false);
    }, 700);
  };

  // Auto-scroll ticker with seamless loop via duplicated content
  useEffect(() => {
    if (!auto) return;
    const container = containerRef.current;
    if (!container) return;

    const step = (ts: number) => {
      if (isPaused) {
        lastTsRef.current = ts;
      } else {
        const last = lastTsRef.current ?? ts;
        const dt = Math.min(64, ts - last); // clamp to avoid jumps on tab refocus
        const dx = (speedPxPerSecond * dt) / 1000;
        container.scrollLeft += dx;
        const half = container.scrollWidth / 2; // because content is duplicated once
        if (container.scrollLeft >= half) {
          container.scrollLeft -= half;
        }
        lastTsRef.current = ts;
      }
      animationRef.current = requestAnimationFrame(step);
    };

    animationRef.current = requestAnimationFrame(step);
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
      lastTsRef.current = null;
      if (pauseTimeoutRef.current) {
        window.clearTimeout(pauseTimeoutRef.current);
        pauseTimeoutRef.current = null;
      }
    };
  }, [auto, isPaused, speedPxPerSecond]);

  return (
    <div className="space-y-6">
      <div className="relative">
        <div
          ref={containerRef}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          className="flex gap-6 px-4 overflow-x-auto overflow-y-hidden snap-x snap-mandatory scroll-px-4 [-ms-overflow-style:none] [scrollbar-width:none]"
          style={{ WebkitOverflowScrolling: "touch" }}
        >
          {/* hide scrollbar but keep scrollable */}
          {/* @ts-ignore */}
          <style>{`.no-scrollbar::-webkit-scrollbar{display:none}`}</style>
          {[...cards, ...cards].map((card, idx) => (
            <div
              key={`${card.id}-${idx}`}
              className="flex-shrink-0 w-[260px] sm:w-80 md:w-96 cursor-pointer group snap-start"
              onClick={() => onCardClick(card)}
            >
              <div
                className="relative bg-white rounded-2xl overflow-hidden transition-all duration-500 hover:shadow-2xl"
                style={{ boxShadow: "0 20px 60px rgba(0,0,0,0.15)" }}
              >
                <div 
                  className="w-full h-56 sm:h-60 md:h-64 bg-gradient-to-br from-primary/10 to-accent/10 overflow-hidden relative"
                  onContextMenu={(e) => e.preventDefault()}
                  onDragStart={(e) => e.preventDefault()}
                  style={{ userSelect: 'none', WebkitUserSelect: 'none' }}
                >
                  <img
                    src={card.image}
                    alt={card.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 pointer-events-none select-none"
                    draggable="false"
                    onContextMenu={(e) => e.preventDefault()}
                    onDragStart={(e) => e.preventDefault()}
                    style={{ userSelect: 'none', WebkitUserSelect: 'none', pointerEvents: 'none' }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                  {/* B.K initials watermark */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none" style={{ userSelect: 'none', WebkitUserSelect: 'none', MozUserSelect: 'none', msUserSelect: 'none' }}>
                    <span 
                      className="text-black text-xs sm:text-sm md:text-base font-black opacity-50 select-none"
                      style={{ 
                        userSelect: 'none', 
                        WebkitUserSelect: 'none', 
                        MozUserSelect: 'none', 
                        msUserSelect: 'none',
                        pointerEvents: 'none',
                        textShadow: '0 0 0 rgba(0,0,0,0)',
                        mixBlendMode: 'multiply'
                      }}
                      onContextMenu={(e) => e.preventDefault()}
                      onDragStart={(e) => e.preventDefault()}
                    >
                      B.K
                    </span>
                  </div>
                </div>

                <div className="p-5 sm:p-6">
                  <h3 className="text-xl sm:text-2xl font-bold text-secondary mb-2">
                    {card.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                    {card.description}
                  </p>
                  <div className="flex justify-center">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        onCardClick(card);
                      }}
                      className="group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all"
                    >
                      More Details
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-background to-transparent"></div>
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-background to-transparent"></div>

        {/* Controls */}
        <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between px-2 sm:px-4 pointer-events-none">
          <Button
            variant="outline"
            size="icon"
            aria-label="Previous"
            onClick={() => scrollByAmount("prev")}
            className="shadow bg-white/80 backdrop-blur border-secondary/20 hover:bg-white hidden sm:inline-flex pointer-events-auto"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </Button>
          <Button
            variant="outline"
            size="icon"
            aria-label="Next"
            onClick={() => scrollByAmount("next")}
            className="shadow bg-white/80 backdrop-blur border-secondary/20 hover:bg-white hidden sm:inline-flex pointer-events-auto"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </Button>
        </div>
      </div>
    </div>
  );
}
