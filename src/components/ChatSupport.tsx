import React, { useState, useEffect } from 'react';
import { Send, Mic, MicOff, Volume2, Globe, Phone, MessageCircle, Bot, User } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: string;
  language: string;
}

const ChatSupport: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hello! I\'m your AI farming assistant. How can I help you today? You can ask me about crops, diseases, market prices, or any farming queries.',
      isBot: true,
      timestamp: new Date().toISOString(),
      language: 'en'
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  // ✅ Inject Botpress scripts on mount
  useEffect(() => {
    const injectScript = (src: string, defer: boolean = false) => {
      if (!document.querySelector(`script[src="${src}"]`)) {
        const script = document.createElement('script');
        script.src = src;
        if (defer) script.defer = true;
        document.body.appendChild(script);
      }
    };

    injectScript("https://cdn.botpress.cloud/webchat/v3.3/inject.js");
    injectScript("https://files.bpcontent.cloud/2025/09/15/04/20250915042914-7NVBIH3W.js", true);

    return () => {
      // Cleanup scripts on unmount if needed
    };
  }, []);

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'hi', name: 'हिंदी', flag: '🇮🇳' },
    { code: 'ta', name: 'தமிழ்', flag: '🇮🇳' }
  ];

  const quickQuestions = [
    { text: 'What crop should I plant this season?', category: 'crop' },
    { text: 'How to treat leaf yellowing?', category: 'disease' },
    { text: 'Current rice prices?', category: 'market' },
    { text: 'Fertilizer for cotton crop?', category: 'fertilizer' },
    { text: 'Weather forecast for farming?', category: 'weather' },
    { text: 'Organic farming tips?', category: 'organic' }
  ];

  const getBotResponse = (userMessage: string): string => {
    const msg = userMessage.toLowerCase();
    
    if (msg.includes('price') || msg.includes('market')) {
      return 'Current market prices: Rice ₹2,850/quintal (↑4.8%), Cotton ₹6,420/quintal (→0%), Wheat ₹2,340/quintal (↓1.7%). Prices are updated every 4 hours from major mandis. Would you like detailed price trends for any specific crop?';
    }
    
    if (msg.includes('crop') && (msg.includes('recommend') || msg.includes('suggest') || msg.includes('plant'))) {
      return 'Based on current season and common farming patterns, I recommend: 1) Rice - High water availability, good monsoon expected. 2) Cotton - Moderate water needs, good market demand. 3) Sugarcane - Long-term crop, stable pricing. Would you like detailed analysis for any specific crop?';
    }
    
    if (msg.includes('disease') || msg.includes('pest') || msg.includes('yellow') || msg.includes('spot')) {
      return 'For disease diagnosis, I recommend uploading a photo using our Pest Detection feature. Common symptoms like yellowing can indicate: 1) Nutrient deficiency (check soil), 2) Fungal infections (use neem oil), 3) Pest damage (inspect leaves). Can you describe the symptoms in detail?';
    }
    
    if (msg.includes('fertilizer') || msg.includes('npk')) {
      return 'Fertilizer recommendations depend on your crop and growth stage. General guidelines: For Rice: 150-60-40 (N-P-K) kg/ha split in 3 applications. For Cotton: 120-80-60 kg/ha. Visit our Fertilizer Guide for personalized recommendations. What crop are you growing?';
    }
    
    if (msg.includes('water') || msg.includes('irrigation')) {
      return 'Irrigation scheduling varies by crop: Rice needs 5-7cm standing water, Cotton requires 4-6cm per irrigation every 7-10 days, Wheat needs light irrigation every 15-20 days. Current weather shows good moisture levels. What crop are you irrigating?';
    }
    
    if (msg.includes('weather')) {
      return 'Current weather: Temperature 28°C, Humidity 72%, Expected rainfall 45mm in next 3 days. Good conditions for most crops. Heavy rainfall expected - secure your harvest and ensure proper drainage. Need specific weather info for your location?';
    }
    
    // Default response
    return 'I understand you\'re asking about farming. I can help with crop recommendations, pest control, market prices, fertilizers, and irrigation. Could you please be more specific about what you\'d like to know? You can also use our specialized features like Crop Recommendation or Pest Detection for detailed analysis.';
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      isBot: false,
      timestamp: new Date().toISOString(),
      language: selectedLanguage
    };

    const botMessage: Message = {
      id: (Date.now() + 1).toString(),
      text: getBotResponse(inputMessage),
      isBot: true,
      timestamp: new Date().toISOString(),
      language: selectedLanguage
    };

    setMessages(prev => [...prev, userMessage, botMessage]);
    setInputMessage('');
  };

  const handleQuickQuestion = (question: string) => {
    setInputMessage(question);
  };

  const handleVoiceInput = () => {
    setIsListening(!isListening);
    if (!isListening) {
      setTimeout(() => {
        setIsListening(false);
        setInputMessage('What is the current price of rice?');
      }, 3000);
    }
  };

  const handleSpeak = (text: string) => {
    setIsSpeaking(true);
    setTimeout(() => setIsSpeaking(false), 2000);
  };

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <>
      {/* Existing React Chat UI */}
      <div className="max-w-4xl mx-auto h-[calc(100vh-8rem)] flex flex-col">
        {/* ...your JSX from before */}
      </div>

      {/* ✅ Botpress webchat will float as widget */}
      <div id="bp-webchat"></div>
    </>
  );
};

export default ChatSupport;
