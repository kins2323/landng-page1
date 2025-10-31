import { ArrowRight, Users } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center py-16 lg:py-24">
          <div>
            <div className="inline-flex items-center gap-2 bg-orange-50 border border-[#ff5c35] rounded-full px-4 py-2 mb-8">
              <Users className="w-4 h-4" style={{ color: '#ff5c35' }} />
              <span className="text-sm font-medium text-slate-900">Join 1000+ aspiring freelancers</span>
            </div>

            <h1 className="text-5xl lg:text-6xl font-bold leading-tight mb-6 text-slate-900">
              I'm on a mission to make 1000 people land their first client
            </h1>

            <p className="text-xl text-gray-600 mb-12 leading-relaxed">
              Master the skills, strategies, and mindset needed to launch your freelance career and land clients that pay you what you're worth.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button className="group bg-[#ff5c35] text-white px-8 py-4 rounded-lg font-semibold text-lg hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2">
                Get Skills
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="group bg-white border-2 border-[#215c9a] text-[#215c9a] px-8 py-4 rounded-lg font-semibold text-lg hover:bg-[#215c9a] hover:text-white transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2">
                Join Community
                <Users className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="relative">
            <img
              src="https://theclosecode.co.ke/wp-content/uploads/2025/09/hero-image-.webp"
              alt="Freelancer Success"
              className="w-full h-auto rounded-2xl shadow-2xl object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
