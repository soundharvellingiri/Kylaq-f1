import React from 'react';
import { TrendingUp, Droplets, Sun, AlertTriangle, Sprout, DollarSign } from 'lucide-react';

interface DashboardProps {
  farmer: any;
}

const Dashboard: React.FC<DashboardProps> = ({ farmer = {} }) => {
  const weatherData = {
    temperature: 28,
    humidity: 72,
    rainfall: 45,
    condition: 'Partly Cloudy'
  };

  const quickStats = [
    { label: 'Land Area', value: `${farmer.landSize || 0} acres`, icon: Sprout, color: 'bg-green-500' },
    { label: 'Active Crops', value: '3 crops', icon: Sun, color: 'bg-yellow-500' },
    { label: 'This Month Profit', value: '₹45,600', icon: DollarSign, color: 'bg-blue-500' },
    { label: 'Water Level', value: '78%', icon: Droplets, color: 'bg-cyan-500' }
  ];

  const recentRecommendations = [
    { crop: 'Rice', confidence: 92, season: 'Monsoon' },
    { crop: 'Wheat', confidence: 87, season: 'Winter' },
    { crop: 'Sugarcane', confidence: 84, season: 'Year-round' }
  ];

  const alerts = [
    { type: 'weather', message: 'Heavy rainfall expected in next 3 days', priority: 'high' },
    { type: 'pest', message: 'Brown plant hopper detected in nearby farms', priority: 'medium' },
    { type: 'market', message: 'Rice prices increased by 8% this week', priority: 'low' }
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">
          Welcome back, {farmer.name || 'Farmer'}! 🌾
        </h1>
        <p className="text-green-100">
          {farmer.location && farmer.state ? 
            `Farming in ${farmer.location}, ${farmer.state}` : 
            'Your smart farming assistant is ready to help you make informed decisions.'
          }
        </p>
      </div>

      {/* Weather Widget */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <Sun className="mr-2 text-yellow-500" size={20} />
          Today's Weather
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-gray-800">{weatherData.temperature}°C</p>
            <p className="text-sm text-gray-600">Temperature</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-blue-600">{weatherData.humidity}%</p>
            <p className="text-sm text-gray-600">Humidity</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-green-600">{weatherData.rainfall}mm</p>
            <p className="text-sm text-gray-600">Rainfall</p>
          </div>
          <div className="text-center">
            <p className="text-sm font-bold text-gray-800">{weatherData.condition}</p>
            <p className="text-sm text-gray-600">Condition</p>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {quickStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">{stat.label}</p>
                  <p className="text-xl font-bold text-gray-800 mt-1">{stat.value}</p>
                </div>
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <Icon size={24} className="text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Recommendations */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-lg font-semibold mb-4">Recent Crop Recommendations</h3>
          <div className="space-y-3">
            {recentRecommendations.map((rec, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-800">{rec.crop}</p>
                  <p className="text-sm text-gray-600">{rec.season} season</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-green-600">{rec.confidence}%</p>
                  <p className="text-xs text-gray-500">confidence</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Alerts */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <AlertTriangle className="mr-2 text-orange-500" size={20} />
            Important Alerts
          </h3>
          <div className="space-y-3">
            {alerts.map((alert, index) => (
              <div key={index} className={`
                p-3 rounded-lg border-l-4
                ${alert.priority === 'high' ? 'bg-red-50 border-red-500' : 
                  alert.priority === 'medium' ? 'bg-yellow-50 border-yellow-500' : 
                  'bg-blue-50 border-blue-500'}
              `}>
                <p className="text-sm font-medium text-gray-800">{alert.message}</p>
                <p className={`
                  text-xs mt-1 uppercase font-bold
                  ${alert.priority === 'high' ? 'text-red-600' : 
                    alert.priority === 'medium' ? 'text-yellow-600' : 
                    'text-blue-600'}
                `}>
                  {alert.priority} priority
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;