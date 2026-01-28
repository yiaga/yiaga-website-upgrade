import { Mail, Phone, MapPin, Send, MessageSquare, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import PageLayout from "@/components/layout/PageLayout";
import PageHero from "@/components/shared/PageHero";
import focusDemo from "@/assets/focus-civic.jpg";
import { useToast } from "@/components/ui/use-toast";

const Contact = () => {
    const { toast } = useToast();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        toast({
            title: "Message Sent!",
            description: "Thank you for reaching out. We will get back to you shortly.",
        });
    };

    return (
        <PageLayout>
            <PageHero
                badge="Contact Us"
                title="Get in"
                titleHighlight="Touch"
                description="Have questions or want to collaborate? Reach out to us. Our team is ready to listen and work together for a better Africa."
                backgroundImage={focusDemo}
            />

            <section className="py-20 lg:py-28 bg-background">
                <div className="container mx-auto px-4">
                    <div className="grid lg:grid-cols-2 gap-16">
                        {/* Contact Information */}
                        <div className="space-y-12">
                            <div>
                                <span className="inline-block px-4 py-2 bg-secondary/10 text-secondary rounded-full text-sm font-semibold mb-6">
                                    Contact Information
                                </span>
                                <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-6">
                                    Visit Our Headquarters or
                                    <span className="text-gradient"> Reach Out Online</span>
                                </h2>
                                <p className="text-muted-foreground text-lg leading-relaxed">
                                    We are always open to discussions about partnerships, project inquiries, or any questions you might have about our work across the continent.
                                </p>
                            </div>

                            <div className="grid sm:grid-cols-2 gap-8">
                                <div className="flex gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                                        <MapPin className="w-6 h-6 text-primary" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-foreground mb-1">Our Office</h4>
                                        <p className="text-muted-foreground text-sm leading-relaxed">
                                            3, Alex Ekwueme Street, Jabi, Abuja, Nigeria.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center shrink-0">
                                        <Mail className="w-6 h-6 text-secondary" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-foreground mb-1">Email Us</h4>
                                        <p className="text-muted-foreground text-sm leading-relaxed">
                                            info@yiaga.org<br />
                                            media@yiaga.org
                                        </p>
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
                                        <Phone className="w-6 h-6 text-accent" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-foreground mb-1">Call Us</h4>
                                        <p className="text-muted-foreground text-sm leading-relaxed">
                                            +234 800 123 4567<br />
                                            +234 9 123 4567
                                        </p>
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                                        <Globe className="w-6 h-6 text-primary" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-foreground mb-1">Social Media</h4>
                                        <div className="flex gap-3 mt-2">
                                            {/* Social icons can be added here */}
                                            <span className="text-muted-foreground text-sm">@yiaga</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Map Placeholder */}
                            <div className="relative aspect-video rounded-2xl overflow-hidden shadow-lg border border-border bg-muted flex items-center justify-center">
                                <div className="text-center p-8">
                                    <MapPin className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
                                    <p className="text-muted-foreground">Interactive Map Integration</p>
                                </div>
                                {/* Real map would go here */}
                            </div>
                        </div>

                        {/* Contact Form */}
                        <div className="bg-card rounded-3xl p-8 lg:p-12 border border-border shadow-xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full -mr-16 -mt-16" />
                            <div className="absolute bottom-0 left-0 w-24 h-24 bg-secondary/5 rounded-tr-full -ml-12 -mb-12" />

                            <div className="relative z-10">
                                <div className="flex items-center gap-3 mb-8">
                                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                                        <MessageSquare className="w-5 h-5 text-primary" />
                                    </div>
                                    <h3 className="text-2xl font-display font-bold text-foreground">Send a Message</h3>
                                </div>

                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid sm:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label htmlFor="first_name" className="text-sm font-medium text-foreground">First Name</label>
                                            <Input id="first_name" placeholder="John" required />
                                        </div>
                                        <div className="space-y-2">
                                            <label htmlFor="last_name" className="text-sm font-medium text-foreground">Last Name</label>
                                            <Input id="last_name" placeholder="Doe" required />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label htmlFor="email" className="text-sm font-medium text-foreground">Email Address</label>
                                        <Input id="email" type="email" placeholder="john@example.com" required />
                                    </div>

                                    <div className="space-y-2">
                                        <label htmlFor="subject" className="text-sm font-medium text-foreground">Subject</label>
                                        <Input id="subject" placeholder="How can we help?" required />
                                    </div>

                                    <div className="space-y-2">
                                        <label htmlFor="message" className="text-sm font-medium text-foreground">Message</label>
                                        <Textarea
                                            id="message"
                                            placeholder="Tell us more about your inquiry..."
                                            className="min-h-[150px] resize-none"
                                            required
                                        />
                                    </div>

                                    <Button type="submit" className="w-full h-14 text-lg font-semibold group">
                                        Send Message
                                        <Send className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                                    </Button>
                                </form>

                                <p className="mt-8 text-center text-sm text-muted-foreground">
                                    By submitting this form, you agree to our
                                    <a href="#" className="text-primary hover:underline ml-1">Privacy Policy</a>.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </PageLayout>
    );
};

export default Contact;
