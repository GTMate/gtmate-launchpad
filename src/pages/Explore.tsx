import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import MainFooter from "@/components/MainFooter";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CheckCircle2, X, MapPin, Briefcase, ChevronLeft, ChevronRight, ChevronDown, SlidersHorizontal } from "lucide-react";
import { fetchPartners, type Partner as SupabasePartner } from "@/lib/supabase";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
    bio: "Experienced sales leader with 10+ years in B2B SaaS across Latin America.",
    expertise: [
      "Go-to-market strategy and execution",
      "Local market entry and expansion",
      "B2B sales and business development",
      "Building and managing sales pipelines",
      "Enterprise deal negotiation"
    ],
  },
  {
    id: 2,
    name: "Ana Silva",
    photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ana",
    rate: 95,
    markets: ["Brazil"],
    hires: 8,
    verified: true,
    bio: "Expert in Brazilian market expansion with deep knowledge of local business culture.",
    expertise: [
      "Brazilian market entry strategies",
      "Fintech sales and compliance",
      "Building local partnerships",
      "Navigating local business culture and regulations",
      "Enterprise account management"
    ],
  },
  {
    id: 3,
    name: "Miguel Torres",
    photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=Miguel",
    rate: 75,
    markets: ["Mexico", "Central America"],
    hires: 15,
    verified: true,
    bio: "Specialized in Mexican SMB market with strong presence in Monterrey and Mexico City.",
    expertise: [
      "SMB sales and scaling strategies",
      "Channel partner development",
      "Local market entry and expansion",
      "SaaS go-to-market execution",
      "Building regional sales teams"
    ],
  },
  {
    id: 4,
    name: "Sofia Martinez",
    photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sofia",
    rate: 90,
    markets: ["Argentina", "Uruguay", "Chile"],
    hires: 10,
    verified: true,
    bio: "GTM expert for Southern Cone markets with connections across Buenos Aires tech ecosystem.",
    expertise: [
      "Multi-country expansion strategy",
      "B2B sales and business development",
      "Navigating regional regulations",
      "Enterprise software sales",
      "Cross-border deal structuring"
    ],
  },
  {
    id: 5,
    name: "Luis Fernandez",
    photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=Luis",
    rate: 80,
    markets: ["Chile", "Peru"],
    hires: 7,
    verified: true,
    bio: "Chilean market specialist with strong network in Santiago and Lima.",
    expertise: [
      "Startup GTM strategy",
      "Building sales pipelines from zero",
      "Local market entry and expansion",
      "Seed to Series A sales execution",
      "Regional partnership development"
    ],
  },
  {
    id: 6,
    name: "Isabella Costa",
    photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=Isabella",
    rate: 100,
    markets: ["Spain", "Portugal", "Italy", "France"],
    hires: 20,
    verified: true,
    bio: "European expansion expert with experience across Southern Europe.",
    expertise: [
      "Pan-European expansion strategy",
      "Enterprise sales and account management",
      "Navigating EU regulations and compliance",
      "Building multi-country sales operations",
      "International business development"
    ],
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
  bio?: string | null;
  expertise?: string[] | null; // Array de áreas de expertise
}

const PARTNERS_PER_PAGE = 15;

// Definir mercados disponibles
const REGIONS = ['LATAM', 'Europe', 'North America', 'APAC'];
const COUNTRIES = [
  'Mexico', 'Brazil', 'Argentina', 'Chile', 'Colombia', 'Peru', 
  'Uruguay', 'Central America', 'Spain', 'Portugal', 'Italy', 
  'France', 'Germany', 'UK', 'USA', 'Canada'
];

