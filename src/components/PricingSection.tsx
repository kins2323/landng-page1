import { Check, Sparkles, Clock, AlertTriangle } from 'lucide-react';
import CountdownTimer from './CountdownTimer';
import { use6HourLoopCountdown, useCountdown } from '../hooks/useCountdown';

const pricingPlans = [
  {
    name: 'Elite Coaching',
    originalPrice: '18,000',
    price: '12,999',
    description: '10 in 1 coaching, week is 2 week coaching',
    features: [
      'Everything in Produle',
      '10 in 1 coaching package',
      '2 weeks of intensive coaching',
      'Personalized success strategy',
      'Direct mentor access',
      'Complete portfolio review',
      'Pitch practice sessions',
    ],
    cta: 'Apply for Coaching',
    popular: false,
  },
  {
    name: 'Produle',
    originalPrice: '3,500',
    price: '2,499',
    description: 'Access to community, templates are given and support is once a week on random days',
    features: [
      'All core courses included',
      'Lifetime unlimited access',
      'Community access',
      'Templates included',
      'Support once a week (random days)',
      'Premium resources library',
    ],
    cta: 'Get Produle',
    popular: true,
  },
  {
    name: 'Skill Builder',
    originalPrice: '2,500',
    price: '999',
    description: 'Has the singular modules, no community support, paid templates are individually bought',
    features: [
      'Choose 1 premium course module',
      'Lifetime access to content',
      'Course materials & worksheets',
      'Paid templates bought individually',
      'Email support',
      'No community access',
    ],
    cta: 'Start Learning',
    popular: false,
  },
  {
    name: 'Starter Pack',
    originalPrice: '2,000',
    price: '100',
    description: 'This pack has a temporary KSH 100 since some people are reselling it we have added it to escape it but it will be scrapped by 8th November',
    features: [
      'Access to community',
      'Weekly newsletters',
      'Free resources library',
      'Basic email support',
    ],
    cta: 'Get Started',
    popular: false,
    isFree: true,
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
            Transform Your Future Today
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Investment options designed to match your ambition and commitment
          </p>
        </div>

        {/* Top 3 pricing cards - highest to lowest */}
        <div className="grid md:grid-cols-3 gap-6 mb-6">
          {pricingPlans.slice(0, 3).map((plan, index) => (
            <div
              key={index}
              className={`relative bg-white rounded-2xl p-6 border-2 transition-all duration-300 hover:scale-105 hover:shadow-2xl ${
                plan.popular
                  ? 'border-[#ff5c35] shadow-xl shadow-[#ff5c35]/20 ring-2 ring-[#ff5c35]/20'
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
                <div className="mb-4 bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-400 rounded-lg p-2">
                  <div className="flex items-center gap-2 mb-1">
                    <AlertTriangle className="w-3 h-3 text-amber-600" />
                    <span className="text-xs font-bold text-amber-900 uppercase">Limited Time</span>
                  </div>
                  <div className="text-xs text-amber-800 font-semibold mb-1">
                    Scrapped by Nov 8, 2025
                  </div>
                  <div className="flex items-center gap-1 text-xs">
                    <Clock className="w-3 h-3 text-amber-700" />
                    <span className="font-mono text-amber-900">
                      {Math.floor(freeOfferCountdown.hours / 24)}d {freeOfferCountdown.hours % 24}h {freeOfferCountdown.minutes}m
                    </span>
                  </div>
                </div>
              )}

              <div className="mb-4">
                <h3 className="text-xl font-bold text-slate-900 mb-2">{plan.name}</h3>
                <p className="text-gray-600 text-xs mb-3 leading-relaxed">{plan.description}</p>

                  <div className="mb-2">
                  {plan.originalPrice !== plan.price ? (
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-500">Was</span>
                      <span className="text-sm text-gray-400 line-through">KSH {plan.originalPrice}</span>
                      <span className="text-xs text-gray-500">→</span>
                      <span className="text-xs font-semibold text-green-600">Now</span>
                    </div>
                  ) : null}
                  </div>

                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-slate-900">
                    {plan.price === '0' ? 'FREE' : `KSH ${plan.price}`}
                  </span>
                  {plan.originalPrice !== plan.price && plan.price !== '0' && (
                    <span className="text-xs font-semibold text-green-600 bg-green-50 px-2 py-1 rounded-full">
                      Save KSH {(parseInt(plan.originalPrice.replace(',', '')) - parseInt(plan.price.replace(',', ''))).toLocaleString()}
                    </span>
                  )}
                </div>
              </div>

              <ul className="space-y-2 mb-6">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start gap-2">
                    <Check className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: '#ff5c35' }} />
                    <span className="text-gray-700 text-xs">{feature}</span>
                  </li>
                ))}
              </ul>

              <a
                href={
                  plan.name === 'Elite Coaching' 
                    ? '#'
                    : plan.name === 'Starter Pack'
                    ? 'https://theclosecode.co.ke/course/1-0-lead-gen/?utm_source=landing_page'
                    : `https://theclosecode.co.ke/courses/?utm_source=landing_page`
                }
                className={`w-full py-3 rounded-lg font-bold text-sm transition-all duration-300 transform hover:scale-105 flex items-center justify-center ${
                  plan.popular
                    ? 'bg-gradient-to-r from-[#ff5c35] to-[#ff7a5c] text-white shadow-lg hover:shadow-xl hover:shadow-[#ff5c35]/50'
                    : 'bg-gradient-to-r from-[#215c9a] to-[#2a6cb5] text-white shadow-md hover:shadow-lg hover:shadow-[#215c9a]/50'
                }`}
              >
                {plan.cta}
              </a>
            </div>
          ))}
        </div>

        {/* Starter Pack - Horizontal rectangle below */}
        <div className="max-w-5xl mx-auto">
          {pricingPlans.slice(3).map((plan, index) => (
            <div
              key={index}
              className={`relative bg-white rounded-2xl p-5 border-2 transition-all duration-300 hover:scale-105 hover:shadow-2xl flex items-center gap-6 ${
                plan.popular
                  ? 'border-[#ff5c35] shadow-xl shadow-[#ff5c35]/20 ring-2 ring-[#ff5c35]/20'
                  : 'border-gray-200 hover:border-[#215c9a]'
              }`}
              style={{ minHeight: '200px' }}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                  <div className="bg-gradient-to-r from-[#ff5c35] to-[#ff7a5c] text-white px-6 py-2 rounded-full text-sm font-bold flex items-center gap-2 shadow-lg">
                    <Sparkles className="w-4 h-4" />
                    BEST VALUE
                  </div>
                </div>
              )}

              {/* Left Section - Timer Alert */}
              {plan.isFree && !freeOfferCountdown.isExpired && (
                <div className="flex-shrink-0 bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-400 rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <AlertTriangle className="w-3 h-3 text-amber-600" />
                    <span className="text-xs font-bold text-amber-900 uppercase">Limited Time</span>
                  </div>
                  <div className="text-xs text-amber-800 font-semibold mb-1">
                    Scrapped by Nov 8, 2025
                  </div>
                  <div className="flex items-center gap-1 text-xs">
                    <Clock className="w-3 h-3 text-amber-700" />
                    <span className="font-mono text-amber-900">
                      {Math.floor(freeOfferCountdown.hours / 24)}d {freeOfferCountdown.hours % 24}h {freeOfferCountdown.minutes}m
                    </span>
                  </div>
                </div>
              )}

              {/* Middle Section - Content */}
              <div className="flex-grow">
                <div className="mb-3">
                  <h3 className="text-xl font-bold text-slate-900 mb-2">{plan.name}</h3>
                  <p className="text-gray-600 text-xs leading-relaxed">{plan.description}</p>
                </div>

                <div className="mb-2">
                  {plan.originalPrice !== plan.price ? (
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-500">Was</span>
                      <span className="text-sm text-gray-400 line-through">KSH {plan.originalPrice}</span>
                      <span className="text-xs text-gray-500">→</span>
                      <span className="text-xs font-semibold text-green-600">Now</span>
                    </div>
                  ) : null}
                </div>

                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-3xl font-bold text-slate-900">
                    {plan.price === '0' ? 'FREE' : `KSH ${plan.price}`}
                  </span>
                  {plan.originalPrice !== plan.price && plan.price !== '0' && (
                    <span className="text-xs font-semibold text-green-600 bg-green-50 px-2 py-1 rounded-full">
                      Save KSH {(parseInt(plan.originalPrice.replace(',', '')) - parseInt(plan.price.replace(',', ''))).toLocaleString()}
                    </span>
                  )}
                </div>

                {/* Features in grid */}
                <ul className="grid grid-cols-2 gap-x-4 gap-y-1">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start gap-2">
                      <Check className="w-3 h-3 flex-shrink-0 mt-0.5" style={{ color: '#ff5c35' }} />
                      <span className="text-gray-700 text-xs">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Right Section - Button */}
              <div className="flex-shrink-0 w-48">
                <a
                  href={plan.name === 'Starter Pack' 
                    ? 'https://theclosecode.co.ke/course/1-0-lead-gen/?utm_source=landing_page'
                    : '#'
                  }
                  className={`w-full py-3 rounded-lg font-bold text-sm transition-all duration-300 transform hover:scale-105 flex items-center justify-center ${
                    plan.popular
                      ? 'bg-gradient-to-r from-[#ff5c35] to-[#ff7a5c] text-white shadow-lg hover:shadow-xl hover:shadow-[#ff5c35]/50'
                      : 'bg-gradient-to-r from-[#215c9a] to-[#2a6cb5] text-white shadow-md hover:shadow-lg hover:shadow-[#215c9a]/50'
                  }`}
                >
                  {plan.cta}
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12 space-y-4">
          <div className="inline-flex items-center gap-3 bg-green-50 border-2 border-green-200 rounded-full px-6 py-3">
            <Check className="w-5 h-5 text-green-600" />
            <span className="text-green-900 font-semibold">
              30-Day Money-Back Guarantee on All Paid Plans
            </span>
          </div>
          <p className="text-gray-500 text-sm">
            Secure payment • Instant access • Join early and be part of the journey
          </p>
        </div>
      </div>
    </section>
  );
}
