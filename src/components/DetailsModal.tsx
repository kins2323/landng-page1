import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface DetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  image: string;
  details: string;
  onBookMeeting: () => void;
}

export default function DetailsModal({
  isOpen,
  onClose,
  title,
  image,
  details,
  onBookMeeting,
}: DetailsModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent 
        className="max-w-5xl max-h-[90vh] overflow-y-auto p-8 sm:p-10"
        onContextMenu={(e) => e.preventDefault()}
        style={{ userSelect: 'none', WebkitUserSelect: 'none' }}
      >
        <DialogHeader className="mb-8">
          <DialogTitle className="text-4xl sm:text-5xl font-black leading-tight">{title}</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-8 sm:gap-10">
          {/* Section 1: Visual Overview */}
          <section className="w-full">
            <h2 className="text-2xl sm:text-3xl font-bold text-secondary mb-4 sm:mb-6">Visual Overview</h2>
            <div 
              className="w-full h-72 sm:h-96 md:h-[500px] rounded-2xl overflow-hidden bg-gradient-to-br from-primary/10 to-accent/10 relative shadow-xl"
              onContextMenu={(e) => e.preventDefault()}
              onDragStart={(e) => e.preventDefault()}
              style={{ userSelect: 'none', WebkitUserSelect: 'none' }}
            >
              <img
                src={image}
                alt={title}
                className="w-full h-full object-cover pointer-events-none select-none"
                draggable="false"
                onContextMenu={(e) => e.preventDefault()}
                onDragStart={(e) => e.preventDefault()}
                style={{ userSelect: 'none', WebkitUserSelect: 'none', pointerEvents: 'none' }}
              />
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
          </section>

          {/* Section 2: Service Overview */}
          <section className="space-y-6 sm:space-y-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-secondary">Service Overview</h2>
            <div 
              className="prose prose-lg sm:prose-xl max-w-none text-muted-foreground leading-relaxed"
              style={{ 
                userSelect: 'none',
                WebkitUserSelect: 'none',
                pointerEvents: 'none'
              }}
            >
              <div className="space-y-5 text-base sm:text-lg leading-8">
                {details.split(/\.(?=\s+[A-Z])/).map((sentence, index) => {
                  const trimmed = sentence.trim();
                  if (!trimmed) return null;
                  return (
                    <p key={index} className="mb-5 last:mb-0">
                      {trimmed}
                      {!trimmed.endsWith('.') && '.'}
                    </p>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Section 3: What You'll Get */}
          <section>
            <h2 className="text-2xl sm:text-3xl font-bold text-secondary mb-6 sm:mb-8">What You'll Get</h2>
            <div className="bg-accent/10 border border-accent/20 rounded-xl p-6 sm:p-8 space-y-4 shadow-sm">
              <ul className="space-y-3 text-base sm:text-lg">
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full bg-accent mt-2 flex-shrink-0"></span>
                  <span className="text-muted-foreground">Custom strategy tailored to your business</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full bg-accent mt-2 flex-shrink-0"></span>
                  <span className="text-muted-foreground">Implementation roadmap</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full bg-accent mt-2 flex-shrink-0"></span>
                  <span className="text-muted-foreground">Quick wins to start immediately</span>
                </li>
              </ul>
            </div>
          </section>

          {/* Section 4: Call to Action */}
          <section className="pt-4 sm:pt-6 border-t border-secondary/10">
            <h2 className="text-2xl sm:text-3xl font-bold text-secondary mb-6 sm:mb-8">Ready to Get Started?</h2>
            <Button
              size="lg"
              onClick={() => {
                onBookMeeting();
                onClose();
              }}
              className="w-full py-6 text-lg sm:text-xl font-semibold bg-gradient-to-r from-primary to-accent hover:shadow-xl transition-all"
            >
              Book a Meeting
            </Button>
          </section>
        </div>
      </DialogContent>
    </Dialog>
  );
}
