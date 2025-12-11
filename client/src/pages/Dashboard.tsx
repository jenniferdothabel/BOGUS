import { motion } from "framer-motion";
import { 
  FileText, 
  MessageSquarePlus, 
  AlertCircle, 
  ChevronRight, 
  Activity,
  Calendar
} from "lucide-react";
import { Link } from "wouter";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { CASE_TIMELINE, MOCK_USER } from "@/lib/mockData";

export default function Dashboard() {
  const activePhase = CASE_TIMELINE.find(t => t.status === 'active') || CASE_TIMELINE[0];
  const progress = (CASE_TIMELINE.filter(t => t.status === 'completed').length / CASE_TIMELINE.length) * 100;

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col md:flex-row md:items-center justify-between gap-4"
      >
        <div>
          <h1 className="text-3xl font-serif font-bold text-primary">Welcome back, {MOCK_USER.name.split(' ')[0]}</h1>
          <p className="text-muted-foreground mt-1">Here's what's happening with {MOCK_USER.inmateName}'s case.</p>
        </div>
        <div className="flex gap-3">
          <Button className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/20">
            <MessageSquarePlus className="w-4 h-4 mr-2" />
            Log Call/Letter
          </Button>
          <Button variant="outline" className="border-accent text-accent-foreground hover:bg-accent/10">
            <AlertCircle className="w-4 h-4 mr-2 text-accent" />
            Log Incident
          </Button>
        </div>
      </motion.div>

      {/* Main Status Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Card className="border-l-4 border-l-accent overflow-hidden shadow-md">
          <div className="absolute top-0 right-0 p-3 opacity-10 pointer-events-none">
            <Activity className="w-32 h-32" />
          </div>
          <CardHeader className="pb-2">
            <Badge variant="outline" className="w-fit mb-2 border-primary/20 text-primary bg-primary/5">Current Phase</Badge>
            <CardTitle className="text-2xl">{activePhase.title}</CardTitle>
            <CardDescription className="text-base mt-1">{activePhase.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 mt-4">
              <div className="flex justify-between text-sm font-medium">
                <span>Case Progress</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <Progress value={progress} className="h-2 bg-muted" />
              {activePhase.note && (
                <div className="mt-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-200 text-sm rounded-md border border-yellow-200 dark:border-yellow-800 flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
                  <p><strong>Note:</strong> {activePhase.note}</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Quick Stats / Actions */}
        <motion.div 
          className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Link href="/documents">
            <Card className="cursor-pointer hover:shadow-md transition-all group hover:border-primary/50">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Documents</CardTitle>
                <FileText className="h-4 w-4 text-primary group-hover:scale-110 transition-transform" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12</div>
                <p className="text-xs text-muted-foreground mt-1">2 new this week</p>
              </CardContent>
            </Card>
          </Link>
          
          <Link href="/journal">
            <Card className="cursor-pointer hover:shadow-md transition-all group hover:border-primary/50">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Journal Entries</CardTitle>
                <MessageSquarePlus className="h-4 w-4 text-primary group-hover:scale-110 transition-transform" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">28</div>
                <p className="text-xs text-muted-foreground mt-1">Last entry: Yesterday</p>
              </CardContent>
            </Card>
          </Link>

          <Link href="/timeline">
            <Card className="cursor-pointer hover:shadow-md transition-all group hover:border-primary/50 sm:col-span-2">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Upcoming Deadlines</CardTitle>
                <Calendar className="h-4 w-4 text-primary group-hover:scale-110 transition-transform" />
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-accent" />
                      <span className="font-medium text-sm">Motion Hearing</span>
                    </div>
                    <span className="text-sm text-muted-foreground">Dec 15</span>
                  </div>
                   <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-muted-foreground" />
                      <span className="font-medium text-sm text-muted-foreground">Discovery Deadline</span>
                    </div>
                    <span className="text-sm text-muted-foreground">Feb 28</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        </motion.div>

        {/* Sidebar / Help Widget */}
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Card className="h-full bg-primary text-primary-foreground border-none shadow-xl">
            <CardHeader>
              <CardTitle className="text-lg">Legal Help Center</CardTitle>
              <CardDescription className="text-primary-foreground/70">Need guidance on California law?</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-3 bg-white/10 rounded-lg backdrop-blur-sm">
                <h4 className="font-semibold text-sm mb-1">How to file a 602</h4>
                <p className="text-xs text-primary-foreground/80 line-clamp-2">Understanding the CDCR grievance process is crucial for exhaustion of remedies.</p>
              </div>
               <div className="p-3 bg-white/10 rounded-lg backdrop-blur-sm">
                <h4 className="font-semibold text-sm mb-1">42 USC §1983 Basics</h4>
                <p className="text-xs text-primary-foreground/80 line-clamp-2">Learn the fundamentals of filing a civil rights lawsuit.</p>
              </div>
              <Link href="/help">
                <Button variant="secondary" className="w-full mt-2 text-primary hover:bg-white">
                  Browse Library <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
