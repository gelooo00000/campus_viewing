import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Briefcase, Laptop, FlaskConical, Brush, Calculator, Heart, Scale, Building2, BookOpen, Users } from "lucide-react";

const programs = [
  {
    title: "Bachelor of Science in Information Technology",
    icon: Laptop,
    duration: "4 years",
    type: "Bachelor's",
    description: "Comprehensive IT program covering software development, network administration, and database management.",
    careers: ["Software Developer", "System Administrator", "IT Consultant"],
    color: "blue"
  },
  {
    title: "Bachelor of Science in Business Administration",
    icon: Briefcase,
    duration: "4 years",
    type: "Bachelor's",
    description: "Business education focusing on management, entrepreneurship, and organizational leadership.",
    careers: ["Business Manager", "Entrepreneur", "Operations Manager"],
    color: "purple"
  },
  {
    title: "Bachelor of Elementary Education",
    icon: BookOpen,
    duration: "4 years",
    type: "Bachelor's",
    description: "Teacher education program preparing future elementary school educators.",
    careers: ["Elementary Teacher", "Curriculum Developer", "Educational Coordinator"],
    color: "green"
  },
  {
    title: "Bachelor of Science in Agriculture",
    icon: FlaskConical,
    duration: "4 years",
    type: "Bachelor's",
    description: "Agricultural science program focusing on crop production, soil management, and sustainable farming.",
    careers: ["Agricultural Technician", "Farm Manager", "Agricultural Inspector"],
    color: "orange"
  },
  {
    title: "Bachelor of Science in Criminology",
    icon: Scale,
    duration: "4 years",
    type: "Bachelor's",
    description: "Criminal justice program covering law enforcement, investigation, and public safety.",
    careers: ["Police Officer", "Criminal Investigator", "Security Manager"],
    color: "teal"
  },
  {
    title: "Bachelor of Arts in English",
    icon: BookOpen,
    duration: "4 years",
    type: "Bachelor's",
    description: "Literature and language program developing communication and analytical skills.",
    careers: ["English Teacher", "Content Writer", "Communications Specialist"],
    color: "pink"
  }
];

const colorVariants: Record<string, string> = {
  blue: "bg-blue-100 text-blue-600",
  purple: "bg-purple-100 text-purple-600",
  green: "bg-green-100 text-green-600",
  pink: "bg-pink-100 text-pink-600",
  orange: "bg-orange-100 text-orange-600",
  teal: "bg-teal-100 text-teal-600"
};

export default function ProgramsSection() {
  return (
    <section id="programs" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Academic Programs</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover our comprehensive range of undergraduate and graduate programs designed to prepare you for success in your chosen field.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {programs.map((program, index) => {
            const IconComponent = program.icon;
            return (
              <Card key={index} className="h-full hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between mb-3">
                    <div className={`flex items-center justify-center w-12 h-12 rounded-lg ${colorVariants[program.color]}`}>
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <div className="text-right">
                      <Badge variant="secondary">{program.type}</Badge>
                      <p className="text-sm text-muted-foreground mt-1">{program.duration}</p>
                    </div>
                  </div>
                  <CardTitle className="text-xl">{program.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">{program.description}</p>
                  
                  <div>
                    <h4 className="font-semibold mb-2">Career Opportunities:</h4>
                    <div className="flex flex-wrap gap-2">
                      {program.careers.map((career, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {career}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <Button variant="outline" className="w-full">
                    Learn More
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
        
        <div className="text-center mt-12">
          <Button size="lg">View All Programs</Button>
        </div>
      </div>
    </section>
  );
}