import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import MainFooter from "@/components/MainFooter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ChevronDown, X, CheckCircle2, ArrowLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const REGION_GROUPS = [
  {
    title: "LATAM",
    regions: [
      { value: "latam", label: "LATAM (Full Region)" },
      { value: "argentina", label: "Argentina" },
      { value: "brazil", label: "Brazil" },
      { value: "chile", label: "Chile" },
      { value: "colombia", label: "Colombia" },
      { value: "costa-rica", label: "Costa Rica" },
      { value: "ecuador", label: "Ecuador" },
      { value: "mexico", label: "Mexico" },
      { value: "panama", label: "Panama" },
      { value: "peru", label: "Peru" },
      { value: "uruguay", label: "Uruguay" },
    ],
  },
  {
    title: "Europe",
    regions: [
      { value: "europe", label: "Europe (Full Region)" },
      { value: "france", label: "France" },
      { value: "germany", label: "Germany" },
      { value: "ireland", label: "Ireland" },
      { value: "italy", label: "Italy" },
      { value: "netherlands", label: "Netherlands" },
      { value: "portugal", label: "Portugal" },
      { value: "spain", label: "Spain" },
      { value: "sweden", label: "Sweden" },
      { value: "switzerland", label: "Switzerland" },
      { value: "uk", label: "United Kingdom" },
    ],
  },
];

// Flat list for lookups
const ALL_REGIONS = REGION_GROUPS.flatMap((group) => group.regions);

interface Partner {
  id: string;
  name: string;
  photo?: string;
  photo_url?: string;
  rate: number;
  markets: string[];
  verified?: boolean;
}

