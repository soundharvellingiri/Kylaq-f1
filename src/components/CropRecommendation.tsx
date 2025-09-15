import React, { useState } from 'react';
import { Brain, Loader, CheckCircle, TrendingUp, Droplets, Sprout } from 'lucide-react';
import { SoilData, WeatherData, CropRecommendation } from '../types';

const CropRecommendationPage: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [selectedCropType, setSelectedCropType] = useState('general');
  const [customCrop, setCustomCrop] = useState('');
  const [soilData, setSoilData] = useState<SoilData>({
    nitrogen: 0,
    phosphorus: 0,
    potassium: 0,
    ph: 7,
    organic_carbon: 0,
    moisture: 0
  });
  const [weatherData, setWeatherData] = useState<WeatherData>({
    temperature: 25,
    humidity: 65,
    rainfall: 100,
    season: 'monsoon'
  });
  const [recommendations, setRecommendations] = useState<CropRecommendation[]>([]);

  const cropTypes = [
    { value: 'general', label: 'General Recommendation' },
    { value: 'cereals', label: 'Cereals (Rice, Wheat, Maize)' },
    { value: 'pulses', label: 'Pulses (Lentils, Chickpea)' },
    { value: 'oilseeds', label: 'Oilseeds (Groundnut, Sunflower)' },
    { value: 'cash', label: 'Cash Crops (Cotton, Sugarcane)' },
    { value: 'vegetables', label: 'Vegetables (Tomato, Onion)' },
    { value: 'fruits', label: 'Fruits (Mango, Banana)' },
    { value: 'spices', label: 'Spices (Turmeric, Chili)' },
    { value: 'other', label: 'Other (Specify)' }
  ];

  const handleAnalyze = async () => {
    setIsAnalyzing(true);
    
    // Simulate AI analysis
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Generate AI recommendations based on crop type and custom input
    const mockRecommendations = generateRecommendations(selectedCropType, customCrop, soilData, weatherData);
    
    setRecommendations(mockRecommendations);
    setIsAnalyzing(false);
    setCurrentStep(4);
  };

  const generateRecommendations = (cropType: string, customCrop: string, soil: SoilData, weather: WeatherData): CropRecommendation[] => {
    const cropDatabase: { [key: string]: CropRecommendation[] } = {
      cereals: [
        {
          cropName: 'Rice',
          confidence: 94,
          reasons: [
            'High soil moisture content is ideal for rice cultivation',
            'Current monsoon season provides optimal water availability',
            'Soil pH level is within the preferred range (6.0-7.5)'
          ],
          expectedYield: 6500,
          profitability: 'high',
          seasonality: 'June - October (Kharif)',
          waterRequirement: 'high',
          fertilizerRecommendation: {
            nitrogen: 150,
            phosphorus: 60,
            potassium: 40,
            schedule: ['Apply 50% N + full P & K at transplanting', 'Apply 25% N at tillering', 'Apply 25% N at panicle initiation']
          },
          irrigationSchedule: {
            frequency: '2-3 times per week',
            amount: '5-10 cm standing water',
            seasons: ['Throughout growing season']
          }
        },
        {
          cropName: 'Wheat',
          confidence: 88,
          reasons: [
            'Cool weather conditions favor wheat growth',
            'Moderate water requirement suits current conditions',
            'Good nitrogen content in soil'
          ],
          expectedYield: 4200,
          profitability: 'high',
          seasonality: 'November - April (Rabi)',
          waterRequirement: 'medium',
          fertilizerRecommendation: {
            nitrogen: 120,
            phosphorus: 60,
            potassium: 40,
            schedule: ['Apply 50% N + full P & K at sowing', 'Apply 25% N at tillering', 'Apply 25% N at flowering']
          },
          irrigationSchedule: {
            frequency: 'Every 15-20 days',
            amount: '5-6 cm per irrigation',
            seasons: ['Winter season']
          }
        }
      ],
      pulses: [
        {
          cropName: 'Chickpea (Chana)',
          confidence: 91,
          reasons: [
            'Nitrogen-fixing crop improves soil fertility',
            'Drought-tolerant nature suits current conditions',
            'Good market demand and pricing'
          ],
          expectedYield: 2800,
          profitability: 'high',
          seasonality: 'October - March (Rabi)',
          waterRequirement: 'low',
          fertilizerRecommendation: {
            nitrogen: 20,
            phosphorus: 60,
            potassium: 40,
            schedule: ['Apply full P & K + 20kg N at sowing', 'No additional nitrogen needed']
          },
          irrigationSchedule: {
            frequency: '2-3 irrigations total',
            amount: '4-5 cm per irrigation',
            seasons: ['Pre-flowering and pod formation']
          }
        }
      ],
      vegetables: [
        {
          cropName: 'Tomato',
          confidence: 89,
          reasons: [
            'High value crop with good market demand',
            'Suitable temperature and humidity levels',
            'Rich soil nutrients support vegetable growth'
          ],
          expectedYield: 45000,
          profitability: 'high',
          seasonality: 'Year-round with protected cultivation',
          waterRequirement: 'high',
          fertilizerRecommendation: {
            nitrogen: 200,
            phosphorus: 100,
            potassium: 150,
            schedule: ['Apply 25% N + full P & K at transplanting', 'Apply 25% N at flowering', 'Apply 50% N in splits during fruiting']
          },
          irrigationSchedule: {
            frequency: 'Daily drip irrigation',
            amount: '2-3 liters per plant',
            seasons: ['Throughout growing period']
          }
        }
      ],
      cash: [
        {
          cropName: 'Cotton',
          confidence: 87,
          reasons: [
            'Moderate temperature and humidity suitable for cotton',
            'Good phosphorus levels in soil',
            'Expected rainfall pattern matches cotton requirements'
          ],
          expectedYield: 2800,
          profitability: 'high',
          seasonality: 'May - October (Kharif)',
          waterRequirement: 'medium',
          fertilizerRecommendation: {
            nitrogen: 120,
            phosphorus: 80,
            potassium: 60,
            schedule: ['Apply 25% N + full P & K at sowing', 'Apply 50% N at 45 days', 'Apply 25% N at 75 days']
          },
          irrigationSchedule: {
            frequency: '1-2 times per week',
            amount: '4-6 cm per irrigation',
            seasons: ['Pre-flowering and flowering stages']
          }
        }
      ]
    };

    if (cropType === 'other' && customCrop.trim()) {
      return [{
        cropName: customCrop.charAt(0).toUpperCase() + customCrop.slice(1),
        confidence: 85,
        reasons: [
          `AI analysis suggests ${customCrop} is suitable for your soil conditions`,
          `Current weather parameters are favorable for ${customCrop} cultivation`,
          `Soil nutrient levels can support ${customCrop} growth with proper management`
        ],
        expectedYield: 3500,
        profitability: 'medium',
        seasonality: 'Season depends on crop variety',
        waterRequirement: 'medium',
        fertilizerRecommendation: {
          nitrogen: 100,
          phosphorus: 50,
          potassium: 50,
          schedule: ['Apply balanced fertilizer at planting', 'Top dress with nitrogen during growth', 'Apply potash during reproductive stage']
        },
        irrigationSchedule: {
          frequency: 'As per crop requirement',
          amount: 'Monitor soil moisture',
          seasons: ['Throughout growing season']
        }
      }];
    }

    return cropDatabase[cropType] || cropDatabase.cereals;
  };

  const getProfitabilityColor = (profitability: string) => {
    switch (profitability) {
      case 'high': return 'text-green-600 bg-green-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getWaterRequirementColor = (requirement: string) => {
    switch (requirement) {
      case 'high': return 'text-blue-600 bg-blue-100';
      case 'medium': return 'text-cyan-600 bg-cyan-100';
      case 'low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          {[1, 2, 3, 4].map((step) => (
            <div
              key={step}
              className={`
                flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold
                ${currentStep >= step ? 'bg-green-500 text-white' : 'bg-gray-300 text-gray-600'}
              `}
            >
              {currentStep > step ? <CheckCircle size={16} /> : step}
            </div>
          ))}
        </div>
        <div className="flex justify-between text-xs text-gray-600">
          <span>Soil Data</span>
          <span>Weather Info</span>
          <span>Analysis</span>
          <span>Results</span>
        </div>
      </div>

      {/* Step 1: Soil Data */}
      {currentStep === 1 && (
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-bold mb-4 flex items-center">
            <Sprout className="mr-2 text-green-500" />
            Crop Type & Soil Information
          </h2>
          <p className="text-gray-600 mb-6">Select your crop category and enter soil test results for accurate recommendations</p>
          
          {/* Crop Type Selection */}
          <div className="mb-6 p-4 bg-blue-50 rounded-lg">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              What type of crop are you planning to grow?
            </label>
            <select
              value={selectedCropType}
              onChange={(e) => setSelectedCropType(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-3"
            >
              {cropTypes.map(type => (
                <option key={type.value} value={type.value}>{type.label}</option>
              ))}
            </select>
            
            {selectedCropType === 'other' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Please specify the crop you want to grow:
                </label>
                <input
                  type="text"
                  value={customCrop}
                  onChange={(e) => setCustomCrop(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., Quinoa, Dragon Fruit, Medicinal Plants"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Our AI will analyze and provide recommendations for any crop you specify
                </p>
              </div>
            )}
          </div>
          
          <h2 className="text-xl font-bold mb-4 flex items-center">
            <Sprout className="mr-2 text-green-500" />
            Soil Test Results
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nitrogen (N) - kg/hectare
              </label>
              <input
                type="number"
                value={soilData.nitrogen || ''}
                onChange={(e) => setSoilData({...soilData, nitrogen: e.target.value ? parseFloat(e.target.value) : 0})}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Enter nitrogen content"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phosphorus (P) - kg/hectare
              </label>
              <input
                type="number"
                value={soilData.phosphorus || ''}
                onChange={(e) => setSoilData({...soilData, phosphorus: e.target.value ? parseFloat(e.target.value) : 0})}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Enter phosphorus content"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Potassium (K) - kg/hectare
              </label>
              <input
                type="number"
                value={soilData.potassium || ''}
                onChange={(e) => setSoilData({...soilData, potassium: e.target.value ? parseFloat(e.target.value) : 0})}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Enter potassium content"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                pH Level
              </label>
              <input
                type="number"
                step="0.1"
                value={soilData.ph || ''}
                onChange={(e) => {
                  let val = e.target.value ? parseFloat(e.target.value) : 7;
                  if (val < 1) val = 1;
                  if (val > 14) val = 14;
                  setSoilData({...soilData, ph: val});
                }}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Enter pH level (1-14)"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Organic Carbon (%)
              </label>
              <input
                type="number"
                step="0.1"
                value={soilData.organic_carbon || ''}
                onChange={(e) => setSoilData({...soilData, organic_carbon: e.target.value ? parseFloat(e.target.value) : 0})}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Enter organic carbon percentage"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Soil Moisture (%)
              </label>
              <input
                type="number"
                value={soilData.moisture || ''}
                onChange={(e) => setSoilData({...soilData, moisture: e.target.value ? parseFloat(e.target.value) : 0})}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Enter moisture percentage"
              />
            </div>
          </div>
          
          <button
            onClick={() => setCurrentStep(2)}
            disabled={selectedCropType === 'other' && !customCrop.trim()}
            className="mt-6 w-full bg-green-500 text-white py-3 rounded-lg font-semibold hover:bg-green-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next: Weather Information
          </button>
        </div>
      )}

      {/* Step 2, 3, 4 remain unchanged */}
      {/* ... Paste the rest of your Step 2, Step 3, and Step 4 code here ... */}
    </div>
  );
};

export default CropRecommendationPage;
