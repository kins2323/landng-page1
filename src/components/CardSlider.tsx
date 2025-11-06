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
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const animationRef = useRef<number | null>(null);
  const lastTsRef = useRef<number | null>(null);
  const pauseTimeoutRef = useRef<number | null>(null);

  // Check if mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640); // sm breakpoint
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const scrollByAmount = (direction: "next" | "prev") => {
    const container = containerRef.current;
    if (!container) return;
    
    // For mobile, scroll by one card width
    const cardWidth = isMobile ? 260 : container.clientWidth * 0.9;
    const delta = cardWidth * (direction === "next" ? 1 : -1);

    // Temporarily pause auto-ticker so manual scroll isn't immediately overridden
    setIsPaused(true);
    if (pauseTimeoutRef.current) {
      window.clearTimeout(pauseTimeoutRef.current);
      pauseTimeoutRef.current = null;
    }

    // Use scrollTo for better compatibility in production
    const targetScroll = container.scrollLeft + delta;
    container.scrollTo({ left: targetScroll, behavior: "smooth" });

    pauseTimeoutRef.current = window.setTimeout(() => {
      setIsPaused(false);
    }, 1000);
  };

  // Auto-scroll ticker with seamless loop via duplicated content
  // Disable auto-scroll on mobile to prevent glitching
  useEffect(() => {
    if (!auto || isMobile) return;
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
  }, [auto, isPaused, speedPxPerSecond, isMobile]);

  return (
    <div className="space-y-6">
      <div className="relative">
        <div
          ref={containerRef}
          onMouseEnter={() => !isMobile && setIsPaused(true)}
          onMouseLeave={() => !isMobile && setIsPaused(false)}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => {
            if (!isMobile) setIsPaused(false);
          }}
          className="flex gap-6 px-4 overflow-x-auto overflow-y-hidden snap-x snap-mandatory scroll-px-4 [-ms-overflow-style:none] [scrollbar-width:none]"
          style={{ 
            WebkitOverflowScrolling: "touch",
            scrollBehavior: "smooth"
          }}
        >
          {/* hide scrollbar but keep scrollable */}
          <style>{`
            .no-scrollbar::-webkit-scrollbar {
              display: none;
            }
            .no-scrollbar {
              -ms-overflow-style: none;
              scrollbar-width: none;
            }
          `}</style>
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
                      className="text-black text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black opacity-50 select-none"
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
      </div>

      {/* Navigation Arrows - Below the slider */}
      <div className="flex items-center justify-center gap-4">
        <Button
          variant="outline"
          size="lg"
          aria-label="Previous"
          data-slider-button="prev"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            scrollByAmount("prev");
          }}
          className="shadow-lg bg-white border-secondary/20 hover:bg-secondary/5 hover:border-secondary transition-all w-12 h-12 rounded-full"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </Button>
        <Button
          variant="outline"
          size="lg"
          aria-label="Next"
          data-slider-button="next"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            scrollByAmount("next");
          }}
          className="shadow-lg bg-white border-secondary/20 hover:bg-secondary/5 hover:border-secondary transition-all w-12 h-12 rounded-full"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </Button>
      </div>
    </div>
  );
}
