import { Target, Zap, Users, Rocket, TrendingUp, Award } from 'lucide-react';

const roadmapSteps = [
  {
    icon: Target,
    title: 'Foundation',
    description: 'Master the fundamentals so you start with strong fundamentals for a long-term career.',
    color: '#215c9a',
  },
  {
    icon: Zap,
    title: 'Skill Building',
    description: 'Develop practical, billable skills with project-based learning.',
    color: '#ff5c35',
  },
  {
    icon: Users,
    title: 'Client Outreach',
    description: 'Build a reliable pipeline: proposals, outreach, and qualification.',
    color: '#215c9a',
  },
  {
    icon: Rocket,
    title: 'First Client',
    description: 'Follow a proven framework to win your initial paying client and get feedback.',
    color: '#ff5c35',
  },
  {
    icon: TrendingUp,
    title: 'Scale & Grow',
    description: 'Create repeatable systems for pricing, delivery, and expansion.',
    color: '#215c9a',
  },
  {
    icon: Award,
    title: 'Mastery',
    description: 'Become a recognized expert in your field and command premium rates.',
    color: '#ff5c35',
  },
];

export default function RoadmapSection() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-semibold text-slate-900 mb-2">Roadmap</h2>
          <p className="text-md text-gray-600 max-w-2xl mx-auto">
            A clear and practical path to take you from starting out to professional-level outcomes.
          </p>
        </div>

        {/* Timeline container */}
          <div className="relative">
          {/* Vertical line for desktop */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-[2px] bg-gray-200"></div>

          <div className="space-y-6">
            {roadmapSteps.map((step, index) => {
              const Icon = step.icon;
              const isLeft = index % 2 === 0;
              return (
                <div className="grid grid-cols-12 items-start gap-4" key={index}>
                  {/* Desktop: alternate sides; Mobile: full width */}
                  <div className={`${isLeft ? 'col-span-5' : 'col-span-7 col-start-1'} hidden md:block`}>
                    {isLeft && (
                      <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
                        <div className="flex items-start gap-4">
                          <div className="flex-shrink-0">
                              <div className="w-10 h-10 flex items-center justify-center rounded-full text-white" style={{ backgroundColor: step.color }}>
                                <Icon className="w-5 h-5" />
                            </div>
                          </div>
                          <div>
                            <h3 className="text-base font-semibold text-slate-900">{step.title}</h3>
                            <p className="text-gray-600 mt-2">{step.description}</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Marker */}
                  <div className="col-span-2 flex justify-center md:relative">
                    <div className="relative z-10 flex flex-col items-center">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold" style={{ backgroundColor: step.color }}>
                        {index + 1}
                      </div>
                      {/* Line connector for mobile */}
                      <div className="md:hidden h-6 w-[2px] bg-gray-200 mt-2"></div>
                    </div>
                  </div>

                  <div className={`${isLeft ? 'col-span-5 col-start-7' : 'col-span-5'} hidden md:block`}>
                    {!isLeft && (
                      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
                        <div className="flex items-start gap-4">
                          <div className="flex-shrink-0">
                            <div className="w-12 h-12 flex items-center justify-center rounded-full text-white" style={{ backgroundColor: step.color }}>
                              <Icon className="w-6 h-6" />
                            </div>
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold text-slate-900">{step.title}</h3>
                            <p className="text-gray-600 mt-2">{step.description}</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Mobile stacked item */}
                      <div className="col-span-12 md:hidden">
                        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100 flex items-start gap-3">
                      <div className="flex-shrink-0">
                          <div className="w-8 h-8 flex items-center justify-center rounded-full text-white font-semibold" style={{ backgroundColor: step.color }}>
                            <Icon className="w-4 h-4" />
                        </div>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-slate-900">{step.title}</h3>
                        <p className="text-gray-600 mt-1 text-sm">{step.description}</p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
