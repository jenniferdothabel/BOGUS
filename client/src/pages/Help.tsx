import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Search, 
  BookOpen, 
  ExternalLink,
  ChevronRight,
  Scale,
  FileText,
  AlertTriangle
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { HELP_ARTICLES } from "@/lib/mockData";

export default function Help() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredArticles = HELP_ARTICLES.filter(article => 
    article.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    article.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <div className="text-center max-w-2xl mx-auto space-y-4 py-8">
        <h1 className="text-4xl font-serif font-bold text-primary">California Civil Rights Law Help Center</h1>
        <p className="text-lg text-muted-foreground">Find answers about inmate rights, §1983 claims, and the CDCR grievance process.</p>
        
        <div className="relative max-w-lg mx-auto mt-6">
          <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
          <Input 
            placeholder="Search for legal topics (e.g., 'medical care', 'exhaustion')..." 
            className="pl-10 h-12 text-lg shadow-sm" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-primary text-primary-foreground border-none shadow-lg md:col-span-3">
          <CardContent className="p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-accent font-medium">
                <AlertTriangle className="w-5 h-5" />
                <span>Critical Concept</span>
              </div>
              <h2 className="text-2xl font-bold font-serif">Exhaustion of Remedies (PLRA)</h2>
              <p className="text-primary-foreground/80 max-w-xl">
                Before filing a federal lawsuit under §1983, you MUST complete the entire prison grievance process (all levels of appeal). Failing to do so will likely get your case dismissed.
              </p>
            </div>
            <Button variant="secondary" size="lg" className="whitespace-nowrap shrink-0">
              Read Full Guide <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </CardContent>
        </Card>

        {filteredArticles.map((article, i) => (
          <motion.div
            key={article.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: i * 0.1 }}
          >
            <Card className="h-full hover:border-primary/50 transition-colors cursor-pointer group">
              <CardHeader>
                <Badge variant="outline" className="w-fit mb-2">{article.category}</Badge>
                <CardTitle className="group-hover:text-primary transition-colors">{article.title}</CardTitle>
                <CardDescription>{article.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center text-sm font-medium text-primary mt-auto pt-4">
                  Read Article <ChevronRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="mt-12">
        <h3 className="text-2xl font-bold font-serif mb-6">Frequently Asked Questions</h3>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>What is a 42 USC §1983 claim?</AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
              It is a federal lawsuit allowing individuals to sue government officials for civil rights violations. For inmates, this often involves 8th Amendment violations like cruel and unusual punishment (e.g., excessive force, denial of medical care).
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>How long do I have to file a grievance?</AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
              In California (CDCR), you generally must submit a 602 grievance within 30 days of the incident. Deadlines are strict, so log everything immediately.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>Can I sue for lost property?</AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
              Usually, no. If the state provides a way to get paid for lost property (like a tort claim), you cannot file a federal §1983 lawsuit for simple property loss unless it was part of a larger constitutional violation.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      <div className="flex flex-col md:flex-row gap-4 justify-center mt-12 pb-8">
        <Button variant="outline" className="gap-2">
           <ExternalLink className="w-4 h-4" /> Visit ACLU SoCal
        </Button>
        <Button variant="outline" className="gap-2">
           <ExternalLink className="w-4 h-4" /> Prison Law Office
        </Button>
      </div>
    </div>
  );
}

function ArrowRight({ className }: { className?: string }) {
    return (
        <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            className={className}
        >
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
        </svg>
    )
}
