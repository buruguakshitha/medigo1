import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { SendHorizontal, Bot, User } from "lucide-react";
import { cn } from "@/lib/utils";
import Bot from "./Bot";  // Importing the Bot component

type Message = {
  id: number;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
};

export default function ChatbotUI() {
  return (
    <div>
      {/* Render the Bot component here */}
      <Bot />

      {/* You can also add other UI elements like messages, input, etc., here */}
      {/* <div>
        <Avatar>
          <AvatarImage src="user-image.jpg" alt="User" />
          <AvatarFallback>U</AvatarFallback>
        </Avatar>
        
        <Input placeholder="Type a message..." />
        <Button>Send</Button>
      </div> */}
    </div>
  );
}
