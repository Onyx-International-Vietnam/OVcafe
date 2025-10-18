"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState, useRef, useEffect } from "react";

const FAKE_USERS = [
  { id: 1, name: "Minh Anh", color: "text-blue-600" },
  { id: 2, name: "Thu Hà", color: "text-purple-600" },
  { id: 3, name: "Quang Huy", color: "text-green-600" },
  { id: 4, name: "Lan Anh", color: "text-pink-600" },
];

const FAKE_MESSAGES = [
  "Chào mọi người! 👋",
  "Hôm nay quán có món gì ngon không?",
  "Mình đặt 1 ly cà phê sữa đá nhé",
  "Quán đông quá, ai ngồi chung bàn không?",
  "Wifi mật khẩu là gì vậy?",
  "Món này ngon lắm, mọi người nên thử",
  "Đã ai order món mới chưa?",
  "Quán này view đẹp thật!",
  "Có ai muốn chơi boardgame không?",
  "Thanks admin! 💖",
];

const generateFakeMessages = (count: number) => {
  return Array.from({ length: count }).map((_, i) => ({
    id: i,
    user: FAKE_USERS[Math.floor(Math.random() * FAKE_USERS.length)],
    message: FAKE_MESSAGES[Math.floor(Math.random() * FAKE_MESSAGES.length)],
    timestamp: new Date(Date.now() - Math.random() * 3600000).toLocaleTimeString('vi-VN', { 
      hour: '2-digit', 
      minute: '2-digit' 
    }),
  }));
};

export default function ChatTab() {
  const [messages, setMessages] = useState(() => generateFakeMessages(15));
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const newMessage = {
      id: messages.length,
      user: { id: 0, name: "Bạn", color: "text-orange-600" },
      message: inputValue,
      timestamp: new Date().toLocaleTimeString('vi-VN', { 
        hour: '2-digit', 
        minute: '2-digit' 
      }),
    };

    setMessages([...messages, newMessage]);
    setInputValue("");
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 overflow-y-auto space-y-3 pr-2 pb-2">
        {messages.map((msg) => (
          <div key={msg.id} className="text-sm">
            <div className="flex items-baseline gap-2">
              <b className={msg.user.color}>{msg.user.name}</b>
              <span className="text-xs text-muted-foreground">{msg.timestamp}</span>
            </div>
            <p className="mt-0.5 text-foreground/90">{msg.message}</p>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSubmit} className="flex gap-2 border-t pt-2 mt-auto">
        <Input 
          placeholder="Nhập tin nhắn..." 
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <Button type="submit">Gửi</Button>
      </form>
    </div>
  );
}
