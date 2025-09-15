import React, { useState } from 'react';
import Navigation from './components/Navigation';
import Dashboard from './components/Dashboard';
import CropRecommendation from './components/CropRecommendation';
import FertilizerGuide from './components/FertilizerGuide';
import PestDetection from './components/PestDetection';
import MarketPrices from './components/MarketPrices';
import ChatSupport from './components/ChatSupport';

function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'profile':
        return <Profile />;
      case 'recommendations':
        return <CropRecommendation />;
      case 'fertilizer':
        return <FertilizerGuide />;
      case 'pest-detection':
        return <PestDetection />;
      case 'market':
        return <MarketPrices />;
      case 'chat':
        return <ChatSupport />;
      default:
        return <Dashboard />;
    }
  };

  const handleToggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <Navigation
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        isMenuOpen={isMenuOpen}
        onToggleMenu={handleToggleMenu}
      />
      
      <main className="flex-1 lg:ml-0 p-4 lg:p-6">
        {renderCurrentPage()}
      </main>
    </div>
  );
}

export default App;
