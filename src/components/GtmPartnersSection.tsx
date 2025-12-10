import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CheckCircle2, ArrowRight, TrendingUp, Building2, Globe } from "lucide-react";

// Featured partners data
const FEATURED_PARTNERS = [
  {
    id: "1",
    name: "Carlos M.",
    photo_url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
    markets: ["Mexico", "Colombia"],
    experience: "12+ years in B2B SaaS sales",
    verified: true,
  },
  {
    id: "2",
    name: "Maria S.",
    photo_url: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400",
    markets: ["Brazil"],
    experience: "Former Sales Director, Enterprise",
    verified: true,
  },
  {
    id: "3",
    name: "Pablo G.",
    photo_url: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400",
    markets: ["Argentina", "Chile"],
    experience: "15+ years in Fintech sales",
    verified: true,
  },
  {
    id: "4",
    name: "Ana R.",
    photo_url: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400",
    markets: ["Spain", "Portugal"],
    experience: "10+ years in Enterprise Software",
    verified: true,
  },
  {
    id: "5",
    name: "Thomas K.",
    photo_url: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400",
    markets: ["Germany", "Netherlands"],
    experience: "Former VP of Sales, EMEA",
    verified: true,
  },
  {
    id: "6",
    name: "Laura F.",
    photo_url: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400",
    markets: ["UK", "Ireland"],
    experience: "8+ years in SaaS expansion",
    verified: true,
  },
  {
    id: "7",
    name: "Diego L.",
    photo_url: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400",
    markets: ["Peru", "Ecuador"],
    experience: "10+ years in B2B sales",
    verified: true,
  },
  {
    id: "8",
    name: "Sophie M.",
    photo_url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400",
    markets: ["France", "Belgium"],
    experience: "Former Regional Sales Manager",
    verified: true,
  },
];

const GtmPartnersSection = () => {
  const navigate = useNavigate();

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <section
      id="gtm-partners"
      className="border-t border-border bg-secondary/20 py-20"
    >
      <div className="container mx-auto px-4">
        <div className="mb-8 text-center">
          <p className="text-sm font-medium text-[#874FFF] uppercase tracking-wide mb-2">
            Our Network
          </p>
          <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">
            Vetted GTM partners across LATAM & Europe
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Senior sales leaders with proven track records at top companies. Every partner is carefully vetted for experience, network, and results.
          </p>
        </div>

        {/* Stats bar */}
        <div className="flex flex-wrap justify-center gap-8 mb-10 py-6 border-y border-border">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-[#874FFF]" />
            <span className="text-sm text-muted-foreground">Avg. <span className="font-semibold text-foreground">10+ years</span> sales experience</span>
          </div>
          <div className="flex items-center gap-2">
            <Building2 className="h-5 w-5 text-[#874FFF]" />
            <span className="text-sm text-muted-foreground">Ex-leaders from <span className="font-semibold text-foreground">top tech companies</span></span>
          </div>
          <div className="flex items-center gap-2">
            <Globe className="h-5 w-5 text-[#874FFF]" />
            <span className="text-sm text-muted-foreground"><span className="font-semibold text-foreground">15+ markets</span> covered</span>
          </div>
        </div>

        {/* Partners carousel */}
        <div className="relative overflow-hidden">
          {/* Gradient masks */}
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-secondary/20 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-secondary/20 to-transparent z-10 pointer-events-none" />
          
          {/* Scrolling container */}
          <div className="flex animate-scroll hover:pause-animation">
            {/* First set of cards */}
            {FEATURED_PARTNERS.map((partner) => (
              <Card
                key={partner.id}
                className="flex-shrink-0 w-40 mx-2 overflow-hidden border-border bg-card"
              >
                <CardContent className="p-4 text-center">
                  <Avatar className="h-12 w-12 mx-auto mb-3">
                    <AvatarImage src={partner.photo_url} alt={partner.name} />
                    <AvatarFallback className="text-xs">{getInitials(partner.name)}</AvatarFallback>
                  </Avatar>
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <h3 className="text-sm font-semibold text-foreground">
                      {partner.name}
                    </h3>
                    {partner.verified && (
                      <CheckCircle2 className="h-3.5 w-3.5 text-[#874FFF]" />
                    )}
                  </div>
                  <div className="flex flex-wrap justify-center gap-1 mb-2">
                    {partner.markets.map((market) => (
                      <Badge key={market} variant="secondary" className="text-[10px] py-0.5 px-1.5">
                        {market}
                      </Badge>
                    ))}
                  </div>
                  <p className="text-[11px] text-muted-foreground leading-tight">
                    {partner.experience}
                  </p>
                </CardContent>
              </Card>
            ))}
            {/* Duplicate set for infinite scroll */}
            {FEATURED_PARTNERS.map((partner) => (
              <Card
                key={`dup-${partner.id}`}
                className="flex-shrink-0 w-40 mx-2 overflow-hidden border-border bg-card"
              >
                <CardContent className="p-4 text-center">
                  <Avatar className="h-12 w-12 mx-auto mb-3">
                    <AvatarImage src={partner.photo_url} alt={partner.name} />
                    <AvatarFallback className="text-xs">{getInitials(partner.name)}</AvatarFallback>
                  </Avatar>
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <h3 className="text-sm font-semibold text-foreground">
                      {partner.name}
                    </h3>
                    {partner.verified && (
                      <CheckCircle2 className="h-3.5 w-3.5 text-[#874FFF]" />
                    )}
                  </div>
                  <div className="flex flex-wrap justify-center gap-1 mb-2">
                    {partner.markets.map((market) => (
                      <Badge key={market} variant="secondary" className="text-[10px] py-0.5 px-1.5">
                        {market}
                      </Badge>
                    ))}
                  </div>
                  <p className="text-[11px] text-muted-foreground leading-tight">
                    {partner.experience}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-10 text-center">
          <p className="text-muted-foreground mb-4">
            Ready to meet your ideal GTM partner?
          </p>
          <Button
            size="lg"
            className="group bg-[#874FFF] hover:bg-[#7043DD]"
            onClick={() => navigate('/contact')}
          >
            Get matched now
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default GtmPartnersSection;
