interface Logo {
  name: string;
  url: string;
}

interface LogoCarouselProps {
  logos: Logo[];
  title: string;
  direction?: "left" | "right";
  duration?: number;
}

export default function LogoCarousel({ logos, title, direction = "left", duration = 30 }: LogoCarouselProps) {
  // Ensure exactly 6 distinct logos per slider, then duplicate for seamless loop
  const baseLogos = logos.slice(0, 6);
  const displayLogos = [...baseLogos, ...baseLogos];

  return (
    <div className="space-y-3">
      <div className="flex justify-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full border border-primary/20">
          <span className="w-2 h-2 bg-primary rounded-full"></span>
          <h3 className="text-sm font-semibold text-primary">
            {title}
          </h3>
        </div>
      </div>

      <div className="relative overflow-hidden bg-white rounded-xl border border-secondary/10 py-6 px-4 sm:px-12">
        <div
          className="flex gap-4 sm:gap-12"
          style={{
            animation: `scrollPingPong ${duration}s linear infinite`,
            animationDirection: direction === "left" ? "alternate" : "alternate-reverse",
            willChange: "transform",
          }}
        >
          {displayLogos.map((logo, index) => (
            <div key={`${logo.name}-${index}`} className="flex-shrink-0 w-24 sm:w-40 h-16 flex items-center justify-center">
              <img
                src={logo.url}
                alt={logo.name}
                className="max-h-10 sm:max-h-12 md:max-h-14 w-auto object-contain transition-all duration-500"
              />
            </div>
          ))}
        </div>

        {/* Removed side gradient masks to make all logos fully visible as they pass center */}
      </div>

      <style>{`
        @keyframes scrollPingPong {
          0% { transform: translate3d(0,0,0); }
          100% { transform: translate3d(-50%,0,0); }
        }
      `}</style>
    </div>
  );
}
