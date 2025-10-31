import { Play } from 'lucide-react';

export default function VideoSection() {
  return (
    <section className="py-24 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,92,53,0.05),transparent_70%)]"></div>

      <div className="relative max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#ff5c35] to-[#ff7a5c] text-white px-4 py-2 rounded-full text-sm font-bold mb-6">
            <Play className="w-4 h-4" />
            WATCH NOW
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            See How Others Transformed Their Lives
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Real stories, real results, real people just like you
          </p>
        </div>

        <div className="relative group">
          <div className="absolute -inset-4 bg-gradient-to-r from-[#ff5c35] to-[#215c9a] rounded-3xl opacity-20 blur-2xl group-hover:opacity-30 transition-opacity"></div>
          <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-[#ff5c35] ring-4 ring-[#ff5c35]/20">
            <div className="relative pb-[56.25%]">
              <iframe
                className="absolute top-0 left-0 w-full h-full"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
