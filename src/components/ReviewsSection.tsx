import { Star } from 'lucide-react';
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
    <section className="py-20 bg-gradient-to-b from-white to-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-12">
        <div className="text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Success Stories
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Join hundreds of freelancers who've landed their first clients
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
            className="flex-shrink-0 w-[350px] bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300"
          >
            <div className="flex items-center gap-4 mb-4">
              <img
                src={review.image}
                alt={review.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <h4 className="font-semibold text-slate-900">{review.name}</h4>
                <p className="text-sm text-gray-600">{review.role}</p>
              </div>
            </div>

            <div className="flex gap-1 mb-3">
              {[...Array(review.rating)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-[#ff5c35] text-[#ff5c35]" />
              ))}
            </div>

            <p className="text-gray-700 leading-relaxed">{review.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
