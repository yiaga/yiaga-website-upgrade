import { ArrowRight, Users, Target, Award, ExternalLink, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import PageLayout from "@/components/layout/PageLayout";
import PageHero from "@/components/shared/PageHero";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/services/api";

import initiative1 from "@/assets/initiative-1.jpg";

const otherPrograms = [
  {
    title: "Legislative Engagement",
    description: "Working with state and national assemblies to strengthen legislative capacity and oversight functions.",
    icon: Users,
  },
  {
    title: "Policy Advocacy",
    description: "Driving evidence-based policy reforms that strengthen democratic institutions.",
    icon: Target,
  },
  {
    title: "Civic Education",
    description: "Training citizens on their rights, responsibilities, and how to engage effectively with government.",
    icon: Award,
  },
];

const Initiatives = () => {
  const { data: initiatives = [], isLoading } = useQuery({
    queryKey: ['initiatives'],
    queryFn: api.getInitiatives
  });

  if (isLoading) {
    return (
      <PageLayout>
        <div className="flex h-[50vh] items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <PageHero
        badge="Our Initiatives"
        title="Impactful Programs"
        titleHighlight="Transforming Africa"
        description="Discover our flagship initiatives that are making a real difference in strengthening democracy and governance across the continent."
        backgroundImage={initiative1}
      />

      {/* Featured Initiatives */}
      <section className="py-20 lg:py-28 bg-background">
        <div className="container mx-auto px-4">
          <div className="space-y-20">
            {initiatives.map((initiative, index) => (
              <div
                key={initiative.id}
                className={`grid lg:grid-cols-2 gap-12 lg:gap-20 items-center ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                  }`}
              >
                <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                  <span className={`inline-block px-4 py-2 rounded-full text-sm font-semibold mb-6 ${initiative.color === 'primary' ? 'bg-primary/10 text-primary' :
                    initiative.color === 'secondary' ? 'bg-secondary/10 text-secondary' :
                      'bg-accent/10 text-accent'
                    }`}>
                    {initiative.category}
                  </span>
                  <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-6 leading-tight">
                    {initiative.title}
                  </h2>
                  <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
                    {initiative.description}
                  </p>
                  <p className="text-muted-foreground mb-8 leading-relaxed">
                    {initiative.fullDescription}
                  </p>

                  <div className="grid grid-cols-2 gap-4 mb-8">
                    {initiative.stats.map((stat) => (
                      <div key={stat.label} className="bg-muted/50 rounded-xl p-4">
                        <div className="text-2xl font-display font-bold text-foreground mb-1">
                          {stat.value}
                        </div>
                        <div className="text-muted-foreground text-sm">
                          {stat.label}
                        </div>
                      </div>
                    ))}
                  </div>

                  <Link to={`/initiatives/${initiative.slug}`}>
                    <Button variant="default" size="lg">
                      Learn More
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </Link>
                </div>

                <div className={`relative ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                  <img
                    src={initiative.image}
                    alt={initiative.title}
                    className="rounded-3xl shadow-2xl w-full"
                  />
                  <div className={`absolute -bottom-6 ${index % 2 === 1 ? '-right-6' : '-left-6'} w-24 h-24 rounded-2xl flex items-center justify-center shadow-xl ${initiative.color === 'primary' ? 'bg-primary' :
                    initiative.color === 'secondary' ? 'bg-secondary' :
                      'bg-accent'
                    }`}>
                    <span className="text-3xl font-display font-bold text-white">
                      #{index + 1}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Other Programs */}
      <section className="py-20 lg:py-28 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block px-4 py-2 bg-secondary/10 text-secondary rounded-full text-sm font-semibold mb-6">
              More Programs
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-6">
              Additional Areas of
              <span className="text-gradient"> Intervention</span>
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Beyond our flagship initiatives, we work across multiple areas to strengthen democracy.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {otherPrograms.map((program, index) => (
              <div
                key={program.title}
                className="group bg-card rounded-2xl p-8 border border-border hover:shadow-xl hover:-translate-y-2 transition-all duration-500"
              >
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                  <program.icon className="w-8 h-8 text-primary group-hover:text-primary-foreground transition-colors" />
                </div>
                <h3 className="text-xl font-display font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                  {program.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  {program.description}
                </p>
                <a
                  href="#"
                  className="inline-flex items-center gap-2 text-primary font-semibold group-hover:gap-3 transition-all"
                >
                  Learn More
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Summary */}
      <section className="py-20 lg:py-28 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
              Our Collective Impact
            </h2>
            <p className="text-primary-foreground/80 text-lg leading-relaxed">
              Together, our initiatives have made a measurable difference across Nigeria and beyond.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl md:text-5xl font-display font-bold text-secondary mb-2">50K+</div>
              <div className="text-primary-foreground/70">Citizens Trained</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-display font-bold text-secondary mb-2">36</div>
              <div className="text-primary-foreground/70">States Covered</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-display font-bold text-secondary mb-2">15+</div>
              <div className="text-primary-foreground/70">Years of Impact</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-display font-bold text-secondary mb-2">200+</div>
              <div className="text-primary-foreground/70">Projects Completed</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-28 bg-background">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-6">
            Want to Get Involved?
          </h2>
          <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
            There are many ways to support our work and contribute to strengthening democracy in Africa.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/contact">
              <Button variant="default" size="lg">
                Get Involved
              </Button>
            </Link>
            <Link to="/careers">
              <Button variant="outline" size="lg">
                View Career Opportunities
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Initiatives;
