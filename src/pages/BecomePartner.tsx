import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
import { CheckCircle2, ArrowLeft, ChevronDown, X, Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { createPartnerApplication } from "@/lib/supabase";

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

const BecomePartner = () => {
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    linkedin: "",
    countries: [] as string[],
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setIsLoading(true);
    
    try {
      const applicationData = {
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
        phone: formData.phone || null,
        linkedin: formData.linkedin,
        country: formData.countries.join(", "),
        experience: null,
        industry: null,
      };
      
      const result = await createPartnerApplication(applicationData);
      
      if (result.success) {
        console.log("Partner application saved successfully:", result.data);
        setSubmitted(true);
      } else {
        console.error("Error saving partner application:", result.error);
        alert(`Error: ${result.error || 'Could not save application. Please try again.'}`);
      }
    } catch (error) {
      console.error("Unexpected error:", error);
      alert('An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const toggleRegion = (region: string) => {
    setFormData((prev) => {
      const isSelected = prev.countries.includes(region);
      
      // Check if this is a "full region" option
      if (region === "latam" || region === "europe") {
        const group = REGION_GROUPS.find((g) => 
          g.regions.some((r) => r.value === region)
        );
        if (group) {
          const allRegionValues = group.regions.map((r) => r.value);
          
          if (isSelected) {
            return {
              ...prev,
              countries: prev.countries.filter((r) => !allRegionValues.includes(r)),
            };
          } else {
            const newRegions = [...prev.countries];
            allRegionValues.forEach((r) => {
              if (!newRegions.includes(r)) {
                newRegions.push(r);
              }
            });
            return { ...prev, countries: newRegions };
          }
        }
      }
      
      // Regular country toggle
      if (isSelected) {
        const group = REGION_GROUPS.find((g) => 
          g.regions.some((r) => r.value === region)
        );
        const fullRegionValue = group?.regions[0].value;
        
        return {
          ...prev,
          countries: prev.countries
            .filter((r) => r !== region)
            .filter((r) => r !== fullRegionValue),
        };
      } else {
        const newRegions = [...prev.countries, region];
        
        const group = REGION_GROUPS.find((g) => 
          g.regions.some((r) => r.value === region)
        );
        
        if (group) {
          const fullRegionValue = group.regions[0].value;
          const countryValues = group.regions.slice(1).map((r) => r.value);
          const allCountriesSelected = countryValues.every((c) => newRegions.includes(c));
          
          if (allCountriesSelected && !newRegions.includes(fullRegionValue)) {
            newRegions.push(fullRegionValue);
          }
        }
        
        return { ...prev, countries: newRegions };
      }
    });
  };

  const removeRegion = (region: string) => {
    if (formData.countries.includes(region)) {
      toggleRegion(region);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-16 flex items-center justify-center px-4 min-h-[calc(100vh-4rem)]">
          <div className="max-w-2xl w-full text-center space-y-6">
            <div className="flex justify-center">
              <CheckCircle2 className="h-16 w-16 text-[#F5DEB3]" />
            </div>
            <h1 className="text-4xl font-bold text-foreground">
              Thank you, <span className="text-[#F5DEB3]">{formData.firstName}</span>!
            </h1>
            <p className="text-xl text-muted-foreground">
              We've received your application to become a GTM partner. 
              Our team will review your profile and contact you within 48 hours.
            </p>
            <div className="pt-4">
              <Button 
                onClick={() => navigate("/")} 
                size="lg"
                className="bg-white hover:bg-gray-100 text-black"
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
        <div className="container mx-auto px-4 py-6 sm:py-8">
          <div className="max-w-2xl mx-auto">
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
                Become a GTM Partner
              </h1>
              <p className="text-lg text-muted-foreground">
                Join our network of experienced sales professionals and help companies expand into new markets.
              </p>
            </div>

            {/* Form */}
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

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  placeholder="john@example.com"
                />
              </div>

              {/* Phone */}
              <div className="space-y-2">
                <Label htmlFor="phone">Phone (optional)</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleChange("phone", e.target.value)}
                  placeholder="+1 234 567 8900"
                />
              </div>

              {/* LinkedIn */}
              <div className="space-y-2">
                <Label htmlFor="linkedin">LinkedIn Profile *</Label>
                <Input
                  id="linkedin"
                  type="url"
                  required
                  value={formData.linkedin}
                  onChange={(e) => handleChange("linkedin", e.target.value)}
                  placeholder="https://linkedin.com/in/yourprofile"
                />
              </div>

              {/* Country/Region - Multi Select */}
              <div className="space-y-2">
                <Label>Country/Region where you operate *</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      className="w-full justify-between font-normal"
                    >
                      {formData.countries.length > 0
                        ? `${formData.countries.length} region(s) selected`
                        : "Select your regions"}
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
                                checked={formData.countries.includes(region.value)}
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
                {formData.countries.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {formData.countries.map((region) => {
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
                className="w-full bg-white hover:bg-gray-100 text-black"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  "Submit Application"
                )}
              </Button>

              <p className="text-xs text-center text-muted-foreground">
                By submitting this form, you agree to our Terms of Service and Privacy Policy
              </p>
            </form>
          </div>
        </div>
      </div>
      <MainFooter />
    </div>
  );
};

export default BecomePartner;

