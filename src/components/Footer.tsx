import { Instagram, Linkedin, Youtube, Mail, Phone } from 'lucide-react';

const LOGO = 'https://theclosecode.co.ke/wp-content/uploads/2025/09/thecloselogo-1.png';

export default function Footer() {
  return (
    <footer className="bg-[#215c9a] text-white">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2 flex flex-col gap-4">
            <a href="https://theclosecode.co.ke/?utm_source=menu_home&utm_medium=menuclick&utm_campaign=navigation" className="flex items-center gap-3">
              <img src={LOGO} alt="The Close Code" className="h-8" />
            </a>
            <p className="text-sm text-white/90">From clicks to Paying Clients with clarity and consistency</p>

            <div className="flex items-center gap-3 mt-2">
              <a href="https://www.youtube.com/channel/UCrgTgXW5RjJ0XDS7dFqNxtg/videos" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-white/10 hover:bg-white/20 transition-colors">
                <Youtube className="w-4 h-4 text-white" />
              </a>
              <a href="https://ke.linkedin.com/in/brian-kinavusha" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-white/10 hover:bg-white/20 transition-colors">
                <Linkedin className="w-4 h-4 text-white" />
              </a>
              <a href="https://www.instagram.com/briankinavusha/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-white/10 hover:bg-white/20 transition-colors">
                <Instagram className="w-4 h-4 text-white" />
              </a>
              <a href="https://www.tiktok.com/@briankinavusha" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center h-8 px-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white text-xs font-semibold">
                TikTok
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-4 text-white">Contact</h4>
            <div className="flex items-center gap-2 mb-2">
              <div className="p-2 bg-white rounded-full shadow-sm">
                <Mail className="w-4 h-4 text-slate-900" />
              </div>
              <div>
                <div className="text-sm font-semibold">Email</div>
                <div className="text-sm text-white">Brian@Theclosecode.Co.Ke</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="p-2 bg-white rounded-full shadow-sm">
                <Phone className="w-4 h-4 text-slate-900" />
              </div>
              <div>
                <div className="text-sm font-semibold">Phone</div>
                <div className="text-sm text-white">+2547-00-874-207</div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <h4 className="text-sm font-semibold mb-4">Page</h4>
              <ul className="space-y-2 text-sm text-white/90">
                <li><a href="/">Home</a></li>
                <li><a href="https://theclosecode.co.ke/about-us/?utm_source=menu_aboutme&utm_medium=menuclick&utm_campaign=navigation">About Us</a></li>
                <li><a href="https://theclosecode.co.ke/blog/">Blog</a></li>
                <li><a href="https://theclosecode.co.ke/contact-us/?utm_source=menu_contact_us&utm_medium=menuclick&utm_campaign=navigation">Contact</a></li>
                <li><a href="https://theclosecode.co.ke/privacy-policy/">Privacy Policy</a></li>
                <li><a href="https://theclosecode.co.ke/refund_returns/">Refund and Returns Policy</a></li>
                <li><a href="https://theclosecode.co.ke/terms-and-conditions/">Terms and Conditions</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold mb-4">Courses</h4>
              <ul className="space-y-2 text-sm text-white/90">
                <li><a href="https://theclosecode.co.ke/courses/?utm_source=menu_courses&utm_medium=menuclick&utm_campaign=navigation">Lead generation</a></li>
                <li><a href="#">Email marketing</a></li>
                <li><a href="#">Ai & Automations</a></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-white/10 pt-6 text-center text-sm text-white/80">© The Close Code 2025 | All Rights Reserved | Developed by <a href="https://www.tiktok.com/@briankinavusha" className="underline" target="_blank" rel="noopener noreferrer">Brian Kinavusha</a></div>
      </div>
    </footer>
  );
}
