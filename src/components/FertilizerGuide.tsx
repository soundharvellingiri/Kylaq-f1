import React, { useState } from 'react';
import { Sprout, Calendar, Beaker, Droplets, AlertCircle, Calculator } from 'lucide-react';

interface FertilizerRecommendation {
  cropName: string;
  stage: string;
  nitrogen: number;
  phosphorus: number;
  potassium: number;
  applicationTime: string;
  method: string;
  frequency: string;
  waterRequirement: string;
}

const FertilizerGuide: React.FC = () => {
  const [selectedCrop, setSelectedCrop] = useState('rice');
  const [landArea, setLandArea] = useState(1);
  const [cropStage, setCropStage] = useState('planting');
  const [soilType, setSoilType] = useState('alluvial');

  const cropOptions = [
    { value: 'rice', label: 'Rice' },
    { value: 'wheat', label: 'Wheat' },
    { value: 'cotton', label: 'Cotton' },
    { value: 'sugarcane', label: 'Sugarcane' },
    { value: 'tomato', label: 'Tomato' },
    { value: 'maize', label: 'Maize' }
  ];

  const stageOptions = [
    { value: 'planting', label: 'Planting/Sowing' },
    { value: 'vegetative', label: 'Vegetative Growth' },
    { value: 'flowering', label: 'Flowering' },
    { value: 'fruiting', label: 'Fruiting/Grain Formation' },
    { value: 'maturity', label: 'Maturity' }
  ];

  const soilOptions = [
    { value: 'alluvial', label: 'Alluvial' },
    { value: 'black', label: 'Black (Regur)' },
    { value: 'red', label: 'Red' },
    { value: 'laterite', label: 'Laterite' },
    { value: 'sandy', label: 'Sandy' }
  ];

  // Mock fertilizer recommendations based on selection
  const getFertilizerRecommendation = (): FertilizerRecommendation => {
    const recommendations: { [key: string]: { [key: string]: FertilizerRecommendation } } = {
      rice: {
        planting: {
          cropName: 'Rice',
          stage: 'Planting/Transplanting',
          nitrogen: 60,
          phosphorus: 30,
          potassium: 20,
          applicationTime: 'At transplanting',
          method: 'Broadcast and incorporate',
          frequency: 'Once',
          waterRequirement: '5-7 cm standing water'
        },
        vegetative: {
          cropName: 'Rice',
          stage: 'Vegetative Growth',
          nitrogen: 40,
          phosphorus: 0,
          potassium: 20,
          applicationTime: '21 days after transplanting',
          method: 'Top dressing',
          frequency: 'Once',
          waterRequirement: '5-7 cm standing water'
        },
        flowering: {
          cropName: 'Rice',
          stage: 'Panicle Initiation',
          nitrogen: 40,
          phosphorus: 0,
          potassium: 0,
          applicationTime: '42 days after transplanting',
          method: 'Top dressing',
          frequency: 'Once',
          waterRequirement: '5-7 cm standing water'
        }
      },
      cotton: {
        planting: {
          cropName: 'Cotton',
          stage: 'Sowing',
          nitrogen: 30,
          phosphorus: 60,
          potassium: 30,
          applicationTime: 'At sowing',
          method: 'Seed furrow placement',
          frequency: 'Once',
          waterRequirement: 'Light irrigation'
        },
        vegetative: {
          cropName: 'Cotton',
          stage: 'Square Formation',
          nitrogen: 60,
          phosphorus: 0,
          potassium: 30,
          applicationTime: '45 days after sowing',
          method: 'Side dressing',
          frequency: 'Split application',
          waterRequirement: 'Regular irrigation'
        }
      }
    };

    return recommendations[selectedCrop]?.[cropStage] || recommendations.rice.planting;
  };

  const recommendation = getFertilizerRecommendation();

  const calculateFertilizerQuantity = (nutrient: number, area: number) => {
    return (nutrient * area).toFixed(1);
  };

  const organicAlternatives = [
    {
      name: 'Vermicompost',
      npk: '1-0.5-1',
      application: '2-3 tons per hectare',
      benefits: 'Improves soil structure, water retention, and microbial activity'
    },
    {
      name: 'Farm Yard Manure',
      npk: '0.5-0.2-0.5',
      application: '10-15 tons per hectare',
      benefits: 'Slow release nutrients, organic matter addition'
    },
    {
      name: 'Neem Cake',
      npk: '5-1-1',
      application: '200-250 kg per hectare',
      benefits: 'Pest control properties, slow release nitrogen'
    },
    {
      name: 'Green Manure',
      npk: 'Variable',
      application: 'Incorporate before flowering',
      benefits: 'Nitrogen fixation, soil fertility improvement'
    }
  ];

  const irrigationSchedule = [
    {
      stage: 'After fertilizer application',
      timing: 'Immediate',
      amount: 'Light watering',
      purpose: 'Nutrient activation'
    },
    {
      stage: '24-48 hours later',
      timing: '1-2 days',
      amount: 'Normal irrigation',
      purpose: 'Root uptake facilitation'
    },
    {
      stage: 'Follow-up',
      timing: '7 days',
      amount: 'As per crop requirement',
      purpose: 'Continued nutrient availability'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2 flex items-center">
          <Sprout className="mr-2 text-green-500" />
          Smart Fertilizer & Irrigation Guide
        </h1>
        <p className="text-gray-600">Get personalized fertilizer recommendations and irrigation schedules for optimal crop nutrition</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Input Parameters */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <Calculator className="mr-2 text-blue-500" />
              Input Parameters
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Crop Type
                </label>
                <select
                  value={selectedCrop}
                  onChange={(e) => setSelectedCrop(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                >
                  {cropOptions.map(option => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Growth Stage
                </label>
                <select
                  value={cropStage}
                  onChange={(e) => setCropStage(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                >
                  {stageOptions.map(option => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Land Area (Hectares)
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={landArea}
                  onChange={(e) => setLandArea(parseFloat(e.target.value) || 1)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Soil Type
                </label>
                <select
                  value={soilType}
                  onChange={(e) => setSoilType(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                >
                  {soilOptions.map(option => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Quick Tips */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-blue-800 mb-4">💡 Application Tips</h3>
            <ul className="text-sm text-blue-700 space-y-2">
              <li>• Apply fertilizers during cooler hours (early morning/evening)</li>
              <li>• Ensure soil moisture before application</li>
              <li>• Mix fertilizers uniformly with soil</li>
              <li>• Water immediately after application</li>
            </ul>
          </div>
        </div>

        {/* Recommendations */}
        <div className="lg:col-span-2 space-y-6">
          {/* NPK Recommendation */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <Beaker className="mr-2 text-purple-500" />
              Fertilizer Recommendation for {recommendation.cropName}
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-green-50 p-4 rounded-lg text-center">
                <h4 className="font-bold text-green-800">Nitrogen (N)</h4>
                <p className="text-2xl font-bold text-green-600">{recommendation.nitrogen} kg/ha</p>
                <p className="text-sm text-green-700">
                  Total: {calculateFertilizerQuantity(recommendation.nitrogen, landArea)} kg
                </p>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg text-center">
                <h4 className="font-bold text-blue-800">Phosphorus (P)</h4>
                <p className="text-2xl font-bold text-blue-600">{recommendation.phosphorus} kg/ha</p>
                <p className="text-sm text-blue-700">
                  Total: {calculateFertilizerQuantity(recommendation.phosphorus, landArea)} kg
                </p>
              </div>
              <div className="bg-yellow-50 p-4 rounded-lg text-center">
                <h4 className="font-bold text-yellow-800">Potassium (K)</h4>
                <p className="text-2xl font-bold text-yellow-600">{recommendation.potassium} kg/ha</p>
                <p className="text-sm text-yellow-700">
                  Total: {calculateFertilizerQuantity(recommendation.potassium, landArea)} kg
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">Application Details</h4>
                <div className="space-y-2 text-sm">
                  <p><strong>Stage:</strong> {recommendation.stage}</p>
                  <p><strong>Timing:</strong> {recommendation.applicationTime}</p>
                  <p><strong>Method:</strong> {recommendation.method}</p>
                  <p><strong>Frequency:</strong> {recommendation.frequency}</p>
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">Water Management</h4>
                <div className="space-y-2 text-sm">
                  <p><strong>Requirement:</strong> {recommendation.waterRequirement}</p>
                  <p><strong>Post-application:</strong> Light watering immediately</p>
                  <p><strong>Follow-up:</strong> Normal irrigation after 24 hours</p>
                </div>
              </div>
            </div>
          </div>

          {/* Irrigation Schedule */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <Droplets className="mr-2 text-cyan-500" />
              Post-Fertilization Irrigation Schedule
            </h3>
            
            <div className="space-y-3">
              {irrigationSchedule.map((schedule, index) => (
                <div key={index} className="flex items-center p-3 bg-gray-50 rounded-lg">
                  <div className="flex-shrink-0 w-8 h-8 bg-cyan-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-4">
                    {index + 1}
                  </div>
                  <div className="flex-grow">
                    <h4 className="font-semibold text-gray-800">{schedule.stage}</h4>
                    <p className="text-sm text-gray-600">
                      <strong>Timing:</strong> {schedule.timing} | 
                      <strong> Amount:</strong> {schedule.amount} | 
                      <strong> Purpose:</strong> {schedule.purpose}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Organic Alternatives */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <Sprout className="mr-2 text-green-500" />
              Organic Fertilizer Alternatives
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {organicAlternatives.map((organic, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-800 mb-2">{organic.name}</h4>
                  <div className="space-y-1 text-sm">
                    <p><strong>NPK:</strong> {organic.npk}</p>
                    <p><strong>Application:</strong> {organic.application}</p>
                    <p className="text-gray-600">{organic.benefits}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Important Warnings */}
          <div className="bg-orange-50 border border-orange-200 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-orange-800 mb-4 flex items-center">
              <AlertCircle className="mr-2" />
              Important Safety Guidelines
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-orange-700">
              <div>
                <h4 className="font-semibold mb-2">Before Application:</h4>
                <ul className="list-disc list-inside space-y-1">
                  <li>Check weather forecast - avoid before heavy rain</li>
                  <li>Ensure adequate soil moisture</li>
                  <li>Wear protective equipment</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">After Application:</h4>
                <ul className="list-disc list-inside space-y-1">
                  <li>Water immediately but gently</li>
                  <li>Monitor crop response for 7-10 days</li>
                  <li>Store remaining fertilizers safely</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FertilizerGuide;