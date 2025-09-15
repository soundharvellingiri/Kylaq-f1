import React, { useState } from 'react';
import { TrendingUp, TrendingDown, Minus, MapPin, Calendar, Filter } from 'lucide-react';

interface MarketPrice {
  cropName: string;
  currentPrice: number;
  previousPrice: number;
  trend: 'up' | 'down' | 'stable';
  marketLocation: string;
  lastUpdated: string;
  minPrice: number;
  maxPrice: number;
  unit: string;
}

const MarketPrices: React.FC = () => {
  const [selectedState, setSelectedState] = useState('Tamil Nadu');
  const [selectedCrop, setSelectedCrop] = useState('All Crops');
  const [timeRange, setTimeRange] = useState('today');

  const marketPrices: MarketPrice[] = [
    {
      cropName: 'Rice (Paddy)',
      currentPrice: 2850,
      previousPrice: 2720,
      trend: 'up',
      marketLocation: 'Thanjavur Mandi',
      lastUpdated: '2 hours ago',
      minPrice: 2650,
      maxPrice: 2950,
      unit: '₹/quintal'
    },
    {
      cropName: 'Wheat',
      currentPrice: 2340,
      previousPrice: 2380,
      trend: 'down',
      marketLocation: 'Delhi Mandi',
      lastUpdated: '3 hours ago',
      minPrice: 2200,
      maxPrice: 2450,
      unit: '₹/quintal'
    },
    {
      cropName: 'Cotton',
      currentPrice: 6420,
      previousPrice: 6420,
      trend: 'stable',
      marketLocation: 'Coimbatore Mandi',
      lastUpdated: '1 hour ago',
      minPrice: 6200,
      maxPrice: 6650,
      unit: '₹/quintal'
    },
    {
      cropName: 'Sugarcane',
      currentPrice: 380,
      previousPrice: 365,
      trend: 'up',
      marketLocation: 'Thanjavur Mandi',
      lastUpdated: '4 hours ago',
      minPrice: 350,
      maxPrice: 400,
      unit: '₹/quintal'
    },
    {
      cropName: 'Turmeric',
      currentPrice: 14800,
      previousPrice: 15200,
      trend: 'down',
      marketLocation: 'Erode Mandi',
      lastUpdated: '1 hour ago',
      minPrice: 14200,
      maxPrice: 15800,
      unit: '₹/quintal'
    },
    {
      cropName: 'Tomato',
      currentPrice: 4200,
      previousPrice: 3850,
      trend: 'up',
      marketLocation: 'Chennai Koyambedu',
      lastUpdated: '30 mins ago',
      minPrice: 3500,
      maxPrice: 4500,
      unit: '₹/quintal'
    },
{
      cropName: 'Maize',
      currentPrice: 2400,
      previousPrice: 2000,
      trend: 'up',
      marketLocation: 'Rourkela',
      lastUpdated: '30 mins ago',
      minPrice: 1500,
      maxPrice: 4000,
      unit: '₹/quintal'
    },




  ];

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="text-green-500" size={20} />;
      case 'down': return <TrendingDown className="text-red-500" size={20} />;
      case 'stable': return <Minus className="text-yellow-500" size={20} />;
      default: return null;
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'up': return 'text-green-600 bg-green-100';
      case 'down': return 'text-red-600 bg-red-100';
      case 'stable': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getPriceChange = (current: number, previous: number) => {
    const change = current - previous;
    const percentage = ((change / previous) * 100).toFixed(1);
    return { change, percentage };
  };

  const states = ['Tamil Nadu', 'Karnataka', 'Maharashtra', 'Punjab', 'Haryana', 'Uttar Pradesh','Jharkhand'];
  const crops = ['All Crops', 'Rice', 'Wheat', 'Cotton', 'Sugarcane', 'Turmeric', 'Vegetables','Maize'];

  const filteredPrices = marketPrices.filter(price => {
    if (selectedCrop === 'All Crops') return true;
    return price.cropName.toLowerCase().includes(selectedCrop.toLowerCase());
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Market Prices Dashboard</h1>
        <p className="text-gray-600">Real-time mandi prices to help you make informed selling decisions</p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-lg font-semibold mb-4 flex items-center">
          <Filter className="mr-2 text-blue-500" size={20} />
          Filter Options
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">State</label>
            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              {states.map(state => (
                <option key={state} value={state}>{state}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Crop Type</label>
            <select
              value={selectedCrop}
              onChange={(e) => setSelectedCrop(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              {crops.map(crop => (
                <option key={crop} value={crop}>{crop}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Time Range</label>
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="today">Today</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
            </select>
          </div>
        </div>
      </div>

      {/* Price Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Highest Price Today</p>
              <p className="text-xl font-bold text-green-600">₹14,800</p>
              <p className="text-sm text-gray-500">Turmeric - Erode</p>
            </div>
            <TrendingUp className="text-green-500" size={32} />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Most Active Market</p>
              <p className="text-xl font-bold text-blue-600">Thanjavur</p>
              <p className="text-sm text-gray-500">8 crops listed</p>
            </div>
            <MapPin className="text-blue-500" size={32} />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Last Updated</p>
              <p className="text-xl font-bold text-purple-600">30 mins</p>
              <p className="text-sm text-gray-500">ago</p>
            </div>
            <Calendar className="text-purple-500" size={32} />
          </div>
        </div>
      </div>

      {/* Price Listings */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {filteredPrices.map((price, index) => {
          const { change, percentage } = getPriceChange(price.currentPrice, price.previousPrice);
          
          return (
            <div key={index} className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-bold text-gray-800">{price.cropName}</h3>
                  <p className="text-sm text-gray-600 flex items-center mt-1">
                    <MapPin size={12} className="mr-1" />
                    {price.marketLocation}
                  </p>
                </div>
                
                <div className="text-right">
                  <div className="flex items-center">
                    {getTrendIcon(price.trend)}
                    <span className={`ml-2 px-2 py-1 rounded-full text-xs font-bold ${getTrendColor(price.trend)}`}>
                      {price.trend.toUpperCase()}
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Current Price</span>
                  <span className="text-2xl font-bold text-gray-800">
                    ₹{price.currentPrice.toLocaleString()}
                    <span className="text-sm font-normal text-gray-500 ml-1">per quintal</span>
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Change from yesterday</span>
                  <span className={`text-sm font-semibold ${
                    change > 0 ? 'text-green-600' : change < 0 ? 'text-red-600' : 'text-yellow-600'
                  }`}>
                    {change > 0 ? '+' : ''}₹{Math.abs(change)} ({percentage}%)
                  </span>
                </div>

                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-600">Price Range</span>
                  <span className="text-gray-800">
                    ₹{price.minPrice.toLocaleString()} - ₹{price.maxPrice.toLocaleString()}
                  </span>
                </div>

                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-500 h-2 rounded-full" 
                    style={{
                      width: `${((price.currentPrice - price.minPrice) / (price.maxPrice - price.minPrice)) * 100}%`
                    }}
                  ></div>
                </div>

                <div className="flex justify-between items-center text-xs text-gray-500 border-t pt-2 mt-2">
                  <span>Last updated: {price.lastUpdated}</span>
                  <button className="text-blue-500 hover:text-blue-600 font-medium">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Market Tips */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-6 text-white">
        <h3 className="text-lg font-bold mb-2">💡 Market Tips</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <p className="font-semibold">Best Selling Time:</p>
            <p>Early morning (6-8 AM) typically offers better prices</p>
          </div>
          <div>
            <p className="font-semibold">Price Negotiation:</p>
            <p>Check multiple mandis before finalizing the deal</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketPrices;
