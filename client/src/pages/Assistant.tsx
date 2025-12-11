import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Sparkles, 
  Send, 
  Bot, 
  User, 
  FileText, 
  AlertTriangle, 
  CheckCircle2, 
  FolderInput,
  ArrowRight,
  Lightbulb
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { useUserStore } from "@/lib/userStore";

interface Message {
  id: number;
  role: 'user' | 'ai';
  content: string;
  timestamp: string;
}

const MOCK_SUGGESTIONS = [
  "How do I file a medical grievance?",
  "What is the deadline for a 1983 claim?",
  "Draft a request for medical records",
  "Summarize my recent case updates"
];

const AI_INSIGHTS = [
  {
    id: 1,
    type: "warning",
    title: "Potential Timeline Gap",
    description: "I noticed a 45-day gap between your last grievance appeal and the court filing. The court might question this delay.",
    action: "Add explanation note"
  },
  {
    id: 2,
    type: "suggestion",
    title: "Missing Medical Evidence",
    description: "You mentioned 'chronic back pain' in your journal, but I don't see a 'Medical Request Form 7362' uploaded for November.",
    action: "Upload 7362 Form"
  },
  {
    id: 3,
    type: "success",
    title: "Strong Documentation",
    description: "Your documentation for the 'Retaliation' claim is very consistent. You have 3 corroborating journal entries matching the incident report.",
    action: "View Analysis"
  }
];

