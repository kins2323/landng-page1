import { Check, Sparkles } from 'lucide-react';

const pricingPlans = [
  {
    name: 'Free',
    price: '0',
    description: 'Start your journey with essential resources',
    features: [
      'Access to community',
      'Weekly newsletters',
      'Free resources library',
      'Basic email support',
    ],
    cta: 'Get Started',
    popular: false,
  },
  {
    name: 'Single Module',
    price: '899',
    description: 'Master one specific area of freelancing',
    features: [
      'Choose 1 course module',
      'Lifetime access',
      'Course materials & worksheets',
      'Community access',
      'Email support',
    ],
    cta: 'Choose Module',
    popular: false,
  },
  {
    name: '3 Courses Bundle',
    price: '2,499',
    description: 'Complete freelance mastery package',
    features: [
      'All 3 core courses',
      'Lifetime access',
      'Premium resources',
      'Priority support',
      'Exclusive templates',
      'Monthly Q&A sessions',
    ],
    cta: 'Get Bundle',
    popular: true,
  },
  {
    name: '1-on-1 Coaching',
    price: '12,999',
    description: 'Personalized guidance to fast-track your success',
    features: [
      'Everything in bundle',
      '12 weeks of 1-on-1 coaching',
      'Personalized strategy',
      'Direct access to mentor',
      'Portfolio review',
      'Pitch practice sessions',
      'Job application review',
    ],
    cta: 'Apply Now',
    popular: false,
  },
];

export default function PricingSection() {
  return (
    <section className="py-20 bg-gray-50 relative overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Choose Your Path
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Flexible pricing options designed to fit your goals and budget
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pricingPlans.map((plan, index) => (
            <div
              key={index}
              className={`relative bg-white rounded-2xl p-8 border transition-all duration-300 hover:scale-105 hover:shadow-2xl ${
                plan.popular
                  ? 'border-[#ff5c35] shadow-xl shadow-[#ff5c35]/20'
                  : 'border-gray-200 hover:border-[#215c9a]'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-[#ff5c35] text-white px-4 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                    <Sparkles className="w-4 h-4" />
                    Most Popular
                  </div>
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-2xl font-bold text-slate-900 mb-2">{plan.name}</h3>
                <p className="text-gray-600 text-sm mb-4">{plan.description}</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-5xl font-bold text-slate-900">₹{plan.price}</span>
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
                className={`w-full py-3 rounded-lg font-semibold transition-all duration-300 ${
                  plan.popular
                    ? 'bg-[#ff5c35] text-white hover:shadow-lg hover:shadow-[#ff5c35]/50'
                    : 'bg-[#215c9a] text-white hover:shadow-lg hover:shadow-[#215c9a]/50'
                }`}
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600">
            All plans include a 30-day money-back guarantee
          </p>
        </div>
      </div>
    </section>
  );
}
