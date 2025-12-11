import { useState } from "react";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { 
  User, 
  MapPin, 
  FileText, 
  ShieldCheck, 
  ChevronRight,
  ArrowLeft,
  UserPlus,
  Users,
  Link as LinkIcon
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { SmartZipUpload } from "@/components/SmartZipUpload";
import { useUserStore } from "@/lib/userStore";
import logo from "@assets/generated_images/minimalist_legal_icon_representing_justice_and_protection.png";

export default function Onboarding() {
  const [step, setStep] = useState(1);
  const [mode, setMode] = useState<"create" | "join" | null>(null);
  const [inviteCode, setInviteCode] = useState("");
  const [, setLocation] = useLocation();
  const { profile, setProfile, completeOnboarding } = useUserStore();

  const handleNext = () => setStep(s => s + 1);
  const handleBack = () => setStep(s => s - 1);
  
  const handleComplete = () => {
    completeOnboarding();
    setLocation("/");
  };

  const handleJoinCase = () => {
    // Mock simulation of finding a case
    if (inviteCode.length > 3) {
      setProfile({
        inmateName: "Joseph Rodriguez",
        inmateId: "CDCR #T-12345",
        facility: "Corcoran State Prison"
      });
      setStep(4); // Jump to success
    }
  };

  const StepIndicator = ({ current }: { current: number }) => (
    <div className="flex gap-2 justify-center mb-8">
      {[1, 2, 3, 4].map(i => (
        <div 
          key={i} 
          className={`h-2 rounded-full transition-all duration-300 ${
            i === current ? "w-8 bg-primary" : i < current ? "w-2 bg-primary/50" : "w-2 bg-muted"
          }`}
        />
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <div className="text-center mb-10">
          <img src={logo} alt="Logo" className="w-16 h-16 mx-auto mb-6 rounded-xl shadow-lg" />
          <h1 className="text-3xl font-serif font-bold text-primary mb-2">Welcome to B.O.G.U.S.</h1>
          <p className="text-muted-foreground">Bridging Offenders & Guardians Using Support</p>
        </div>

        <StepIndicator current={step} />

        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <Card>
                <CardContent className="p-8 space-y-6">
                  <div className="space-y-2 text-center mb-6">
                    <h2 className="text-2xl font-bold">Tell us about yourself</h2>
                    <p className="text-sm text-muted-foreground">This helps us personalize your dashboard.</p>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Your Full Name</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input 
                          id="name" 
                          className="pl-10" 
                          placeholder="Maria Rodriguez" 
                          value={profile.name}
                          onChange={(e) => setProfile({ name: e.target.value })}
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="role">Your Relationship to Inmate</Label>
                      <Select 
                        onValueChange={(val) => setProfile({ role: val })}
                        defaultValue={profile.role || "Mother/Guardian"}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select relationship" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Mother/Guardian">Mother / Guardian</SelectItem>
                          <SelectItem value="Spouse/Partner">Spouse / Partner</SelectItem>
                          <SelectItem value="Sibling">Sibling</SelectItem>
                          <SelectItem value="Child">Child</SelectItem>
                          <SelectItem value="Advocate/Friend">Advocate / Friend</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <Button className="w-full mt-4" onClick={handleNext}>
                    Next Step <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <Card>
                <CardContent className="p-8 space-y-6">
                  <div className="space-y-2 text-center mb-6">
                    <h2 className="text-2xl font-bold">How do you want to start?</h2>
                    <p className="text-sm text-muted-foreground">Create a new tracking file or join an existing one.</p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <button 
                      className={`p-6 border-2 rounded-xl text-left transition-all hover:border-primary group ${mode === 'create' ? 'border-primary bg-primary/5' : 'border-border'}`}
                      onClick={() => {
                        setMode("create");
                        handleNext();
                      }}
                    >
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform text-primary">
                        <UserPlus className="w-6 h-6" />
                      </div>
                      <h3 className="font-semibold text-lg mb-1">Create New Casefile</h3>
                      <p className="text-sm text-muted-foreground">I am starting a new tracking record for an inmate.</p>
                    </button>

                    <button 
                      className={`p-6 border-2 rounded-xl text-left transition-all hover:border-primary group ${mode === 'join' ? 'border-primary bg-primary/5' : 'border-border'}`}
                      onClick={() => {
                        setMode("join");
                        setStep(3); // Go to Join screen (simulating Step 3 for join)
                      }}
                    >
                      <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform text-accent">
                        <Users className="w-6 h-6" />
                      </div>
                      <h3 className="font-semibold text-lg mb-1">Join Existing Case</h3>
                      <p className="text-sm text-muted-foreground">I have an invite code from a family member.</p>
                    </button>
                  </div>

                  <Button variant="ghost" onClick={handleBack} className="w-full">
                    <ArrowLeft className="w-4 h-4 mr-2" /> Back
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {step === 3 && mode === 'join' && (
            <motion.div
              key="step3-join"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <Card>
                <CardContent className="p-8 space-y-6">
                  <div className="space-y-2 text-center mb-6">
                    <h2 className="text-2xl font-bold">Enter Invite Code</h2>
                    <p className="text-sm text-muted-foreground">Enter the 6-digit code shared with you.</p>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="code">Invite Code</Label>
                      <div className="relative">
                        <LinkIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input 
                          id="code" 
                          className="pl-10 text-center text-lg tracking-widest uppercase font-mono" 
                          placeholder="ABC-123" 
                          value={inviteCode}
                          onChange={(e) => setInviteCode(e.target.value.toUpperCase())}
                          maxLength={7}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3 mt-4">
                    <Button variant="outline" onClick={() => setStep(2)}>
                      <ArrowLeft className="w-4 h-4 mr-2" /> Back
                    </Button>
                    <Button 
                      className="flex-1" 
                      onClick={handleJoinCase}
                      disabled={inviteCode.length < 3}
                    >
                      Join Case <ChevronRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {step === 3 && mode === 'create' && (
             <motion.div
              key="step3-create"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <Card>
                <CardContent className="p-8 space-y-6">
                  <div className="space-y-2 text-center mb-6">
                    <h2 className="text-2xl font-bold">Inmate Information</h2>
                    <p className="text-sm text-muted-foreground">Who are we fighting for?</p>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="inmateName">Inmate's Full Name</Label>
                      <Input 
                        id="inmateName" 
                        placeholder="Joseph Rodriguez" 
                        value={profile.inmateName}
                        onChange={(e) => setProfile({ inmateName: e.target.value })}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                       <div className="space-y-2">
                        <Label htmlFor="cdcr">CDCR / ID Number</Label>
                        <Input 
                          id="cdcr" 
                          placeholder="T-12345" 
                          value={profile.inmateId}
                          onChange={(e) => setProfile({ inmateId: e.target.value })}
                        />
                      </div>
                       <div className="space-y-2">
                        <Label htmlFor="facility">Facility</Label>
                        <div className="relative">
                           <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                           <Input 
                            id="facility" 
                            className="pl-10"
                            placeholder="Corcoran State Prison" 
                            value={profile.facility}
                            onChange={(e) => setProfile({ facility: e.target.value })}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3 mt-4">
                    <Button variant="outline" onClick={() => setStep(2)}>
                      <ArrowLeft className="w-4 h-4 mr-2" /> Back
                    </Button>
                    <Button className="flex-1" onClick={handleNext}>
                      Next Step <ChevronRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {step === 4 && mode === 'create' && (
             <motion.div
              key="step4-create"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <Card>
                <CardContent className="p-8 space-y-6">
                  <div className="space-y-2 text-center mb-6">
                    <h2 className="text-2xl font-bold">Case Kickstart</h2>
                    <p className="text-sm text-muted-foreground">Upload your files to auto-populate your dashboard.</p>
                  </div>
                  
                  <SmartZipUpload onComplete={() => setStep(5)} />
                  
                  <div className="text-center mt-6">
                    <Button variant="ghost" className="text-muted-foreground hover:text-foreground" onClick={() => setStep(5)}>
                      Skip for now
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

           {(step === 5 || (step === 4 && mode === 'join')) && (
             <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
            >
              <Card className="border-primary/20 bg-primary/5">
                <CardContent className="p-8 space-y-8 text-center">
                   <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto shadow-xl shadow-primary/20">
                    <ShieldCheck className="w-10 h-10 text-primary-foreground" />
                   </div>
                   
                   <div className="space-y-2">
                     <h2 className="text-3xl font-bold font-serif text-primary">
                       {mode === 'join' ? "Joined Successfully!" : "You're All Set!"}
                     </h2>
                     <p className="text-muted-foreground max-w-md mx-auto">
                       {mode === 'join' 
                        ? `You have successfully joined the casefile for ${profile.inmateName}. You can now contribute to the timeline and journal.` 
                        : `We've set up your dashboard. You can now track timelines, log incidents, and organize documents for ${profile.inmateName}.`}
                     </p>
                   </div>

                   <Button size="lg" className="w-full max-w-sm" onClick={handleComplete}>
                     Go to Dashboard
                   </Button>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
