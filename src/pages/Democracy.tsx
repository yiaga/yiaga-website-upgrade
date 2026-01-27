import { Vote, Users, Shield, Megaphone, Eye, BarChart3, ArrowRight, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import PageLayout from "@/components/layout/PageLayout";
import PageHero from "@/components/shared/PageHero";

import focusElections from "@/assets/focus-elections.jpg";
import focusCivic from "@/assets/focus-civic.jpg";

const pillars = [
  {
    icon: Vote,
    title: "Election Integrity",
    description: "Deploying technology and citizen observers to ensure free, fair, and credible elections.",
    link: "/initiatives"
  },
  {
    icon: Eye,
    title: "Citizen Observation",
    description: "Training and deploying thousands of observers to monitor electoral processes in real-time.",
    link: "/initiatives"
  },
  {
    icon: Shield,
    title: "Electoral Security",
    description: "Working with stakeholders to ensure peaceful and secure electoral environments.",
    link: "/initiatives"
  },
  {
    icon: Megaphone,
    title: "Voter Education",
    description: "Empowering citizens with knowledge about their voting rights and democratic participation.",
    link: "/resources"
  },
];

const watchingTheVote = {
  title: "Watching The Vote",
  description: "Nigeria's largest citizen-led election observation initiative, deploying technology and trained observers to monitor elections in real-time.",
  stats: [
    { value: "10,000+", label: "Observers Deployed" },
    { value: "25,000+", label: "Polling Units Covered" },
    { value: "Real-time", label: "Results Verification" },
    { value: "36", label: "States Covered" },
  ],
  features: [
    "Parallel Vote Tabulation (PVT)",
    "Mobile-based incident reporting",
    "Real-time data visualization",
    "Citizen-led accountability",
  ]
};

const Democracy = () => {
  return (
    <PageLayout>
      <PageHero
        badge="Focus Area"
        title="Strengthening"
        titleHighlight="Democracy"
        description="Promoting citizen participation, electoral integrity, and democratic values across Africa through innovative programs and advocacy."
        backgroundImage={focusElections}
      />

      {/* Overview Section */}
      <section className="py-20 lg:py-28 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="order-2 lg:order-1">
              <img 
                src={focusCivic} 
                alt="Democracy programs" 
                className="rounded-3xl shadow-2xl"
              />
            </div>
            
            <div className="order-1 lg:order-2">
              <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-6">
                Our Mission
              </span>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-6 leading-tight">
                Every Voice Matters,
                <span className="text-gradient"> Every Vote Counts</span>
              </h2>
              <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
                Democracy thrives when citizens are engaged, informed, and empowered. Our democracy programs focus on strengthening electoral processes, promoting civic participation, and ensuring that every citizen can exercise their democratic rights.
              </p>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                From election observation to voter education, we work tirelessly to protect the integrity of democratic processes and amplify citizen voices in governance.
              </p>
              <Link to="/initiatives">
                <Button variant="default" size="lg">
                  Our Initiatives
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Four Pillars */}
      <section className="py-20 lg:py-28 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block px-4 py-2 bg-secondary/10 text-secondary rounded-full text-sm font-semibold mb-6">
              Our Approach
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-6">
              Four Pillars of
              <span className="text-gradient"> Democratic Engagement</span>
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Our comprehensive approach addresses every aspect of democratic participation.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {pillars.map((pillar, index) => (
              <Link
                key={pillar.title}
                to={pillar.link}
                className="group bg-card rounded-2xl p-8 border border-border hover:shadow-xl hover:-translate-y-2 transition-all duration-500 text-center"
              >
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6 group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                  <pillar.icon className="w-8 h-8 text-primary group-hover:text-primary-foreground transition-colors" />
                </div>
                <h3 className="text-xl font-display font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                  {pillar.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {pillar.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Watching The Vote Spotlight */}
      <section className="py-20 lg:py-28 bg-primary text-primary-foreground overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <span className="inline-block px-4 py-2 bg-primary-foreground/20 text-primary-foreground rounded-full text-sm font-semibold mb-6 backdrop-blur-sm">
                Flagship Initiative
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-6">
                {watchingTheVote.title}
              </h2>
              <p className="text-primary-foreground/80 text-lg mb-8 leading-relaxed">
                {watchingTheVote.description}
              </p>
              
              <ul className="space-y-3 mb-8">
                {watchingTheVote.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-secondary" />
                    <span className="text-primary-foreground/90">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <Link to="/initiatives">
                <Button variant="hero" size="lg">
                  Learn More
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-6">
              {watchingTheVote.stats.map((stat, index) => (
                <div
                  key={stat.label}
                  className="bg-primary-foreground/10 backdrop-blur-sm rounded-2xl p-6 border border-primary-foreground/20"
                >
                  <div className="text-3xl font-display font-bold text-secondary mb-2">
                    {stat.value}
                  </div>
                  <div className="text-primary-foreground/70 text-sm">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Youth Participation */}
      <section className="py-20 lg:py-28 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <span className="inline-block px-4 py-2 bg-accent/10 text-accent rounded-full text-sm font-semibold mb-6">
                Youth & Democracy
              </span>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-6">
                Not Too Young
                <span className="text-gradient"> To Run</span>
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Our landmark campaign that led to a constitutional amendment reducing the age for running for political office in Nigeria, inspiring similar reforms across Africa.
              </p>
            </div>

            <div className="bg-card rounded-3xl p-8 md:p-12 border border-border">
              <div className="grid md:grid-cols-3 gap-8 text-center">
                <div>
                  <div className="text-4xl font-display font-bold text-primary mb-2">5-10</div>
                  <div className="text-muted-foreground">Years Age Reduction</div>
                </div>
                <div>
                  <div className="text-4xl font-display font-bold text-primary mb-2">5,000+</div>
                  <div className="text-muted-foreground">Youth Trained</div>
                </div>
                <div>
                  <div className="text-4xl font-display font-bold text-primary mb-2">6+</div>
                  <div className="text-muted-foreground">Countries Inspired</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-28 bg-muted/50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-6">
            Be Part of the Movement
          </h2>
          <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of citizens working to strengthen democracy across Africa. Your participation matters.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button variant="default" size="lg">
              Get Involved
            </Button>
            <Link to="/resources">
              <Button variant="outline" size="lg">
                Access Resources
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Democracy;
