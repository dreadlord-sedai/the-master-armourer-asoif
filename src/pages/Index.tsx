
import React from 'react';
import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import RegionsOverview from '@/components/RegionsOverview';
import FeaturesPreview from '@/components/FeaturesPreview';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <HeroSection />
      <RegionsOverview />
      <FeaturesPreview />
      <Footer />
    </div>
  );
};

export default Index;
