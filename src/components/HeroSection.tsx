import { ArrowRight, Users, CheckCircle2, Star } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-white via-orange-50/30 to-blue-50/30">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,92,53,0.08),transparent_50%),radial-gradient(circle_at_bottom_left,rgba(33,92,154,0.08),transparent_50%)]"></div>

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center py-16 lg:py-24">
          <div>
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-50 to-red-50 border-2 border-[#ff5c35] rounded-full px-5 py-3 mb-8 shadow-lg shadow-[#ff5c35]/20">
              <Users className="w-5 h-5" style={{ color: '#ff5c35' }} />
              <span className="text-sm font-bold text-slate-900">Join Early - Get Ahead Before Everyone Does</span>
            </div>

            <h1 className="text-5xl lg:text-7xl font-extrabold leading-tight mb-6 text-slate-900">
              Land Your First Client in
              <span className="block mt-2 bg-gradient-to-r from-[#ff5c35] to-[#215c9a] bg-clip-text text-transparent">
                90 Days or Less
              </span>
            </h1>

            <p className="text-xl lg:text-2xl text-gray-700 mb-8 leading-relaxed font-medium">
              Master the exact skills, strategies, and mindset needed to launch your freelance career and land clients that pay you what you're worth.
            </p>

            <div className="space-y-3 mb-12">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0" />
                <span className="text-lg text-gray-700">Proven framework to help you land your first client</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0" />
                <span className="text-lg text-gray-700">No experience required - start from zero</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0" />
                <span className="text-lg text-gray-700">First client guarantee with Elite Coaching</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <a 
                href="https://theclosecode.co.ke/courses/?utm_source=landing_page"
                className="group bg-gradient-to-r from-[#ff5c35] to-[#ff7a5c] text-white px-10 py-5 rounded-xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 flex items-center justify-center gap-3"
              >
                Start Your Journey
                <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </a>
              <a 
                href="#"
                className="group bg-white border-2 border-[#215c9a] text-[#215c9a] px-10 py-5 rounded-xl font-bold text-lg hover:bg-[#215c9a] hover:text-white shadow-lg transition-all duration-300 hover:scale-105 flex items-center justify-center gap-3"
              >
                Join Community
                <Users className="w-6 h-6" />
              </a>
            </div>

            <div className="flex items-center gap-6 flex-wrap">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  <img src="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&fit=crop" alt="Student" className="w-10 h-10 rounded-full border-2 border-white" />
                  <img src="https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&fit=crop" alt="Student" className="w-10 h-10 rounded-full border-2 border-white" />
                  <img src="https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&fit=crop" alt="Student" className="w-10 h-10 rounded-full border-2 border-white" />
                  <img src="https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&fit=crop" alt="Student" className="w-10 h-10 rounded-full border-2 border-white" />
                </div>
                <div>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#ff5c35] text-[#ff5c35]" />
                    ))}
                  </div>
                  <p className="text-sm text-gray-600 font-semibold">Real Success Stories</p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-[#ff5c35]/20 to-[#215c9a]/20 rounded-3xl blur-2xl"></div>
            <img
              src="https://theclosecode.co.ke/wp-content/uploads/2025/09/hero-image-.webp"
              alt="Freelancer Success"
              className="relative w-full h-auto rounded-2xl shadow-2xl object-cover ring-4 ring-white"
            />
            <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl shadow-xl p-6 border-2 border-[#ff5c35]">
              <div className="flex items-center gap-3">
                <div className="bg-green-100 rounded-full p-3">
                  <CheckCircle2 className="w-8 h-8 text-green-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-slate-900">Our Dream</p>
                  <p className="text-sm text-gray-600 font-semibold">Teaching 1000+ People</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
