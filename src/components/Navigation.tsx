import React from 'react';
import { Home, Brain, Sprout, Bug, TrendingUp, Menu, X } from 'lucide-react';

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
    { id: 'recommendations', label: 'Crop Guide', icon: Brain },
    { id: 'fertilizer', label: 'Fertilizer', icon: Sprout },
    { id: 'pest-detection', label: 'Pest Control', icon: Bug },
    { id: 'market', label: 'Market Prices', icon: TrendingUp },
  ];

  return (
    <>
      {/* 🔹 Mobile Header */}
      <div className="lg:hidden bg-green-600 text-white p-4 flex justify-between items-center relative z-50">
        <h1 className="text-lg font-bold">Crop IQ</h1>
        <button onClick={onToggleMenu} className="p-2">
          <Menu size={24} />
        </button>
      </div>

      {/* 🔹 Mobile Fullscreen Dropdown Menu */}
      {isMenuOpen && (
        <div className="lg:hidden fixed inset-0 bg-white z-50 flex flex-col animate-slideDown">
          {/* Top Section with Close Button */}
          <div className="p-4 flex justify-between items-center border-b border-gray-200">
            <h2 className="text-xl font-bold text-green-700">🌱 Crop IQ</h2>
            <button onClick={onToggleMenu}>
              <X size={28} className="text-gray-700" />
            </button>
          </div>

          {/* Menu Items */}
          <nav className="flex-1 overflow-y-auto p-4">
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

          {/* Footer */}
          <div className="p-4 bg-green-50 border-t border-gray-200">
            <p className="text-xs text-green-700 font-medium">24/7 Farmer Helpline</p>
            <p className="text-sm font-bold text-green-800">1800-180-1551</p>
          </div>
        </div>
      )}

      {/* 🔹 Desktop Sidebar */}
      <div className="hidden lg:flex lg:flex-col lg:w-64 bg-white shadow-lg relative">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-green-700">🌱 Crop IQ</h2>
          <p className="text-sm text-gray-600 mt-1">AI Farming Assistant</p>
        </div>

        <nav className="p-4 flex-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => onPageChange(item.id)}
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

        <div className="p-3 bg-green-50 rounded-lg m-4">
          <p className="text-xs text-green-700 font-medium">24/7 Farmer Helpline</p>
          <p className="text-sm font-bold text-green-800">1800-180-1551</p>
        </div>
      </div>
    </>
  );
};

export default Navigation;
