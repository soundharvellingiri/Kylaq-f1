import React, { useState } from 'react';
import { Send, Mic, MicOff, Volume2, Globe, Phone, MessageCircle, Bot, User } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: string;
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
    // Voice recognition would be implemented here
    if (!isListening) {
      setTimeout(() => {
        setIsListening(false);
        setInputMessage('What is the current price of rice?');
      }, 3000);
    }
  };

  const handleSpeak = (text: string) => {
    setIsSpeaking(true);
    // Text-to-speech would be implemented here
    setTimeout(() => setIsSpeaking(false), 2000);
  };

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="max-w-4xl mx-auto h-[calc(100vh-8rem)] flex flex-col">
      {/* Header */}
      <div className="bg-white rounded-t-xl shadow-md p-4 border-b">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-xl font-bold text-gray-800 flex items-center">
              <MessageCircle className="mr-2 text-green-500" />
              AI Farming Assistant
            </h1>
            <p className="text-sm text-gray-600">Get instant help with your farming queries</p>
          </div>
          
          <div className="flex items-center space-x-2">
            <select
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
              className="p-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-green-500"
            >
              {languages.map(lang => (
                <option key={lang.code} value={lang.code}>
                  {lang.flag} {lang.name}
                </option>
              ))}
            </select>
            
            <button className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
              <Phone size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Quick Questions */}
      <div className="bg-gray-50 p-4 border-b">
        <h3 className="text-sm font-medium text-gray-700 mb-2">Quick Questions:</h3>
        <div className="flex flex-wrap gap-2">
          {quickQuestions.map((question, index) => (
            <button
              key={index}
              onClick={() => handleQuickQuestion(question.text)}
              className="px-3 py-1 bg-white text-gray-700 text-sm rounded-full border hover:bg-green-50 hover:border-green-300 transition-colors"
            >
              {question.text}
            </button>
          ))}
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
            >
              <div
                className={`max-w-xs lg:max-w-md px-4 py-3 rounded-lg ${
                  message.isBot
                    ? 'bg-white text-gray-800 shadow-md border'
                    : 'bg-green-500 text-white'
                }`}
              >
                <div className="flex items-start space-x-2">
                  {message.isBot && (
                    <div className="flex-shrink-0">
                      <Bot size={16} className="text-green-500 mt-1" />
                    </div>
                  )}
                  <div className="flex-1">
                    <p className="text-sm">{message.text}</p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xs opacity-75">
                        {formatTime(message.timestamp)}
                      </span>
                      {message.isBot && (
                        <button
                          onClick={() => handleSpeak(message.text)}
                          className="ml-2 p-1 hover:bg-gray-100 rounded"
                          disabled={isSpeaking}
                        >
                          <Volume2 
                            size={12} 
                            className={`${isSpeaking ? 'text-green-500' : 'text-gray-500'}`} 
                          />
                        </button>
                      )}
                    </div>
                  </div>
                  {!message.isBot && (
                    <div className="flex-shrink-0">
                      <User size={16} className="text-white mt-1" />
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Input Area */}
      <div className="bg-white rounded-b-xl shadow-md p-4 border-t">
        <div className="flex space-x-2">
          <button
            onClick={handleVoiceInput}
            className={`p-3 rounded-lg transition-colors ${
              isListening 
                ? 'bg-red-500 text-white' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {isListening ? <MicOff size={20} /> : <Mic size={20} />}
          </button>
          
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder={isListening ? 'Listening...' : 'Ask me anything about farming...'}
            className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            disabled={isListening}
          />
          
          <button
            onClick={handleSendMessage}
            disabled={!inputMessage.trim() || isListening}
            className="px-4 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send size={20} />
          </button>
        </div>

        <div className="flex items-center justify-between mt-2 text-xs text-gray-500">
          <span>Powered by AI • Available 24/7</span>
          <span>Emergency: 1800-180-1551</span>
        </div>
      </div>
    </div>
  );
};

export default ChatSupport;
