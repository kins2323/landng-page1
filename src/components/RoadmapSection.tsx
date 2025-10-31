import { Target, Zap, Users, Rocket, TrendingUp, Award, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';

const roadmapSteps = [
  {
    icon: Target,
    title: 'Foundation',
    description: 'Master the fundamentals of freelancing, positioning, and niche selection',
    color: '#215c9a',
  },
  {
    icon: Zap,
    title: 'Skill Building',
    description: 'Develop in-demand skills that clients actually pay for',
    color: '#ff5c35',
  },
  {
    icon: Users,
    title: 'Client Outreach',
    description: 'Learn proven strategies to find and approach potential clients',
    color: '#215c9a',
  },
  {
    icon: Rocket,
    title: 'First Client',
    description: 'Land your first paying client with our proven framework',
    color: '#ff5c35',
  },
  {
    icon: TrendingUp,
    title: 'Scale & Grow',
    description: 'Build systems to scale your income and client base',
    color: '#215c9a',
  },
  {
    icon: Award,
    title: 'Mastery',
    description: 'Become a sought-after expert in your field',
    color: '#ff5c35',
  },
];

export default function RoadmapSection() {
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    setCurrentStep((prev) => (prev + 1) % roadmapSteps.length);
  };

  const handlePrev = () => {
    setCurrentStep((prev) => (prev - 1 + roadmapSteps.length) % roadmapSteps.length);
  };

  const step = roadmapSteps[currentStep];

  return (
    <section className="py-24 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(33,92,154,0.05),transparent_50%),radial-gradient(circle_at_70%_80%,rgba(255,92,53,0.05),transparent_50%)]"></div>

      <div className="relative max-w-5xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Your Roadmap to Success
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            A proven step-by-step path from complete beginner to landing your first client
          </p>
        </div>

        <div className="relative">
          <div className="flex items-center justify-between gap-8">
            <button
              onClick={handlePrev}
              className="flex-shrink-0 p-3 rounded-full border-2 transition-all duration-300 hover:scale-110"
              style={{ borderColor: '#215c9a', color: '#215c9a' }}
              aria-label="Previous step"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <div className="flex-1 bg-white rounded-3xl p-12 shadow-2xl border-2 border-gray-100 hover:border-[#ff5c35]/30 transition-all duration-300">
              <div className="flex items-start gap-8">
                <div className="flex-shrink-0 rounded-2xl p-5 shadow-lg" style={{ backgroundColor: step.color }}>
                  <step.icon className="w-14 h-14 text-white" />
                </div>
                <div className="flex-1">
                  <div className="text-xs font-bold mb-3 tracking-widest" style={{ color: step.color }}>
                    STEP {currentStep + 1} OF {roadmapSteps.length}
                  </div>
                  <h3 className="text-5xl font-extrabold text-slate-900 mb-5">{step.title}</h3>
                  <p className="text-xl text-gray-600 leading-relaxed">{step.description}</p>
                </div>
              </div>
            </div>

            <button
              onClick={handleNext}
              className="flex-shrink-0 p-3 rounded-full border-2 transition-all duration-300 hover:scale-110"
              style={{ borderColor: '#ff5c35', backgroundColor: '#ff5c35', color: 'white' }}
              aria-label="Next step"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          <div className="flex justify-center gap-3 mt-10">
            {roadmapSteps.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentStep(index)}
                className="rounded-full transition-all duration-300 hover:scale-125"
                style={{
                  width: index === currentStep ? '32px' : '12px',
                  height: '12px',
                  backgroundColor: index === currentStep ? '#ff5c35' : '#d1d5db',
                }}
                aria-label={`Go to step ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
