import { useState, useMemo } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs';
import { Input } from './components/ui/input';
import { Button } from './components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './components/ui/dialog';
import { ProductCard } from './components/ProductCard';
import { ProductDetail } from './components/ProductDetail';
import { products, categories } from './data/products';
import { Search, MapPin, Phone, Mail, MessageCircle } from 'lucide-react';
import { Product } from './types/product';

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isContactDialogOpen, setIsContactDialogOpen] = useState(false);
  const [isLocationDialogOpen, setIsLocationDialogOpen] = useState(false);

  const filteredProducts = useMemo(() => {
    let filtered = products;

    // Filter by category
    if (activeCategory !== 'all') {
      filtered = filtered.filter(p => p.category === activeCategory);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        p =>
          p.name.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [searchQuery, activeCategory]);

  const productCount = activeCategory === 'all' 
    ? products.length 
    : products.filter(p => p.category === activeCategory).length;

  const handleWhatsAppClick = () => {
    const message = encodeURIComponent("Hi, I'd like to enquire about few medical equipment listed on your site");
    const phoneNumber = "971XXXXXXXXX"; // Replace with actual phone number
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  };

  // If a product is selected, show the detail view
  if (selectedProduct) {
    return (
      <ProductDetail
        product={selectedProduct}
        onBack={() => setSelectedProduct(null)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Combined Sticky Header - All in One */}
      <div className="sticky top-0 z-50 bg-white shadow-lg">
        {/* Header Part 1: Company Name */}
        <div className="container mx-auto px-4 sm:px-6 py-3 sm:py-3">
          <div className="flex items-center justify-center gap-2 sm:gap-4">
            {/* Medical Cross Icon - Now visible on mobile too */}
            <div className="flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-br from-[#156669] to-[#0d4a4d] rounded-lg shadow-md flex-shrink-0">
              <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
              </svg>
            </div>
            
            {/* Company Name with Gradient */}
            <div className="text-center">
              <h1 
                className="bg-gradient-to-r from-gray-900 via-[#156669] to-gray-900 bg-clip-text text-transparent tracking-tight font-extrabold"
                style={{ fontSize: 'clamp(1.2rem, 4.5vw, 1.5rem)', letterSpacing: '-0.02em' }}
              >
                Sneha Surgicals
              </h1>
              <div className="h-0.5 w-3/4 bg-gradient-to-r from-[#156669] via-[#1a8a8e] to-transparent rounded-full mt-0.5 mx-auto" />
            </div>
          </div>
        </div>

        {/* Header Part 2: Contact & Search */}
        <div className="container mx-auto px-4 sm:px-6 py-2 sm:py-3">
          {/* Contact Information */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 mb-3">
            <Button 
              variant="outline"
              className="border-2 border-[#156669] text-[#156669] hover:bg-[#156669] hover:text-white px-5 py-2 rounded-full shadow-md hover:shadow-lg transition-all w-full sm:w-auto text-xs sm:text-sm"
              onClick={() => setIsLocationDialogOpen(true)}
            >
              <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1.5" />
              Visit Us: WHX Dubai 55
            </Button>
            
            <Button 
              variant="outline"
              className="border-2 border-[#156669] text-[#156669] hover:bg-[#156669] hover:text-white px-5 py-2 rounded-full shadow-md hover:shadow-lg transition-all w-full sm:w-auto text-xs sm:text-sm"
              onClick={() => setIsContactDialogOpen(true)}
            >
              <Phone className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1.5" />
              Contact Us
            </Button>
          </div>

          {/* Search Bar */}
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-11 pr-4 py-1.5 bg-white shadow-md border border-gray-200 rounded-full focus:border-[#156669] focus:ring-2 focus:ring-[#156669]/20 text-sm"
            />
          </div>
        </div>

        {/* Category Tabs - Now part of sticky header */}
        <div className="bg-white">
          <div className="container mx-auto px-4 py-2">
            <Tabs defaultValue="all" onValueChange={setActiveCategory}>
              <div className="flex justify-center">
                <div className="overflow-x-auto scrollbar-hide max-w-full">
                  <TabsList className="inline-flex w-max mx-auto gap-1">
                    <TabsTrigger value="all" className="whitespace-nowrap text-xs sm:text-sm py-1.5 data-[state=active]:bg-[#156669] data-[state=active]:text-white">
                      All Products
                    </TabsTrigger>
                    {categories.map(category => (
                      <TabsTrigger key={category.id} value={category.id} className="whitespace-nowrap text-xs sm:text-sm py-1.5 data-[state=active]:bg-[#156669] data-[state=active]:text-white">
                        {category.name}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                </div>
              </div>
            </Tabs>
          </div>
        </div>

        {/* Product Count Text - Part of sticky header */}
        <div className="bg-white border-t border-gray-100 py-2">
          <div className="container mx-auto px-4">
            <p className="text-xs sm:text-sm text-[#156669] text-center font-medium">
              {activeCategory === 'all' 
                ? `Showing all ${filteredProducts.length} products >` 
                : `Showing ${filteredProducts.length} products for ${categories.find(c => c.id === activeCategory)?.name} >`
              }
            </p>
          </div>
        </div>
      </div>

      {/* Main Content - Products Grid */}
      <main className="container mx-auto px-3 sm:px-4 py-6 sm:py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} onClick={() => setSelectedProduct(product)} />
          ))}
        </div>
        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No products found matching your search.</p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white mt-16 py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-400">
            © 2025 Sneha Surgicals. Visit us at the exhibition to learn more.
          </p>
        </div>
      </footer>

      {/* Contact Dialog */}
      <Dialog open={isContactDialogOpen} onOpenChange={setIsContactDialogOpen}>
        <DialogContent className="sm:max-w-[500px] bg-gradient-to-br from-white to-teal-50/30">
          <DialogHeader>
            <DialogTitle className="text-center bg-gradient-to-r from-gray-900 via-[#156669] to-gray-900 bg-clip-text text-transparent">Contact Us</DialogTitle>
            <DialogDescription className="text-center text-gray-600">
              Get in touch with us for any inquiries about our medical equipment
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6 py-4">
            {/* Contact Information Cards */}
            <div className="bg-white rounded-2xl p-6 shadow-md border border-[#156669]/20">
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center justify-center w-12 h-12 bg-teal-100 rounded-full">
                  <Phone className="w-6 h-6 text-[#156669]" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Phone Number</p>
                  <p className="text-gray-900">+971-XXX-XXXX</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="flex items-center justify-center w-12 h-12 bg-teal-100 rounded-full">
                  <Mail className="w-6 h-6 text-[#156669]" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Email Address</p>
                  <p className="text-gray-900">info@snehasurgicals.com</p>
                </div>
              </div>
            </div>

            {/* WhatsApp Button */}
            <Button 
              className="w-full bg-green-600 hover:bg-green-700 text-white px-6 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all"
              onClick={handleWhatsAppClick}
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              Message us on WhatsApp
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Location Dialog */}
      <Dialog open={isLocationDialogOpen} onOpenChange={setIsLocationDialogOpen}>
        <DialogContent className="sm:max-w-[600px] bg-gradient-to-br from-white to-teal-50/30">
          <DialogHeader>
            <DialogTitle className="text-center bg-gradient-to-r from-gray-900 via-[#156669] to-gray-900 bg-clip-text text-transparent">
              📍 Find Us at Arena 1
            </DialogTitle>
            <DialogDescription className="text-center text-gray-600">
              We're located in Arena 1, Stall #55 - Between leading medical suppliers
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6 py-4">
            {/* Location Details */}
            <div className="bg-white rounded-2xl p-4 shadow-md border border-[#156669]/20">
              <div className="text-center space-y-2">
                <p className="text-gray-700">🏢 <span className="font-semibold">Arena 1</span></p>
                <p className="text-gray-700">🎯 <span className="font-semibold">Stall #55</span></p>
                <p className="text-sm text-gray-500">World Healthcare Exhibition - Dubai</p>
              </div>
            </div>

            {/* Animated Stall Layout */}
            <div className="bg-gradient-to-b from-gray-50 to-white rounded-2xl p-6 shadow-md border border-[#156669]/20">
              <p className="text-center text-sm text-gray-600 mb-4">Interactive Stall Map</p>
              
              {/* Arena Label */}
              <div className="text-center mb-6">
                <div className="inline-block bg-gradient-to-r from-[#156669] to-[#0d4a4d] text-white px-6 py-2 rounded-full text-sm shadow-lg">
                  Arena 1 - Hall B
                </div>
              </div>

              {/* Stall Grid */}
              <div className="space-y-3">
                {/* Row 1 */}
                <div className="grid grid-cols-5 gap-2">
                  <StallBox label="MediTech" color="bg-gray-200" />
                  <StallBox label="HealthCo" color="bg-gray-200" />
                  <StallBox label="ABC Co." color="bg-gray-200" animate={true} pulse={true} />
                  <StallBox label="XYZ Ltd." color="bg-gray-200" />
                  <StallBox label="ProMed" color="bg-gray-200" />
                </div>

                {/* Center Highlight - Your Stall */}
                <div className="grid grid-cols-5 gap-2">
                  <StallBox label="Stall 51" color="bg-gray-100" />
                  <StallBox label="Stall 52" color="bg-gray-100" />
                  <StallBox 
                    label="Sneha Surgicals" 
                    color="bg-gradient-to-br from-[#156669] to-[#0d4a4d]" 
                    textColor="text-white"
                    isYourStall={true}
                    animate={true}
                  />
                  <StallBox label="Stall 56" color="bg-gray-100" />
                  <StallBox label="Stall 57" color="bg-gray-100" />
                </div>

                {/* Row 3 */}
                <div className="grid grid-cols-5 gap-2">
                  <StallBox label="CarePlus" color="bg-gray-200" />
                  <StallBox label="VitaMed" color="bg-gray-200" />
                  <StallBox label="Med Solutions" color="bg-gray-200" animate={true} pulse={true} />
                  <StallBox label="LifeCare" color="bg-gray-200" />
                  <StallBox label="WellHealth" color="bg-gray-200" />
                </div>
              </div>

              {/* Legend */}
              <div className="mt-6 flex items-center justify-center gap-6 flex-wrap">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-gradient-to-br from-[#156669] to-[#0d4a4d] rounded"></div>
                  <span className="text-xs text-gray-600">Our Stall (#55)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-gray-200 rounded"></div>
                  <span className="text-xs text-gray-600">Neighboring Stalls</span>
                </div>
              </div>

              {/* Directions */}
              <div className="mt-4 bg-teal-50 rounded-xl p-4 border border-[#156669]/20">
                <p className="text-sm text-gray-700 text-center">
                  🚶 <span className="font-semibold">How to reach:</span> Enter through Main Gate → Arena 1 → Hall B → Stall #55
                </p>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

// Stall Box Component
function StallBox({ 
  label, 
  color, 
  textColor = "text-gray-700", 
  isYourStall = false,
  animate = false,
  pulse = false
}: { 
  label: string; 
  color: string; 
  textColor?: string;
  isYourStall?: boolean;
  animate?: boolean;
  pulse?: boolean;
}) {
  return (
    <div className="relative">
      <div 
        className={`
          ${color} ${textColor}
          rounded-lg p-3 text-center transition-all duration-300
          ${isYourStall ? 'shadow-2xl ring-4 ring-[#156669]/30 ring-offset-2 scale-110' : 'shadow-md hover:shadow-lg'}
          ${animate ? 'hover:scale-105' : ''}
          ${pulse ? 'animate-pulse-slow' : ''}
        `}
        style={{
          animation: isYourStall ? 'bounce-gentle 2s ease-in-out infinite' : undefined
        }}
      >
        <p className="text-xs font-semibold leading-tight">{label}</p>
        {isYourStall && (
          <div className="mt-1 text-xl">📍</div>
        )}
      </div>
      {isYourStall && (
        <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-[#156669] text-white text-xs px-2 py-1 rounded-full whitespace-nowrap shadow-lg animate-bounce-slow">
          You are here!
        </div>
      )}
    </div>
  );
}