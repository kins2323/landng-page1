import { Check, Sparkles, Clock, AlertTriangle } from 'lucide-react';
import CountdownTimer from './CountdownTimer';
import { use6HourLoopCountdown, useCountdown } from '../hooks/useCountdown';

const pricingPlans = [
  {
    name: 'Starter Pack',
    originalPrice: '4,999',
    price: '2,999',
    description: 'Lead Generation 1.0 material - start your journey',
    modules: ['Lead Generation 1.0'],
    features: [
      '3 recorded video modules',
      'Lifetime video access',
      'Google Drive templates link',
      'Materials bought separately',
      'Newsletter support bought separately',
      'No community (even with separate payment)',
    ],
    cta: 'Get Started',
    popular: false,
    isFree: true,
  },
  {
    name: 'Pro Bundle',
    originalPrice: '29,999',
    price: '19,999',
    description: 'Master all 3 modules with full support & community',
    modules: ['Lead Generation', 'Email Marketing AI', 'Automations'],
    features: [
      'All 3 core modules with recorded videos',
      'Lifetime unlimited access to all content',
      'Google Drive templates included',
      'Weekly 1-on-1 support calls',
      'WhatsApp community & support',
      'Private community for accountability',
      'Post-module application coaching',
      '30-day money-back guarantee',
    ],
    cta: 'Get Pro Bundle',
    popular: true,
  },
  {
    name: 'Skill Builder',
    originalPrice: '8,999',
    price: '5,999',
    description: 'Choose 1 module - build one skill deep',
    modules: ['Choose Any 1 Module'],
    features: [
      'Choose 1 premium module',
      'Lifetime video access',
      'Module materials included',
      'Support purchased separately',
      'Templates purchased separately',
      'Community purchased separately',
      'Materials worksheets included',
    ],
    cta: 'Choose Module',
    popular: false,
  },
  {
    name: 'Elite Coaching',
    originalPrice: '249,999',
    price: '179,999',
    description: '3 days/week intensive coaching + everything included',
    modules: ['All 3 Modules + Intensive Coaching'],
    features: [
      'All 3 core modules included',
      'Lifetime video access',
      'Google Drive templates included',
      '3 days per week live coaching sessions',
      '2 weeks intensive bootcamp program',
      'Community access included',
      'Complete post-module accountability coaching',
      'Direct mentor access',
      'Personalized action plans',
      'Fast-track to first client guarantee',
      'Everything included - no hidden costs',
    ],
    cta: 'Apply for Elite',
    popular: false,
  },
];

export default function PricingSection() {
  const intakeCountdown = use6HourLoopCountdown();
  const freeOfferDeadline = new Date('2025-11-08T23:59:59');
  const freeOfferCountdown = useCountdown(freeOfferDeadline);

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(33,92,154,0.05),transparent_50%),radial-gradient(circle_at_70%_60%,rgba(255,92,53,0.05),transparent_50%)]"></div>

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="text-center mb-8">
          <CountdownTimer
            timeRemaining={intakeCountdown}
            label="Intake Closes In"
            variant="urgent"
          />
        </div>

        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Choose Your Learning Path
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Start with the fundamentals or go all-in with intensive coaching
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pricingPlans.map((plan, index) => (
            <div
              key={index}
              className={`relative bg-white rounded-2xl p-8 border-2 transition-all duration-300 hover:scale-105 hover:shadow-2xl ${
                plan.popular
                  ? 'border-[#ff5c35] shadow-xl shadow-[#ff5c35]/20 ring-2 ring-[#ff5c35]/20 md:col-span-2 lg:col-span-2 lg:row-span-2'
                  : 'border-gray-200 hover:border-[#215c9a]'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                  <div className="bg-gradient-to-r from-[#ff5c35] to-[#ff7a5c] text-white px-6 py-2 rounded-full text-sm font-bold flex items-center gap-2 shadow-lg">
                    <Sparkles className="w-4 h-4" />
                    BEST VALUE
                  </div>
                </div>
              )}

              {plan.isFree && !freeOfferCountdown.isExpired && (
                <div className="mb-4 bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-400 rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className="w-4 h-4 text-amber-600" />
                    <span className="text-xs font-bold text-amber-900 uppercase">Limited Time</span>
                  </div>
                  <div className="text-xs text-amber-800 font-semibold">
                    Offer expires Nov 8, 2025
                  </div>
                  <div className="flex items-center gap-1 mt-2 text-xs">
                    <Clock className="w-3 h-3 text-amber-700" />
                    <span className="font-mono text-amber-900">
                      {Math.floor(freeOfferCountdown.hours / 24)}d {freeOfferCountdown.hours % 24}h {freeOfferCountdown.minutes}m
                    </span>
                  </div>
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-2xl font-bold text-slate-900 mb-2">{plan.name}</h3>
                <p className="text-gray-600 text-sm mb-3 leading-relaxed">{plan.description}</p>

                {plan.modules && (
                  <div className="mb-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <p className="text-xs font-bold text-blue-900 uppercase mb-2">Modules Included:</p>
                    <ul className="space-y-1">
                      {plan.modules.map((module, idx) => (
                        <li key={idx} className="text-sm text-blue-800 font-medium">• {module}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {plan.originalPrice !== plan.price && (
                  <div className="mb-2">
                    <span className="text-lg text-gray-400 line-through">KSH {plan.originalPrice}</span>
                  </div>
                )}

                <div className="flex items-baseline gap-2">
                  <span className="text-5xl font-bold text-slate-900">
                    {plan.price === '0' ? 'FREE' : `KSH ${plan.price}`}
                  </span>
                  {plan.originalPrice !== plan.price && plan.price !== '0' && (
                    <span className="text-sm font-semibold text-green-600 bg-green-50 px-2 py-1 rounded-full">
                      Save KSH {(parseInt(plan.originalPrice.replace(',', '')) - parseInt(plan.price.replace(',', ''))).toLocaleString()}
                    </span>
                  )}
                </div>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start gap-3">
                    <Check className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#ff5c35' }} />
                    <span className="text-gray-700 text-sm leading-relaxed">{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                className={`w-full py-4 rounded-xl font-bold text-base transition-all duration-300 transform hover:scale-105 ${
                  plan.popular
                    ? 'bg-gradient-to-r from-[#ff5c35] to-[#ff7a5c] text-white shadow-lg hover:shadow-xl hover:shadow-[#ff5c35]/50'
                    : 'bg-gradient-to-r from-[#215c9a] to-[#2a6cb5] text-white shadow-md hover:shadow-lg hover:shadow-[#215c9a]/50'
                }`}
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>

        <div className="text-center mt-16 space-y-4">
          <div className="inline-flex items-center gap-3 bg-green-50 border-2 border-green-200 rounded-full px-6 py-3">
            <Check className="w-5 h-5 text-green-600" />
            <span className="text-green-900 font-semibold">
              30-Day Money-Back Guarantee on All Paid Plans
            </span>
          </div>
          <p className="text-gray-500 text-sm">
            Secure payment • Instant access • Join 1000+ freelancers transforming their careers
          </p>
        </div>
      </div>
    </section>
  );
}
