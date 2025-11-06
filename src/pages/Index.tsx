import { useState, useEffect, useRef } from "react";

import CardSlider from "@/components/CardSlider";

import DetailsModal from "@/components/DetailsModal";

import LogoCarousel from "@/components/LogoCarousel";

import { Button } from "@/components/ui/button";

import {

  Dialog,

  DialogContent,

  DialogDescription,

  DialogHeader,

  DialogTitle,

} from "@/components/ui/dialog";

// Declare Cal function type
declare global {
  interface Window {
    Cal: any;
  }
}

// Cal.com Inline Embed Component
const CalInlineEmbed = () => {
  const calRef = useRef<HTMLDivElement>(null);
  const scriptLoaded = useRef(false);

  useEffect(() => {
    if (scriptLoaded.current || !calRef.current) return;

    // Add CSS to hide Cal.com branding links and images
    const style = document.createElement('style');
    style.textContent = `
      #my-cal-inline-discovery a[href*="cal.com"],
      #my-cal-inline-discovery a[href*="Cal.com"],
      #my-cal-inline-discovery a[href*="go.cal.com"],
      #my-cal-inline-discovery a[href*="go.cal.com/booking"],
      #my-cal-inline-discovery [data-powered-by],
      #my-cal-inline-discovery .cal-branding,
      #my-cal-inline-discovery [class*="branding"],
      #my-cal-inline-discovery [class*="powered"],
      #my-cal-inline-discovery img[src*="cal.com"],
      #my-cal-inline-discovery img[src*="Cal.com"] {
        display: none !important;
      }
    `;
    document.head.appendChild(style);

    // Use MutationObserver to hide branding links and images that load dynamically
    const observer = new MutationObserver(() => {
      if (calRef.current) {
        const brandingElements = calRef.current.querySelectorAll(
          'a[href*="cal.com"], a[href*="Cal.com"], a[href*="go.cal.com"], a[href*="go.cal.com/booking"], ' +
          '[data-powered-by], .cal-branding, [class*="branding"], [class*="powered"], ' +
          'img[src*="cal.com"], img[src*="Cal.com"]'
        );
        brandingElements.forEach((element) => {
          (element as HTMLElement).style.display = 'none';
        });
      }
    });

    if (calRef.current) {
      observer.observe(calRef.current, {
        childList: true,
        subtree: true
      });
    }

    // Store observer reference for cleanup
    const observerRef = observer;

    // Initialize Cal.com script loader
    (function (C: Window, A: string, L: string) {
      let p = function (a: any, ar: any) {
        a.q.push(ar);
      };
      let d = C.document;
      C.Cal = C.Cal || function () {
        let cal = C.Cal;
        let ar = arguments;
        if (!cal.loaded) {
          cal.ns = {};
          cal.q = cal.q || [];
          d.head.appendChild(d.createElement("script")).src = A;
          cal.loaded = true;
        }
        if (ar[0] === L) {
          const api = function () {
            p(api, arguments);
          };
          const namespace = ar[1];
          api.q = api.q || [];
          if (typeof namespace === "string") {
            cal.ns[namespace] = cal.ns[namespace] || api;
            p(cal.ns[namespace], ar);
            p(cal, ["initNamespace", namespace]);
          } else {
            p(cal, ar);
          }
          return;
        }
        p(cal, ar);
      };
    })(window, "https://app.cal.com/embed/embed.js", "init");

    // Initialize Cal.com
    window.Cal("init", "discovery", { origin: "https://app.cal.com" });

    // Wait for Cal to be ready, then initialize inline embed
    const initCal = () => {
      if (window.Cal && window.Cal.ns && window.Cal.ns.discovery) {
        window.Cal.ns.discovery("inline", {
          elementOrSelector: "#my-cal-inline-discovery",
          config: { layout: "month_view" },
          calLink: "brian-kinavusha-dv24hg/discovery",
        });

        window.Cal.ns.discovery("ui", {
          hideEventTypeDetails: false,
          layout: "month_view"
        });
        scriptLoaded.current = true;
      } else {
        // Retry if Cal is not ready yet
        setTimeout(initCal, 100);
      }
    };

    // Small delay to ensure script is loaded
    setTimeout(initCal, 500);

    // Cleanup observer on unmount
    return () => {
      observerRef.disconnect();
    };
  }, []);

  return (
    <div 
      id="my-cal-inline-discovery" 
      ref={calRef}
      style={{ 
        width: '100%', 
        height: '100%', 
        overflow: 'scroll', 
        minHeight: '600px',
        userSelect: 'none',
        WebkitUserSelect: 'none',
        pointerEvents: 'auto'
      }}
      onContextMenu={(e) => {
        // Only allow if clicking directly on Cal.com iframe content
        const target = e.target as HTMLElement;
        const isCalIframe = target.closest('iframe, [data-cal-namespace]');
        if (!isCalIframe) {
          e.preventDefault();
          e.stopPropagation();
        }
      }}
      onClick={(e) => {
        // Only allow clicks inside Cal.com iframe, not on container
        const target = e.target as HTMLElement;
        const isCalIframe = target.closest('iframe, [data-cal-namespace]');
        const isCalInteractive = target.closest('button, a, input, select, [role="button"]');
        
        // Block clicks on container div itself
        if (target.id === 'my-cal-inline-discovery' || (!isCalIframe && !isCalInteractive)) {
          e.stopPropagation();
        }
      }}
    />
  );
};

