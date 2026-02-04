import { User, Calendar, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

import blog1 from "@/assets/blog-1.jpg";
import blog2 from "@/assets/blog-2.jpg";
import blog3 from "@/assets/blog-3.jpg";

const blogPosts = [
  {
    id: 1,
    slug: "technology-strengthening-electoral-processes",
    title: "The Role of Technology in Strengthening Electoral Processes",
    excerpt: "Exploring how digital innovations are transforming election monitoring and citizen engagement across Africa.",
    author: "Dr. Hussaini Abdu",
    role: "Country Director",
    date: "Dec 4, 2024",
    comments: 12,
    category: "Technology",
    image: blog1,
  },
  {
    id: 2,
    slug: "youth-participation-politics-matters",
    title: "Why Youth Participation in Politics Matters Now More Than Ever",
    excerpt: "Young people represent the future of democracy. Here's why their involvement is crucial for sustainable governance.",
    author: "Cynthia Mbamalu",
    role: "Director of Programs",
    date: "Dec 2, 2024",
    comments: 8,
    category: "Youth",
    image: blog2,
  },
  {
    id: 3,
    slug: "building-trust-democratic-institutions",
    title: "Building Trust in Democratic Institutions: Lessons from the Field",
    excerpt: "Insights from our work across Nigeria on rebuilding citizen confidence in government and electoral systems.",
    author: "Samson Itodo",
    role: "Executive Director",
    date: "Nov 30, 2024",
    comments: 15,
    category: "Governance",
    image: blog3,
  },
];

const BlogSection = () => {
  return (
    <section id="blog" className="py-20 lg:py-28 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-2 bg-secondary/10 text-secondary rounded-full text-sm font-semibold mb-6">
            From Our Blog
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-foreground mb-6">
            Insights &
            <span className="text-gradient"> Perspectives</span>
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Expert analysis and thought leadership on democracy, governance, and civic engagement in Africa.
          </p>
        </div>

        {/* Blog Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Blog Posts (2 columns) */}
          <div className="lg:col-span-2 grid md:grid-cols-2 gap-8">
            {blogPosts.slice(0, 2).map((post, index) => (
              <Link
                key={post.id}
                to={`/blog/${post.slug}`}
                className="group block h-full"
              >
                <article
                  className="bg-card rounded-2xl overflow-hidden border border-border hover:shadow-xl hover:-translate-y-2 transition-all duration-500 h-full flex flex-col"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {/* Image */}
                  <div className="h-52 relative overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-accent text-accent-foreground rounded-full text-xs font-semibold">
                        {post.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-6 flex flex-col flex-grow">
                    {/* Meta */}
                    <div className="flex items-center gap-4 text-muted-foreground text-sm mb-3">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {post.date}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-display font-bold text-foreground mb-3 group-hover:text-primary transition-colors line-clamp-2">
                      {post.title}
                    </h3>

                    {/* Excerpt */}
                    <p className="text-muted-foreground text-sm leading-relaxed mb-6 line-clamp-3">
                      {post.excerpt}
                    </p>

                    {/* Author (Simplified for home page) */}
                    <div className="flex items-center justify-between pt-4 border-t border-border mt-auto">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                          <User className="w-4 h-4 text-primary" />
                        </div>
                        <span className="font-semibold text-foreground text-xs">{post.author}</span>
                      </div>
                      <span className="text-primary">
                        <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>

          {/* Weekly Series Side Section (1 column) */}
          <div className="flex flex-col gap-6">
            <h4 className="text-lg font-display font-bold text-foreground flex items-center gap-2 mb-2">
              <span className="w-2 h-8 bg-secondary rounded-full" />
              Weekly Series
            </h4>

            {/* The Ballot Card */}
            <Link
              to="/blog?category=The%20Ballot"
              className="group relative h-48 rounded-2xl overflow-hidden bg-primary shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <div className="absolute inset-0 opacity-40 group-hover:opacity-60 group-hover:scale-105 transition-all duration-500 bg-[url('https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?w=600&q=80')] bg-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/60 to-transparent" />
              <div className="relative h-full p-6 flex flex-col justify-end">
                <span className="inline-block px-2 py-0.5 bg-secondary text-secondary-foreground rounded text-[10px] font-bold uppercase tracking-wider mb-2 self-start">
                  Coming Weekly
                </span>
                <h3 className="text-xl font-display font-bold text-white mb-2">The Ballot</h3>
                <p className="text-white/80 text-xs line-clamp-2 mb-3">Your ultimate guide to legislative processes and political analysis.</p>
                <div className="flex items-center text-secondary font-bold text-xs">
                  Read Series <ArrowRight className="ml-1 w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>

            {/* GenZ Series Card */}
            <Link
              to="/blog?category=GenZ%20Series"
              className="group relative h-48 rounded-2xl overflow-hidden bg-accent shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <div className="absolute inset-0 opacity-40 group-hover:opacity-60 group-hover:scale-105 transition-all duration-500 bg-[url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&q=80')] bg-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-accent via-accent/60 to-transparent" />
              <div className="relative h-full p-6 flex flex-col justify-end">
                <span className="inline-block px-2 py-0.5 bg-secondary text-secondary-foreground rounded text-[10px] font-bold uppercase tracking-wider mb-2 self-start">
                  GenZ Focus
                </span>
                <h3 className="text-xl font-display font-bold text-white mb-2">GenZ Blog Series</h3>
                <p className="text-white/80 text-xs line-clamp-2 mb-3">Empowering the next generation of democratic leaders and activists.</p>
                <div className="flex items-center text-secondary font-bold text-xs">
                  Explore Series <ArrowRight className="ml-1 w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Link to="/blog">
            <Button variant="outline" size="lg">
              View All Posts
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
