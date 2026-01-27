import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { cn } from '@/lib/utils';

const partners = [
  { name: "USAID", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/USAID-Identity.svg/320px-USAID-Identity.svg.png" },
  { name: "European Union", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/Flag_of_Europe.svg/320px-Flag_of_Europe.svg.png" },
  { name: "MacArthur Foundation", logo: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=200&q=80" },
  { name: "Ford Foundation", logo: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=200&q=80" },
  { name: "Open Society", logo: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=200&q=80" },
  { name: "DFID", logo: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=200&q=80" },
  { name: "NDI", logo: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=200&q=80" },
  { name: "World Bank", logo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80" },
];

const PartnersCarousel = () => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 });

  return (
    <section ref={ref} className="py-16 bg-muted/30 overflow-hidden">
      <div className={cn(
        "container mx-auto px-4 mb-10 transition-all duration-700",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      )}>
        <div className="text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-secondary mb-2 block">
            Our Partners
          </span>
          <h2 className="text-2xl lg:text-3xl font-display font-bold text-foreground">
            Trusted By Leading Organizations
          </h2>
        </div>
      </div>

      {/* Infinite Scroll Animation */}
      <div className={cn(
        "relative transition-all duration-700 delay-200",
        isVisible ? "opacity-100" : "opacity-0"
      )}>
        {/* Gradient Overlays */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-muted/30 to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-muted/30 to-transparent z-10" />
        
        {/* First Row - Left to Right */}
        <div className="flex animate-scroll-left mb-6">
          {[...partners, ...partners].map((partner, index) => (
            <div
              key={`row1-${index}`}
              className="flex-shrink-0 mx-6 w-40 h-24 bg-background rounded-xl shadow-sm border border-border/50 flex items-center justify-center p-4 hover:shadow-md hover:border-primary/30 transition-all duration-300 group"
            >
              <img
                src={partner.logo}
                alt={partner.name}
                className="max-w-full max-h-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300"
              />
            </div>
          ))}
        </div>
        
        {/* Second Row - Right to Left */}
        <div className="flex animate-scroll-right">
          {[...partners.reverse(), ...partners].map((partner, index) => (
            <div
              key={`row2-${index}`}
              className="flex-shrink-0 mx-6 w-40 h-24 bg-background rounded-xl shadow-sm border border-border/50 flex items-center justify-center p-4 hover:shadow-md hover:border-primary/30 transition-all duration-300 group"
            >
              <img
                src={partner.logo}
                alt={partner.name}
                className="max-w-full max-h-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PartnersCarousel;