const Explore = () => {
  const navigate = useNavigate();
  const [partners, setPartners] = useState<Partner[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPartner, setSelectedPartner] = useState<Partner | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  
  // Filtros
  const [selectedMarkets, setSelectedMarkets] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<string>('most-hired');

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
            bio: p.bio,
            expertise: p.expertise,
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

  const handlePartnerClick = (partner: Partner) => {
    setSelectedPartner(partner);
    setIsDetailOpen(true);
  };

  const handleCloseDetail = () => {
    setIsDetailOpen(false);
    setTimeout(() => setSelectedPartner(null), 300);
  };

  // Filtrar y ordenar partners
  const filteredAndSortedPartners = useMemo(() => {
    let filtered = [...partners];
    
    // Filtrar por mercados seleccionados
    if (selectedMarkets.length > 0) {
      filtered = filtered.filter(partner =>
        partner.markets.some(market => selectedMarkets.includes(market))
      );
    }
    
    // Ordenar según criterio seleccionado
    switch (sortBy) {
      case 'most-hired':
        filtered.sort((a, b) => b.hires - a.hires);
        break;
      case 'rate-low-high':
        filtered.sort((a, b) => a.rate - b.rate);
        break;
      case 'rate-high-low':
        filtered.sort((a, b) => b.rate - a.rate);
        break;
      case 'newest':
        // Mantener orden original (asumiendo que es por fecha de creación)
        break;
      default:
        break;
    }
    
    return filtered;
  }, [partners, selectedMarkets, sortBy]);

  // Calcular partners de la página actual
  const { paginatedPartners, totalPages } = useMemo(() => {
    const startIndex = (currentPage - 1) * PARTNERS_PER_PAGE;
    const endIndex = startIndex + PARTNERS_PER_PAGE;
    const paginatedPartners = filteredAndSortedPartners.slice(startIndex, endIndex);
    const totalPages = Math.ceil(filteredAndSortedPartners.length / PARTNERS_PER_PAGE);
    return { paginatedPartners, totalPages };
  }, [filteredAndSortedPartners, currentPage]);

  // Generar números de página para mostrar
  const pageNumbers = useMemo(() => {
    const pages: (number | string)[] = [];
    
    if (totalPages <= 7) {
      // Si hay 7 o menos páginas, mostrar todas
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Siempre mostrar primera página
      pages.push(1);
      
      if (currentPage > 3) {
        pages.push('...');
      }
      
      // Mostrar páginas alrededor de la actual
      const startPage = Math.max(2, currentPage - 1);
      const endPage = Math.min(totalPages - 1, currentPage + 1);
      
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
      
      if (currentPage < totalPages - 2) {
        pages.push('...');
      }
      
      // Siempre mostrar última página
      pages.push(totalPages);
    }
    
    return pages;
  }, [currentPage, totalPages]);

  const goToPage = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Toggle market filter
  const toggleMarket = (market: string) => {
    setSelectedMarkets(prev => {
      if (prev.includes(market)) {
        return prev.filter(m => m !== market);
      } else {
        return [...prev, market];
      }
    });
    setCurrentPage(1); // Reset to first page when filtering
  };

  // Clear all filters
  const clearFilters = () => {
    setSelectedMarkets([]);
    setSortBy('most-hired');
    setCurrentPage(1);
  };

  // Quick filters
  const setQuickFilter = (market: string) => {
    setSelectedMarkets([market]);
    setCurrentPage(1);
  };

  // Handle contact partner
  const handleContactPartner = (partner: Partner) => {
    navigate('/contact', { state: { partner } });
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

          {/* Filters */}
          <div className="mb-8 space-y-4">
            {/* Quick Filters */}
            <div className="flex flex-wrap items-center gap-3">
              <Badge 
                variant={selectedMarkets.length === 0 ? "default" : "outline"}
                className={`cursor-pointer px-4 py-2 ${
                  selectedMarkets.length === 0 ? 'bg-[#874FFF] hover:bg-[#7043DD]' : ''
                }`}
                onClick={clearFilters}
              >
                All Markets
              </Badge>
              <Badge 
                variant={selectedMarkets.includes('LATAM') && selectedMarkets.length === 1 ? "default" : "outline"}
                className={`cursor-pointer px-4 py-2 ${
                  selectedMarkets.includes('LATAM') && selectedMarkets.length === 1 ? 'bg-[#874FFF] hover:bg-[#7043DD]' : ''
                }`}
                onClick={() => setQuickFilter('LATAM')}
              >
                LATAM
              </Badge>
              <Badge 
                variant={selectedMarkets.includes('Europe') && selectedMarkets.length === 1 ? "default" : "outline"}
                className={`cursor-pointer px-4 py-2 ${
                  selectedMarkets.includes('Europe') && selectedMarkets.length === 1 ? 'bg-[#874FFF] hover:bg-[#7043DD]' : ''
                }`}
                onClick={() => setQuickFilter('Europe')}
              >
                Europe
              </Badge>

              {/* Advanced Filters */}
              <div className="ml-auto flex items-center gap-3">
                {/* Countries Dropdown */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="gap-2">
                      <MapPin className="h-4 w-4" />
                      Markets
                      {selectedMarkets.length > 0 && (
                        <Badge variant="secondary" className="ml-1 px-1.5 py-0.5 text-xs">
                          {selectedMarkets.length}
                        </Badge>
                      )}
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56 max-h-96 overflow-y-auto">
                    <DropdownMenuLabel>Regions</DropdownMenuLabel>
                    {REGIONS.map(region => (
                      <DropdownMenuCheckboxItem
                        key={region}
                        checked={selectedMarkets.includes(region)}
                        onCheckedChange={() => toggleMarket(region)}
                      >
                        {region}
                      </DropdownMenuCheckboxItem>
                    ))}
                    <DropdownMenuSeparator />
                    <DropdownMenuLabel>Countries</DropdownMenuLabel>
                    {COUNTRIES.map(country => (
                      <DropdownMenuCheckboxItem
                        key={country}
                        checked={selectedMarkets.includes(country)}
                        onCheckedChange={() => toggleMarket(country)}
                      >
                        {country}
                      </DropdownMenuCheckboxItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>

                {/* Sort By */}
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-[180px]">
                    <SlidersHorizontal className="mr-2 h-4 w-4" />
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="most-hired">Most Hired</SelectItem>
                    <SelectItem value="rate-low-high">Rate: Low to High</SelectItem>
                    <SelectItem value="rate-high-low">Rate: High to Low</SelectItem>
                    <SelectItem value="newest">Newest</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Active Filters Display */}
            {selectedMarkets.length > 0 && (
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-sm text-muted-foreground">Active filters:</span>
                {selectedMarkets.map(market => (
                  <Badge
                    key={market}
                    variant="secondary"
                    className="cursor-pointer gap-1"
                    onClick={() => toggleMarket(market)}
                  >
                    {market}
                    <X className="h-3 w-3" />
                  </Badge>
                ))}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearFilters}
                  className="h-6 px-2 text-xs"
                >
                  Clear all
                </Button>
              </div>
            )}
          </div>

          {/* Results Count */}
          <div className="mb-4 text-sm text-muted-foreground">
            Showing {paginatedPartners.length} of {filteredAndSortedPartners.length} partners
          </div>

          {/* Partners Grid */}
          {loading ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {[...Array(6)].map((_, i) => (
                <Card key={i} className="animate-pulse">
                  <CardContent className="p-4">
                    <div className="h-32 rounded bg-muted"></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {paginatedPartners.map((partner) => (
                <Card
                  key={partner.id}
                  className={`cursor-pointer overflow-hidden transition-all hover:shadow-lg ${
                    selectedPartner?.id === partner.id ? "ring-2 ring-[#874FFF]" : ""
                  }`}
                  onClick={() => handlePartnerClick(partner)}
                >
                  <CardContent className="p-4">
                    {/* Header with Avatar and Rate */}
                    <div className="mb-3 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={partner.photo_url || partner.photo} alt={partner.name} />
                          <AvatarFallback className="text-sm">{getInitials(partner.name)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-1.5">
                            <h3 className="text-base font-semibold text-foreground truncate">
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

                    {/* Markets - Compact */}
                    <div className="mb-3 flex flex-wrap gap-1">
                      {partner.markets.slice(0, 3).map((market) => (
                        <Badge key={market} variant="secondary" className="text-xs py-0.5 px-2">
                          {market}
                        </Badge>
                      ))}
                      {partner.markets.length > 3 && (
                        <Badge variant="secondary" className="text-xs py-0.5 px-2">
                          +{partner.markets.length - 3}
                        </Badge>
                      )}
                    </div>

                    {/* Stats */}
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Briefcase className="h-3.5 w-3.5" />
                      <span>
                        <span className="font-semibold text-foreground">{partner.hires}</span> hired this month
                      </span>
                    </div>
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

          {/* Pagination */}
          {!loading && totalPages > 1 && (
            <div className="mt-12 flex items-center justify-center gap-2">
              {/* Previous Button */}
              <Button
                variant="outline"
                size="icon"
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="h-10 w-10"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>

              {/* Page Numbers */}
              {pageNumbers.map((page, index) => (
                <div key={index}>
                  {page === '...' ? (
                    <span className="flex h-10 w-10 items-center justify-center text-muted-foreground">
                      ...
                    </span>
                  ) : (
                    <Button
                      variant={currentPage === page ? "default" : "outline"}
                      size="icon"
                      onClick={() => goToPage(page as number)}
                      className={`h-10 w-10 ${
                        currentPage === page
                          ? "bg-[#874FFF] hover:bg-[#7043DD]"
                          : ""
                      }`}
                    >
                      {page}
                    </Button>
                  )}
                </div>
              ))}

              {/* Next Button */}
              <Button
                variant="outline"
                size="icon"
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="h-10 w-10"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Partner Detail Sheet */}
      <Sheet open={isDetailOpen} onOpenChange={setIsDetailOpen}>
        <SheetContent className="w-full sm:max-w-2xl overflow-y-auto">
          {selectedPartner && (
            <>
              <SheetHeader className="space-y-4">
                {/* Close Button */}
                <button
                  onClick={handleCloseDetail}
                  className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100"
                >
                  <X className="h-4 w-4" />
                  <span className="sr-only">Close</span>
                </button>

                {/* Partner Header */}
                <div className="flex items-start gap-4 pt-2">
                  <Avatar className="h-20 w-20">
                    <AvatarImage src={selectedPartner.photo_url || selectedPartner.photo} alt={selectedPartner.name} />
                    <AvatarFallback className="text-lg">{getInitials(selectedPartner.name)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <SheetTitle className="text-2xl">{selectedPartner.name}</SheetTitle>
                      {selectedPartner.verified && (
                        <CheckCircle2 className="h-5 w-5 text-[#874FFF]" />
                      )}
                    </div>
                    <div className="mb-3">
                      <span className="text-2xl font-bold text-[#874FFF]">
                        ${selectedPartner.rate}
                      </span>
                      <span className="text-muted-foreground"> / hour</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {selectedPartner.markets.map((market) => (
                        <Badge key={market} variant="secondary">
                          <MapPin className="mr-1 h-3 w-3" />
                          {market}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </SheetHeader>

              {/* Partner Details */}
              <div className="mt-6 space-y-6">
                {/* Stats */}
                <div className="rounded-lg border border-border bg-muted/30 p-4">
                  <div className="flex items-center gap-2 text-sm">
                    <Briefcase className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">
                      Hired <span className="font-semibold text-foreground">{selectedPartner.hires} times</span> this month
                    </span>
                  </div>
                </div>

                {/* Introduction */}
                <div>
                  <h3 className="mb-3 text-lg font-semibold">Introduction</h3>
                  <div className="space-y-4 text-sm text-muted-foreground">
                    <p>
                      GTMate is connecting you with <span className="font-semibold text-foreground">{selectedPartner.name}</span>, 
                      an experienced GTM partner specializing in {selectedPartner.markets.join(", ")} markets.
                    </p>
                    {selectedPartner.bio && (
                      <p>
                        {selectedPartner.bio}
                      </p>
                    )}
                    {selectedPartner.hires > 0 && (
                      <p>
                        With a proven track record of <span className="font-semibold text-foreground">{selectedPartner.hires} successful engagements</span> this month, 
                        they bring deep local market knowledge and extensive networks to help your business expand effectively.
                      </p>
                    )}
                    {selectedPartner.hires === 0 && (
                      <p>
                        They bring deep local market knowledge and extensive networks to help your business expand effectively.
                      </p>
                    )}
                    {selectedPartner.expertise && selectedPartner.expertise.length > 0 && (
                      <>
                        <p>
                          This partner has been carefully vetted by our team and has demonstrated expertise in:
                        </p>
                        <ul className="ml-6 list-disc space-y-1">
                          {selectedPartner.expertise.map((item, index) => (
                            <li key={index}>{item}</li>
                          ))}
                        </ul>
                      </>
                    )}
                  </div>
                </div>

                {/* Markets Coverage */}
                <div>
                  <h3 className="mb-3 text-lg font-semibold">Markets Coverage</h3>
                  <p className="mb-3 text-sm text-muted-foreground">
                    This partner operates across the following markets:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {selectedPartner.markets.map((market) => (
                      <Badge key={market} variant="outline" className="text-sm">
                        {market}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <div className="space-y-3 border-t border-border pt-6">
                  <Button
                    className="w-full bg-[#874FFF] hover:bg-[#7043DD]"
                    size="lg"
                    onClick={() => handleContactPartner(selectedPartner)}
                  >
                    Contact Partner
                  </Button>
                  <p className="text-center text-xs text-muted-foreground">
                    No upfront fees · Commission-based · Start in 30 days
                  </p>
                </div>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>

      <MainFooter />
    </div>
  );
};

export default Explore;

