import { Mail, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const subscriptionOptions = [
  { id: "newsletter", label: "General Newsletter", description: "Weekly updates on our programs and initiatives" },
  { id: "theballot", label: "The Ballot", description: "Election monitoring and democracy updates" },
  { id: "governance", label: "Governance Watch", description: "Policy analysis and governance insights" },
  { id: "civic", label: "Civic Education", description: "Resources for civic awareness and participation" },
  { id: "events", label: "Events & Webinars", description: "Invitations to upcoming events and webinars" },
  { id: "research", label: "Research & Reports", description: "Latest research publications and reports" },
];

const CTASection = () => {
  const [email, setEmail] = useState("");
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const { toast } = useToast();

  const handleOptionToggle = (optionId: string) => {
    setSelectedOptions(prev => 
      prev.includes(optionId) 
        ? prev.filter(id => id !== optionId)
        : [...prev, optionId]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast({ title: "Please enter your email", variant: "destructive" });
      return;
    }
    if (selectedOptions.length === 0) {
      toast({ title: "Please select at least one subscription", variant: "destructive" });
      return;
    }
    toast({ 
      title: "Subscribed successfully!", 
      description: `You've subscribed to ${selectedOptions.length} item(s).` 
    });
    setEmail("");
    setSelectedOptions([]);
  };

  return (
    <section className="py-20 lg:py-28 bg-background">
      <div className="container mx-auto px-4">
        <div className="relative bg-gradient-to-br from-secondary via-secondary to-accent rounded-3xl p-8 md:p-12 lg:p-16 overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='50' cy='50' r='40' stroke='%23ffffff' stroke-width='2' fill='none'/%3E%3C/svg%3E")`,
              backgroundSize: '100px 100px',
            }} />
          </div>

          <div className="relative z-10 max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-secondary-foreground mb-6">
              Stay Connected with Our Mission
            </h2>
            <p className="text-secondary-foreground/80 text-lg mb-8 leading-relaxed">
              Subscribe to receive updates on our programs, events, and opportunities to get involved in strengthening democracy.
            </p>

            {/* Subscription Options */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8 text-left">
              {subscriptionOptions.map((option) => (
                <label
                  key={option.id}
                  className={`flex items-start gap-3 p-4 rounded-xl cursor-pointer transition-all duration-200 ${
                    selectedOptions.includes(option.id)
                      ? "bg-background shadow-lg"
                      : "bg-background/60 hover:bg-background/80"
                  }`}
                >
                  <Checkbox
                    checked={selectedOptions.includes(option.id)}
                    onCheckedChange={() => handleOptionToggle(option.id)}
                    className="mt-1"
                  />
                  <div>
                    <p className="font-semibold text-foreground">{option.label}</p>
                    <p className="text-sm text-muted-foreground">{option.description}</p>
                  </div>
                </label>
              ))}
            </div>

            {/* Newsletter Form */}
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto mb-8">
              <div className="relative flex-1">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full h-14 pl-12 pr-4 rounded-xl bg-background text-foreground placeholder:text-muted-foreground border-2 border-transparent focus:border-primary focus:outline-none transition-colors"
                />
              </div>
              <Button type="submit" variant="default" size="xl" className="h-14">
                Subscribe
                <ArrowRight className="w-4 h-4" />
              </Button>
            </form>

            <p className="text-secondary-foreground/60 text-sm">
              By subscribing, you agree to receive updates from Yiaga Africa. 
              You can unsubscribe at any time.
            </p>
          </div>

          {/* Decorative Elements */}
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-accent/20 rounded-full blur-3xl" />
        </div>
      </div>
    </section>
  );
};

export default CTASection;
