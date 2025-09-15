import React, { useState } from 'react';
import { Upload, Camera, AlertTriangle, CheckCircle, Loader, Bug, Leaf } from 'lucide-react';

interface DetectionResult {
  pestName: string;
  confidence: number;
  severity: 'low' | 'medium' | 'high';
  remedies: string[];
  preventiveMeasures: string[];
  organicSolutions: string[];
}

const PestDetection: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [detectionResult, setDetectionResult] = useState<DetectionResult | null>(null);
  const [cropType, setCropType] = useState('rice');

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
        setDetectionResult(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyze = async () => {
    if (!selectedImage) return;
    
    setIsAnalyzing(true);
    
    // Simulate AI analysis
    await new Promise(resolve => setTimeout(resolve, 4000));
    
    // Mock detection result
    const mockResult: DetectionResult = {
      pestName: 'Brown Plant Hopper',
      confidence: 87,
      severity: 'medium',
      remedies: [
        'Spray Neem oil solution (5ml per liter of water)',
        'Apply Imidacloprid 17.8% SL @ 100ml per acre',
        'Use sticky yellow traps to catch adult hoppers',
        'Remove and destroy heavily infested plants'
      ],
      preventiveMeasures: [
        'Maintain proper plant spacing for air circulation',
        'Avoid excessive nitrogen fertilization',
        'Remove weeds and plant debris regularly',
        'Monitor plants weekly for early detection'
      ],
      organicSolutions: [
        'Neem oil spray (10ml per liter)',
        'Soap solution spray (5ml liquid soap per liter)',
        'Release natural predators like ladybirds',
        'Use pheromone traps for monitoring'
      ]
    };
    
    setDetectionResult(mockResult);
    setIsAnalyzing(false);
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'text-red-600 bg-red-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const commonPests = [
    {
      name: 'Aphids',
      crops: ['Rice', 'Wheat', 'Cotton'],
      image: 'https://images.pexels.com/photos/8142047/pexels-photo-8142047.jpeg?auto=compress&cs=tinysrgb&w=200&h=200'
    },
    {
      name: 'Brown Plant Hopper',
      crops: ['Rice'],
      image: 'https://images.pexels.com/photos/8142047/pexels-photo-8142047.jpeg?auto=compress&cs=tinysrgb&w=200&h=200'
    },
    {
      name: 'Bollworm',
      crops: ['Cotton'],
      image: 'https://images.pexels.com/photos/8142047/pexels-photo-8142047.jpeg?auto=compress&cs=tinysrgb&w=200&h=200'
    },
    {
      name: 'Stem Borer',
      crops: ['Rice', 'Sugarcane'],
      image: 'https://images.pexels.com/photos/8142047/pexels-photo-8142047.jpeg?auto=compress&cs=tinysrgb&w=200&h=200'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2 flex items-center">
          <Bug className="mr-2 text-red-500" />
          Pest & Disease Detection
        </h1>
        <p className="text-gray-600">Upload a photo of affected plant leaves for AI-powered pest identification and treatment recommendations</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upload Section */}
        <div className="space-y-6">
          {/* Crop Selection */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-lg font-semibold mb-4">Select Crop Type</h3>
            <select
              value={cropType}
              onChange={(e) => setCropType(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
            >
              <option value="rice">Rice</option>
              <option value="cotton">Cotton</option>
              <option value="wheat">Wheat</option>
              <option value="sugarcane">Sugarcane</option>
              <option value="tomato">Tomato</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* Image Upload */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-lg font-semibold mb-4">Upload Plant Image</h3>
            
            {!selectedImage ? (
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <div className="flex flex-col items-center">
                  <Camera className="text-gray-400 mb-4" size={48} />
                  <h4 className="text-lg font-medium text-gray-900 mb-2">Upload Photo</h4>
                  <p className="text-gray-500 mb-4">Take a clear photo of affected leaves or plant parts</p>
                  
                  <label className="bg-green-500 text-white px-6 py-3 rounded-lg cursor-pointer hover:bg-green-600 transition-colors flex items-center">
                    <Upload className="mr-2" size={16} />
                    Choose File
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <img
                  src={selectedImage}
                  alt="Uploaded plant"
                  className="w-full h-64 object-cover rounded-lg"
                />
                
                <div className="flex space-x-2">
                  <label className="flex-1 bg-gray-500 text-white py-2 px-4 rounded-lg cursor-pointer hover:bg-gray-600 transition-colors text-center">
                    Change Image
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                  
                  <button
                    onClick={handleAnalyze}
                    disabled={isAnalyzing}
                    className="flex-1 bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition-colors disabled:opacity-50 flex items-center justify-center"
                  >
                    {isAnalyzing ? (
                      <>
                        <Loader className="animate-spin mr-2" size={16} />
                        Analyzing...
                      </>
                    ) : (
                      <>
                        <Bug className="mr-2" size={16} />
                        Detect Pest
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}

            <div className="mt-4 p-4 bg-blue-50 rounded-lg">
              <h4 className="font-semibold text-blue-800 mb-2">📸 Photo Guidelines</h4>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• Take photos in good lighting</li>
                <li>• Focus on affected leaves or plant parts</li>
                <li>• Include both affected and healthy areas</li>
                <li>• Avoid blurry or dark images</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Results Section */}
        <div className="space-y-6">
          {detectionResult ? (
            <>
              {/* Detection Results */}
              <div className="bg-white rounded-xl shadow-md p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <CheckCircle className="mr-2 text-green-500" />
                  Detection Results
                </h3>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h4 className="text-xl font-bold text-gray-800">{detectionResult.pestName}</h4>
                    <span className="text-2xl font-bold text-green-600">{detectionResult.confidence}%</span>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-600">Severity Level:</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-bold ${getSeverityColor(detectionResult.severity)}`}>
                      {detectionResult.severity.toUpperCase()}
                    </span>
                  </div>
                </div>
              </div>

              {/* Treatment Recommendations */}
              <div className="bg-white rounded-xl shadow-md p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <AlertTriangle className="mr-2 text-orange-500" />
                  Treatment Recommendations
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Immediate Actions:</h4>
                    <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                      {detectionResult.remedies.map((remedy, index) => (
                        <li key={index}>{remedy}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Organic Solutions:</h4>
                    <ul className="list-disc list-inside space-y-1 text-sm text-green-700">
                      {detectionResult.organicSolutions.map((solution, index) => (
                        <li key={index}>{solution}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Prevention Tips:</h4>
                    <ul className="list-disc list-inside space-y-1 text-sm text-blue-700">
                      {detectionResult.preventiveMeasures.map((measure, index) => (
                        <li key={index}>{measure}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </>
          ) : (
            /* Common Pests Reference */
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <Leaf className="mr-2 text-green-500" />
                Common Pests Reference
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {commonPests.map((pest, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <img
                      src={pest.image}
                      alt={pest.name}
                      className="w-full h-32 object-cover rounded-lg mb-3"
                    />
                    <h4 className="font-semibold text-gray-800">{pest.name}</h4>
                    <p className="text-sm text-gray-600">
                      Common in: {pest.crops.join(', ')}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Emergency Contact */}
      <div className="bg-red-50 border border-red-200 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-red-800 mb-2">🚨 Emergency Pest Control</h3>
        <p className="text-red-700 mb-4">For severe pest outbreaks affecting large areas, contact our emergency helpline immediately.</p>
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
          <div className="text-red-800">
            <span className="font-semibold">Helpline:</span> 1800-180-1551
          </div>
          <div className="text-red-800">
            <span className="font-semibold">WhatsApp:</span> +91 9876543210
          </div>
        </div>
      </div>
    </div>
  );
};

export default PestDetection;