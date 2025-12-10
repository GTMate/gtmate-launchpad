import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import MainFooter from "@/components/MainFooter";
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
import { CheckCircle2, ArrowLeft } from "lucide-react";

const LATAM_COUNTRIES = [
  { value: "latam-region", label: "LATAM (Full Region)" },
  { value: "mexico", label: "Mexico" },
  { value: "brazil", label: "Brazil" },
  { value: "argentina", label: "Argentina" },
  { value: "chile", label: "Chile" },
  { value: "colombia", label: "Colombia" },
  { value: "peru", label: "Peru" },
  { value: "ecuador", label: "Ecuador" },
  { value: "uruguay", label: "Uruguay" },
  { value: "paraguay", label: "Paraguay" },
  { value: "bolivia", label: "Bolivia" },
  { value: "venezuela", label: "Venezuela" },
  { value: "panama", label: "Panama" },
  { value: "costa-rica", label: "Costa Rica" },
  { value: "guatemala", label: "Guatemala" },
  { value: "honduras", label: "Honduras" },
  { value: "el-salvador", label: "El Salvador" },
  { value: "nicaragua", label: "Nicaragua" },
  { value: "dominican-republic", label: "Dominican Republic" },
  { value: "puerto-rico", label: "Puerto Rico" },
];

const BecomePartner = () => {
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    linkedin: "",
    country: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Import and save to Supabase
    const { createPartnerApplication } = await import("@/lib/supabase");
    
    const applicationData = {
      first_name: formData.firstName,
      last_name: formData.lastName,
      email: formData.email,
      phone: formData.phone || null,
      linkedin: formData.linkedin,
      country: formData.country,
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
              <CheckCircle2 className="h-16 w-16 text-[#874FFF]" />
            </div>
            <h1 className="text-4xl font-bold text-foreground">
              Thank you, <span className="text-[#874FFF]">{formData.firstName}</span>!
            </h1>
            <p className="text-xl text-muted-foreground">
              We've received your application to become a GTM partner. 
              Our team will review your profile and contact you within 48 hours.
            </p>
            <div className="pt-4">
              <Button 
                onClick={() => navigate("/")} 
                size="lg"
                className="bg-[#874FFF] hover:bg-[#7043DD]"
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

              {/* Country/Region */}
              <div className="space-y-2">
                <Label htmlFor="country">Country/Region where you operate *</Label>
                <Select
                  value={formData.country}
                  onValueChange={(value) => handleChange("country", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select your country or region" />
                  </SelectTrigger>
                  <SelectContent>
                    {LATAM_COUNTRIES.map((country) => (
                      <SelectItem key={country.value} value={country.value}>
                        {country.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                size="lg"
                className="w-full bg-[#874FFF] hover:bg-[#7043DD]"
              >
                Submit Application
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

