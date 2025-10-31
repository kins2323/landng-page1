import { Target, Zap, Users, Rocket, TrendingUp, Award, ArrowRight } from 'lucide-react';

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
  return (
    <section className="py-24 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(33,92,154,0.05),transparent_50%),radial-gradient(circle_at_70%_80%,rgba(255,92,53,0.05),transparent_50%)]"></div>

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Your Roadmap to Success
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            A proven step-by-step path from complete beginner to landing your first client
          </p>
        </div>

        <div className="relative">
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-[#215c9a] via-[#ff5c35] to-[#215c9a] transform -translate-y-1/2 opacity-20"></div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {roadmapSteps.map((step, index) => (
              <div
                key={index}
                className="relative group"
              >
                <div className="absolute -inset-2 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500"></div>

                <div className="relative bg-white rounded-2xl p-8 shadow-xl border-2 border-gray-100 hover:border-[#ff5c35]/40 transition-all duration-300 hover:scale-105 hover:shadow-2xl h-full flex flex-col">
                  <div className="absolute -top-4 -left-4 w-12 h-12 rounded-full flex items-center justify-center font-bold text-white shadow-lg" style={{ backgroundColor: step.color }}>
                    {index + 1}
                  </div>

                  <div className="flex-shrink-0 rounded-xl p-4 mb-6 inline-flex self-start shadow-lg" style={{ backgroundColor: step.color }}>
                    <step.icon className="w-10 h-10 text-white" />
                  </div>

                  <h3 className="text-2xl font-bold text-slate-900 mb-3">{step.title}</h3>
                  <p className="text-gray-600 leading-relaxed flex-grow">{step.description}</p>

                  <div className="mt-6 flex items-center gap-2 font-semibold text-sm" style={{ color: step.color }}>
                    <span>Learn More</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>

                {index < roadmapSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-8 transform -translate-y-1/2 z-10">
                    <ArrowRight className="w-8 h-8" style={{ color: step.color, opacity: 0.3 }} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
