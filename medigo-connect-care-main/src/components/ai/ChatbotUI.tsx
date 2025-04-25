
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { SendHorizontal, Bot, User } from "lucide-react";
import { cn } from "@/lib/utils";

type Message = {
  id: number;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
};

export default function ChatbotUI() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hello! I'm your MediGo AI assistant. I can help you find alternative medicines, answer questions about medications, and provide general health advice. How can I help you today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = () => {
    if (!input.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: messages.length + 1,
      text: input,
      sender: "user",
      timestamp: new Date(),
    };
    setMessages([...messages, userMessage]);
    setInput("");
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const botResponses = [
        "I can suggest some alternatives for that medication. Would you like me to provide options based on generic equivalents or similar therapeutic effects?",
        "Based on your symptoms, I recommend consulting with a doctor. Would you like me to help you find an available doctor for a consultation?",
        "That medication is commonly used for treating this condition. Some common side effects include headache and nausea. Always consult your doctor before changing medications.",
        "I've found several alternatives for your medication. Remember to consult with your doctor before making any changes to your prescription.",
      ];

      const botMessage: Message = {
        id: messages.length + 2,
        text: botResponses[Math.floor(Math.random() * botResponses.length)],
        sender: "bot",
        timestamp: new Date(),
      };

      setMessages((prevMessages) => [...prevMessages, botMessage]);
      setIsLoading(false);
    }, 1000);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-[500px] rounded-lg border shadow-sm bg-white">
      <div className="flex items-center p-4 border-b">
        <Avatar className="h-8 w-8 mr-2">
          <AvatarFallback className="bg-medigo-100 text-medigo-500">AI</AvatarFallback>
        </Avatar>
        <div>
          <h3 className="font-medium">MediGo AI Assistant</h3>
          <p className="text-xs text-gray-500">Online</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={cn(
              "flex",
              message.sender === "user" ? "justify-end" : "justify-start"
            )}
          >
            <div
              className={cn(
                "rounded-lg px-4 py-2 max-w-[80%]",
                message.sender === "user"
                  ? "bg-medigo-500 text-white"
                  : "bg-gray-100 text-gray-800"
              )}
            >
              <div className="flex items-center mb-1">
                {message.sender === "bot" ? (
                  <Bot className="h-4 w-4 mr-1" />
                ) : (
                  <User className="h-4 w-4 mr-1" />
                )}
                <span className="text-xs">
                  {message.sender === "user" ? "You" : "AI Assistant"} •{" "}
                  {message.timestamp.toLocaleTimeString([], { 
                    hour: "2-digit", 
                    minute: "2-digit" 
                  })}
                </span>
              </div>
              <p>{message.text}</p>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-gray-100 text-gray-800 rounded-lg px-4 py-2">
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.4s" }}></div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="p-4 border-t">
        <div className="flex items-center">
          <Input
            type="text"
            placeholder="Ask about medicines, alternatives, or health advice..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 mr-2"
          />
          <Button 
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className="bg-medigo-500 hover:bg-medigo-600"
          >
            <SendHorizontal className="h-4 w-4" />
          </Button>
        </div>
        <p className="text-xs text-gray-500 mt-2">
          Note: This AI provides general information only. Always consult a healthcare professional for medical advice.
        </p>
      </div>
    </div>
  );
}
