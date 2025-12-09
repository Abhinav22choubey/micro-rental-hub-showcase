import { useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send, Phone, MoreVertical, Check, CheckCheck, MapPin, IndianRupee } from "lucide-react";
import { cn } from "@/lib/utils";

const Chat = () => {
  const [message, setMessage] = useState("");
  const [activeChat, setActiveChat] = useState(0);

  const chats = [
    {
      id: 0,
      name: "Priya Sharma",
      avatar: "PS",
      item: "Canon DSLR Camera",
      itemImage: "📷",
      lastMessage: "Is it available for this weekend?",
      time: "2 min ago",
      unread: 2,
      online: true,
    },
    {
      id: 1,
      name: "Amit Kumar",
      avatar: "AK",
      item: "Power Drill Kit",
      itemImage: "🔧",
      lastMessage: "Thanks! I'll pick it up at 5 PM",
      time: "1 hour ago",
      unread: 0,
      online: false,
    },
    {
      id: 2,
      name: "Sneha Reddy",
      avatar: "SR",
      item: "Projector HD",
      itemImage: "📽️",
      lastMessage: "Can you do ₹350/day for 3 days?",
      time: "3 hours ago",
      unread: 1,
      online: true,
    },
  ];

  const messages = [
    {
      id: 1,
      sender: "other",
      text: "Hi! I saw your Canon DSLR Camera listing. Is it still available?",
      time: "10:30 AM",
      status: "read",
    },
    {
      id: 2,
      sender: "me",
      text: "Hey Priya! Yes, it's available. When do you need it?",
      time: "10:32 AM",
      status: "read",
    },
    {
      id: 3,
      sender: "other",
      text: "I'm planning a trip this weekend. Would need it from Friday to Sunday.",
      time: "10:35 AM",
      status: "read",
    },
    {
      id: 4,
      sender: "me",
      text: "That works! So 3 days at ₹500/day would be ₹1,500 total. Does that sound good?",
      time: "10:36 AM",
      status: "read",
    },
    {
      id: 5,
      sender: "other",
      text: "Is it available for this weekend?",
      time: "10:38 AM",
      status: "delivered",
    },
  ];

  const currentChat = chats[activeChat];

  return (
    <DashboardLayout>
      <div className="h-[calc(100vh-4rem)] lg:h-screen flex">
        {/* Chat List */}
        <div className="w-full md:w-80 lg:w-96 border-r border-border bg-card flex flex-col">
          <div className="p-4 border-b border-border">
            <h2 className="text-xl font-bold text-foreground">Messages</h2>
          </div>

          <div className="flex-1 overflow-y-auto">
            {chats.map((chat) => (
              <button
                key={chat.id}
                onClick={() => setActiveChat(chat.id)}
                className={cn(
                  "w-full p-4 flex gap-3 hover:bg-secondary/50 transition-colors border-b border-border",
                  activeChat === chat.id && "bg-secondary"
                )}
              >
                <div className="relative">
                  <div className="w-12 h-12 rounded-full gradient-primary flex items-center justify-center text-primary-foreground font-bold">
                    {chat.avatar}
                  </div>
                  {chat.online && (
                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-accent border-2 border-card rounded-full" />
                  )}
                </div>
                <div className="flex-1 text-left min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-foreground">{chat.name}</span>
                    <span className="text-xs text-muted-foreground">{chat.time}</span>
                  </div>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-lg">{chat.itemImage}</span>
                    <span className="text-sm text-muted-foreground truncate">{chat.item}</span>
                  </div>
                  <p className="text-sm text-muted-foreground truncate mt-0.5">{chat.lastMessage}</p>
                </div>
                {chat.unread > 0 && (
                  <span className="w-5 h-5 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center">
                    {chat.unread}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Chat Window */}
        <div className="hidden md:flex flex-1 flex-col bg-background">
          {/* Chat Header */}
          <div className="h-16 px-4 border-b border-border flex items-center justify-between bg-card">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center text-primary-foreground font-bold">
                  {currentChat.avatar}
                </div>
                {currentChat.online && (
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-accent border-2 border-card rounded-full" />
                )}
              </div>
              <div>
                <p className="font-semibold text-foreground">{currentChat.name}</p>
                <p className="text-xs text-accent">{currentChat.online ? "Online" : "Offline"}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon">
                <Phone className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <MoreVertical className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Item Context */}
          <div className="px-4 py-3 bg-secondary/50 border-b border-border">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-xl bg-card flex items-center justify-center text-3xl border border-border">
                {currentChat.itemImage}
              </div>
              <div className="flex-1">
                <p className="font-semibold text-foreground">{currentChat.item}</p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <IndianRupee className="w-3 h-3" />
                    500/day
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    2.1 km away
                  </span>
                </div>
              </div>
              <Button variant="accent" size="sm">
                View Item
              </Button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={cn(
                  "flex",
                  msg.sender === "me" ? "justify-end" : "justify-start"
                )}
              >
                <div
                  className={cn(
                    "max-w-[70%] rounded-2xl px-4 py-3",
                    msg.sender === "me"
                      ? "bg-primary text-primary-foreground rounded-br-md"
                      : "bg-card text-foreground rounded-bl-md border border-border"
                  )}
                >
                  <p>{msg.text}</p>
                  <div className={cn(
                    "flex items-center justify-end gap-1 mt-1",
                    msg.sender === "me" ? "text-primary-foreground/70" : "text-muted-foreground"
                  )}>
                    <span className="text-xs">{msg.time}</span>
                    {msg.sender === "me" && (
                      msg.status === "read" 
                        ? <CheckCheck className="w-4 h-4" />
                        : <Check className="w-4 h-4" />
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Message Input */}
          <div className="p-4 border-t border-border bg-card">
            <div className="flex gap-3">
              <Input
                placeholder="Type a message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="h-12"
              />
              <Button variant="hero" size="lg" className="px-6">
                <Send className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Chat;
