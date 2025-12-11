import { Link, useLocation } from "wouter";
import { 
  LayoutDashboard, 
  CalendarClock, 
  Files, 
  BookOpen, 
  HelpCircle, 
  Menu,
  LogOut,
  Bell,
  User,
  ShieldCheck
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import logo from "@assets/generated_images/minimalist_legal_icon_representing_justice_and_protection.png";
import { MOCK_USER } from "@/lib/mockData";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const navItems = [
    { href: "/", label: "Dashboard", icon: LayoutDashboard },
    { href: "/timeline", label: "Case Timeline", icon: CalendarClock },
    { href: "/documents", label: "Documents", icon: Files },
    { href: "/journal", label: "Journal & Notes", icon: BookOpen },
    { href: "/help", label: "Legal Help", icon: HelpCircle },
  ];

  const NavContent = () => (
    <div className="flex flex-col h-full bg-sidebar text-sidebar-foreground">
      <div className="p-6 flex items-center gap-3">
        <img src={logo} alt="B.O.G.U.S." className="w-10 h-10 rounded-lg bg-white p-1" />
        <div>
          <h1 className="font-serif font-bold text-lg leading-tight tracking-tight">B.O.G.U.S.</h1>
          <p className="text-xs text-sidebar-foreground/70">Legal Support System</p>
        </div>
      </div>

      <nav className="flex-1 px-4 py-4 space-y-1">
        {navItems.map((item) => {
          const isActive = location === item.href;
          return (
            <Link key={item.href} href={item.href} className={`flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors cursor-pointer ${
                  isActive
                    ? "bg-sidebar-primary text-sidebar-primary-foreground"
                    : "text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                }`}
                onClick={() => setIsMobileOpen(false)}>
                <item.icon className="w-5 h-5" />
                {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-sidebar-border mt-auto">
        <div className="flex items-center gap-3 px-2 py-2">
          <Avatar className="h-9 w-9 border border-sidebar-border">
            <AvatarFallback className="bg-sidebar-accent text-sidebar-foreground">MR</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">{MOCK_USER.name}</p>
            <p className="text-xs text-sidebar-foreground/60 truncate">{MOCK_USER.role}</p>
          </div>
          <Button variant="ghost" size="icon" className="h-8 w-8 text-sidebar-foreground/70 hover:text-sidebar-foreground">
            <LogOut className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background flex">
      {/* Desktop Sidebar */}
      <aside className="hidden md:block w-64 fixed inset-y-0 left-0 z-50 border-r border-sidebar-border">
        <NavContent />
      </aside>

      {/* Main Content */}
      <div className="flex-1 md:ml-64 flex flex-col min-h-screen">
        {/* Top Header */}
        <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-md border-b border-border h-16 px-4 md:px-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Sheet open={isMobileOpen} onOpenChange={setIsMobileOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="w-5 h-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="p-0 w-72 bg-sidebar border-r border-sidebar-border">
                <NavContent />
              </SheetContent>
            </Sheet>
            
            <div className="hidden md:flex items-center gap-2 text-sm text-muted-foreground">
              <ShieldCheck className="w-4 h-4 text-primary" />
              <span>Tracking case for: <span className="font-semibold text-foreground">{MOCK_USER.inmateName}</span> ({MOCK_USER.inmateId})</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
             <Button variant="outline" size="sm" className="hidden sm:flex gap-2">
               <User className="w-4 h-4" />
               Family Dashboard
             </Button>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="w-5 h-5 text-muted-foreground" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
            </Button>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 md:p-8 max-w-7xl mx-auto w-full">
          {children}
        </main>
      </div>
    </div>
  );
}
