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
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <Link
              key={post.id}
              to={`/blog/${post.slug}`}
              className="group block"
            >
              <article
                className="bg-card rounded-2xl overflow-hidden border border-border hover:shadow-xl hover:-translate-y-2 transition-all duration-500"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Image */}
                <div className="h-48 relative overflow-hidden">
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

                <div className="p-6">
                  {/* Meta */}
                  <div className="flex items-center gap-4 text-muted-foreground text-sm mb-4">
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

                  {/* Author */}
                  <div className="flex items-center justify-between pt-4 border-t border-border">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <User className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <div className="font-semibold text-foreground text-sm">
                          {post.author}
                        </div>
                        <div className="text-muted-foreground text-xs">
                          {post.role}
                        </div>
                      </div>
                    </div>
                    <span className="text-primary hover:text-primary/80 transition-colors">
                      <ArrowRight className="w-5 h-5" />
                    </span>
                  </div>
                </div>
              </article>
            </Link>
          ))}
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
