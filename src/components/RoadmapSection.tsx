import { Target, Zap, Users, Rocket, TrendingUp, Award } from 'lucide-react';

const roadmapSteps = [
  {
    icon: Target,
    title: 'Foundation',
    description: 'Master the fundamentals of freelancing, positioning, and niche selection',
    color: '#215c9a',
    position: { x: 0, y: 0 },
  },
  {
    icon: Zap,
    title: 'Skill Building',
    description: 'Develop in-demand skills that clients actually pay for',
    color: '#ff5c35',
    position: { x: 20, y: 15 },
  },
  {
    icon: Users,
    title: 'Client Outreach',
    description: 'Learn proven strategies to find and approach potential clients',
    color: '#215c9a',
    position: { x: 40, y: 5 },
  },
  {
    icon: Rocket,
    title: 'First Client',
    description: 'Land your first paying client with our proven framework',
    color: '#ff5c35',
    position: { x: 60, y: 20 },
  },
  {
    icon: TrendingUp,
    title: 'Scale & Grow',
    description: 'Build systems to scale your income and client base',
    color: '#215c9a',
    position: { x: 80, y: 10 },
  },
  {
    icon: Award,
    title: 'Mastery',
    description: 'Become a sought-after expert in your field',
    color: '#ff5c35',
    position: { x: 100, y: 0 },
  },
];

export default function RoadmapSection() {
  // Generate SVG path for meandering road
  const pathPoints = roadmapSteps.map((step, index) => {
    const x = (step.position.x / 100) * 100;
    const y = 50 + (step.position.y / 30) * 20; // Center around 50% with variations
    return `${x},${y}`;
  });

  // Create smooth meandering path using quadratic curves
  const createMeanderPath = () => {
    const points = roadmapSteps.map((step, index) => {
      const x = (step.position.x / 100) * 100;
      const y = 50 + (step.position.y / 30) * 20;
      return { x, y };
    });

    let path = `M ${points[0].x},${points[0].y}`;
    
    for (let i = 1; i < points.length; i++) {
      const prev = points[i - 1];
      const curr = points[i];
      const controlX = (prev.x + curr.x) / 2;
      const controlY = prev.y + (curr.y - prev.y) / 2 + (i % 2 === 0 ? 10 : -10);
      path += ` Q ${controlX},${controlY} ${curr.x},${curr.y}`;
    }
    
    return path;
  };

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

        <div className="relative hidden md:block">
          {/* SVG Road Path with Meanders */}
          <div className="relative w-full" style={{ height: '700px', minHeight: '700px' }}>
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <defs>
                <linearGradient id="roadGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#215c9a" />
                  <stop offset="50%" stopColor="#ff5c35" />
                  <stop offset="100%" stopColor="#215c9a" />
                </linearGradient>
                {/* Road shadow/depth */}
                <filter id="roadShadow">
                  <feGaussianBlur in="SourceAlpha" stdDeviation="1.5"/>
                  <feOffset dx="0" dy="2" result="offsetblur"/>
                  <feComponentTransfer>
                    <feFuncA type="linear" slope="0.4"/>
                  </feComponentTransfer>
                  <feMerge>
                    <feMergeNode/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
                {/* Wider road path */}
                <path id="roadPath" d={createMeanderPath()} fill="none" />
              </defs>
              
              {/* Road base (wider for realistic look) */}
              <use 
                href="#roadPath"
                stroke="url(#roadGradient)"
                strokeWidth="1.5"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity="0.5"
                filter="url(#roadShadow)"
              />
              
              {/* Road center line (dashed) */}
              <use
                href="#roadPath"
                stroke="#fff"
                strokeWidth="0.15"
                fill="none"
                strokeDasharray="1,1"
                opacity="0.8"
              />
              
              {/* Road edge lines */}
              <use
                href="#roadPath"
                stroke="url(#roadGradient)"
                strokeWidth="0.1"
                fill="none"
                opacity="0.6"
              />
            </svg>

            {/* Road Nodes/Cards positioned along the path */}
            {roadmapSteps.map((step, index) => {
              const x = (step.position.x / 100) * 100;
              const y = 50 + (step.position.y / 30) * 20;
              
              return (
                <div
                  key={index}
                  className="absolute group"
                  style={{
                    left: `${x}%`,
                    top: `${y}%`,
                    transform: 'translate(-50%, -50%)',
                  }}
                >
                  {/* Connection line to road */}
                  <div 
                    className="absolute w-1 bg-gradient-to-t"
                    style={{
                      height: '50px',
                      bottom: '-25px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      background: `linear-gradient(to top, ${step.color}60, transparent)`,
                      borderRadius: '2px',
                    }}
                  />
                  
                  {/* Node Card */}
                  <div className="relative bg-white rounded-2xl p-6 shadow-2xl border-2 border-gray-100 hover:border-[#ff5c35]/40 transition-all duration-300 hover:scale-110 hover:shadow-3xl w-64 group">
                    {/* Step number badge */}
                    <div 
                      className="absolute -top-4 -left-4 w-12 h-12 rounded-full flex items-center justify-center font-bold text-white shadow-lg z-10"
                      style={{ backgroundColor: step.color }}
                    >
                      {index + 1}
                    </div>

                    {/* Icon */}
                    <div 
                      className="rounded-xl p-4 mb-4 inline-flex self-start shadow-lg"
                      style={{ backgroundColor: step.color }}
                    >
                      <step.icon className="w-8 h-8 text-white" />
                    </div>

                    <h3 className="text-xl font-bold text-slate-900 mb-2">{step.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{step.description}</p>

                    {/* Road marker pin */}
                    <div 
                      className="absolute -bottom-7 left-1/2 transform -translate-x-1/2 w-5 h-5 rounded-full border-2 border-white shadow-xl z-20"
                      style={{ 
                        backgroundColor: step.color,
                        borderWidth: '3px',
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Mobile View - Stacked Cards */}
        <div className="md:hidden space-y-6">
          {roadmapSteps.map((step, index) => (
            <div key={index} className="relative group">
              <div className="relative bg-white rounded-2xl p-6 shadow-xl border-2 border-gray-100 hover:border-[#ff5c35]/40 transition-all duration-300">
                <div 
                  className="absolute -top-4 -left-4 w-12 h-12 rounded-full flex items-center justify-center font-bold text-white shadow-lg"
                  style={{ backgroundColor: step.color }}
                >
                  {index + 1}
                </div>

                <div 
                  className="rounded-xl p-4 mb-4 inline-flex self-start shadow-lg"
                  style={{ backgroundColor: step.color }}
                >
                  <step.icon className="w-10 h-10 text-white" />
                </div>

                <h3 className="text-2xl font-bold text-slate-900 mb-3">{step.title}</h3>
                <p className="text-gray-600 leading-relaxed">{step.description}</p>
              </div>

              {index < roadmapSteps.length - 1 && (
                <div className="flex justify-center my-4">
                  <div 
                    className="w-1 h-8 rounded-full"
                    style={{ backgroundColor: step.color, opacity: 0.3 }}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
