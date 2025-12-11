import { useState } from "react";
import { motion } from "framer-motion";
import { 
  BookOpen, 
  Calendar, 
  Tag, 
  Plus, 
  Save, 
  Clock,
  MessageSquare
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { JOURNAL_ENTRIES } from "@/lib/mockData";

export default function Journal() {
  const [entries, setEntries] = useState(JOURNAL_ENTRIES);
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");

  const handleSave = () => {
    if (!newTitle || !newContent) return;
    
    const newEntry = {
      id: entries.length + 1,
      date: new Date().toISOString().split('T')[0],
      title: newTitle,
      content: newContent,
      tags: ["Draft"],
      urgent: false,
    };
    
    setEntries([newEntry, ...entries]);
    setNewTitle("");
    setNewContent("");
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-serif font-bold text-primary">Journal & Family Notes</h1>
          <p className="text-muted-foreground mt-1">Log calls, letters, and daily events to build a record.</p>
        </div>
        
        <Sheet>
          <SheetTrigger asChild>
            <Button className="bg-primary hover:bg-primary/90">
              <Plus className="w-4 h-4 mr-2" />
              New Entry
            </Button>
          </SheetTrigger>
          <SheetContent className="sm:max-w-md overflow-y-auto">
            <SheetHeader>
              <SheetTitle className="text-xl font-serif">New Journal Entry</SheetTitle>
            </SheetHeader>
            <div className="space-y-6 mt-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">Title</label>
                <Input 
                  placeholder="e.g., Call with Joe" 
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Date</label>
                <Input type="date" defaultValue={new Date().toISOString().split('T')[0]} />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Notes</label>
                <Textarea 
                  placeholder="What happened today? Be specific with details." 
                  className="min-h-[200px]"
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Tags</label>
                <div className="flex flex-wrap gap-2">
                  {["Call", "Letter", "Medical", "Legal", "Grievance", "Incident"].map(tag => (
                    <Badge key={tag} variant="outline" className="cursor-pointer hover:bg-accent/10 hover:border-accent">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
              <Button className="w-full" onClick={handleSave}>
                <Save className="w-4 h-4 mr-2" />
                Save Entry
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {entries.map((entry, i) => (
            <motion.div
              key={entry.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              <Card className="hover:border-primary/50 transition-colors">
                <CardHeader className="flex flex-row items-start justify-between pb-2">
                  <div>
                    <CardTitle className="text-xl font-semibold">{entry.title}</CardTitle>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                      <Calendar className="w-3 h-3" />
                      <span>{entry.date}</span>
                      <span className="mx-1">•</span>
                      <Clock className="w-3 h-3" />
                      <span>Logged by Maria</span>
                    </div>
                  </div>
                  {entry.urgent && (
                     <Badge variant="destructive" className="uppercase text-[10px] tracking-wider">Urgent</Badge>
                  )}
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="whitespace-pre-wrap text-foreground/90 leading-relaxed">
                    {entry.content}
                  </p>
                  <div className="flex items-center gap-2 pt-2">
                    <Tag className="w-3 h-3 text-muted-foreground" />
                    {entry.tags.map(tag => (
                      <Badge key={tag} variant="secondary" className="text-xs bg-muted/50 text-muted-foreground border-transparent">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="space-y-6">
          <Card className="bg-muted/30 border-none">
            <CardHeader>
              <CardTitle className="text-lg">Tips for Journaling</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm text-muted-foreground">
              <p>• <strong>Be Specific:</strong> Write down exact quotes if possible. "He said he was in pain" vs "He said 'my back feels like it's burning'".</p>
              <p>• <strong>Dates Matter:</strong> Always verify the date of the event, not just the date you're writing it down.</p>
              <p>• <strong>Names & Badge Numbers:</strong> If an officer is involved, try to get their name or badge number.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
