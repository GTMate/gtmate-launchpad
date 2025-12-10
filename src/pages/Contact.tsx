import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

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
    targetRegion: "",
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
      target_region: formData.targetRegion,
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

                  {/* Target Region */}
                  <div className="space-y-2">
                    <Label htmlFor="targetRegion">Target Region *</Label>
                    <Select
                      value={formData.targetRegion}
                      onValueChange={(value) => handleChange("targetRegion", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select your target region" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="latam">LATAM (Full Region)</SelectItem>
                        <SelectItem value="mexico">Mexico</SelectItem>
                        <SelectItem value="brazil">Brazil</SelectItem>
                        <SelectItem value="colombia">Colombia</SelectItem>
                        <SelectItem value="chile">Chile</SelectItem>
                        <SelectItem value="argentina">Argentina</SelectItem>
                        <SelectItem value="peru">Peru</SelectItem>
                        <SelectItem value="ecuador">Ecuador</SelectItem>
                        <SelectItem value="panama">Panama</SelectItem>
                        <SelectItem value="costa-rica">Costa Rica</SelectItem>
                        <SelectItem value="uruguay">Uruguay</SelectItem>
                      </SelectContent>
                    </Select>
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

