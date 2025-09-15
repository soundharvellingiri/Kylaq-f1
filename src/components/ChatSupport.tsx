import React, { useEffect, useState } from "react";

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: string;
}

const ChatSupport: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    // Load Botpress Webchat script
    const script = document.createElement("script");
    script.src = "https://cdn.botpress.cloud/webchat/v3.3/inject.js";
    script.async = true;
    document.body.appendChild(script);

    // @ts-ignore
    script.onload = () => {
      // Initialize the bot
      // @ts-ignore
      window.botpressWebChat.init({
        host: "https://cdn.botpress.cloud/webchat/v3.3",
        botId: "EXPAIKC6",
        showConversationsButton: false,
        enableReset: true,
      });

      // Listen to bot messages
      // @ts-ignore
      window.botpressWebChat.onEvent((event: any) => {
        if (event.type === "message" && event.payload.type === "text") {
          setMessages((prev) => [
            ...prev,
            {
              id: event.id,
              text: event.payload.text,
              isBot: event.direction === "incoming",
              timestamp: new Date().toLocaleTimeString(),
            },
          ]);
        }
      });
    };

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const sendMessage = () => {
    if (!input.trim()) return;

    // Show user message locally
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        text: input,
        isBot: false,
        timestamp: new Date().toLocaleTimeString(),
      },
    ]);

    // Send message to Botpress
    // @ts-ignore
    window.botpressWebChat.sendEvent({ type: "message", text: input });

    setInput("");
  };

  return (
    <div className="max-w-2xl mx-auto p-4 flex flex-col h-[80vh]">
      <div className="flex-1 overflow-y-auto mb-3 space-y-2">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`p-2 rounded-md max-w-xs ${
              msg.isBot ? "bg-gray-200 self-start" : "bg-green-500 text-white self-end"
            }`}
          >
            {msg.text}
          </div>
        ))}
      </div>

      <div className="flex space-x-2">
        <input
          className="flex-1 p-2 border rounded"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Ask your question..."
        />
        <button
          className="bg-green-500 text-white px-4 rounded"
          onClick={sendMessage}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatSupport;
