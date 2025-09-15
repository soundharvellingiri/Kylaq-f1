import React, { useState } from 'react';
import { Home, Brain, Sprout, Bug, TrendingUp, Menu, X } from 'lucide-react';

interface NavigationProps {
  currentPage: string;
  onPageChange: (page: string) => void;
}

const Navigation: React.FC<NavigationProps> = ({ currentPage, onPageChange }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'recommendations', label: 'Crop Guide', icon: Brain },
    { id: 'fertilizer', label: 'Fertilizer', icon: Sprout },
    { id: 'pest-detection', label: 'Pest Control', icon: Bug },
    { id: 'market', label: 'Market Prices', icon: TrendingUp },
  ];

  const handleToggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <>
      {/* 🔹 Desktop Topbar */}
      <div className="hidden lg:flex items-center justify-between bg-gradient-to-r from-green-500 to-green-700 text-white p-4 fixed w-full z-50 shadow-lg">
        {/* Left: Logo */}
        <div className="flex flex-col">
          <h1 className="text-2xl font-bold">🌱 Crop IQ</h1>
          <span className="text-sm text-green-100">AI Farming Assistant</span>
        </div>

        {/* Center: Menu Items */}
        <div className="flex space-x-8">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onPageChange(item.id)}
              className={`relative font-medium px-3 py-2 rounded-md transition-all duration-200
                ${currentPage === item.id
                  ? 'text-yellow-200 after:absolute after:-bottom-1 after:left-0 after:w-full after:h-1 after:bg-yellow-200 after:rounded-full'
                  : 'text-white hover:text-yellow-200 hover:bg-green-600'
                }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Right: Empty for clean topbar */}
        <div></div>
      </div>

      {/* 🔹 Mobile Topbar */}
      <div className="lg:hidden bg-green-600 text-white p-4 flex justify-between items-center relative z-50">
        <h1 className="text-lg font-bold">Crop IQ</h1>
        <button onClick={handleToggleMenu} className="p-2">
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* 🔹 Mobile Dropdown Menu */}
      {isMenuOpen && (
        <div className="lg:hidden fixed inset-0 bg-white z-50 flex flex-col shadow-lg animate-slideDown">
          <div className="p-4 flex justify-between items-center border-b border-gray-200">
            <h2 className="text-xl font-bold text-green-700">🌱 Crop IQ</h2>
            <button onClick={handleToggleMenu}>
              <X size={28} className="text-gray-700" />
            </button>
          </div>

          <nav className="flex-1 overflow-y-auto p-4">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onPageChange(item.id);
                    handleToggleMenu();
                  }}
                  className={`w-full flex items-center space-x-3 p-3 rounded-lg mb-2 transition-colors duration-200
                    ${currentPage === item.id
                      ? 'bg-green-100 text-green-700 border-l-4 border-green-500'
                      : 'text-gray-600 hover:bg-gray-100'
                    }`}
                >
                  <Icon size={20} />
                  <span className="font-medium">{item.label}</span>
                </button>
              );
            })}
          </nav>

          <div className="p-4 bg-green-50 border-t border-gray-200">
            <p className="text-xs text-green-700 font-medium">24/7 Farmer Helpline</p>
            <p className="text-sm font-bold text-green-800">1800-180-1551</p>
          </div>
        </div>
      )}
    </>
  );
};

export default Navigation;
