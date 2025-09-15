import React, { useState, useEffect } from "react";
import {
  Send,
  Mic,
  MicOff,
  MessageCircle,
  Bot,
  User,
  Phone,
} from "lucide-react";

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: string;
  language: string;
}

const ChatSupport: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isMicOn, setIsMicOn] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const [showBotpressChat, setShowBotpressChat] = useState(false);

  const languages = [
    { code: "en", name: "English", flag: "🇬🇧" },
    { code: "ta", name: "தமிழ்", flag: "🇮🇳" },
    { code: "hi", name: "हिन्दी", flag: "🇮🇳" },
  ];

  const quickQuestions = [
    "Best crop for this season?",
    "Fertilizer for paddy?",
    "How to control pests in cotton?",
    "Market price of maize?",
  ];

  const handleSend = () => {
    if (!input.trim()) return;
    const newMessage: Message = {
      id: Date.now().toString(),
      text: input,
      isBot: false,
      timestamp: new Date().toLocaleTimeString(),
      language: selectedLanguage,
    };
    setMessages((prev) => [...prev, newMessage]);
    setInput("");

    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "This is an AI response for: " + newMessage.text,
        isBot: true,
        timestamp: new Date().toLocaleTimeString(),
        language: selectedLanguage,
      };
      setMessages((prev) => [...prev, botMessage]);
    }, 1000);
  };

  // Dynamically inject Botpress scripts
  useEffect(() => {
    if (!showBotpressChat) return;

    // Main Botpress Webchat script
    const script1 = document.createElement("script");
    script1.src = "https://cdn.botpress.cloud/webchat/v3.3/inject.js";
    script1.async = true;
    document.body.appendChild(script1);

    // Your bot configuration script
    const script2 = document.createElement("script");
    script2.src =
      "https://files.bpcontent.cloud/2025/09/15/04/20250915042914-7NVBIH3W.js";
    script2.defer = true;
    document.body.appendChild(script2);

    return () => {
      document.body.removeChild(script1);
      document.body.removeChild(script2);
    };
  }, [showBotpressChat]);

  return (
    <div className="max-w-4xl mx-auto h-[calc(100vh-8rem)] flex flex-col">
      {/* Header */}
      <div className="bg-white rounded-t-xl shadow-md p-4 border-b flex justify-between items-center">
        <div>
          <h1 className="text-xl font-bold text-gray-800 flex items-center">
            <MessageCircle className="mr-2 text-green-500" />
            AI Farming Assistant
          </h1>
          <p className="text-sm text-gray-600">
            Get instant help with your farming queries
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <select
            value={selectedLanguage}
            onChange={(e) => setSelectedLanguage(e.target.value)}
            className="p-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-green-500"
          >
            {languages.map((lang) => (
              <option key={lang.code} value={lang.code}>
                {lang.flag} {lang.name}
              </option>
            ))}
          </select>

          <button
            onClick={() => setShowBotpressChat((prev) => !prev)}
            className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            <Phone size={16} />
          </button>
        </div>
      </div>

      {/* Quick Questions */}
      <div className="flex flex-wrap gap-2 p-3 bg-gray-50 border-b">
        {quickQuestions.map((q, i) => (
          <button
            key={i}
            onClick={() => setInput(q)}
            className="px-3 py-1 text-sm bg-green-100 hover:bg-green-200 rounded-lg"
          >
            {q}
          </button>
        ))}
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-start space-x-2 ${
              msg.isBot ? "justify-start" : "justify-end"
            }`}
          >
            {msg.isBot && (
              <Bot className="text-green-500 mt-1 w-5 h-5 flex-shrink-0" />
            )}
            <div
              className={`p-3 rounded-lg shadow-sm max-w-xs ${
                msg.isBot ? "bg-white text-gray-800" : "bg-green-500 text-white"
              }`}
            >
              <p>{msg.text}</p>
              <span className="text-xs opacity-70">{msg.timestamp}</span>
            </div>
            {!msg.isBot && (
              <User className="text-blue-500 mt-1 w-5 h-5 flex-shrink-0" />
            )}
          </div>
        ))}
      </div>

      {/* Input Area */}
      <div className="p-3 border-t bg-white flex items-center space-x-2">
        <button
          onClick={() => setIsMicOn((prev) => !prev)}
          className={`p-2 rounded-full ${
            isMicOn ? "bg-red-500 text-white" : "bg-gray-200 text-gray-700"
          }`}
        >
          {isMicOn ? <MicOff size={18} /> : <Mic size={18} />}
        </button>

        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="Ask your question..."
          className="flex-1 p-2 border rounded-lg focus:ring-2 focus:ring-green-500"
        />

        <button
          onClick={handleSend}
          className="p-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
        >
          <Send size={18} />
        </button>
      </div>
    </div>
  );
};

export default ChatSupport;
