import HeroSection from './components/HeroSection';
import VideoSection from './components/VideoSection';
import RoadmapSection from './components/RoadmapSection';
import PricingSection from './components/PricingSection';
import ReviewsSection from './components/ReviewsSection';
import NewsletterSection from './components/NewsletterSection';

function App() {
  return (
    <div className="min-h-screen bg-white">
      <HeroSection />
      <VideoSection />
      <RoadmapSection />
      <PricingSection />
      <ReviewsSection />
      <NewsletterSection />
    </div>
  );
}

export default App;
