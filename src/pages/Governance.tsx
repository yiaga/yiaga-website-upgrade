import { Building2, Scale, Users, FileText, Target, CheckCircle, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import PageLayout from "@/components/layout/PageLayout";
import PageHero from "@/components/shared/PageHero";

import focusGovernance from "@/assets/focus-governance.jpg";

const programs = [
  {
    icon: Building2,
    title: "Legislative Strengthening",
    description: "Building the capacity of legislatures to effectively represent citizens and perform oversight functions.",
    outcomes: ["Trained 500+ legislators", "25 policy reforms supported", "State assembly engagement"]
  },
  {
    icon: Scale,
    title: "Accountability & Transparency",
    description: "Promoting open governance and citizen access to information for effective accountability.",
    outcomes: ["Budget tracking systems", "Freedom of Information advocacy", "Public expenditure monitoring"]
  },
  {
    icon: Users,
    title: "Civic Engagement",
    description: "Empowering citizens to actively participate in governance processes and policy making.",
    outcomes: ["Town hall meetings", "Citizen report cards", "Policy dialogue platforms"]
  },
  {
    icon: FileText,
    title: "Policy Advocacy",
    description: "Driving evidence-based policy reforms that strengthen democratic institutions.",
    outcomes: ["Research publications", "Policy briefs", "Stakeholder convenings"]
  },
];

const impacts = [
  { value: "36", label: "States Covered" },
  { value: "500+", label: "Officials Trained" },
  { value: "25", label: "Policy Reforms" },
  { value: "100+", label: "Town Halls" },
];

const Governance = () => {
  return (
    <PageLayout>
      <PageHero
        badge="Focus Area"
        title="Democratic"
        titleHighlight="Governance"
        description="Promoting accountable, transparent, and responsive governance at all levels of government across Africa."
        backgroundImage={focusGovernance}
      />

      {/* Overview Section */}
      <section className="py-20 lg:py-28 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-6">
                Our Approach
              </span>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-6 leading-tight">
                Strengthening Institutions,
                <span className="text-gradient"> Empowering Citizens</span>
              </h2>
              <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
                Good governance is the foundation of sustainable development. Our governance program focuses on building the capacity of democratic institutions while empowering citizens to hold their leaders accountable.
              </p>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                We work with legislatures, civil society organizations, and communities to promote transparency, strengthen oversight mechanisms, and ensure that government policies reflect the needs and aspirations of citizens.
              </p>
              <Link to="/initiatives">
                <Button variant="default" size="lg">
                  Explore Our Initiatives
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>

            <div className="relative">
              <img 
                src={focusGovernance} 
                alt="Governance programs" 
                className="rounded-3xl shadow-2xl"
              />
              <div className="absolute -bottom-8 -left-8 bg-primary text-primary-foreground rounded-2xl p-6 shadow-xl">
                <div className="text-3xl font-display font-bold mb-1">15+</div>
                <div className="text-primary-foreground/80 text-sm">Years of Impact</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Programs Grid */}
      <section className="py-20 lg:py-28 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block px-4 py-2 bg-secondary/10 text-secondary rounded-full text-sm font-semibold mb-6">
              Our Programs
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-6">
              Key Areas of
              <span className="text-gradient"> Intervention</span>
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Our governance programs address critical aspects of democratic development and citizen engagement.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {programs.map((program, index) => (
              <div
                key={program.title}
                className="group bg-card rounded-2xl p-8 border border-border hover:shadow-xl hover:-translate-y-2 transition-all duration-500"
              >
                <div className="flex items-start gap-6">
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                    <program.icon className="w-8 h-8 text-primary group-hover:text-primary-foreground transition-colors" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-display font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                      {program.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      {program.description}
                    </p>
                    <ul className="space-y-2">
                      {program.outcomes.map((outcome) => (
                        <li key={outcome} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <CheckCircle className="w-4 h-4 text-primary" />
                          {outcome}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="py-20 lg:py-28 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
              Our Impact in Numbers
            </h2>
            <p className="text-primary-foreground/80 text-lg leading-relaxed">
              Measurable outcomes that demonstrate our commitment to strengthening governance.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {impacts.map((stat, index) => (
              <div key={stat.label} className="text-center">
                <div className="text-4xl md:text-5xl font-display font-bold text-secondary mb-2">
                  {stat.value}
                </div>
                <div className="text-primary-foreground/70">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-28 bg-background">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-6">
            Partner With Us
          </h2>
          <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
            Join our mission to strengthen democratic governance across Africa. Together, we can build more accountable institutions.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/resources">
              <Button variant="default" size="lg">
                Access Our Resources
              </Button>
            </Link>
            <Link to="/about">
              <Button variant="outline" size="lg">
                Learn More About Us
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Governance;
