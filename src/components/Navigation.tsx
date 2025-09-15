import React from 'react';
import { Home, User, Brain, Sprout, Bug, TrendingUp, MessageCircle, Menu, X } from 'lucide-react';

interface NavigationProps {
  currentPage: string;
  onPageChange: (page: string) => void;
  isMenuOpen: boolean;
  onToggleMenu: () => void;
}

const Navigation: React.FC<NavigationProps> = ({ 
  currentPage, 
  onPageChange, 
  isMenuOpen, 
  onToggleMenu 
}) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'recommendations', label: 'Crop Guide', icon: Brain },
    { id: 'fertilizer', label: 'Fertilizer', icon: Sprout },
    { id: 'pest-detection', label: 'Pest Control', icon: Bug },
    { id: 'market', label: 'Market Prices', icon: TrendingUp },
    { id: 'chat', label: 'Support', icon: MessageCircle },
  ];

  return (
    <>
      {/* Mobile Header */}
      <div className="lg:hidden bg-green-600 text-white p-4 flex justify-between items-center">
        <h1 className="text-lg font-bold">Crop Portal</h1>
        <button onClick={onToggleMenu} className="p-2">
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40" onClick={onToggleMenu} />
      )}

      {/* Navigation Sidebar */}
      <div className={`
        fixed lg:relative inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out
        ${isMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-green-700">🌱 Crop Portal</h2>
          <p className="text-sm text-gray-600 mt-1">AI Farming Assistant</p>
        </div>

        <nav className="p-4">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => {
                  onPageChange(item.id);
                  onToggleMenu();
                }}
                className={`
                  w-full flex items-center space-x-3 p-3 rounded-lg mb-2 transition-colors duration-200
                  ${currentPage === item.id 
                    ? 'bg-green-100 text-green-700 border-l-4 border-green-500' 
                    : 'text-gray-600 hover:bg-gray-100'
                  }
                `}
              >
                <Icon size={20} />
                <span className="font-medium">{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="absolute bottom-4 left-4 right-4 p-3 bg-green-50 rounded-lg">
          <p className="text-xs text-green-700 font-medium">24/7 Farmer Helpline</p>
          <p className="text-sm font-bold text-green-800">1800-180-1551</p>
        </div>
      </div>
    </>
  );
};

export default Navigation;