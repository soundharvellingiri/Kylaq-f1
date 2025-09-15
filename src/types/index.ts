export interface Farmer {
  id: string;
  phone: string;
  aadhaar?: string;
  name: string;
  landSize: number;
  soilType: string;
  location: string;
  state: string;
  district: string;
  cropHistory: string[];
  preferredLanguage: 'en' | 'hi' | 'ta';
  createdAt: string;
}

export interface SoilData {
  nitrogen: number;
  phosphorus: number;
  potassium: number;
  ph: number;
  organic_carbon: number;
  moisture: number;
}

export interface WeatherData {
  temperature: number;
  humidity: number;
  rainfall: number;
  season: 'summer' | 'winter' | 'monsoon' | 'post_monsoon';
}

export interface CropRecommendation {
  cropName: string;
  confidence: number;
  reasons: string[];
  expectedYield: number;
  profitability: 'high' | 'medium' | 'low';
  seasonality: string;
  waterRequirement: 'low' | 'medium' | 'high';
  fertilizerRecommendation: {
    nitrogen: number;
    phosphorus: number;
    potassium: number;
    schedule: string[];
  };
  irrigationSchedule: {
    frequency: string;
    amount: string;
    seasons: string[];
  };
}

export interface MarketPrice {
  cropName: string;
  currentPrice: number;
  previousPrice: number;
  trend: 'up' | 'down' | 'stable';
  marketLocation: string;
  lastUpdated: string;
}

export interface PestDetection {
  id: string;
  imageUrl: string;
  detectedPest?: string;
  confidence?: number;
  remedies?: string[];
  farmerId: string;
  cropType: string;
  detectionDate: string;
}

export interface ChatMessage {
  id: string;
  message: string;
  isBot: boolean;
  timestamp: string;
  language: 'en' | 'hi' | 'ta';
}