import React, { useState } from 'react';
import Navigation from './components/Navigation';
import Dashboard from './components/Dashboard';
import CropRecommendation from './components/CropRecommendation';
import FertilizerGuide from './components/FertilizerGuide';
import PestDetection from './components/PestDetection';
import MarketPrices from './components/MarketPrices';
import BotpressWidget from './components/BotpressWidget';

function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'recommendations':
        return <CropRecommendation />;
      case 'fertilizer':
        return <FertilizerGuide />;
      case 'pest-detection':
        return <PestDetection />;
      case 'market':
        return <MarketPrices />;
      case 'chat':
        return <BotpressWidget />;
      default:
        return <Dashboard />;
    }
  };

  const handleToggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Top Navbar */}
      <Navigation
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        isMenuOpen={isMenuOpen}
        onToggleMenu={handleToggleMenu}
      />

      {/* Main Content (padding to avoid overlap with navbar) */}
      <main className="pt-20 px-4 lg:px-6">
        {renderCurrentPage()}
      </main>

      {/* Botpress Widget (global) */}
      <BotpressWidget />
    </div>
  );
}

export default App;