export default function Assistant() {
  const { profile } = useUserStore();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      role: 'ai',
      content: `Hello ${profile.name.split(' ')[0]}. I'm your B.O.G.U.S. Legal Assistant. I can help you organize your files, draft letters, or answer questions about California prison law. How can I help today?`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const newMessage: Message = {
      id: messages.length + 1,
      role: 'user',
      content: inputValue,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, newMessage]);
    setInputValue("");
    setIsTyping(true);

    // Simulate AI response logic
    setTimeout(() => {
      let aiResponse = "I'm not sure about that specific detail, but I can help you research it in the legal library.";
      const lowerInput = newMessage.content.toLowerCase();

      if (lowerInput.includes("grievance") || lowerInput.includes("602")) {
        aiResponse = "To file a grievance (CDCR 602), make sure you: \n1. Submit it within 30 days of the incident.\n2. Be specific about dates and names.\n3. Keep a copy before mailing it.\n\nWould you like me to generate a template for a medical grievance?";
      } else if (lowerInput.includes("deadline") || lowerInput.includes("time")) {
        aiResponse = "Based on your last filing date (Oct 1, 2024), your next critical deadline is likely the Case Management Conference statement, usually due 15 days before the hearing. Shall I check the court calendar?";
      } else if (lowerInput.includes("medical") || lowerInput.includes("doctor")) {
        aiResponse = "I see you're asking about medical issues. Under the 8th Amendment, you must prove 'deliberate indifference.' Have you uploaded the 7362 Request Forms where the doctor denied care?";
      } else if (lowerInput.includes("draft") || lowerInput.includes("letter")) {
        aiResponse = "I can definitely help draft that. \n\nHere is a quick opening: \n'To Whom It May Concern, I am writing regarding Inmate [Name], ID [ID], who has been denied necessary medical treatment...'\n\nShould I expand this into a full formal letter?";
      }

      setMessages(prev => [...prev, {
        id: prev.length + 1,
        role: 'ai',
        content: aiResponse,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-serif font-bold text-primary flex items-center gap-2">
            <Sparkles className="w-8 h-8 text-accent" />
            AI Case Assistant
          </h1>
          <p className="text-muted-foreground mt-1">Intelligent analysis, document sorting, and legal guidance.</p>
        </div>
      </div>

      <Tabs defaultValue="chat" className="flex-1 flex flex-col min-h-0">
        <TabsList className="grid w-full max-w-md grid-cols-3">
          <TabsTrigger value="chat">Chat & Ask</TabsTrigger>
          <TabsTrigger value="insights">Insights</TabsTrigger>
          <TabsTrigger value="files">Organizer</TabsTrigger>
        </TabsList>

        <TabsContent value="chat" className="flex-1 flex flex-col min-h-0 mt-4 gap-4">
          <Card className="flex-1 flex flex-col min-h-0 border-primary/20 shadow-sm">
            <CardContent className="flex-1 flex flex-col p-4 min-h-0">
              <ScrollArea className="flex-1 pr-4" ref={scrollRef}>
                <div className="space-y-4">
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
                    >
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                        msg.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-accent text-accent-foreground'
                      }`}>
                        {msg.role === 'user' ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
                      </div>
                      <div className={`flex flex-col max-w-[80%] ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                        <div className={`rounded-lg p-3 text-sm whitespace-pre-wrap ${
                          msg.role === 'user' 
                            ? 'bg-primary text-primary-foreground rounded-tr-none' 
                            : 'bg-muted rounded-tl-none'
                        }`}>
                          {msg.content}
                        </div>
                        <span className="text-[10px] text-muted-foreground mt-1 px-1">{msg.timestamp}</span>
                      </div>
                    </div>
                  ))}
                  {isTyping && (
                    <div className="flex gap-3">
                      <div className="w-8 h-8 rounded-full bg-accent text-accent-foreground flex items-center justify-center shrink-0">
                        <Bot className="w-5 h-5" />
                      </div>
                      <div className="bg-muted rounded-lg rounded-tl-none p-3 flex items-center gap-1">
                        <span className="w-2 h-2 bg-primary/40 rounded-full animate-bounce" />
                        <span className="w-2 h-2 bg-primary/40 rounded-full animate-bounce delay-75" />
                        <span className="w-2 h-2 bg-primary/40 rounded-full animate-bounce delay-150" />
                      </div>
                    </div>
                  )}
                </div>
              </ScrollArea>
              
              <div className="mt-4 pt-4 border-t border-border">
                {messages.length < 3 && (
                  <div className="flex gap-2 overflow-x-auto pb-4 mb-2 mask-linear">
                    {MOCK_SUGGESTIONS.map((suggestion, i) => (
                      <Button 
                        key={i} 
                        variant="outline" 
                        size="sm" 
                        className="whitespace-nowrap bg-background"
                        onClick={() => {
                          setInputValue(suggestion);
                          // Optional: Auto-send or just populate
                        }}
                      >
                        {suggestion}
                      </Button>
                    ))}
                  </div>
                )}
                <div className="flex gap-2">
                  <Input 
                    placeholder="Ask about your case, laws, or drafting help..." 
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="flex-1"
                  />
                  <Button onClick={handleSendMessage} size="icon" className="shrink-0">
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="insights" className="mt-4">
          <div className="grid gap-4">
            {AI_INSIGHTS.map((insight) => (
              <Card key={insight.id} className="border-l-4 border-l-transparent hover:border-l-primary transition-all cursor-pointer group">
                <CardHeader className="flex flex-row items-start gap-4 pb-2">
                  <div className={`p-2 rounded-lg shrink-0 ${
                    insight.type === 'warning' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400' :
                    insight.type === 'suggestion' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' :
                    'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                  }`}>
                    {insight.type === 'warning' ? <AlertTriangle className="w-5 h-5" /> :
                     insight.type === 'suggestion' ? <Lightbulb className="w-5 h-5" /> :
                     <CheckCircle2 className="w-5 h-5" />}
                  </div>
                  <div className="space-y-1 flex-1">
                    <CardTitle className="text-base">{insight.title}</CardTitle>
                    <CardDescription className="text-sm leading-relaxed">
                      {insight.description}
                    </CardDescription>
                  </div>
                  <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                    {insight.action} <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>
                </CardHeader>
              </Card>
            ))}
            
            <Card className="bg-primary/5 border-dashed border-primary/30">
              <CardContent className="flex flex-col items-center justify-center p-8 text-center space-y-3">
                <Sparkles className="w-8 h-8 text-primary/50" />
                <p className="text-muted-foreground font-medium">Analysis Complete</p>
                <p className="text-xs text-muted-foreground max-w-xs">
                  B.O.G.U.S. AI continuously monitors your timeline and documents for consistency.
                </p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="files" className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <FolderInput className="w-5 h-5 text-primary" />
                  Uncategorized Files
                </CardTitle>
                <CardDescription>3 files found in recent uploads</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { name: "scan_2024_11_02.pdf", size: "2.4 MB" },
                  { name: "IMG_4921.jpg", size: "1.1 MB" },
                  { name: "screenshot_pacer.png", size: "0.5 MB" }
                ].map((file, i) => (
                  <div key={i} className="flex items-center justify-between p-3 border rounded-lg bg-background">
                    <div className="flex items-center gap-3">
                      <FileText className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm font-medium">{file.name}</span>
                    </div>
                    <Badge variant="secondary" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">
                      Auto-Sort
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-accent" />
                  AI Suggested Actions
                </CardTitle>
                <CardDescription>Based on content analysis</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-3 bg-muted/50 rounded-lg space-y-2">
                  <p className="text-sm font-medium">"scan_2024_11_02.pdf"</p>
                  <p className="text-xs text-muted-foreground">
                    Contains keywords: "Grievance", "Appeal", "Denied".
                  </p>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="h-7 text-xs">View</Button>
                    <Button size="sm" className="h-7 text-xs bg-green-600 hover:bg-green-700">Move to Grievances</Button>
                  </div>
                </div>
                
                <div className="p-3 bg-muted/50 rounded-lg space-y-2">
                  <p className="text-sm font-medium">"screenshot_pacer.png"</p>
                  <p className="text-xs text-muted-foreground">
                    Visual match: Court Docket.
                  </p>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="h-7 text-xs">View</Button>
                    <Button size="sm" className="h-7 text-xs bg-blue-600 hover:bg-blue-700">Move to Legal</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
