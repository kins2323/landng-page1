import { Star, Quote } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

const reviews = [
  {
    name: 'Sarah Johnson',
    role: 'Graphic Designer',
    image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    rating: 5,
    text: 'Landed my first client within 3 weeks! The strategies taught here are pure gold. I went from zero to earning $3,000 in my first month.',
  },
  {
    name: 'Michael Chen',
    role: 'Web Developer',
    image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    rating: 5,
    text: 'The 1-on-1 coaching was a game-changer. Having someone review my proposals and guide me through negotiations was invaluable.',
  },
  {
    name: 'Emily Rodriguez',
    role: 'Content Writer',
    image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    rating: 5,
    text: 'I was skeptical at first, but this program delivered. The community support alone is worth the investment. Now I have 5 recurring clients!',
  },
  {
    name: 'David Patel',
    role: 'Digital Marketer',
    image: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    rating: 5,
    text: 'Clear, actionable advice with no fluff. I appreciated the direct approach and real-world examples. Highly recommend to anyone starting out.',
  },
  {
    name: 'Jessica Lee',
    role: 'UX Designer',
    image: 'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    rating: 5,
    text: 'The roadmap made everything so much clearer. I knew exactly what steps to take and in what order. No more guessing or overwhelm!',
  },
  {
    name: 'Alex Thompson',
    role: 'Social Media Manager',
    image: 'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    rating: 5,
    text: 'Best investment I made in my career. The pitch templates and outreach strategies work like magic. Client responses went from 5% to 40%!',
  },
];

export default function ReviewsSection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let scrollInterval: NodeJS.Timeout;

    const startScroll = () => {
      scrollInterval = setInterval(() => {
        if (!isPaused && scrollContainer) {
          scrollContainer.scrollLeft += 1;

          if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth / 2) {
            scrollContainer.scrollLeft = 0;
          }
        }
      }, 20);
    };

    startScroll();

    return () => clearInterval(scrollInterval);
  }, [isPaused]);

  const allReviews = [...reviews, ...reviews, ...reviews];

  return (
    <section className="py-24 bg-gradient-to-b from-white via-gray-50 to-white overflow-hidden relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,92,53,0.03),transparent_70%)]"></div>

      <div className="relative max-w-7xl mx-auto px-6 mb-16">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-300 rounded-full px-6 py-2 mb-6">
            <Star className="w-5 h-5 fill-green-600 text-green-600" />
            <span className="text-sm font-bold text-green-900">1000+ VERIFIED SUCCESS STORIES</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-extrabold text-slate-900 mb-6">
            Real People, Real Results
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Don't just take our word for it - hear from freelancers who transformed their careers and landed their first clients
          </p>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-hidden px-6"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        style={{ scrollBehavior: 'auto' }}
      >
        {allReviews.map((review, index) => (
          <div
            key={index}
            className="flex-shrink-0 w-[400px] bg-white rounded-2xl p-8 shadow-xl border-2 border-gray-100 hover:shadow-2xl hover:border-[#ff5c35]/30 transition-all duration-300 hover:scale-105"
          >
            <Quote className="w-10 h-10 text-[#ff5c35]/20 mb-4" />

            <div className="flex gap-1 mb-4">
              {[...Array(review.rating)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-[#ff5c35] text-[#ff5c35]" />
              ))}
            </div>

            <p className="text-gray-700 leading-relaxed mb-6 text-base">{review.text}</p>

            <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
              <img
                src={review.image}
                alt={review.name}
                className="w-14 h-14 rounded-full object-cover ring-2 ring-[#ff5c35]/20"
              />
              <div>
                <h4 className="font-bold text-slate-900 text-base">{review.name}</h4>
                <p className="text-sm text-gray-600 font-medium">{review.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
