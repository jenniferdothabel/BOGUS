import { useState } from "react";
import { motion } from "framer-motion";
import { 
  FileText, 
  Search, 
  Filter, 
  Download, 
  Share2, 
  Upload, 
  MoreVertical,
  File
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { DOCUMENTS } from "@/lib/mockData";

export default function Documents() {
  const [searchQuery, setSearchQuery] = useState("");
  
  const filteredDocs = DOCUMENTS.filter(doc => 
    doc.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    doc.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-serif font-bold text-primary">Legal Document Hub</h1>
          <p className="text-muted-foreground mt-1">Store, organize, and share legal documents securely.</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90">
          <Upload className="w-4 h-4 mr-2" />
          Upload Document
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-center bg-card p-4 rounded-lg border shadow-sm">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search documents..." 
            className="pl-9" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-2 w-full md:w-auto ml-auto">
          <Button variant="outline" size="sm" className="ml-auto">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
        </div>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-4 md:w-auto bg-muted/50 p-1">
          <TabsTrigger value="all">All Files</TabsTrigger>
          <TabsTrigger value="legal">Legal</TabsTrigger>
          <TabsTrigger value="medical">Medical</TabsTrigger>
          <TabsTrigger value="grievance">Grievance</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="mt-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDocs.map((doc, i) => (
              <motion.div
                key={doc.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
              >
                <Card className="hover:shadow-lg transition-shadow group">
                  <CardHeader className="flex flex-row items-start justify-between pb-2 space-y-0">
                    <div className="p-2 bg-primary/5 rounded-lg group-hover:bg-primary/10 transition-colors">
                      <FileText className="w-8 h-8 text-primary" />
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="-mr-2 h-8 w-8 text-muted-foreground">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>View Details</DropdownMenuItem>
                        <DropdownMenuItem>Rename</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </CardHeader>
                  <CardContent>
                    <CardTitle className="text-base font-semibold truncate leading-tight mb-1" title={doc.title}>
                      {doc.title}
                    </CardTitle>
                    <div className="flex items-center gap-2 mb-4">
                      <Badge variant="secondary" className="text-xs font-normal">{doc.type}</Badge>
                      <span className="text-xs text-muted-foreground">{doc.size}</span>
                    </div>
                    
                    <div className="flex items-center justify-between pt-2 border-t border-border mt-2">
                      <span className="text-xs text-muted-foreground">{doc.date}</span>
                      <div className="flex gap-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Download className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Share2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
            
            {/* Upload Placeholder */}
             <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: filteredDocs.length * 0.05 }}
              >
              <button className="w-full h-full min-h-[180px] border-2 border-dashed border-muted-foreground/25 hover:border-primary/50 hover:bg-primary/5 rounded-xl flex flex-col items-center justify-center gap-3 transition-all group">
                <div className="p-3 bg-muted rounded-full group-hover:bg-background transition-colors">
                  <Upload className="w-6 h-6 text-muted-foreground group-hover:text-primary" />
                </div>
                <div className="text-center">
                  <p className="font-medium text-foreground">Upload New</p>
                  <p className="text-xs text-muted-foreground">Drag & drop or click</p>
                </div>
              </button>
            </motion.div>
          </div>
        </TabsContent>
        {/* Placeholder for other tabs content logic - keeping it simple for mock */}
        <TabsContent value="legal" className="mt-6 text-center py-10 text-muted-foreground">Filtered view: Legal Documents</TabsContent>
        <TabsContent value="medical" className="mt-6 text-center py-10 text-muted-foreground">Filtered view: Medical Records</TabsContent>
        <TabsContent value="grievance" className="mt-6 text-center py-10 text-muted-foreground">Filtered view: Grievances</TabsContent>
      </Tabs>
    </div>
  );
}
