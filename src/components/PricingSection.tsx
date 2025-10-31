import { Check, Sparkles, Clock, AlertTriangle } from 'lucide-react';
import CountdownTimer from './CountdownTimer';
import { use6HourLoopCountdown, useCountdown } from '../hooks/useCountdown';

const pricingPlans = [
  {
    name: 'Starter Pack',
    originalPrice: '0',
    price: '0',
    description: 'Start your journey with essential resources',
    features: [
      'Access to community',
      'Weekly newsletters',
      'Free resources library',
      'Basic email support',
    ],
    cta: 'Get Started Free',
    popular: false,
    isFree: true,
  },
  {
    name: 'Skill Builder',
    originalPrice: '15,000',
    price: '11,999',
    description: 'Master one specific area of freelancing',
    features: [
      'Choose 1 premium course module',
      'Lifetime access to content',
      'Course materials & worksheets',
      'Priority community access',
      'Email support',
      'Monthly resource updates',
    ],
    cta: 'Start Learning',
    popular: false,
  },
  {
    name: 'Pro Bundle',
    originalPrice: '40,000',
    price: '29,999',
    description: 'Complete freelance mastery package',
    features: [
      'All 3 core courses included',
      'Lifetime unlimited access',
      'Premium resources library',
      'Priority support',
      'Exclusive templates & tools',
      'Monthly live Q&A sessions',
      'Client pitch frameworks',
      'Portfolio review checklist',
    ],
    cta: 'Get Pro Bundle',
    popular: true,
  },
  {
    name: 'Elite Coaching',
    originalPrice: '200,000',
    price: '149,999',
    description: 'Personalized guidance to fast-track your success',
    features: [
      'Everything in Pro Bundle',
      '12 weeks of 1-on-1 coaching',
      'Personalized success strategy',
      'Direct mentor access',
      'Complete portfolio review',
      'Pitch practice sessions',
      'Job application reviews',
      'Contract negotiation help',
      'Guarantee: First client or refund',
    ],
    cta: 'Apply for Coaching',
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
            Transform Your Future Today
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Investment options designed to match your ambition and commitment
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pricingPlans.map((plan, index) => (
            <div
              key={index}
              className={`relative bg-white rounded-2xl p-8 border-2 transition-all duration-300 hover:scale-105 hover:shadow-2xl ${
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
                      {freeOfferCountdown.hours * 24}d {freeOfferCountdown.hours % 24}h {freeOfferCountdown.minutes}m
                    </span>
                  </div>
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-2xl font-bold text-slate-900 mb-2">{plan.name}</h3>
                <p className="text-gray-600 text-sm mb-4 leading-relaxed">{plan.description}</p>

                {plan.originalPrice !== plan.price && plan.price !== '0' && (
                  <div className="mb-2">
                    <span className="text-lg text-gray-400 line-through">KSH {plan.originalPrice}</span>
                  </div>
                )}

                <div className="flex items-baseline gap-2">
                  <span className="text-5xl font-bold text-slate-900">
                    {plan.price === '0' ? 'FREE' : `KSH ${plan.price}`}
                  </span>
                  {plan.price !== '0' && plan.originalPrice !== plan.price && (
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
                    <span className="text-gray-700 text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                className={`w-full py-4 rounded-lg font-bold text-base transition-all duration-300 transform hover:scale-105 ${
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

        <div className="text-center mt-12 space-y-4">
          <div className="inline-flex items-center gap-3 bg-green-50 border-2 border-green-200 rounded-full px-6 py-3">
            <Check className="w-5 h-5 text-green-600" />
            <span className="text-green-900 font-semibold">
              30-Day Money-Back Guarantee on All Paid Plans
            </span>
          </div>
          <p className="text-gray-500 text-sm">
            Secure payment • Instant access • Join 1000+ successful freelancers
          </p>
        </div>
      </div>
    </section>
  );
}
