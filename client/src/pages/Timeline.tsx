import { motion } from "framer-motion";
import { 
  CheckCircle2, 
  Circle, 
  Clock, 
  AlertTriangle, 
  CalendarDays,
  ArrowRight
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CASE_TIMELINE } from "@/lib/mockData";

export default function Timeline() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-serif font-bold text-primary">Case Timeline</h1>
          <p className="text-muted-foreground mt-1">Track the major phases and legal deadlines of the case.</p>
        </div>
      </div>

      <div className="relative border-l-2 border-muted ml-4 md:ml-8 space-y-8 py-4">
        {CASE_TIMELINE.map((event, index) => {
          const isCompleted = event.status === "completed";
          const isActive = event.status === "active";
          
          return (
            <motion.div 
              key={event.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="relative pl-8 md:pl-12"
            >
              {/* Timeline Dot */}
              <div 
                className={`absolute left-[-9px] top-4 w-5 h-5 rounded-full border-4 border-background flex items-center justify-center
                ${isCompleted ? "bg-green-500" : isActive ? "bg-accent" : "bg-muted-foreground/30"}`}
              >
                {isActive && <div className="absolute w-full h-full rounded-full bg-accent animate-ping opacity-75" />}
              </div>

              <Card className={`border-l-4 transition-all hover:shadow-md ${isActive ? "border-l-accent shadow-lg scale-[1.01]" : isCompleted ? "border-l-green-500" : "border-l-muted"}`}>
                <CardHeader className="pb-2">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1 md:mb-0">
                      <CalendarDays className="w-4 h-4" />
                      <span>{event.date}</span>
                      {isActive && <Badge variant="secondary" className="bg-accent/20 text-accent-foreground ml-2">Current Phase</Badge>}
                    </div>
                    <Badge variant="outline" className="w-fit capitalize">{event.status}</Badge>
                  </div>
                  <CardTitle className="text-xl">{event.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{event.description}</p>
                  
                  {event.note && (
                    <div className="mt-4 p-3 bg-muted/50 rounded-md border border-border text-sm flex gap-3">
                      <AlertTriangle className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                      <div className="space-y-1">
                        <p className="font-medium text-foreground">Status Update</p>
                        <p className="text-muted-foreground">{event.note}</p>
                      </div>
                    </div>
                  )}

                  {isActive && (
                     <div className="mt-4 flex gap-3">
                       <div className="text-xs font-medium text-primary uppercase tracking-wider flex items-center gap-1">
                         Next Step <ArrowRight className="w-3 h-3" />
                       </div>
                       <span className="text-xs text-muted-foreground">Waiting for court ruling</span>
                     </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
