import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { cn } from '@/lib/utils';
import ned from '@/assets/partners/ned.jpg'
import undp from '@/assets/partners/undp.jpg'
import eu from '@/assets/partners/eu.jpg'
import actionaid from '@/assets/partners/actionaid.jpg'
import fordFoundation from '@/assets/partners/ford-foundation.jpg'
import luminate from '@/assets/partners/luminate.jpg'
import ndi from '@/assets/partners/ndi.jpg'
import ukaid from '@/assets/partners/ukaid.jpg'
import iri from '@/assets/partners/iri.jpg'
import usEmbassy from '@/assets/partners/us-embassy.jpg'
import spotlight from '@/assets/partners/spotlight.jpg'
import swedishEmbassy from '@/assets/partners/swedish-embassy.jpg'
import euSdgn from '@/assets/partners/eusdgn.jpg'


const partners = [
  { name: "NED", logo: ned },
  { name: "European Union", logo: eu },
  { name: "Action Aid", logo: actionaid },
  { name: "Ford Foundation", logo: fordFoundation },
  { name: "Luminate", logo: luminate },
  { name: "UNDP", logo: undp },
  { name: "NDI", logo: ndi },
  { name: "UK Aid", logo: ukaid },
  { name: "IRI", logo: iri },
  { name: "US Embassy", logo: usEmbassy },
  { name: "Spotlight", logo: spotlight },
  { name: "Swedish Embassy", logo: swedishEmbassy },
  { name: "EU SDGN", logo: euSdgn },
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