const Contact = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const partner = location.state?.partner as Partner | undefined;
  
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    companyName: "",
    email: "",
    targetRegions: [] as string[],
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Importar la función de Supabase
    const { createContactRequest } = await import("@/lib/supabase");
    
    // Preparar los datos
    const contactData = {
      first_name: formData.firstName,
      last_name: formData.lastName,
      company_name: formData.companyName,
      email: formData.email,
      target_region: formData.targetRegions.join(", "),
      partner_id: partner?.id,
      partner_name: partner?.name,
    };
    
    // Enviar a Supabase
    const result = await createContactRequest(contactData);
    
    if (result.success) {
      console.log("Contact request saved successfully:", result.data);
      setSubmitted(true);
    } else {
      console.error("Error saving contact request:", result.error);
      // Aquí podrías mostrar un mensaje de error al usuario
      // Por ahora, procederemos con la confirmación de todas formas
      alert(`Error: ${result.error || 'Could not save request. Please try again.'}`);
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const toggleRegion = (region: string) => {
    setFormData((prev) => {
      const isSelected = prev.targetRegions.includes(region);
      
      // Check if this is a "full region" option
      if (region === "latam" || region === "europe") {
        const group = REGION_GROUPS.find((g) => 
          g.regions.some((r) => r.value === region)
        );
        if (group) {
          const allRegionValues = group.regions.map((r) => r.value);
          
          if (isSelected) {
            // Deselecting full region: remove all countries from this group
            return {
              ...prev,
              targetRegions: prev.targetRegions.filter((r) => !allRegionValues.includes(r)),
            };
          } else {
            // Selecting full region: add all countries from this group
            const newRegions = [...prev.targetRegions];
            allRegionValues.forEach((r) => {
              if (!newRegions.includes(r)) {
                newRegions.push(r);
              }
            });
            return { ...prev, targetRegions: newRegions };
          }
        }
      }
      
      // Regular country toggle
      if (isSelected) {
        // Deselecting a country: also deselect the full region if it was selected
        const group = REGION_GROUPS.find((g) => 
          g.regions.some((r) => r.value === region)
        );
        const fullRegionValue = group?.regions[0].value; // First item is always "Full Region"
        
        return {
          ...prev,
          targetRegions: prev.targetRegions
            .filter((r) => r !== region)
            .filter((r) => r !== fullRegionValue),
        };
      } else {
        // Selecting a country: check if all countries in group are now selected
        const newRegions = [...prev.targetRegions, region];
        
        const group = REGION_GROUPS.find((g) => 
          g.regions.some((r) => r.value === region)
        );
        
        if (group) {
          const fullRegionValue = group.regions[0].value;
          const countryValues = group.regions.slice(1).map((r) => r.value); // All except "Full Region"
          const allCountriesSelected = countryValues.every((c) => newRegions.includes(c));
          
          // If all countries are selected, also select the full region
          if (allCountriesSelected && !newRegions.includes(fullRegionValue)) {
            newRegions.push(fullRegionValue);
          }
        }
        
        return { ...prev, targetRegions: newRegions };
      }
    });
  };

  const removeRegion = (region: string) => {
    // Use toggleRegion logic to handle full region deselection
    if (formData.targetRegions.includes(region)) {
      toggleRegion(region);
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  // Load Calendly script when submitted
  useEffect(() => {
    if (submitted) {
      const script = document.createElement('script');
      script.src = 'https://assets.calendly.com/assets/external/widget.js';
      script.async = true;
      document.body.appendChild(script);
      
      return () => {
        document.body.removeChild(script);
      };
    }
  }, [submitted]);

  if (submitted) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-16 px-4 py-12">
          <div className="max-w-4xl mx-auto">
            {/* Thank You Message */}
            <div className="text-center space-y-6 mb-12">
              <div className="flex justify-center">
                <CheckCircle2 className="h-16 w-16 text-[#874FFF]" />
              </div>
              <h1 className="text-4xl font-bold text-foreground">
                Thank you, <span className="text-[#874FFF]">{formData.firstName}</span>!
              </h1>
              <p className="text-xl text-muted-foreground">
                {partner ? (
                  <>We've received your introduction request for <span className="font-semibold text-foreground">{partner.name}</span>. </>
                ) : (
                  <>We've received your request. </>
                )}
                Our team will contact you within 24 hours.
              </p>
            </div>

            {/* Calendly Section */}
            <div className="mb-12">
              <div className="text-center mb-2">
                <h2 className="text-2xl font-bold text-foreground mb-1">
                  Want to talk sooner?
                </h2>
                <p className="text-muted-foreground">
                  Schedule a call with one of our sales representatives right now.
                </p>
              </div>
              <div 
                className="calendly-inline-widget" 
                data-url="https://calendly.com/marcpierrem/30-minute-meeting?hide_gdpr_banner=1"
                style={{ minWidth: '320px', height: '950px' }}
              />
            </div>

            {/* Back to Home */}
            <div className="text-center">
              <Button 
                onClick={() => navigate("/")} 
                size="lg"
                variant="outline"
              >
                Go to Home
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
          <div className="max-w-5xl mx-auto">
            {/* Header */}
            <div className="mb-8">
              <Button
                variant="ghost"
                onClick={() => navigate(-1)}
                className="mb-4 -ml-4"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Button>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                {partner ? "Request Introduction" : "Start your expansion"}
              </h1>
              <p className="text-lg text-muted-foreground">
                {partner 
                  ? "Fill out the form below and we'll connect you with this GTM partner within 24 hours."
                  : "Share a few details about your expansion plans and we'll match you with a vetted GTM partner in your target region."
                }
              </p>
            </div>

            <div className={`grid gap-8 ${partner ? "lg:grid-cols-5" : "lg:grid-cols-1 max-w-2xl"}`}>
              {/* Form Section */}
              <div className={partner ? "lg:col-span-3" : ""}>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name Fields */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name *</Label>
                      <Input
                        id="firstName"
                        required
                        value={formData.firstName}
                        onChange={(e) => handleChange("firstName", e.target.value)}
                        placeholder="John"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name *</Label>
                      <Input
                        id="lastName"
                        required
                        value={formData.lastName}
                        onChange={(e) => handleChange("lastName", e.target.value)}
                        placeholder="Doe"
                      />
                    </div>
                  </div>

                  {/* Company */}
                  <div className="space-y-2">
                    <Label htmlFor="companyName">Company Name *</Label>
                    <Input
                      id="companyName"
                      required
                      value={formData.companyName}
                      onChange={(e) => handleChange("companyName", e.target.value)}
                      placeholder="Acme Inc."
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <Label htmlFor="email">Work Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => handleChange("email", e.target.value)}
                      placeholder="john@company.com"
                    />
                  </div>

                  {/* Target Regions - Multi Select */}
                  <div className="space-y-2">
                    <Label>Target Regions *</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          role="combobox"
                          className="w-full justify-between font-normal"
                        >
                          {formData.targetRegions.length > 0
                            ? `${formData.targetRegions.length} region(s) selected`
                            : "Select target regions"}
                          <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-full p-0" align="start">
                        <div className="max-h-72 overflow-y-auto p-2">
                          {REGION_GROUPS.map((group, groupIndex) => (
                            <div key={group.title}>
                              {groupIndex > 0 && <div className="my-2 border-t border-border" />}
                              <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                                {group.title}
                              </div>
                              {group.regions.map((region) => (
                                <div
                                  key={region.value}
                                  className="flex items-center space-x-2 p-2 hover:bg-muted rounded cursor-pointer"
                                  onClick={() => toggleRegion(region.value)}
                                >
                                  <Checkbox
                                    checked={formData.targetRegions.includes(region.value)}
                                    onCheckedChange={() => toggleRegion(region.value)}
                                  />
                                  <span className="text-sm">{region.label}</span>
                                </div>
                              ))}
                            </div>
                          ))}
                        </div>
                      </PopoverContent>
                    </Popover>
                    {formData.targetRegions.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {formData.targetRegions.map((region) => {
                          const regionData = ALL_REGIONS.find((r) => r.value === region);
                          return (
                            <Badge
                              key={region}
                              variant="secondary"
                              className="cursor-pointer gap-1"
                              onClick={() => removeRegion(region)}
                            >
                              {regionData?.label || region}
                              <X className="h-3 w-3" />
                            </Badge>
                          );
                        })}
                      </div>
                    )}
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    size="lg"
                    className="w-full bg-[#874FFF] hover:bg-[#7043DD]"
                  >
                    Submit Request
                  </Button>

                  <p className="text-xs text-center text-muted-foreground">
                    By submitting this form, you agree to our Terms of Service and Privacy Policy
                  </p>
                </form>
              </div>

              {/* Partner Card - Takes 2 columns */}
              {partner && (
                <div className="lg:col-span-2">
                  <div className="sticky top-24">
                    <div className="rounded-lg border border-border bg-muted/30 p-6 space-y-4">
                      <h3 className="text-lg font-semibold mb-4">GTM Partner</h3>
                      
                      {/* Partner Info */}
                      <div className="flex items-start gap-4">
                        <Avatar className="h-16 w-16">
                          <AvatarImage 
                            src={partner.photo_url || partner.photo} 
                            alt={partner.name} 
                          />
                          <AvatarFallback>{getInitials(partner.name)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="text-xl font-semibold">{partner.name}</h4>
                            {partner.verified && (
                              <CheckCircle2 className="h-5 w-5 text-[#874FFF]" />
                            )}
                          </div>
                          <p className="text-lg font-bold text-[#874FFF]">
                            ${partner.rate}/hr
                          </p>
                        </div>
                      </div>

                      {/* Markets */}
                      <div>
                        <p className="text-sm text-muted-foreground mb-2">Markets:</p>
                        <div className="flex flex-wrap gap-2">
                          {partner.markets.map((market) => (
                            <Badge key={market} variant="secondary">
                              {market}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {/* Benefits */}
                      <div className="pt-4 border-t border-border space-y-2">
                        <div className="flex items-center gap-2 text-sm">
                          <CheckCircle2 className="h-4 w-4 text-[#874FFF]" />
                          <span>Carefully vetted by GTMate</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <CheckCircle2 className="h-4 w-4 text-[#874FFF]" />
                          <span>Deep local market knowledge</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <CheckCircle2 className="h-4 w-4 text-[#874FFF]" />
                          <span>Commission-based pricing</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <CheckCircle2 className="h-4 w-4 text-[#874FFF]" />
                          <span>Start in 30 days</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <MainFooter />
    </div>
  );
};

export default Contact;

