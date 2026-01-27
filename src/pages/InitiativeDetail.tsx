import { useParams, Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, Users, Target, Award, Calendar, MapPin, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import PageLayout from "@/components/layout/PageLayout";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/services/api";

const InitiativeDetail = () => {
  const { slug } = useParams<{ slug: string }>();

  const { data: initiative, isLoading: isInitiativeLoading } = useQuery({
    queryKey: ['initiative', slug],
    queryFn: () => slug ? api.getInitiativeBySlug(slug) : Promise.resolve(undefined),
    enabled: !!slug
  });

  const { data: allInitiatives = [] } = useQuery({
    queryKey: ['initiatives'],
    queryFn: api.getInitiatives,
    enabled: !!initiative
  });

  if (isInitiativeLoading) {
    return (
      <PageLayout>
        <div className="flex h-[50vh] items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </PageLayout>
    );
  }

  if (!initiative) {
    return (
      <PageLayout>
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-3xl font-display font-bold text-foreground mb-4">
            Initiative Not Found
          </h1>
          <p className="text-muted-foreground mb-8">
            The initiative you're looking for doesn't exist or has been removed.
          </p>
          <Link to="/initiatives">
            <Button variant="default">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Initiatives
            </Button>
          </Link>
        </div>
      </PageLayout>
    );
  }

  // Get other initiatives
  const otherInitiatives = allInitiatives.filter(i => i.id !== initiative.id);

  const bgColorClass = initiative.color === 'primary' ? 'bg-primary' :
    initiative.color === 'secondary' ? 'bg-secondary' : 'bg-accent';

  const textColorClass = initiative.color === 'primary' ? 'text-primary' :
    initiative.color === 'secondary' ? 'text-secondary' : 'text-accent';

  return (
    <PageLayout>
      {/* Hero Section */}
      <section className={`${bgColorClass} relative overflow-hidden`}>
        <div className="absolute inset-0">
          <img
            src={initiative.image}
            alt={initiative.title}
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-current/90 to-current/60" />
        </div>

        <div className="container mx-auto px-4 py-20 lg:py-28 relative z-10">
          <Link
            to="/initiatives"
            className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Initiatives
          </Link>

          <div className="max-w-4xl">
            <span className="inline-block px-4 py-2 bg-white/20 text-white rounded-full text-sm font-semibold mb-6 backdrop-blur-sm">
              {initiative.category}
            </span>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-6 leading-tight">
              {initiative.title}
            </h1>

            <p className="text-xl text-white/90 leading-relaxed mb-8 max-w-2xl">
              {initiative.description}
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {initiative.stats.map((stat) => (
                <div key={stat.label} className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
                  <div className="text-2xl md:text-3xl font-display font-bold text-white mb-1">
                    {stat.value}
                  </div>
                  <div className="text-white/70 text-sm">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Article Content */}
            <div className="lg:col-span-2">
              <div className="prose prose-lg max-w-none">
                {initiative.content.split('\n\n').map((paragraph, index) => {
                  if (paragraph.startsWith('## ')) {
                    return (
                      <h2 key={index} className="text-2xl md:text-3xl font-display font-bold text-foreground mt-10 mb-6">
                        {paragraph.replace('## ', '')}
                      </h2>
                    );
                  }
                  if (paragraph.startsWith('### ')) {
                    return (
                      <h3 key={index} className="text-xl font-display font-bold text-foreground mt-8 mb-4">
                        {paragraph.replace('### ', '')}
                      </h3>
                    );
                  }
                  if (paragraph.startsWith('- ')) {
                    const items = paragraph.split('\n');
                    return (
                      <ul key={index} className="space-y-3 mb-6">
                        {items.map((item, i) => (
                          <li key={i} className="flex items-start gap-3 text-muted-foreground">
                            <div className={`w-2 h-2 rounded-full ${bgColorClass} mt-2 flex-shrink-0`} />
                            {item.replace('- ', '')}
                          </li>
                        ))}
                      </ul>
                    );
                  }
                  return (
                    <p key={index} className="text-muted-foreground leading-relaxed mb-6 text-lg">
                      {paragraph}
                    </p>
                  );
                })}
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-4 mt-12 pt-8 border-t border-border">
                <Button variant="default" size="lg">
                  Get Involved
                  <ArrowRight className="w-4 h-4" />
                </Button>
                <Link to="/resources">
                  <Button variant="outline" size="lg">
                    Download Resources
                  </Button>
                </Link>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Quick Facts */}
              <div className="bg-card rounded-2xl p-6 border border-border">
                <h3 className="text-lg font-display font-bold text-foreground mb-6">Quick Facts</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl ${bgColorClass}/10 flex items-center justify-center`}>
                      <Calendar className={`w-5 h-5 ${textColorClass}`} />
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Started</div>
                      <div className="font-semibold text-foreground">2015</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl ${bgColorClass}/10 flex items-center justify-center`}>
                      <MapPin className={`w-5 h-5 ${textColorClass}`} />
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Coverage</div>
                      <div className="font-semibold text-foreground">All 36 States + FCT</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl ${bgColorClass}/10 flex items-center justify-center`}>
                      <Users className={`w-5 h-5 ${textColorClass}`} />
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Participants</div>
                      <div className="font-semibold text-foreground">{initiative.stats[0].value}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact */}
              <div className={`${bgColorClass} rounded-2xl p-6 text-white`}>
                <h3 className="text-lg font-display font-bold mb-4">Get Involved</h3>
                <p className="text-white/80 mb-6 leading-relaxed">
                  Interested in participating or supporting this initiative? Reach out to learn how you can contribute.
                </p>
                <Button variant="hero" className="w-full">
                  Contact Us
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Other Initiatives */}
      <section className="py-16 lg:py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-8">
            Other Initiatives
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {otherInitiatives.map((item) => (
              <Link
                key={item.id}
                to={`/initiatives/${item.slug}`}
                className="group bg-card rounded-2xl overflow-hidden border border-border hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <div className="h-48 relative overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
                  <div className="absolute top-4 left-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium backdrop-blur-sm ${item.color === 'primary' ? 'bg-primary/90 text-primary-foreground' :
                        item.color === 'secondary' ? 'bg-secondary/90 text-secondary-foreground' :
                          'bg-accent/90 text-accent-foreground'
                      }`}>
                      {item.category}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-display font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-muted-foreground mb-4 line-clamp-2">
                    {item.description}
                  </p>

                  <span className="inline-flex items-center gap-2 text-primary font-semibold group-hover:gap-3 transition-all">
                    Learn More
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default InitiativeDetail;
