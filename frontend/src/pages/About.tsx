import { Target, Users, Award, TrendingUp, Heart, Globe, Lightbulb, Shield } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import PageLayout from "@/components/layout/PageLayout";
import PageHero from "@/components/shared/PageHero";

import focusCommunity from "@/assets/focus-community.jpg";

const stats = [
  { icon: Users, value: "50K+", label: "Trained Citizens" },
  { icon: Target, value: "36", label: "States Covered" },
  { icon: Award, value: "15+", label: "Years Experience" },
  { icon: TrendingUp, value: "200+", label: "Projects Completed" },
];

const values = [
  {
    icon: Heart,
    title: "Citizen-Centered",
    description: "We put citizens at the heart of everything we do, ensuring their voices are heard and their rights protected."
  },
  {
    icon: Globe,
    title: "Pan-African Vision",
    description: "Our work extends across Africa, building networks and sharing best practices for democratic governance."
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    description: "We leverage technology and creative approaches to solve complex governance challenges."
  },
  {
    icon: Shield,
    title: "Integrity",
    description: "Transparency and accountability guide our operations, setting the standard we expect from leaders."
  },
];

const team = [
  {
    name: "Samson Itodo",
    role: "Executive Director",
    bio: "A passionate advocate for youth participation in governance with over 15 years of experience."
  },
  {
    name: "Cynthia Mbamalu",
    role: "Director of Programs",
    bio: "Leading our programmatic interventions in elections, governance, and civic engagement."
  },
];

const About = () => {
  return (
    <PageLayout>
      <PageHero
        badge="About Yiaga Africa"
        title="Advancing Democracy &"
        titleHighlight="Good Governance"
        description="We are a non-profit civic hub dedicated to the promotion of democratic governance, human rights, and civic participation across Africa."
        backgroundImage={focusCommunity}
      />

      {/* Our Story Section */}
      <section className="py-20 lg:py-28 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-6">
                Our Story
              </span>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-6 leading-tight">
                Building a Stronger
                <span className="text-gradient"> Africa Together</span>
              </h2>
              <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
                Founded with a vision to strengthen democracy across Africa, Yiaga Africa has grown into one of the continent's leading civic organizations. Our journey began with a simple belief: that citizens have the power to shape their own governance.
              </p>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Over the years, we have trained thousands of election observers, advocated for policy reforms, and empowered young people to participate in politics. Our "Not Too Young To Run" campaign led to a constitutional amendment that reduced the age for running for political office in Nigeria.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Today, we continue to innovate and expand our reach, using technology and grassroots mobilization to ensure that governments remain transparent, accountable, and responsive to citizens.
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat, index) => (
                <div
                  key={stat.label}
                  className="group relative bg-card rounded-2xl p-6 shadow-sm border border-border hover:shadow-lg hover:-translate-y-1 transition-all duration-500"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                    <stat.icon className="w-7 h-7 text-primary group-hover:text-primary-foreground transition-colors" />
                  </div>
                  <div className="text-3xl md:text-4xl font-display font-bold text-foreground mb-1">
                    {stat.value}
                  </div>
                  <div className="text-muted-foreground font-medium">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="py-20 lg:py-28 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block px-4 py-2 bg-secondary/10 text-secondary rounded-full text-sm font-semibold mb-6">
              Our Values
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-6">
              What Drives
              <span className="text-gradient"> Our Mission</span>
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Our core values shape every initiative we undertake and guide how we engage with communities.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div
                key={value.title}
                className="group bg-card rounded-2xl p-8 border border-border hover:shadow-xl hover:-translate-y-2 transition-all duration-500 text-center"
              >
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6 group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                  <value.icon className="w-8 h-8 text-primary group-hover:text-primary-foreground transition-colors" />
                </div>
                <h3 className="text-xl font-display font-bold text-foreground mb-3">
                  {value.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Meet the Team Section */}
      <section className="py-20 lg:py-28 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block px-4 py-2 bg-accent/10 text-accent rounded-full text-sm font-semibold mb-6">
              Our Team
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-6">
              Meet the
              <span className="text-gradient"> Leaders</span>
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Our diverse team of experts brings together decades of experience in governance, policy, and civic engagement.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-8 max-w-5xl mx-auto">
            {team.map((member, index) => (
              <div
                key={member.name}
                className="group bg-card rounded-2xl p-8 border border-border hover:shadow-xl hover:-translate-y-2 transition-all duration-500 text-center w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.5rem)] max-w-sm"
              >
                <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6 group-hover:bg-primary transition-all duration-300">
                  <Users className="w-12 h-12 text-primary group-hover:text-primary-foreground transition-colors" />
                </div>
                <h3 className="text-xl font-display font-bold text-foreground mb-1">
                  {member.name}
                </h3>
                <p className="text-primary font-medium text-sm mb-4">
                  {member.role}
                </p>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {member.bio}
                </p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button variant="outline" size="lg">
              View Full Team
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-28 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
            Ready to Make a Difference?
          </h2>
          <p className="text-primary-foreground/80 text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of citizens who are actively participating in shaping the future of governance in Africa.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/initiatives">
              <Button variant="hero" size="lg">
                Explore Our Work
              </Button>
            </Link>
            <Link to="/careers">
              <Button variant="outline" size="lg" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
                Join Our Team
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default About;
