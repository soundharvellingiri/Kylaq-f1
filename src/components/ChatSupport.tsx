import React, { useState } from 'react';
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

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'hi', name: 'हिंदी', flag: '🇮🇳' },
    { code: 'ta', name: 'தமிழ்', flag: '🇮🇳' }
  ];

  const quickQuestions = [
    "Best crop for this season?",
    "Fertilizer for paddy?",
    "How to control pests in cotton?",
    "Market price of maize?",
  ];

  // Load Botpress Webchat scripts
  useEffect(() => {
    const script1 = document.createElement("script");
    script1.src = "https://cdn.botpress.cloud/webchat/v3.3/inject.js";
    script1.async = true;

    const script2 = document.createElement("script");
    script2.src =
      "https://files.bpcontent.cloud/2025/09/15/04/20250915042914-EXPAIKC6.js";
    script2.defer = true;

    script2.onload = () => {
      setBotReady(true);
    };

    document.body.appendChild(script1);
    document.body.appendChild(script2);

    return () => {
      document.body.removeChild(script1);
      document.body.removeChild(script2);
    };
  }, []);

  // Send a message to Botpress
  const sendMessage = (text: string) => {
    if (!text.trim()) return;

    // Add user message to chat
    const userMessage: Message = {
      id: Date.now().toString(),
      text,
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
