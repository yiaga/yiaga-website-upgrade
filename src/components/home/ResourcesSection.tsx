import { FileText, Download, Video, BookOpen, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const resources = [
  {
    id: 1,
    title: "Election Observation Report 2023",
    type: "PDF Report",
    icon: FileText,
    downloads: "2.5K",
    size: "4.2 MB",
  },
  {
    id: 2,
    title: "Citizen's Guide to Voting",
    type: "E-Book",
    icon: BookOpen,
    downloads: "8.1K",
    size: "2.8 MB",
  },
  {
    id: 3,
    title: "Democracy Explained Series",
    type: "Video Series",
    icon: Video,
    downloads: "15K Views",
    size: "12 Episodes",
  },
  {
    id: 4,
    title: "Legislative Tracking Toolkit",
    type: "PDF Guide",
    icon: FileText,
    downloads: "1.2K",
    size: "1.5 MB",
  },
];

const ResourcesSection = () => {
  return (
    <section id="resources" className="py-20 lg:py-28 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Content */}
          <div>
            <span className="inline-block px-4 py-2 bg-accent/10 text-accent rounded-full text-sm font-semibold mb-6">
              Resources
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-foreground mb-6 leading-tight">
              Knowledge for 
              <span className="text-gradient"> Civic Action</span>
            </h2>
            <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
              Access our comprehensive collection of reports, guides, and educational materials designed to empower citizens and strengthen democratic participation.
            </p>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              From election observation reports to civic education toolkits, our resources are freely available to support your engagement with governance processes.
            </p>
            <Link to="/resources">
              <Button variant="default" size="lg">
                Browse All Resources
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>

          {/* Resources Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {resources.map((resource, index) => (
              <div
                key={resource.id}
                className="group bg-card rounded-xl p-6 border border-border hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                    <resource.icon className="w-6 h-6 text-primary group-hover:text-primary-foreground transition-colors" />
                  </div>
                  <button className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center text-secondary hover:bg-secondary hover:text-secondary-foreground transition-all">
                    <Download className="w-5 h-5" />
                  </button>
                </div>
                
                <h3 className="font-display font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {resource.title}
                </h3>
                
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>{resource.type}</span>
                  <span>{resource.size}</span>
                </div>
                
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResourcesSection;
