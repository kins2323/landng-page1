import { Star, MessageSquarePlus } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

const reviews = [
  {
    image: 'https://theclosecode.co.ke/wp-content/uploads/2025/11/Screenshot_20251031_231001_WhatsAppBusiness2.jpg',
    platform: 'WhatsApp',
  },
  {
    image: 'https://theclosecode.co.ke/wp-content/uploads/2025/11/Screenshot_20251031_230941_WhatsAppBusiness2.jpg',
    platform: 'WhatsApp',
  },
  {
    image: 'https://theclosecode.co.ke/wp-content/uploads/2025/11/Screenshot_20251031_230815_WhatsAppBusiness2.jpg',
    platform: 'WhatsApp',
  },
  {
    image: 'https://theclosecode.co.ke/wp-content/uploads/2025/11/Screenshot_20251031_230121_TikTok2.jpg',
    platform: 'TikTok',
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
          scrollContainer.scrollLeft += 0.5;

          if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth / 2) {
            scrollContainer.scrollLeft = 0;
          }
        }
      }, 20);
    };

    startScroll();

    return () => clearInterval(scrollInterval);
  }, [isPaused]);

  const allReviews = [...reviews, ...reviews, ...reviews, ...reviews];

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
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
            Don't just take our word for it - see authentic testimonials from freelancers who transformed their careers
          </p>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-hidden px-6 mb-16"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        style={{ scrollBehavior: 'auto' }}
      >
        {allReviews.map((review, index) => (
          <div
            key={index}
            className="flex-shrink-0 w-[380px] bg-gradient-to-br from-white to-gray-50 rounded-3xl shadow-2xl border-2 border-gray-200 hover:shadow-[0_20px_60px_rgba(0,0,0,0.15)] hover:border-[#ff5c35]/40 transition-all duration-500 hover:scale-105 overflow-hidden group"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

              <div className="absolute top-4 right-4 z-10">
                <div className="bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-bold text-slate-900 shadow-lg border border-gray-200">
                  {review.platform}
                </div>
              </div>

              <div className="absolute top-4 left-4 z-10 flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#ff5c35] text-[#ff5c35] drop-shadow-lg" />
                ))}
              </div>

              <img
                src={review.image}
                alt={`Customer testimonial from ${review.platform}`}
                className="w-full h-[500px] object-cover object-top"
                loading="lazy"
              />

              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-white via-white/95 to-transparent p-6">
                <div className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                  Verified Review
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="relative max-w-4xl mx-auto px-6">
        <div className="bg-gradient-to-br from-[#ff5c35] to-[#ff7a5c] rounded-3xl shadow-2xl overflow-hidden border-4 border-[#ff5c35]/20 ring-4 ring-[#ff5c35]/10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.1),transparent_50%)]"></div>

          <div className="relative p-12 text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-2xl shadow-xl mb-6">
              <MessageSquarePlus className="w-10 h-10 text-[#ff5c35]" />
            </div>

            <h3 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
              Your Success Story Awaits
            </h3>
            <p className="text-xl text-white/95 mb-8 leading-relaxed max-w-2xl mx-auto">
              Join 1000+ freelancers who landed their first client within 90 days. Add your review after achieving your goals!
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button className="group bg-white text-[#ff5c35] px-10 py-5 rounded-xl font-bold text-lg shadow-2xl hover:shadow-[0_10px_40px_rgba(255,255,255,0.3)] transition-all duration-300 hover:scale-105 flex items-center justify-center gap-3 min-w-[240px]">
                Start Your Journey
                <Star className="w-6 h-6 group-hover:rotate-12 transition-transform" />
              </button>
            </div>

            <div className="mt-8 inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm border-2 border-white/20 rounded-full px-6 py-3">
              <div className="flex -space-x-2">
                <div className="w-8 h-8 rounded-full border-2 border-white bg-gradient-to-br from-blue-400 to-blue-600"></div>
                <div className="w-8 h-8 rounded-full border-2 border-white bg-gradient-to-br from-green-400 to-green-600"></div>
                <div className="w-8 h-8 rounded-full border-2 border-white bg-gradient-to-br from-orange-400 to-orange-600"></div>
                <div className="w-8 h-8 rounded-full border-2 border-white bg-gradient-to-br from-pink-400 to-pink-600"></div>
              </div>
              <span className="text-white font-semibold text-sm">
                Join 1000+ who already started
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
