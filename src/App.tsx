import HeroSection from './components/HeroSection';
import Header from './components/Header';
import RoadmapSection from './components/RoadmapSection';
import PricingSection from './components/PricingSection';
import ReviewsSection from './components/ReviewsSection';
import NewsletterSection from './components/NewsletterSection';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <HeroSection />
      <RoadmapSection />
      <PricingSection />
      <ReviewsSection />
      <NewsletterSection />
      <Footer />
    </div>
  );
}

export default App;
