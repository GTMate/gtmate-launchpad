import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { CheckCircle2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import MainFooter from "@/components/MainFooter";

const Apply = () => {
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    companyName: "",
    email: "",
    targetCountry: "",
    acv: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-16 flex items-center justify-center px-4 min-h-[calc(100vh-4rem)]">
          <div className="max-w-2xl w-full text-center space-y-6">
            <div className="flex justify-center">
              <CheckCircle2 className="h-16 w-16 text-foreground" />
            </div>
            <h1 className="text-4xl font-bold text-foreground">
              Thank you for your interest!
            </h1>
            <p className="text-xl text-muted-foreground">
              We've received your application. Our team will review your information
              and contact you within the next 48 hours with a specific GTM
              partner proposal for your target market.
            </p>
            <div className="pt-4">
              <Button onClick={() => navigate("/")} size="lg">
                Back to home
              </Button>
            </div>
          </div>
        </div>
        <MainFooter />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 max-w-7xl mx-auto">
          {/* Form Section */}
          <div>
            <div className="mb-8">
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                Get a GTM Partner
              </h1>
              <p className="text-lg text-muted-foreground">
                Tell us about your expansion goals and we'll match you with the
                right local partner in under 2 weeks.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    placeholder="John"
                    required
                    value={formData.firstName}
                    onChange={(e) => handleChange("firstName", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    placeholder="Smith"
                    required
                    value={formData.lastName}
                    onChange={(e) => handleChange("lastName", e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="companyName">Company Name</Label>
                  <Input
                    id="companyName"
                    placeholder="Acme Inc."
                    required
                    value={formData.companyName}
                    onChange={(e) => handleChange("companyName", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@company.com"
                    required
                    value={formData.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="targetCountry">Target Country</Label>
                <Select
                  value={formData.targetCountry}
                  onValueChange={(value) => handleChange("targetCountry", value)}
                  required
                >
                  <SelectTrigger id="targetCountry">
                    <SelectValue placeholder="Select a market" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="latam">LATAM (Full Region)</SelectItem>
                    <SelectItem value="europe">EUROPE (Full Region)</SelectItem>
                    <SelectItem value="mexico">Mexico</SelectItem>
                    <SelectItem value="brazil">Brazil</SelectItem>
                    <SelectItem value="argentina">Argentina</SelectItem>
                    <SelectItem value="chile">Chile</SelectItem>
                    <SelectItem value="colombia">Colombia</SelectItem>
                    <SelectItem value="peru">Peru</SelectItem>
                    <SelectItem value="spain">Spain</SelectItem>
                    <SelectItem value="uk">United Kingdom</SelectItem>
                    <SelectItem value="germany">Germany</SelectItem>
                    <SelectItem value="france">France</SelectItem>
                    <SelectItem value="italy">Italy</SelectItem>
                    <SelectItem value="portugal">Portugal</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <Label>ACV (Annual Contract Value)</Label>
                <RadioGroup
                  value={formData.acv}
                  onValueChange={(value) => handleChange("acv", value)}
                  required
                >
                  <div className="flex items-center space-x-2 p-3 rounded-md border border-border hover:bg-muted/50 transition-colors">
                    <RadioGroupItem value="<100k" id="acv1" />
                    <Label htmlFor="acv1" className="flex-1 cursor-pointer">
                      {"< $100k"}
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 p-3 rounded-md border border-border hover:bg-muted/50 transition-colors">
                    <RadioGroupItem value="100k-250k" id="acv2" />
                    <Label htmlFor="acv2" className="flex-1 cursor-pointer">
                      $100k - $250k
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 p-3 rounded-md border border-border hover:bg-muted/50 transition-colors">
                    <RadioGroupItem value="250k-1m" id="acv3" />
                    <Label htmlFor="acv3" className="flex-1 cursor-pointer">
                      $250k - $1M
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 p-3 rounded-md border border-border hover:bg-muted/50 transition-colors">
                    <RadioGroupItem value=">1m" id="acv4" />
                    <Label htmlFor="acv4" className="flex-1 cursor-pointer">
                      {"> $1M"}
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <Button type="submit" size="lg" className="w-full">
                Submit Application
              </Button>
            </form>
          </div>

          {/* Conversion Hook Section */}
          <div className="lg:sticky lg:top-8 h-fit">
            <div className="bg-card border border-border rounded-lg p-8 space-y-6">
              <h2 className="text-2xl font-bold text-foreground">
                Why choose NEXOR
              </h2>

              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-foreground text-background rounded-full flex items-center justify-center font-bold">
                    1
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">
                      Pre-vetted partners
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      Every GTM partner has been verified for industry experience,
                      local network, and track record of results.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-foreground text-background rounded-full flex items-center justify-center font-bold">
                    2
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">
                      30-day launch
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      No more months of recruitment. Your GTM partner is ready
                      to start generating pipeline immediately.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-foreground text-background rounded-full flex items-center justify-center font-bold">
                    3
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">
                      We train your broker
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      Full onboarding on your product, sales methodology, and
                      go-to-market strategy before they start selling.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-foreground text-background rounded-full flex items-center justify-center font-bold">
                    4
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">
                      Continuous support
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      We don't leave you alone after the match. We monitor KPIs and
                      adjust strategy as needed.
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-border">
                <p className="text-sm text-muted-foreground italic">
                  "NEXOR allowed us to enter Brazil in 6 weeks with a partner
                  who already knew our ideal customers. We closed 3 deals in
                  the first quarter."
                </p>
                <p className="text-sm font-semibold text-foreground mt-2">
                  — VP Sales, SaaS Fintech
                </p>
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>
      <MainFooter />
    </div>
  );
};

export default Apply;
