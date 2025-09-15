import React, { useState, useEffect } from "react";
import { Send, MessageCircle, Bot, User } from "lucide-react";

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: string;
}

const ChatSupport: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [botReady, setBotReady] = useState(false);

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
      timestamp: new Date().toLocaleTimeString(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    // Send to Botpress if ready
    if (botReady) {
      // @ts-ignore
      window.botpressWebChat.sendEvent({
        type: "message",
        text,
      });

      // Listen for bot response
      // @ts-ignore
      window.botpressWebChat.onEvent((event: any) => {
        if (event.type === "message" && event.payload.type === "text") {
          const botMessage: Message = {
            id: event.id,
            text: event.payload.text,
            isBot: true,
            timestamp: new Date().toLocaleTimeString(),
          };
          setMessages((prev) => [...prev, botMessage]);
        }
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto h-[calc(100vh-8rem)] flex flex-col border rounded-lg shadow-md">
      {/* Header */}
      <div className="bg-white rounded-t-lg p-4 border-b">
        <h1 className="text-xl font-bold flex items-center">
          <MessageCircle className="mr-2 text-green-500" />
          AI Farming Assistant
        </h1>
        <p className="text-sm text-gray-600">
          Get instant help with your farming queries
        </p>
      </div>

      {/* Quick Questions */}
      <div className="flex flex-wrap gap-2 p-3 bg-gray-50 border-b">
        {quickQuestions.map((q, i) => (
          <button
            key={i}
            onClick={() => sendMessage(q)}
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
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage(input)}
          placeholder="Ask your question..."
          className="flex-1 p-2 border rounded-lg focus:ring-2 focus:ring-green-500"
        />
        <button
          onClick={() => sendMessage(input)}
          className="p-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
        >
          <Send size={18} />
        </button>
      </div>
    </div>
  );
};

export default ChatSupport;
