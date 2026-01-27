import { useState } from 'react';
import { Edit, Save, Globe, FileText, Image } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

const ContentManagement = () => {
  const { addAuditLog } = useAuth();
  const { toast } = useToast();

  const [heroContent, setHeroContent] = useState({
    title: 'Empowering Citizens for',
    titleHighlight: 'Democratic Governance',
    description: 'Yiaga Africa promotes democratic governance and citizen participation through advocacy, research, and civic engagement across the continent.',
    ctaText: 'Learn More',
  });

  const [aboutContent, setAboutContent] = useState({
    title: 'About Yiaga Africa',
    mission: 'To promote democratic governance, human rights, and active citizenship through civic engagement, research, and advocacy.',
    vision: 'A continent where every citizen is empowered to participate in governance and hold their leaders accountable.',
    description: 'Yiaga Africa is a non-profit civic hub committed to the promotion of democratic governance and citizen participation.',
  });

  const [contactContent, setContactContent] = useState({
    address: '44 Memorial Drive, Abuja, Nigeria',
    email: 'info@yiaga.org',
    phone: '+234 123 456 7890',
    workingHours: 'Monday - Friday: 9:00 AM - 5:00 PM',
  });

  const handleSave = (section: string) => {
    addAuditLog('UPDATE_CONTENT', `Updated ${section} content`);
    toast({
      title: 'Content saved',
      description: `${section} content has been updated successfully (demo mode).`,
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-display font-bold text-foreground">Content Management</h1>
        <p className="text-muted-foreground">Update website content and information</p>
      </div>

      <Tabs defaultValue="hero" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="hero" className="gap-2">
            <Globe className="w-4 h-4" />
            Hero Section
          </TabsTrigger>
          <TabsTrigger value="about" className="gap-2">
            <FileText className="w-4 h-4" />
            About
          </TabsTrigger>
          <TabsTrigger value="contact" className="gap-2">
            <Image className="w-4 h-4" />
            Contact
          </TabsTrigger>
        </TabsList>

        <TabsContent value="hero">
          <div className="bg-card rounded-2xl border border-border p-6 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-display font-bold text-foreground">Hero Section</h2>
              <Button onClick={() => handleSave('Hero Section')} className="gap-2">
                <Save className="w-4 h-4" />
                Save Changes
              </Button>
            </div>
            
            <div className="grid gap-6">
              <div className="space-y-2">
                <Label htmlFor="heroTitle">Main Title</Label>
                <Input
                  id="heroTitle"
                  value={heroContent.title}
                  onChange={(e) => setHeroContent({ ...heroContent, title: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="heroHighlight">Highlighted Text</Label>
                <Input
                  id="heroHighlight"
                  value={heroContent.titleHighlight}
                  onChange={(e) => setHeroContent({ ...heroContent, titleHighlight: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="heroDesc">Description</Label>
                <Textarea
                  id="heroDesc"
                  value={heroContent.description}
                  onChange={(e) => setHeroContent({ ...heroContent, description: e.target.value })}
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="heroCta">CTA Button Text</Label>
                <Input
                  id="heroCta"
                  value={heroContent.ctaText}
                  onChange={(e) => setHeroContent({ ...heroContent, ctaText: e.target.value })}
                />
              </div>
            </div>

            {/* Preview */}
            <div className="border-t border-border pt-6">
              <p className="text-sm text-muted-foreground mb-4">Preview:</p>
              <div className="bg-primary/5 rounded-xl p-6">
                <h1 className="text-2xl font-display font-bold text-foreground">
                  {heroContent.title} <span className="text-gradient">{heroContent.titleHighlight}</span>
                </h1>
                <p className="text-muted-foreground mt-2">{heroContent.description}</p>
                <Button className="mt-4" size="sm">{heroContent.ctaText}</Button>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="about">
          <div className="bg-card rounded-2xl border border-border p-6 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-display font-bold text-foreground">About Section</h2>
              <Button onClick={() => handleSave('About Section')} className="gap-2">
                <Save className="w-4 h-4" />
                Save Changes
              </Button>
            </div>
            
            <div className="grid gap-6">
              <div className="space-y-2">
                <Label htmlFor="aboutTitle">Section Title</Label>
                <Input
                  id="aboutTitle"
                  value={aboutContent.title}
                  onChange={(e) => setAboutContent({ ...aboutContent, title: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="mission">Mission Statement</Label>
                <Textarea
                  id="mission"
                  value={aboutContent.mission}
                  onChange={(e) => setAboutContent({ ...aboutContent, mission: e.target.value })}
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="vision">Vision Statement</Label>
                <Textarea
                  id="vision"
                  value={aboutContent.vision}
                  onChange={(e) => setAboutContent({ ...aboutContent, vision: e.target.value })}
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="aboutDesc">Description</Label>
                <Textarea
                  id="aboutDesc"
                  value={aboutContent.description}
                  onChange={(e) => setAboutContent({ ...aboutContent, description: e.target.value })}
                  rows={4}
                />
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="contact">
          <div className="bg-card rounded-2xl border border-border p-6 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-display font-bold text-foreground">Contact Information</h2>
              <Button onClick={() => handleSave('Contact Information')} className="gap-2">
                <Save className="w-4 h-4" />
                Save Changes
              </Button>
            </div>
            
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  value={contactContent.address}
                  onChange={(e) => setContactContent({ ...contactContent, address: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={contactContent.email}
                  onChange={(e) => setContactContent({ ...contactContent, email: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  value={contactContent.phone}
                  onChange={(e) => setContactContent({ ...contactContent, phone: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="hours">Working Hours</Label>
                <Input
                  id="hours"
                  value={contactContent.workingHours}
                  onChange={(e) => setContactContent({ ...contactContent, workingHours: e.target.value })}
                />
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ContentManagement;
