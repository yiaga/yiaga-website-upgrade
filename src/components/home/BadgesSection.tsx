import { Award, Shield, Star, Trophy, Medal, Crown } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { cn } from '@/lib/utils';

const badges = [
  {
    id: 1,
    title: "Transparency Champion",
    year: "2024",
    issuer: "African Governance Institute",
    icon: Shield,
    color: "from-primary to-primary/70",
  },
  {
    id: 2,
    title: "Excellence in Civic Education",
    year: "2023",
    issuer: "Civil Society Alliance",
    icon: Award,
    color: "from-secondary to-secondary/70",
  },
  {
    id: 3,
    title: "Best Election Monitor",
    year: "2023",
    issuer: "Democracy Watch Africa",
    icon: Trophy,
    color: "from-accent to-accent/70",
  },
  {
    id: 4,
    title: "Youth Empowerment Award",
    year: "2022",
    issuer: "Pan-African Youth Network",
    icon: Star,
    color: "from-primary to-secondary",
  },
  {
    id: 5,
    title: "Innovation in Governance",
    year: "2022",
    issuer: "Open Government Partnership",
    icon: Medal,
    color: "from-secondary to-accent",
  },
  {
    id: 6,
    title: "Outstanding NGO",
    year: "2021",
    issuer: "Nigerian Civil Society",
    icon: Crown,
    color: "from-accent to-primary",
  },
];

const BadgesSection = () => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });

  return (
    <section ref={ref} className="py-20 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className={cn(
          "text-center mb-14 transition-all duration-700",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        )}>
          <span className="text-sm font-semibold uppercase tracking-widest text-secondary mb-2 block">
            Recognition & Awards
          </span>
          <h2 className="text-3xl lg:text-4xl font-display font-bold text-foreground mb-4">
            Badges of Excellence
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Our commitment to democracy and civic engagement has been recognized by leading organizations across Africa
          </p>
        </div>

        {/* Badges Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {badges.map((badge, index) => {
            const Icon = badge.icon;
            return (
              <div
                key={badge.id}
                className={cn(
                  "group relative transition-all duration-500",
                  isVisible 
                    ? "opacity-100 translate-y-0" 
                    : "opacity-0 translate-y-12"
                )}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-background border border-border/50 shadow-sm hover:shadow-xl hover:border-primary/30 transition-all duration-300 hover:-translate-y-2">
                  {/* Badge Icon */}
                  <div className={cn(
                    "w-20 h-20 rounded-full bg-gradient-to-br flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300",
                    badge.color
                  )}>
                    <Icon className="w-10 h-10 text-white" />
                  </div>
                  
                  {/* Year Tag */}
                  <span className="absolute top-3 right-3 text-xs font-bold bg-muted px-2 py-1 rounded-full text-muted-foreground">
                    {badge.year}
                  </span>
                  
                  {/* Title */}
                  <h3 className="font-semibold text-foreground text-sm leading-tight mb-2">
                    {badge.title}
                  </h3>
                  
                  {/* Issuer */}
                  <p className="text-xs text-muted-foreground">
                    {badge.issuer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default BadgesSection;
