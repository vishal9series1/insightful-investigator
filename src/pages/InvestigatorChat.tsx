import { useState, useRef, useEffect } from "react";
import { Send, Bot, User, Sparkles, AlertTriangle, FileText, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

interface Message {
  id: number;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const suggestedPrompts = [
  { icon: AlertTriangle, text: "Why is FRD-001 high risk?" },
  { icon: FileText, text: "Show related invoices for TechSupply Corp" },
  { icon: TrendingUp, text: "Summarize this week's fraud patterns" },
  { icon: Sparkles, text: "What should I investigate next?" },
];

const InvestigatorChat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      role: "assistant",
      content: "Hello! I'm your AI Fraud Investigation Assistant. I can help you analyze alerts, explain fraud patterns, and provide investigation recommendations.\n\nHow can I assist you today?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (text?: string) => {
    const messageText = text || input;
    if (!messageText.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      role: "user",
      content: messageText,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = generateResponse(messageText);
      const assistantMessage: Message = {
        id: messages.length + 2,
        role: "assistant",
        content: aiResponse,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const generateResponse = (query: string): string => {
    const lowerQuery = query.toLowerCase();
    
    if (lowerQuery.includes("frd-001") || lowerQuery.includes("high risk")) {
      return `**Alert FRD-001 Analysis**\n\nThis alert is flagged as **High Risk** (94% confidence) due to several concerning factors:\n\n1. **Duplicate Invoice Detection**: Invoice #INV-2024-001 was submitted twice within 3 days\n2. **Different Payment Destinations**: Each submission specified different bank accounts\n3. **Identical Amount**: $45,000 appears on both invoices with matching line items\n\n**Recommendation**: Contact TechSupply Corp to verify the legitimate invoice and payment account. This pattern is consistent with invoice fraud schemes.\n\nWould you like me to pull up related transactions or similar historical cases?`;
    }
    
    if (lowerQuery.includes("invoice") || lowerQuery.includes("techsupply")) {
      return `**TechSupply Corp - Invoice History**\n\nI found 12 invoices from this vendor in the past 6 months:\n\n| Invoice | Amount | Date | Status |\n|---------|--------|------|--------|\n| INV-2024-001 | $45,000 | Jan 12 | 🚨 Flagged |\n| INV-2023-089 | $32,500 | Dec 15 | ✅ Paid |\n| INV-2023-076 | $28,000 | Nov 20 | ✅ Paid |\n\nThe flagged invoice shows a 38% increase from their typical transaction amounts. Historical average is $29,200.\n\nShall I compare the invoice details side-by-side?`;
    }
    
    if (lowerQuery.includes("pattern") || lowerQuery.includes("week") || lowerQuery.includes("summary")) {
      return `**Weekly Fraud Pattern Summary**\n\nThis week I detected **6 alerts** across 3 primary patterns:\n\n📊 **Duplicate Invoices** (4 cases)\n- Representing $180,000 in potential exposure\n- 2 vendors involved: TechSupply Corp, Office Supplies Inc\n\n💳 **Unusual Transactions** (2 cases)\n- $133,900 flagged for amount anomalies\n- Both occurred outside business hours\n\n📧 **Email Impersonation** (1 case)\n- Suspected BEC attack targeting wire transfer\n\n**Trend**: Duplicate invoice attempts increased 40% vs. last week. Consider enhanced vendor verification protocols.`;
    }
    
    if (lowerQuery.includes("investigate") || lowerQuery.includes("next")) {
      return `**Investigation Priority Queue**\n\nBased on risk scoring and time sensitivity, I recommend:\n\n1. **FRD-001** (High Priority)\n   - Duplicate invoice, $45,000\n   - Payment pending approval\n   - ⏰ Action needed within 4 hours\n\n2. **FRD-002** (High Priority)\n   - Unusual transaction pattern, $125,000\n   - Currently under review\n\n3. **FRD-003** (Medium Priority)\n   - Email impersonation detected\n   - No payment initiated yet\n\nWould you like me to start a detailed investigation on any of these?`;
    }
    
    return `I understand you're asking about "${query}". Let me analyze the relevant data...\n\nBased on my review of the current alerts and historical patterns, I can provide insights on:\n- Specific alert investigations\n- Vendor risk profiles\n- Transaction pattern analysis\n- Fraud trend summaries\n\nCould you provide more details about what you'd like to investigate?`;
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-7rem)] animate-fade-in">
      <div className="mb-4">
        <h1 className="text-2xl font-semibold">Investigator Chat</h1>
        <p className="text-muted-foreground mt-1">Ask questions about alerts, patterns, and investigations</p>
      </div>

      <div className="flex-1 card-elevated flex flex-col overflow-hidden">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                "flex gap-3 animate-slide-up",
                message.role === "user" && "flex-row-reverse"
              )}
            >
              <div className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0",
                message.role === "user" 
                  ? "bg-primary text-primary-foreground" 
                  : "bg-muted"
              )}>
                {message.role === "user" ? (
                  <User className="w-4 h-4" />
                ) : (
                  <Bot className="w-4 h-4" />
                )}
              </div>
              <div className={cn(
                message.role === "user" ? "chat-bubble-user" : "chat-bubble-ai"
              )}>
                <div className="whitespace-pre-wrap text-sm leading-relaxed">
                  {message.content}
                </div>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex gap-3 animate-slide-up">
              <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                <Bot className="w-4 h-4" />
              </div>
              <div className="chat-bubble-ai">
                <div className="flex gap-1">
                  <span className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-pulse-subtle" />
                  <span className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-pulse-subtle" style={{ animationDelay: "0.2s" }} />
                  <span className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-pulse-subtle" style={{ animationDelay: "0.4s" }} />
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Suggested Prompts */}
        {messages.length === 1 && (
          <div className="px-4 pb-4">
            <p className="text-xs text-muted-foreground mb-2">Suggested questions:</p>
            <div className="flex flex-wrap gap-2">
              {suggestedPrompts.map((prompt, index) => {
                const Icon = prompt.icon;
                return (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    className="gap-2"
                    onClick={() => handleSend(prompt.text)}
                  >
                    <Icon className="w-3 h-3" />
                    {prompt.text}
                  </Button>
                );
              })}
            </div>
          </div>
        )}

        {/* Input */}
        <div className="p-4 border-t bg-muted/30">
          <div className="flex gap-3">
            <Textarea
              placeholder="Ask about fraud alerts, patterns, or investigations..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="min-h-[60px] max-h-[120px] resize-none bg-background"
              rows={2}
            />
            <Button 
              size="icon" 
              className="h-[60px] w-[60px]"
              onClick={() => handleSend()}
              disabled={!input.trim() || isTyping}
            >
              <Send className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvestigatorChat;
