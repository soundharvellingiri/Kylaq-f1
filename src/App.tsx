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
        return <BotpressWidget />; // Use Botpress widget instead of custom chat
      default:
        return <Dashboard />;
    }
  };

  const handleToggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar / Navigation */}
      <Navigation
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        isMenuOpen={isMenuOpen}
        onToggleMenu={handleToggleMenu}
      />
      
      {/* Main Content */}
      <main className="flex-1 lg:ml-0 p-4 lg:p-6">
        {renderCurrentPage()}
      </main>

      {/* Always include Botpress widget globally */}
      <BotpressWidget />
    </div>
  );
}

export default App;
