import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CheckCircle2, Briefcase, ArrowRight } from "lucide-react";
import { fetchPartners, type Partner } from "@/lib/supabase";

// Mock data como fallback
const MOCK_PARTNERS = [
  {
    id: "1",
    name: "Carlos Mendoza",
    photo_url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
    rate: 85,
    markets: ["Mexico", "LATAM"],
    hires: 12,
    verified: true,
  },
  {
    id: "2",
    name: "Maria Silva",
    photo_url: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400",
    rate: 95,
    markets: ["Brazil", "LATAM"],
    hires: 18,
    verified: true,
  },
  {
    id: "3",
    name: "Pablo García",
    photo_url: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400",
    rate: 90,
    markets: ["Argentina", "LATAM"],
    hires: 15,
    verified: true,
  },
];

const GtmPartnersSection = () => {
  const navigate = useNavigate();
  const [partners, setPartners] = useState<Partner[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPartners = async () => {
      try {
        const data = await fetchPartners();
        if (data && data.length > 0) {
          // Tomar solo los primeros 3 partners
          setPartners(data.slice(0, 3));
        } else {
          // Usar mock data si no hay datos en Supabase
          setPartners(MOCK_PARTNERS as Partner[]);
        }
      } catch (error) {
        console.error("Error loading partners:", error);
        setPartners(MOCK_PARTNERS as Partner[]);
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

  const handlePartnerClick = (partner: Partner) => {
    // Navegar a /explore y simular el click en el partner
    navigate('/explore', { state: { selectedPartnerId: partner.id } });
  };

  return (
    <section
      id="gtm-partners"
      className="border-t border-border bg-secondary/20 py-20"
    >
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">
            Local GTM partners ready to open your market
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Experienced sales leaders with proven track records in their markets.
          </p>
        </div>

        {loading ? (
          <div className="grid gap-6 md:grid-cols-3">
            {[...Array(3)].map((_, i) => (
              <Card key={i} className="animate-pulse">
                <CardContent className="p-6">
                  <div className="h-40 rounded bg-muted"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-3">
            {partners.map((partner) => (
              <Card
                key={partner.id}
                className="cursor-pointer overflow-hidden transition-all hover:shadow-lg border-border bg-card"
                onClick={() => handlePartnerClick(partner)}
              >
                <CardContent className="p-6">
                  {/* Header with Avatar and Rate */}
                  <div className="mb-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-14 w-14">
                        <AvatarImage src={partner.photo_url || ""} alt={partner.name} />
                        <AvatarFallback className="text-sm">{getInitials(partner.name)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5">
                          <h3 className="text-lg font-semibold text-foreground truncate">
                            {partner.name}
                          </h3>
                          {partner.verified && (
                            <CheckCircle2 className="h-4 w-4 flex-shrink-0 text-[#874FFF]" />
                          )}
                        </div>
                        <p className="text-sm font-medium text-[#874FFF]">
                          ${partner.rate}/hr
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Markets */}
                  <div className="mb-4 flex flex-wrap gap-2">
                    {partner.markets.slice(0, 3).map((market) => (
                      <Badge key={market} variant="secondary" className="text-xs py-1 px-2">
                        {market}
                      </Badge>
                    ))}
                    {partner.markets.length > 3 && (
                      <Badge variant="secondary" className="text-xs py-1 px-2">
                        +{partner.markets.length - 3}
                      </Badge>
                    )}
                  </div>

                  {/* Stats */}
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                    <Briefcase className="h-4 w-4" />
                    <span>
                      <span className="font-semibold text-foreground">{partner.hires}</span> hired this month
                    </span>
                  </div>

                  {/* CTA */}
                  <Button 
                    className="w-full bg-[#874FFF] hover:bg-[#7043DD]"
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePartnerClick(partner);
                    }}
                  >
                    View Profile
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* View All Button */}
        <div className="mt-12 text-center">
          <Button
            size="lg"
            variant="outline"
            className="group"
            onClick={() => navigate('/explore')}
          >
            View All Partners
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default GtmPartnersSection;
