import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { cn } from "@/lib/utils";

import initiative1 from "@/assets/initiative-1.jpg";
import initiative2 from "@/assets/initiative-2.jpg";
import initiative3 from "@/assets/initiative-3.jpg";

const initiatives = [
  {
    id: 1,
    title: "Watching The Vote",
    category: "Election Monitoring",
    description: "Nigeria's largest citizen-led election observation initiative, deploying technology and trained observers to monitor elections in real-time.",
    stats: [
      { label: "Observers Deployed", value: "10,000+" },
      { label: "Polling Units", value: "25,000+" },
    ],
    featured: true,
    image: initiative1,
  },
  {
    id: 2,
    title: "Ready To Run",
    category: "Youth Leadership",
    description: "Empowering young people, especially women, with the skills and knowledge to run for political office and assume leadership positions.",
    stats: [
      { label: "Youth Trained", value: "5,000+" },
      { label: "Elected Officials", value: "200+" },
    ],
    featured: false,
    image: initiative2,
  },
  {
    id: 3,
    title: "Not Too Young To Run",
    category: "Advocacy",
    description: "A successful campaign that led to constitutional amendment reducing the age for running for political office in Nigeria.",
    stats: [
      { label: "Age Reduction", value: "5-10 Years" },
      { label: "Countries Adopted", value: "6+" },
    ],
    featured: false,
    image: initiative3,
  },
];

const InitiativesSection = () => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });

  return (
    <section id="initiatives" ref={ref} className="py-20 lg:py-28 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className={cn(
          "flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 transition-all duration-700",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        )}>
          <div className="max-w-2xl">
            <span className="inline-block px-4 py-2 bg-accent/10 text-accent rounded-full text-sm font-semibold mb-6">
              Our Initiatives
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-foreground">
              Impactful Programs
              <span className="text-gradient"> Transforming Africa</span>
            </h2>
          </div>
          <Link to="/initiatives">
            <Button variant="outline" size="lg" className="self-start md:self-auto">
              View All Initiatives
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>

        {/* Initiatives Grid */}
        <div className={cn(
          "grid lg:grid-cols-2 gap-8 transition-all duration-700 delay-200",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
        )}>
          {/* Featured Initiative */}
          <div className="lg:row-span-2 group relative bg-primary rounded-3xl overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0">
              <img 
                src={initiatives[0].image} 
                alt={initiatives[0].title}
                className="w-full h-full object-cover opacity-30 group-hover:opacity-40 group-hover:scale-105 transition-all duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/80 to-primary/40" />
            </div>
            
            <div className="relative z-10 h-full flex flex-col p-8 lg:p-10">
              <span className="inline-block px-3 py-1 bg-primary-foreground/20 text-primary-foreground rounded-full text-sm font-medium mb-6 self-start backdrop-blur-sm">
                {initiatives[0].category}
              </span>
              
              <h3 className="text-2xl md:text-3xl lg:text-4xl font-display font-bold text-primary-foreground mb-4">
                {initiatives[0].title}
              </h3>
              
              <p className="text-primary-foreground/80 text-lg mb-8 leading-relaxed flex-grow">
                {initiatives[0].description}
              </p>
              
              <div className="grid grid-cols-2 gap-6 mb-8">
                {initiatives[0].stats.map((stat) => (
                  <div key={stat.label} className="bg-primary-foreground/10 rounded-xl p-4 backdrop-blur-sm">
                    <div className="text-2xl font-display font-bold text-primary-foreground mb-1">
                      {stat.value}
                    </div>
                    <div className="text-primary-foreground/70 text-sm">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
              
              <Link to="/initiatives/watching-the-vote">
                <Button variant="hero" className="self-start group-hover:translate-x-1 transition-transform">
                  Learn More
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Other Initiatives */}
          {initiatives.slice(1).map((initiative) => (
            <div
              key={initiative.id}
              className="group bg-card rounded-2xl overflow-hidden border border-border hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={initiative.image} 
                  alt={initiative.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-secondary/90 text-secondary-foreground rounded-full text-sm font-medium backdrop-blur-sm">
                    {initiative.category}
                  </span>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl md:text-2xl font-display font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                  {initiative.title}
                </h3>
                
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {initiative.description}
                </p>
                
                <div className="flex gap-6 mb-6">
                  {initiative.stats.map((stat) => (
                    <div key={stat.label}>
                      <div className="text-xl font-display font-bold text-foreground">
                        {stat.value}
                      </div>
                      <div className="text-muted-foreground text-sm">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
                
                <a 
                  href="#" 
                  className="inline-flex items-center gap-2 text-primary font-semibold group-hover:gap-3 transition-all"
                >
                  Learn More
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InitiativesSection;
