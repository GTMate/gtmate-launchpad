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
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="max-w-2xl w-full text-center space-y-6">
          <div className="flex justify-center">
            <CheckCircle2 className="h-16 w-16 text-foreground" />
          </div>
          <h1 className="text-4xl font-bold text-foreground">
            ¡Gracias por tu interés!
          </h1>
          <p className="text-xl text-muted-foreground">
            Hemos recibido tu solicitud. Nuestro equipo revisará tu información
            y te contactaremos en las próximas 48 horas con una propuesta de GTM
            partner específica para tu mercado objetivo.
          </p>
          <div className="pt-4">
            <Button onClick={() => navigate("/")} size="lg">
              Volver al inicio
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <button
            onClick={() => navigate("/")}
            className="text-foreground text-2xl font-bold hover:opacity-80 transition-opacity"
          >
            GTMate
          </button>
        </div>

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
                  <Label htmlFor="firstName">Nombre</Label>
                  <Input
                    id="firstName"
                    placeholder="Juan"
                    required
                    value={formData.firstName}
                    onChange={(e) => handleChange("firstName", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Apellido</Label>
                  <Input
                    id="lastName"
                    placeholder="Pérez"
                    required
                    value={formData.lastName}
                    onChange={(e) => handleChange("lastName", e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="companyName">Company Name</Label>
                <Input
                  id="companyName"
                  placeholder="Tu empresa"
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
                  placeholder="tu@empresa.com"
                  required
                  value={formData.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="targetCountry">País objetivo</Label>
                <Select
                  value={formData.targetCountry}
                  onValueChange={(value) => handleChange("targetCountry", value)}
                  required
                >
                  <SelectTrigger id="targetCountry">
                    <SelectValue placeholder="Selecciona un mercado" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="latam">LATAM (Región completa)</SelectItem>
                    <SelectItem value="europe">EUROPE (Región completa)</SelectItem>
                    <SelectItem value="mexico">México</SelectItem>
                    <SelectItem value="brazil">Brasil</SelectItem>
                    <SelectItem value="argentina">Argentina</SelectItem>
                    <SelectItem value="chile">Chile</SelectItem>
                    <SelectItem value="colombia">Colombia</SelectItem>
                    <SelectItem value="peru">Perú</SelectItem>
                    <SelectItem value="spain">España</SelectItem>
                    <SelectItem value="uk">Reino Unido</SelectItem>
                    <SelectItem value="germany">Alemania</SelectItem>
                    <SelectItem value="france">Francia</SelectItem>
                    <SelectItem value="italy">Italia</SelectItem>
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
                Por qué elegir GTMate
              </h2>

              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-foreground text-background rounded-full flex items-center justify-center font-bold">
                    1
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">
                      Partners pre-vetados
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      Cada GTM partner ha sido verificado por experiencia en la
                      industria, red local y historial de resultados.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-foreground text-background rounded-full flex items-center justify-center font-bold">
                    2
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">
                      Lanzamiento en 30 días
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      No más meses de reclutamiento. Tu GTM partner está listo
                      para empezar a generar pipeline inmediatamente.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-foreground text-background rounded-full flex items-center justify-center font-bold">
                    3
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">
                      Modelo basado en comisión
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      Sin salarios fijos ni equity. Solo pagas por resultados
                      reales de ventas.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-foreground text-background rounded-full flex items-center justify-center font-bold">
                    4
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">
                      Acompañamiento continuo
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      No te dejamos solo después del match. Monitoreamos KPIs y
                      ajustamos la estrategia según sea necesario.
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-border">
                <p className="text-sm text-muted-foreground italic">
                  "GTMate nos permitió entrar a Brasil en 6 semanas con un partner
                  que ya conocía a nuestros clientes ideales. Cerramos 3 deals en
                  el primer trimestre."
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
  );
};

export default Apply;