const Index = () => {
  // Global click protection - disable left and right clicks on non-interactive elements
  useEffect(() => {
    const preventClicks = (e: MouseEvent) => {
      // Allow clicks on buttons and interactive elements
      const target = e.target as HTMLElement;
      const isInteractive = target.closest('button, a, input, select, textarea, [role="button"], [role="link"], [onclick], [data-radix-dialog-trigger], [data-radix-dialog-close], [data-slider-button]');
      
      // Only allow clicks INSIDE Cal.com iframe/content, not on container divs
      const isCalIframe = target.closest('#my-cal-inline-discovery iframe, #my-cal-inline-discovery [data-cal-namespace], [data-cal-namespace] iframe');
      const isCalInteractive = target.closest('#my-cal-inline-discovery button, #my-cal-inline-discovery a, #my-cal-inline-discovery input, #my-cal-inline-discovery select');
      
      // Block clicks on Cal.com container itself
      const isCalContainer = target.id === 'my-cal-inline-discovery' || 
                              target.closest('#my-cal-inline-discovery') === target.closest('#my-cal-inline-discovery')?.parentElement;
      
      // Allow clicks on card elements (for opening modals) and close buttons
      const isCard = target.closest('[class*="card"], [class*="Card"], .cursor-pointer, [data-radix-dialog-close]');
      
      // Only allow clicks on buttons inside dialogs, not on dialog content
      const isDialogButton = target.closest('[role="dialog"] button, [data-radix-dialog-content] button');
      
      // Block if clicking on Cal.com container, but allow iframe content
      if (isCalContainer && !isCalIframe && !isCalInteractive) {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }
      
      if (!isInteractive && !isCalIframe && !isCalInteractive && !isCard && !isDialogButton) {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }
    };

    const preventRightClick = (e: MouseEvent) => {
      // Only allow right-click inside Cal.com iframe, not on container
      const target = e.target as HTMLElement;
      const isCalIframe = target.closest('#my-cal-inline-discovery iframe, #my-cal-inline-discovery [data-cal-namespace] iframe, [data-cal-namespace] iframe');
      
      // Block right-click on Cal.com container
      const isCalContainer = target.id === 'my-cal-inline-discovery' || 
                              (target.closest('#my-cal-inline-discovery') && !target.closest('#my-cal-inline-discovery iframe'));
      
      if (isCalContainer || !isCalIframe) {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }
    };

    // Disable context menu globally
    const preventContextMenu = (e: Event) => {
      // Only allow context menu inside Cal.com iframe, not on container
      const target = e.target as HTMLElement;
      const isCalIframe = target.closest('#my-cal-inline-discovery iframe, #my-cal-inline-discovery [data-cal-namespace] iframe, [data-cal-namespace] iframe');
      
      // Block context menu on Cal.com container
      const isCalContainer = target.id === 'my-cal-inline-discovery' || 
                              (target.closest('#my-cal-inline-discovery') && !target.closest('#my-cal-inline-discovery iframe'));
      
      if (isCalContainer || !isCalIframe) {
        e.preventDefault();
        return false;
      }
    };

    // Disable text selection globally - including in modals
    document.addEventListener('selectstart', (e) => {
      const target = e.target as HTMLElement;
      // Only allow selection inside Cal.com iframe, not on container
      const isCalIframe = target.closest('#my-cal-inline-discovery iframe, #my-cal-inline-discovery [data-cal-namespace] iframe, [data-cal-namespace] iframe');
      const isInput = target.closest('input, textarea, [contenteditable]');
      
      // Block selection on Cal.com container
      const isCalContainer = target.id === 'my-cal-inline-discovery' || 
                              (target.closest('#my-cal-inline-discovery') && !target.closest('#my-cal-inline-discovery iframe'));
      
      if ((isCalContainer || !isCalIframe) && !isInput) {
        e.preventDefault();
        return false;
      }
    }, false);

    // Disable DevTools keyboard shortcuts
    const preventDevTools = (e: KeyboardEvent) => {
      // F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+U, Ctrl+S
      if (
        e.key === 'F12' ||
        (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'J' || e.key === 'C')) ||
        (e.ctrlKey && e.key === 'U') ||
        (e.ctrlKey && e.key === 'S') ||
        (e.ctrlKey && e.key === 'P')
      ) {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }
    };

    // Disable common DevTools shortcuts
    document.addEventListener('keydown', preventDevTools, true);

    // Add event listeners
    document.addEventListener('click', preventClicks, true);
    document.addEventListener('contextmenu', preventRightClick, true);
    document.addEventListener('contextmenu', preventContextMenu, true);
    document.addEventListener('mousedown', preventClicks, true);

    // CSS to prevent selection globally - including in modals
    const style = document.createElement('style');
    style.textContent = `
      * {
        -webkit-user-select: none !important;
        -moz-user-select: none !important;
        -ms-user-select: none !important;
        user-select: none !important;
      }
      input, textarea, [contenteditable], #my-cal-inline-discovery *,
      [data-cal-namespace] *, .cal-com * {
        -webkit-user-select: text !important;
        -moz-user-select: text !important;
        -ms-user-select: text !important;
        user-select: text !important;
      }
      button, a, [role="button"], [role="link"], [data-radix-dialog-close], [data-radix-dialog-trigger] {
        pointer-events: auto !important;
      }
      [role="dialog"], [data-radix-dialog-content] {
        -webkit-user-select: none !important;
        -moz-user-select: none !important;
        -ms-user-select: none !important;
        user-select: none !important;
      }
      [role="dialog"] img, [data-radix-dialog-content] img {
        pointer-events: none !important;
        -webkit-user-drag: none !important;
        -khtml-user-drag: none !important;
        -moz-user-drag: none !important;
        -o-user-drag: none !important;
        user-drag: none !important;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.removeEventListener('keydown', preventDevTools, true);
      document.removeEventListener('click', preventClicks, true);
      document.removeEventListener('contextmenu', preventRightClick, true);
      document.removeEventListener('contextmenu', preventContextMenu, true);
      document.removeEventListener('mousedown', preventClicks, true);
      document.head.removeChild(style);
    };
  }, []);

  const [showFreelancerModal, setShowFreelancerModal] = useState(false);

  const [showBusinessModal, setShowBusinessModal] = useState(false);

  const [selectedService, setSelectedService] = useState<any>(null);

  const [selectedAutomation, setSelectedAutomation] = useState<any>(null);

  const [showServiceModal, setShowServiceModal] = useState(false);

  const [showAutomationModal, setShowAutomationModal] = useState(false);



  const scrollToDiscovery = () => {

    const element = document.getElementById("discovery");

    if (element) {

      element.scrollIntoView({ behavior: "smooth" });

    }

  };



  const services = [

    {

      id: "content",

      title: "web development",

      description: "I'm comfortable building websites on Wix, HubSpot, and WordPress just tell me your platform of choice.",

      image: "https://kinovadigitalmarketing.com/hubfs/portifolio/brian%20kinavusha%20web%20dev.png",

      details: "Building a website takes more than dragging blocks around—it takes clarity, structure, and purpose. I've created eCommerce, business, and personal sites that not only look great but actually convert. Tell me what you need, and I'll handle the rest.",

    },

    {

      id: "seo",

      title: "SEO & Keywords",

      description: "A successful website should show up when people search for what you offer.",

      image: "https://kinovadigitalmarketing.com/hubfs/portifolio/brian%20kinavusha%20seo&keywords.png",

      details: "Getting your site to rank and attract the right visitors can be tough but that's where I come in. Over the years, I've built systems that turn websites into discoverable, revenue-driving assets. Let's make your site part of your customer's journey not just a digital brochure.",

    },

    {

      id: "social",

      title: "Social Media Strategy",

      description: "Social media is the new currency but creating content that actually sells takes more than trends.",

      image: "https://kinovadigitalmarketing.com/hubfs/portifolio/brian%20kinavusha%20social%20media.jpg",

      details: "From Facebook and Instagram to TikTok, I create campaigns and videos that connect, convert, and stay true to your brand. My focus: turning your followers into buyers, not just likes into noise.",

    },

    {

      id: "ads",

      title: "Paid Advertising",

      description: "Ads shouldn't drain your budget they should multiply it.",

      image: "https://kinovadigitalmarketing.com/hubfs/portifolio/goole%20ads.png",

      details: "I plan, launch, and optimize paid campaigns that focus on ROI, not reach for the sake of it. Whether it's Meta Ads, Google, or TikTok, I help you attract the right audience and convert attention into sales.",

    },

    {

      id: "leads",

      title: "Lead Generation",

      description: "Your next client is already looking for you they just need to find the right path.",

      image: "https://kinovadigitalmarketing.com/hubfs/portifolio/brian%20kinavusha%20lead%20gen.png",

      details: "I create funnels and strategies that attract qualified leads, not just numbers. From awareness to automation, I help you build predictable pipelines that convert curiosity into clients.",

    },

    {

      id: "email",

      title: "Email Marketing",

      description: "Emails still sell when they're done right.",

      image: "https://kinovadigitalmarketing.com/hubfs/portifolio/email%20marketing.png",

      details: "From nurturing sequences to product launches, I craft email campaigns that feel human but drive results. I combine automation with storytelling to keep your audience engaged and your sales pipeline warm.",

    },

  ];



  const automations = [

    {

      id: "lead-auto",

      title: "Lead Generation Automation",

      description: "Capture and qualify leads 24/7 without manual work",

      image: "https://kinovadigitalmarketing.com/hubfs/portifolio/google%20leaed%20gen.png",

      details: "Set it and forget it. Our lead capture systems work around the clock to bring in qualified prospects. From form submissions to automated follow-ups, we handle everything. Your sales team gets pre-qualified leads ready to close.",

    },

    {

      id: "crm-auto",

      title: "CRM Update Automation",

      description: "Keep your CRM updated automatically from multiple sources",

      image: "https://kinovadigitalmarketing.com/hubfs/portifolio/t2.png",

      details: "Eliminate manual data entry. We connect your CRM with all your tools so data flows automatically. Customer interactions, deals, follow-ups—everything syncs in real-time. This saves your team 5+ hours per week while improving accuracy.",

    },

    {

      id: "content-auto",

      title: "Writing & Content Automation",

      description: "Generate consistent content without hiring writers",

      image: "https://kinovadigitalmarketing.com/hubfs/portifolio/writing%20agents.png",

      details: "AI-powered content generation combined with human touch. We set up systems that produce blog posts, social media content, and email copy. Your content calendar runs on autopilot while maintaining your brand voice.",

    },

    {

      id: "chatbots",

      title: "AI Chatbots",

      description: "Instant customer support and lead qualification 24/7",

      image: "https://kinovadigitalmarketing.com/hubfs/portifolio/chatbots.png",

      details: "Deploy intelligent chatbots that qualify leads and answer FAQs instantly. Our bots learn from conversations and improve over time. They handle 80% of common inquiries, freeing your team for high-value work.",

    },

    {

      id: "sales-flow",

      title: "Sales Funnel Automation",

      description: "Move leads through your sales process automatically",

      image: "https://kinovadigitalmarketing.com/hubfs/portifolio/lead%20magnet%20capture.png",

      details: "Automate your entire sales process from lead capture to close. Multi-stage workflows handle follow-ups, objection responses, and deal progression. Your sales team focuses on closing while automation handles everything else.",

    },

    {

      id: "email-io",

      title: "Email Integration & Workflows",

      description: "Trigger actions based on email interactions automatically",

      image: "https://kinovadigitalmarketing.com/hubfs/portifolio/t1.png",

      details: "Create powerful workflows triggered by email opens, clicks, and replies. Send SMS alerts when important emails arrive. Tag contacts automatically based on behavior. Personalize experiences at scale.",

    },

  ];



  return (

    <div className="min-h-screen">



      {/* Hero Section */}

      <section id="home" className="relative py-32 lg:py-40 overflow-hidden" style={{ background: 'var(--gradient-hero)' }}>

        <div className="absolute inset-0 overflow-hidden pointer-events-none">

          <div className="absolute top-1/4 -left-48 w-96 h-96 bg-primary/3 rounded-full blur-3xl"></div>

          <div className="absolute bottom-1/4 -right-48 w-96 h-96 bg-accent/3 rounded-full blur-3xl"></div>

        </div>



        <div className="container mx-auto relative z-10">

          <div className="flex flex-col lg:flex-row items-center justify-between gap-16 lg:gap-24">

            {/* Left Column - Text */}

            <div className="flex-1 max-w-2xl space-y-10 animate-fade-in">

              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full border border-primary/20">

                <span className="w-2 h-2 bg-primary rounded-full animate-pulse"></span>

                <span className="text-sm font-semibold text-primary">Trusted by 25+ Businesses</span>

              </div>



              <h1 className="text-6xl lg:text-8xl font-black leading-[1.05] tracking-tight text-secondary" style={{ textShadow: '0 2px 4px rgba(255,255,255,0.1)' }}>

                I Strategize, Market, and Automate Business.

              </h1>


              <p className="text-xl lg:text-2xl text-muted-foreground font-medium max-w-xl leading-[1.7] space-y-3">
  <strong>Hi, I'm Brian Kinavusha.</strong><br />
  <span className="block mt-2">I've got this obsession with turning messy marketing problems into clean, well-articulated, sales-driven messages with a touch of analytics.</span><br />
  <span className="block mt-2">I'd love to be part of your next project. Take a look at some of my recent work below.</span>
</p>




              <div className="flex flex-col sm:flex-row gap-4 pt-4">

                <Button

                  size="default"

                  onClick={scrollToDiscovery}

                  className="text-base sm:text-lg px-8 py-6 h-auto rounded-lg font-semibold flex items-center gap-3 group bg-secondary text-white hover:bg-secondary/90 transition-all shadow-lg hover:shadow-xl"

                >

                  <span>Have a Job Offer for me?</span>

                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">

                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />


                  </svg>

                </Button>

                <Button

                  size="default"

                  variant="outline"

                  asChild

                  className="text-base sm:text-lg px-8 py-6 h-auto rounded-lg font-semibold border-2 border-secondary/20 hover:border-secondary hover:bg-secondary/5 flex items-center gap-3 group bg-white transition-all shadow-md hover:shadow-lg"
                >
                  <a
                    href="https://theclosecode.co.ke/?utm_source=portfolio"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span>Pick My Brains</span>

                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">

                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />

                    </svg>
                  </a>
                </Button>

              </div>



              {/* Stats */}

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 pt-8 border-t border-secondary/10">
                <div className="space-y-1 text-center">
                  <div className="text-4xl md:text-5xl font-black text-primary">25+</div>
                  <div className="text-sm text-muted-foreground font-medium uppercase tracking-wide">Funnels Built</div>

                </div>

                <div className="space-y-1 text-center">
                  <div className="text-4xl md:text-5xl font-black text-accent flex items-center justify-center gap-1">4.9<span className="text-2xl md:text-3xl">★</span></div>
                  <div className="text-sm text-muted-foreground font-medium uppercase tracking-wide">Client Rating</div>

                </div>

                <div className="space-y-1 text-center">
                  <div className="text-4xl md:text-5xl font-black text-secondary">500k+</div>
                  <div className="text-sm text-muted-foreground font-medium uppercase tracking-wide">Profits Generated</div>

                </div>

              </div>

            </div>



            {/* Right Column - Vertical Video Card (9:16 for Shorts) */}

            <div className="flex-shrink-0 w-full sm:w-auto animate-fade-in">

              <div className="relative flex flex-col items-center gap-6 w-full sm:w-auto">

                <div className="absolute -inset-4 bg-gradient-to-br from-primary/20 to-accent/20 rounded-[3rem] blur-2xl"></div>

                <img
                  src="https://theclosecode.co.ke/wp-content/uploads/2025/09/hero-image-.webp"
                  alt="brian kinavusha Professional marketing and automation services"
                  className="relative w-full max-w-[300px] sm:max-w-[340px] lg:max-w-[420px] aspect-[9/16] object-cover rounded-[2.5rem] border border-secondary/10 hover:scale-[1.02] transition-all duration-500"
                  style={{ boxShadow: '0 20px 60px rgba(0,0,0,0.15)' }}
                  loading="eager"
                />



                {/* Social Icons Below Video */}

                <div className="flex items-center justify-center gap-4 relative z-20">

                  <a

                    href="https://www.instagram.com/briankinavusha/"

                    target="_blank"

                    rel="noopener noreferrer"

                    className="w-14 h-14 bg-white rounded-full flex items-center justify-center hover:scale-125 transition-all duration-300 group/icon border border-secondary/10 animate-fade-in relative z-20 pointer-events-auto"

                    style={{ boxShadow: '0 4px 16px rgba(0,0,0,0.08)', animationDelay: '200ms' }}

                  >

                    <svg className="w-7 h-7 text-[#E4405F] group-hover/icon:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">

                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>

                    </svg>

                  </a>

                  <a

                    href="https://tiktok.com/@briankinavusha"

                    target="_blank"

                    rel="noopener noreferrer"

                    className="w-14 h-14 bg-white rounded-full flex items-center justify-center hover:scale-125 transition-all duration-300 group/icon border border-secondary/10 animate-fade-in relative z-20 pointer-events-auto"

                    style={{ boxShadow: '0 4px 16px rgba(0,0,0,0.08)', animationDelay: '300ms' }}

                  >

                    <svg className="w-7 h-7 text-[#000000] group-hover/icon:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">

                      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>

                    </svg>

                  </a>

                  <a

                    href="https://ke.linkedin.com/in/brian-kinavusha"

                    target="_blank"

                    rel="noopener noreferrer"

                    className="w-14 h-14 bg-white rounded-full flex items-center justify-center hover:scale-125 transition-all duration-300 group/icon border border-secondary/10 animate-fade-in relative z-20 pointer-events-auto"

                    style={{ boxShadow: '0 4px 16px rgba(0,0,0,0.08)', animationDelay: '400ms' }}

                  >

                    <svg className="w-7 h-7 text-[#0A66C2] group-hover/icon:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">

                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>

                    </svg>

                  </a>

                  <a

                    href="https://github.com/kins2323"

                    target="_blank"

                    rel="noopener noreferrer"

                    className="w-14 h-14 bg-white rounded-full flex items-center justify-center hover:scale-125 transition-all duration-300 group/icon border border-secondary/10 animate-fade-in relative z-20 pointer-events-auto"

                    style={{ boxShadow: '0 4px 16px rgba(0,0,0,0.08)', animationDelay: '450ms' }}

                  >

                    <svg className="w-7 h-7 text-[#181717] group-hover/icon:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">

                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>

                    </svg>

                  </a>

                  <a

                    href="mailto:brian@kinovadigitalmarketing.com"

                    className="w-14 h-14 bg-white rounded-full flex items-center justify-center hover:scale-125 transition-all duration-300 group/icon border border-secondary/10 animate-fade-in relative z-20 pointer-events-auto"

                    style={{ boxShadow: '0 4px 16px rgba(0,0,0,0.08)', animationDelay: '500ms' }}

                  >

                    <svg className="w-7 h-7 text-primary group-hover/icon:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">

                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />

                    </svg>

                  </a>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>



      {/* Discovery Section */}

      <section id="discovery" className="py-24 lg:py-32 bg-gradient-to-br from-muted via-background to-muted relative overflow-hidden">

        <div className="absolute inset-0 overflow-hidden pointer-events-none">

          <div className="absolute top-1/2 left-1/4 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl"></div>

          <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-accent/5 rounded-full blur-3xl"></div>

        </div>



        <div className="container mx-auto relative z-10">

          <div className="text-center mb-12">

            <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 rounded-full border border-accent/20 mb-4">

              <span className="w-2 h-2 bg-accent rounded-full"></span>

              <span className="text-sm font-semibold text-accent">Consultation</span>

            </div>



            <h2 className="text-5xl lg:text-6xl font-black leading-tight text-secondary mb-4">

              What loophole should I fix? Let's talk.

            </h2>



            <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">

              I can be an expert only if I know what your business really needs. Fill me in.

            </p>

          </div>



          {/* Booking Component */}

          <div 
            className="max-w-4xl mx-auto mt-12"
            onContextMenu={(e) => {
              const target = e.target as HTMLElement;
              const isCalContent = target.closest('#my-cal-inline-discovery iframe, #my-cal-inline-discovery [data-cal-namespace]');
              if (!isCalContent) {
                e.preventDefault();
                e.stopPropagation();
              }
            }}
            onClick={(e) => {
              const target = e.target as HTMLElement;
              const isCalContent = target.closest('#my-cal-inline-discovery iframe, #my-cal-inline-discovery [data-cal-namespace]');
              const isCalInteractive = target.closest('#my-cal-inline-discovery button, #my-cal-inline-discovery a, #my-cal-inline-discovery input');
              
              // Block clicks on container, only allow Cal.com iframe content
              if (!isCalContent && !isCalInteractive) {
                e.stopPropagation();
              }
            }}
            style={{ userSelect: 'none', WebkitUserSelect: 'none' }}
          >

            <div 
              className="relative group"
              onContextMenu={(e) => {
                const target = e.target as HTMLElement;
                const isCalContent = target.closest('#my-cal-inline-discovery iframe, #my-cal-inline-discovery [data-cal-namespace]');
                if (!isCalContent) {
                  e.preventDefault();
                  e.stopPropagation();
                }
              }}
            >

              <div className="absolute -inset-1 bg-gradient-to-r from-primary via-accent to-primary rounded-3xl blur opacity-25 group-hover:opacity-40 transition duration-500"></div>

              <div 
                className="relative bg-white rounded-2xl overflow-hidden" 
                style={{ boxShadow: '0 20px 60px rgba(0,0,0,0.15)' }}
                onContextMenu={(e) => {
                  const target = e.target as HTMLElement;
                  const isCalContent = target.closest('#my-cal-inline-discovery iframe, #my-cal-inline-discovery [data-cal-namespace]');
                  if (!isCalContent) {
                    e.preventDefault();
                    e.stopPropagation();
                  }
                }}
              >

                <CalInlineEmbed />

              </div>

            </div>

          </div>

        </div>

      </section>



      {/* Services Section */}

      <section id="services" className="py-24 lg:py-32 bg-background relative overflow-hidden">

        <div className="absolute inset-0 overflow-hidden pointer-events-none">

          <div className="absolute top-1/3 right-0 w-[800px] h-[800px] bg-accent/3 rounded-full blur-3xl"></div>

        </div>



        <div className="container mx-auto relative z-10">

          <div className="text-center mb-16">

            <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 rounded-full border border-accent/20 mb-4">

              <span className="w-2 h-2 bg-accent rounded-full"></span>

              <span className="text-sm font-semibold text-accent">What I'm Proud Of</span>

            </div>

            <h2 className="text-5xl lg:text-6xl font-black mb-4 leading-tight text-secondary">

              In Marketing

            </h2>

            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">

              Over the 4 years of being in business, I have developed strategies and skills that have driven impact for over 20+ businesses. Here are some screenshots.
              </p>

          </div>



          <CardSlider

            cards={services}

            onCardClick={(card) => {

              setSelectedService(card);

              setShowServiceModal(true);

            }}

          />

        </div>

      </section>



      {/* Automations Section */}

      <section id="automations" className="py-24 lg:py-32 bg-muted relative overflow-hidden">

        <div className="absolute inset-0 overflow-hidden pointer-events-none">

          <div className="absolute bottom-1/3 left-0 w-[800px] h-[800px] bg-primary/3 rounded-full blur-3xl"></div>

        </div>



        <div className="container mx-auto relative z-10">

          <div className="text-center mb-16">

            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full border border-primary/20 mb-4">

              <span className="w-2 h-2 bg-primary rounded-full"></span>

              <span className="text-sm font-semibold text-primary">Results I'm Proud Of</span>

            </div>

            <h2 className="text-5xl lg:text-6xl font-black mb-4 leading-tight text-secondary">

              In AI & Automation

            </h2>

            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">

              I'm not into fancy stuff. I value ROI for automations. Here are some.
              

            </p>

          </div>



          <CardSlider

            cards={automations}

            onCardClick={(card) => {

              setSelectedAutomation(card);

              setShowAutomationModal(true);

            }}

          />

        </div>

      </section>



      {/* Tools & Tech Stack Section */}

      <section id="tools" className="py-24 lg:py-32 bg-background relative overflow-hidden">

        <div className="absolute inset-0 overflow-hidden pointer-events-none">

          <div className="absolute top-1/2 right-1/4 w-[600px] h-[600px] bg-accent/3 rounded-full blur-3xl"></div>

        </div>



        <div className="container mx-auto relative z-10">

          <div className="text-center mb-16">

            <div className="inline-flex items-center gap-2 px-4 py-2 bg-secondary/10 rounded-full border border-secondary/20 mb-4">

              <span className="w-2 h-2 bg-secondary rounded-full"></span>

              <span className="text-sm font-semibold text-secondary">Tech & Tools</span>

            </div>

            <h2 className="text-5xl lg:text-6xl font-black mb-4 leading-tight">Tools at My Fingertips</h2>

            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">

              I interact with these tools mostly daily, but no week has passed without opening one or two. This helps me keep up with tools most teams use.

            </p>

          </div>



          <div className="space-y-8">

            <LogoCarousel

              title="Automation & Workflows"

              logos={[

                { name: "n8n", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/N8n-logo-new.svg/1280px-N8n-logo-new.svg.png" },
                { name: "Make", url: "https://www.freelogovectors.net/wp-content/uploads/2023/11/make-logo-freelogovectors.net_.png" },
                { name: "Zapier", url: "https://cdn.jsdelivr.net/gh/gilbarbara/logos/logos/zapier.svg" },
                { name: "GoHighLevel", url: "https://ghlbuilds.com/wp-content/uploads/2025/09/highlevel-logo.png" },
                { name: "IFTTT", url: "https://cdn.jsdelivr.net/gh/gilbarbara/logos/logos/ifttt.svg" },
                { name: "Airtable", url: "https://cdn.jsdelivr.net/gh/gilbarbara/logos/logos/airtable.svg" },
              ]}

              direction="left"
              duration={24}

            />



            <LogoCarousel

              title="Marketing & CRM"

              logos={[

                { name: "HubSpot", url: "https://cdn.jsdelivr.net/gh/gilbarbara/logos/logos/hubspot.svg" },
                { name: "Zoho", url: "https://cdn.jsdelivr.net/gh/gilbarbara/logos/logos/zoho.svg" },
                { name: "Apollo", url: "https://vectorseek.com/wp-content/uploads/2023/08/Apollo.Io-Logo-Vector.svg-.png" },
                { name: "MailerLite", url: "https://www.onyourmark.com/wp-content/uploads/2022/06/2560px-MailerLite_Logo.svg_.png" },
                { name: "Salesforce", url: "https://cdn.jsdelivr.net/gh/gilbarbara/logos/logos/salesforce.svg" },
                { name: "Mailchimp", url: "https://cdn.jsdelivr.net/gh/gilbarbara/logos/logos/mailchimp.svg" },
              ]}

              direction="right"
              duration={24}

            />



            <LogoCarousel

              title="Project Management"

              logos={[

                { name: "ClickUp", url: "https://cdn.worldvectorlogo.com/logos/clickup.svg" },
                { name: "Monday", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c6/Monday_logo.svg/2560px-Monday_logo.svg.png" },
                { name: "Trello", url: "https://cdn.jsdelivr.net/gh/gilbarbara/logos/logos/trello.svg" },
                { name: "Asana", url: "https://cdn.jsdelivr.net/gh/gilbarbara/logos/logos/asana.svg" },
                { name: "Jira", url: "https://cdn.jsdelivr.net/gh/gilbarbara/logos/logos/jira.svg" },
                { name: "Notion", url: "https://cdn.jsdelivr.net/gh/gilbarbara/logos/logos/notion.svg" },
              ]}

              direction="left"
              duration={24}

            />



            <LogoCarousel

              title="Web & SEO"

              logos={[

                { name: "WordPress", url: "https://cdn.jsdelivr.net/gh/gilbarbara/logos/logos/wordpress.svg" },
                { name: "Google Analytics", url: "https://cdn.jsdelivr.net/gh/gilbarbara/logos/logos/google-analytics.svg" },
                { name: "Google Search Console", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Google_Search_Console.svg/2560px-Google_Search_Console.svg.png" },
                { name: "Ahrefs", url: "https://ahrefs.com/assets/esbuild/ahrefs-logo-blue-I5LZ4NMJ.svg" },
                { name: "SEMrush", url: "https://1000logos.net/wp-content/uploads/2024/08/SEMrush-Logo.png" },
                { name: "Google Tag Manager", url: "https://cdn.jsdelivr.net/gh/gilbarbara/logos/logos/google-tag-manager.svg" },
              ]}

              direction="right"
              duration={24}

            />



            <LogoCarousel

              title="Social & Content"

              logos={[

                { name: "Instagram", url: "https://cdn.jsdelivr.net/gh/gilbarbara/logos/logos/instagram.svg" },
                { name: "Meta", url: "https://cdn.jsdelivr.net/gh/gilbarbara/logos/logos/meta.svg" },
                { name: "LinkedIn", url: "https://cdn.jsdelivr.net/gh/gilbarbara/logos/logos/linkedin.svg" },
                { name: "TikTok", url: "https://1000logos.net/wp-content/uploads/2019/06/Tiktok_Logo.png" },
                { name: "YouTube", url: "https://cdn.jsdelivr.net/gh/gilbarbara/logos/logos/youtube.svg" },
                { name: "x", url: "https://logos-world.net/wp-content/uploads/2023/08/X-Logo.png" },
              ]}

              direction="left"
              duration={24}

            />

          </div>

        </div>

      </section>



      {/* About Me Section */}

      <section id="about-me" className="py-24 lg:py-32 bg-muted relative overflow-hidden">

        <div className="absolute inset-0 overflow-hidden pointer-events-none">

          <div className="absolute top-1/4 -left-48 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>

          <div className="absolute bottom-1/4 -right-48 w-96 h-96 bg-accent/5 rounded-full blur-3xl"></div>

        </div>



        <div className="container mx-auto relative z-10">

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

            <div className="relative order-2 lg:order-2">
                <img

                src="https://theclosecode.co.ke/wp-content/uploads/2025/09/hero-image-.webp"
                  alt="About Us"

                className="block mx-auto h-[420px] lg:h-[560px] w-auto object-contain"
                />

            </div>



            <div className="order-1 lg:order-1 space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full border border-primary/20 w-fit">

                <span className="w-2 h-2 bg-primary rounded-full"></span>

                <span className="text-sm font-semibold text-primary">Our Story</span>

              </div>



              <h2 className="text-5xl lg:text-6xl font-black leading-tight">

              One Face. Team-Level Results.

              </h2>



              <p className="text-lg text-muted-foreground leading-relaxed">

                With about half a decade of combined experience in digital marketing and automation, I have  helped 20+ businesses increase revenue through strategic funnels and automated solutions.

              </p>



              <p className="text-lg text-muted-foreground leading-relaxed">

              I'm not the kind who chases fancy metrics. I value my work when it creates real, measurable impact, not just shallow numbers to clap for. Every project I take on gets my full energy and focus to deliver meaningful results.

              </p>



              <div className="space-y-4 pt-2">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-primary" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-secondary font-medium">Data-driven strategies</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-accent" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-secondary font-medium">Transparent communication</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-secondary" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-secondary font-medium">Proven track record</span>
                </div>
              </div>


              <Button size="lg" onClick={scrollToDiscovery} className="bg-gradient-to-r from-primary to-accent hover:shadow-lg transition-all">

                 WORK WITH ME

              </Button>

            </div>

          </div>

        </div>

      </section>



      



      {/* Footer - Let's Connect */}
      <section className="py-24 lg:py-32 bg-gradient-to-br from-muted via-background to-muted relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/3 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto relative z-10">
          <div className="text-center">
            <h2 className="text-4xl lg:text-5xl font-black mb-8 leading-tight text-secondary">
              Let's Connect
            </h2>

            <div className="flex items-center justify-center gap-4 flex-wrap">
              <a
                href="https://www.instagram.com/briankinavusha/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-14 h-14 bg-white rounded-full flex items-center justify-center hover:scale-125 transition-all duration-300 group/icon border border-secondary/10 animate-fade-in relative z-20 pointer-events-auto"
                style={{ boxShadow: '0 4px 16px rgba(0,0,0,0.08)', animationDelay: '200ms' }}
              >
                <svg className="w-7 h-7 text-[#E4405F] group-hover/icon:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>

              <a
                href="https://tiktok.com/@briankinavusha"
                target="_blank"
                rel="noopener noreferrer"
                className="w-14 h-14 bg-white rounded-full flex items-center justify-center hover:scale-125 transition-all duration-300 group/icon border border-secondary/10 animate-fade-in relative z-20 pointer-events-auto"
                style={{ boxShadow: '0 4px 16px rgba(0,0,0,0.08)', animationDelay: '300ms' }}
              >
                <svg className="w-7 h-7 text-[#000000] group-hover/icon:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                </svg>
              </a>

              <a
                href="https://ke.linkedin.com/in/brian-kinavusha"
                target="_blank"
                rel="noopener noreferrer"
                className="w-14 h-14 bg-white rounded-full flex items-center justify-center hover:scale-125 transition-all duration-300 group/icon border border-secondary/10 animate-fade-in relative z-20 pointer-events-auto"
                style={{ boxShadow: '0 4px 16px rgba(0,0,0,0.08)', animationDelay: '400ms' }}
              >
                <svg className="w-7 h-7 text-[#0A66C2] group-hover/icon:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>

              <a
                href="https://github.com/kins2323"
                target="_blank"
                rel="noopener noreferrer"
                className="w-14 h-14 bg-white rounded-full flex items-center justify-center hover:scale-125 transition-all duration-300 group/icon border border-secondary/10 animate-fade-in relative z-20 pointer-events-auto"
                style={{ boxShadow: '0 4px 16px rgba(0,0,0,0.08)', animationDelay: '450ms' }}
              >
                <svg className="w-7 h-7 text-[#181717] group-hover/icon:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>

              <a
                href="mailto:brian@kinovadigitalmarketing.com"
                className="w-14 h-14 bg-white rounded-full flex items-center justify-center hover:scale-125 transition-all duration-300 group/icon border border-secondary/10 animate-fade-in relative z-20 pointer-events-auto"
                style={{ boxShadow: '0 4px 16px rgba(0,0,0,0.08)', animationDelay: '500ms' }}
              >
                <svg className="w-7 h-7 text-primary group-hover/icon:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Modals */}

      <Dialog open={showFreelancerModal} onOpenChange={setShowFreelancerModal}>

        <DialogContent>

          <DialogHeader>

            <DialogTitle>Solutions for Freelancers</DialogTitle>

            <DialogDescription className="text-left pt-4 space-y-3">

              <p>

                As a freelancer, you need systems that work while you focus on

                delivering great work to clients.

              </p>

              <ul className="list-disc list-inside space-y-2">

                <li>Automated lead generation funnels</li>

                <li>Client onboarding workflows</li>

                <li>Email nurture sequences</li>

                <li>Portfolio showcases that convert</li>

              </ul>

              <p className="font-semibold">

                Let's build a system that brings clients to you.

              </p>

            </DialogDescription>

          </DialogHeader>

          <div className="flex justify-end mt-4">

            <Button onClick={scrollToDiscovery}>Schedule a Call</Button>

          </div>

        </DialogContent>

      </Dialog>



      <Dialog open={showBusinessModal} onOpenChange={setShowBusinessModal}>

        <DialogContent>

          <DialogHeader>

            <DialogTitle>Solutions for Businesses</DialogTitle>

            <DialogDescription className="text-left pt-4 space-y-3">

              <p>

                Scale your business with marketing systems that generate

                predictable revenue.

              </p>

              <ul className="list-disc list-inside space-y-2">

                <li>Multi-channel acquisition funnels</li>

                <li>CRM automation & integration</li>

                <li>Sales team enablement tools</li>

                <li>Customer retention workflows</li>

              </ul>

              <p className="font-semibold">

                Let's create a growth engine for your business.

              </p>

            </DialogDescription>

          </DialogHeader>

          <div className="flex justify-end mt-4">

            <Button onClick={scrollToDiscovery}>Schedule a Call</Button>

          </div>

        </DialogContent>

      </Dialog>



      {/* Service Details Modal */}

      <DetailsModal

        isOpen={showServiceModal}

        onClose={() => setShowServiceModal(false)}

        title={selectedService?.title || ""}

        image={selectedService?.image || ""}

        details={selectedService?.details || ""}

        onBookMeeting={scrollToDiscovery}

      />



      {/* Automation Details Modal */}

      <DetailsModal

        isOpen={showAutomationModal}

        onClose={() => setShowAutomationModal(false)}

        title={selectedAutomation?.title || ""}

        image={selectedAutomation?.image || ""}

        details={selectedAutomation?.details || ""}

        onBookMeeting={scrollToDiscovery}

      />

    </div>

  );

};



export default Index;


