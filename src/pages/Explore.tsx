import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import MainFooter from "@/components/MainFooter";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CheckCircle2 } from "lucide-react";
import { fetchPartners, type Partner as SupabasePartner } from "@/lib/supabase";

// Datos mock como fallback si Supabase no está configurado
const MOCK_PARTNERS = [
  {
    id: 1,
    name: "Carlos Rodriguez",
    photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=Carlos",
    rate: 85,
    markets: ["LATAM", "Mexico", "Colombia"],
    hires: 12,
    verified: true,
  },
  {
    id: 2,
    name: "Ana Silva",
    photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ana",
    rate: 95,
    markets: ["Brazil"],
    hires: 8,
    verified: true,
  },
  {
    id: 3,
    name: "Miguel Torres",
    photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=Miguel",
    rate: 75,
    markets: ["Mexico", "Central America"],
    hires: 15,
    verified: true,
  },
  {
    id: 4,
    name: "Sofia Martinez",
    photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sofia",
    rate: 90,
    markets: ["Argentina", "Uruguay", "Chile"],
    hires: 10,
    verified: true,
  },
  {
    id: 5,
    name: "Luis Fernandez",
    photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=Luis",
    rate: 80,
    markets: ["Chile", "Peru"],
    hires: 7,
    verified: true,
  },
  {
    id: 6,
    name: "Isabella Costa",
    photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=Isabella",
    rate: 100,
    markets: ["Spain", "Portugal", "Italy", "France"],
    hires: 20,
    verified: true,
  },
];

interface Partner {
  id: string | number;
  name: string;
  photo?: string;
  photo_url?: string;
  rate: number;
  markets: string[]; // Array de mercados
  hires: number;
  verified: boolean;
}

const Explore = () => {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPartners = async () => {
      try {
        // Intentar cargar desde Supabase
        const supabasePartners = await fetchPartners();
        
        if (supabasePartners && supabasePartners.length > 0) {
          // Convertir formato de Supabase a formato local
          const formattedPartners = supabasePartners.map((p: SupabasePartner) => ({
            id: p.id,
            name: p.name,
            photo_url: p.photo_url,
            rate: p.rate,
            markets: p.markets,
            hires: p.hires,
            verified: p.verified,
          }));
          setPartners(formattedPartners);
        } else {
          // Fallback a datos mock si Supabase no está configurado
          console.log('Using mock data - Supabase not configured yet');
          setPartners(MOCK_PARTNERS);
        }
      } catch (error) {
        console.error("Error fetching partners:", error);
        // Fallback a datos mock en caso de error
        setPartners(MOCK_PARTNERS);
      } finally {
        setLoading(false);
      }
    };

    loadPartners();
  }, []);

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-16">
        <div className="container mx-auto px-4 py-12">
          {/* Header */}
          <div className="mb-12 text-center">
            <h1 className="mb-4 text-4xl font-bold text-foreground md:text-5xl">
              Find Your GTM Partner
            </h1>
            <p className="text-lg text-muted-foreground md:text-xl">
              Experienced sales professionals ready to expand your business into
              new markets
            </p>
          </div>

          {/* Filters - TODO: Agregar funcionalidad */}
          <div className="mb-8 flex flex-wrap gap-3">
            <Badge variant="outline" className="cursor-pointer px-4 py-2">
              All Markets
            </Badge>
            <Badge variant="outline" className="cursor-pointer px-4 py-2">
              LATAM
            </Badge>
            <Badge variant="outline" className="cursor-pointer px-4 py-2">
              Europe
            </Badge>
            <Badge variant="outline" className="cursor-pointer px-4 py-2">
              Most Hired
            </Badge>
          </div>

          {/* Partners Grid */}
          {loading ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[...Array(6)].map((_, i) => (
                <Card key={i} className="animate-pulse">
                  <CardContent className="p-6">
                    <div className="h-48 rounded bg-muted"></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {partners.map((partner) => (
                <Card
                  key={partner.id}
                  className="overflow-hidden transition-all hover:shadow-lg"
                >
                  <CardContent className="p-6">
                    {/* Rate Badge - Top Right */}
                    <div className="mb-4 flex items-start justify-between">
                      <Avatar className="h-16 w-16">
                        <AvatarImage src={partner.photo_url || partner.photo} alt={partner.name} />
                        <AvatarFallback>{getInitials(partner.name)}</AvatarFallback>
                      </Avatar>
                      <Badge className="bg-[#874FFF] text-white">
                        ${partner.rate}/hr
                      </Badge>
                    </div>

                    {/* Name */}
                    <div className="mb-2 flex items-center gap-2">
                      <h3 className="text-xl font-semibold text-foreground">
                        {partner.name}
                      </h3>
                      {partner.verified && (
                        <CheckCircle2 className="h-5 w-5 text-[#874FFF]" />
                      )}
                    </div>

                    {/* Markets - Show up to 5 */}
                    <div className="mb-4 flex flex-wrap gap-1.5">
                      {partner.markets.slice(0, 5).map((market) => (
                        <Badge key={market} variant="secondary" className="text-xs">
                          {market}
                        </Badge>
                      ))}
                    </div>

                    {/* Stats */}
                    <div className="mb-4 text-sm text-muted-foreground">
                      <span className="font-semibold text-foreground">
                        {partner.hires}
                      </span>{" "}
                      times hired
                    </div>

                    {/* CTA */}
                    <Button
                      className="w-full bg-[#874FFF] hover:bg-[#7043DD]"
                      size="sm"
                    >
                      Request introduction
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* Empty State */}
          {!loading && partners.length === 0 && (
            <div className="py-12 text-center">
              <p className="text-lg text-muted-foreground">
                No GTM partners found. Check back soon!
              </p>
            </div>
          )}
        </div>
      </div>
      <MainFooter />
    </div>
  );
};

export default Explore;

