import { useState, useMemo, useRef } from 'react';
import { Input } from './components/ui/input';
import { Button } from './components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './components/ui/dialog';
import { ProductModal } from './components/ProductModal';
import { ImageWithFallback } from './components/figma/ImageWithFallback';
import { products } from './data/products';
import { Search, MapPin, Phone, Mail, MessageCircle, Download } from 'lucide-react';
import { Product } from './types/product';

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isContactDialogOpen, setIsContactDialogOpen] = useState(false);
  const [isLocationDialogOpen, setIsLocationDialogOpen] = useState(false);
  const scrollPositionRef = useRef(0);

  const filteredProducts = useMemo(() => {
    if (!searchQuery.trim()) return products;
    
    const query = searchQuery.toLowerCase();
    return products.filter(
      p =>
        p.name.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  const handleWhatsAppClick = () => {
    const message = encodeURIComponent("Hi, I'd like to enquire about few medical equipment listed on your site");
    const phoneNumber = "919820548883";
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  };

  const handleBrochureDownload = () => {
    // Create a temporary link element to trigger download
    const link = document.createElement('a');
    link.href = '/product-brochure.pdf'; // ← You can place your PDF file in the public folder with this name
    link.download = 'Sneha-Surgicals-Product-Brochure.pdf'; // ← This will be the downloaded file name
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleProductClick = (product: Product) => {
    scrollPositionRef.current = window.scrollY;
    setSelectedProduct(product);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
    setTimeout(() => {
      window.scrollTo(0, scrollPositionRef.current);
    }, 0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50">
      {/* Premium Header */}
      <div className="sticky top-0 z-40 bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100">
        {/* Company Name */}
        <div className="container mx-auto px-4 sm:px-6 py-4 sm:py-5">
          <div className="flex items-center justify-center gap-3 sm:gap-4">
            <div className="flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 bg-gradient-to-br from-[#156669] to-[#0d4a4d] rounded-xl shadow-lg flex-shrink-0">
              <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
              </svg>
            </div>
            
            <div className="text-center">
              <h1 
                className="bg-gradient-to-r from-gray-900 via-[#156669] to-gray-900 bg-clip-text text-transparent tracking-tight font-extrabold"
                style={{ fontSize: 'clamp(1.4rem, 5vw, 1.75rem)', letterSpacing: '-0.02em' }}
              >
                Sneha Surgicals
              </h1>
              <div className="h-0.5 w-3/4 bg-gradient-to-r from-[#156669] via-[#1a8a8e] to-transparent rounded-full mt-1 mx-auto" />
            </div>
          </div>
        </div>

        {/* Contact & Search */}
        <div className="container mx-auto px-4 sm:px-6 pb-4">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 mb-4">
            <Button 
              variant="outline"
              className="border-2 border-[#156669] text-[#156669] hover:bg-[#156669] hover:text-white px-6 py-2.5 rounded-full shadow-sm hover:shadow-md transition-all w-full sm:w-auto text-xs sm:text-sm font-semibold"
              onClick={() => setIsLocationDialogOpen(true)}
            >
              <MapPin className="w-4 h-4 mr-2" />
              Visit Us: Booth NP2.C31
            </Button>
            
            <Button 
              variant="outline"
              className="border-2 border-[#156669] text-[#156669] hover:bg-[#156669] hover:text-white px-6 py-2.5 rounded-full shadow-sm hover:shadow-md transition-all w-full sm:w-auto text-xs sm:text-sm font-semibold"
              onClick={() => setIsContactDialogOpen(true)}
            >
              <Phone className="w-4 h-4 mr-2" />
              Contact Us
            </Button>

            <Button 
              variant="outline"
              className="border-2 border-[#156669] text-[#156669] hover:bg-[#156669] hover:text-white px-6 py-2.5 rounded-full shadow-sm hover:shadow-md transition-all w-full sm:w-auto text-xs sm:text-sm font-semibold"
              onClick={handleBrochureDownload}
            >
              <Download className="w-4 h-4 mr-2" />
              Download Brochure
            </Button>
          </div>

          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Search our product catalogue..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 pr-5 py-3 bg-white shadow-sm border border-gray-200 rounded-full focus:border-[#156669] focus:ring-2 focus:ring-[#156669]/20 text-sm font-medium"
            />
          </div>
        </div>
      </div>

      {/* Premium Product Catalogue */}
      <main className="container mx-auto px-3 sm:px-4 py-8 sm:py-12">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
          {filteredProducts.map(product => {
            const primaryImage = product.images.find(img => img !== '') || '';
            return (
              <div
                key={product.id}
                onClick={() => handleProductClick(product)}
                className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 cursor-pointer transform hover:-translate-y-2 border border-gray-100 hover:border-[#156669]/20"
              >
                {/* Product Image */}
                <div className="aspect-square bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden relative">
                  <ImageWithFallback
                    src={primaryImage}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  {/* Premium Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#156669]/80 via-[#156669]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4">
                    <span className="text-white text-xs font-bold uppercase tracking-wider bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                      View Details
                    </span>
                  </div>
                </div>
                
                {/* Product Name - Center Aligned */}
                <div className="p-4 pb-3 flex items-center justify-center min-h-[3.5rem]">
                  <h3 className="font-bold text-[#156669] text-sm leading-tight line-clamp-3 group-hover:text-[#0d4a4d] transition-colors text-center">
                    {product.name}
                  </h3>
                </div>
              </div>
            );
          })}
        </div>
        
        {filteredProducts.length === 0 && (
          <div className="text-center py-16">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-100 rounded-full mb-4">
              <Search className="w-10 h-10 text-gray-400" />
            </div>
            <p className="text-gray-500 text-lg font-medium">No products found matching your search.</p>
            <p className="text-gray-400 text-sm mt-2">Try adjusting your search terms</p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gradient-to-br from-[#156669] to-[#0d4a4d] text-white mt-20 py-8 border-t-4 border-teal-400/30">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-3">
              <div className="flex items-center justify-center w-6 h-6 bg-white/10 backdrop-blur-sm rounded-lg shadow-md">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
                </svg>
              </div>
              <h3 className="text-lg font-bold tracking-tight text-white">Sneha Surgicals</h3>
            </div>
            
            <div className="flex items-center justify-center gap-4 text-xs text-white/90 flex-wrap">
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5" />
                Booth NP2.C31
              </span>
              <span className="hidden sm:inline">•</span>
              <span className="flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5" />
                sneha.surgicals@yahoo.com
              </span>
              <span className="hidden sm:inline">•</span>
              <span className="flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5" />
                +91 98205 48883
              </span>
            </div>
            
            <p className="text-white/70 text-xs font-light pt-2">
              © 2025 Sneha Surgicals. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* Product Modal */}
      <ProductModal
        product={selectedProduct}
        isOpen={!!selectedProduct}
        onClose={handleCloseModal}
      />

      {/* Contact Dialog */}
      <Dialog open={isContactDialogOpen} onOpenChange={setIsContactDialogOpen}>
        <DialogContent className="w-[calc(100%-2rem)] max-w-md bg-gradient-to-br from-white to-teal-50/30">
          <DialogHeader>
            <DialogTitle className="text-center bg-gradient-to-r from-gray-900 via-[#156669] to-gray-900 bg-clip-text text-transparent text-lg">
              Contact Us
            </DialogTitle>
            <DialogDescription className="text-center text-gray-600 text-xs sm:text-sm px-2">
              Get in touch with us for any inquiries
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-2">
            <div className="bg-white rounded-2xl p-4 shadow-md border border-[#156669]/20 space-y-3">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-10 h-10 bg-teal-100 rounded-full flex-shrink-0">
                  <Phone className="w-5 h-5 text-[#156669]" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs text-gray-500">Phone Number</p>
                  <p className="text-sm font-semibold text-gray-900">+91 98205 48883</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-10 h-10 bg-teal-100 rounded-full flex-shrink-0">
                  <Mail className="w-5 h-5 text-[#156669]" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs text-gray-500">Email Address</p>
                  <p className="text-sm font-semibold text-gray-900 break-all">sneha.surgicals@yahoo.com</p>
                </div>
              </div>
            </div>

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
        <DialogContent className="w-[calc(100%-2rem)] max-w-2xl bg-gradient-to-br from-white to-teal-50/30 max-h-[90vh] overflow-y-auto scrollbar-hide">
          <DialogHeader>
            <DialogTitle className="text-center bg-gradient-to-r from-gray-900 via-[#156669] to-gray-900 bg-clip-text text-transparent text-lg">
              📍 Find us at North Drop Off
            </DialogTitle>
            <DialogDescription className="text-center text-gray-900 text-sm sm:text-base px-2 font-semibold pt-1">
              Booth NP2.C31 - Medical Equipment & Devices Section
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-2">
            <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-1 shadow-lg border border-gray-200">
              <div className="pt-3">
                <div className="text-center mb-3">
                  <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#156669] to-teal-600 px-4 py-2 rounded-full shadow-md">
                    <MapPin className="w-4 h-4 text-white" />
                    <span className="text-white font-bold text-sm">Sunset Avenue</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl px-0.5 py-1 border-2 border-gray-200 shadow-inner">
                <div className="space-y-0.5">
                  {/* Row 1 */}
                  <div className="grid grid-cols-3 gap-0.5">
                    <div className="bg-gradient-to-br from-gray-100 to-gray-50 rounded-lg p-4 border-2 border-gray-300 shadow-sm min-h-[95px] flex flex-col items-center justify-center">
                      <p className="text-gray-700 text-[12px] font-bold text-center leading-tight">BOTIN<br/>Technology</p>
                    </div>
                    <div className="bg-gradient-to-br from-gray-100 to-gray-50 rounded-lg p-4 border-2 border-gray-300 shadow-sm min-h-[95px] flex flex-col items-center justify-center">
                      <p className="text-gray-700 text-[12px] font-bold text-center leading-tight">Informa<br/>China</p>
                    </div>
                    <div className="bg-gradient-to-br from-gray-100 to-gray-50 rounded-lg p-4 border-2 border-gray-300 shadow-sm min-h-[95px] flex flex-col items-center justify-center">
                      <p className="text-gray-700 text-[12px] font-bold text-center leading-tight">Beneware<br/>Medical</p>
                    </div>
                  </div>

                  {/* Row 2 */}
                  <div className="grid grid-cols-3 gap-0.5">
                    <div className="bg-gradient-to-br from-gray-100 to-gray-50 rounded-lg p-4 border-2 border-gray-300 shadow-sm min-h-[95px] flex flex-col items-center justify-center">
                      <p className="text-gray-700 text-[12px] font-bold text-center leading-tight">Razormed<br/>Inc</p>
                    </div>
                    <div className="bg-gradient-to-br from-gray-100 to-gray-50 rounded-lg p-4 border-2 border-gray-300 shadow-sm min-h-[95px] flex flex-col items-center justify-center">
                      <p className="text-gray-700 text-[12px] font-bold text-center leading-tight">Bio Xtreme<br/>Ltd</p>
                    </div>
                    <div className="bg-gradient-to-br from-gray-100 to-gray-50 rounded-lg p-4 border-2 border-gray-300 shadow-sm min-h-[95px] flex flex-col items-center justify-center">
                      <p className="text-gray-700 text-[12px] font-bold text-center leading-tight">G14 Surgical<br/>Supply</p>
                    </div>
                  </div>

                  {/* Row 3 - YOUR BOOTH */}
                  <div className="grid grid-cols-3 gap-0.5">
                    <div className="bg-gradient-to-br from-gray-100 to-gray-50 rounded-lg p-4 border-2 border-gray-300 shadow-sm min-h-[95px] flex flex-col items-center justify-center">
                      <p className="text-gray-700 text-[12px] font-bold text-center leading-tight">BOTIN<br/>Technology</p>
                    </div>
                    
                    <div className="relative min-h-[95px]">
                      <div className="absolute -inset-0.5 bg-gradient-to-br from-[#156669] to-teal-500 rounded-2xl blur-sm opacity-40 animate-pulse"></div>
                      
                      <div className="relative bg-gradient-to-br from-[#156669] to-[#1a7a7d] rounded-2xl p-4 border-4 border-white shadow-2xl h-full flex flex-col items-center justify-center gap-3">
                        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg">
                          <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none">
                            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" fill="#EF4444"/>
                          </svg>
                        </div>
                        
                        <div className="text-center">
                          <p className="text-white text-[13px] font-black text-center leading-[1.1] tracking-wide mb-2">SNEHA<br/>SURGICALS</p>
                          <div className="bg-white rounded-full px-4 py-1.5 inline-block shadow-md">
                            <p className="text-[#156669] text-[13px] font-black text-center">NP2.C31</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-gradient-to-br from-gray-100 to-gray-50 rounded-lg p-4 border-2 border-gray-300 shadow-sm min-h-[95px] flex flex-col items-center justify-center">
                      <p className="text-gray-700 text-[12px] font-bold text-center leading-tight">Henkel<br/>Medical</p>
                      <p className="text-gray-500 text-[10px] text-center mt-1.5 font-semibold">NP2.C34</p>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-gray-300 flex items-center justify-center gap-4">
                  <div className="flex items-center gap-1.5">
                    <div className="w-3.5 h-3.5 bg-gradient-to-br from-[#156669] to-teal-600 rounded shadow-sm"></div>
                    <span className="text-xs font-bold text-[#156669]">Your Booth</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-3.5 h-3.5 bg-gray-300 rounded border border-gray-400"></div>
                    <span className="text-xs font-semibold text-gray-600">Others</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-white to-teal-50 rounded-2xl p-3 shadow-lg border border-[#156669]/20">
              <div className="text-center mb-2">
                <h3 className="text-sm font-bold text-[#156669] mb-1">🚶 How to Reach Us</h3>
                <div className="h-0.5 w-16 bg-gradient-to-r from-transparent via-[#156669] to-transparent mx-auto"></div>
              </div>
              
              <div className="space-y-1 max-w-sm mx-auto">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 bg-gradient-to-br from-[#156669] to-teal-600 rounded-full flex items-center justify-center shadow-md border-2 border-white flex-shrink-0">
                    <span className="text-white font-bold text-[10px]">1</span>
                  </div>
                  <div className="flex-1 bg-white rounded-lg p-2 shadow-sm border border-[#156669]/20">
                    <p className="text-xs font-bold text-[#156669] text-center">North Drop Off</p>
                  </div>
                </div>

                <div className="flex justify-start pl-3.5">
                  <div className="w-0.5 h-1.5 bg-gradient-to-b from-[#156669] to-teal-400"></div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 bg-gradient-to-br from-[#156669] to-teal-600 rounded-full flex items-center justify-center shadow-md border-2 border-white flex-shrink-0">
                    <span className="text-white font-bold text-[10px]">2</span>
                  </div>
                  <div className="flex-1 bg-white rounded-lg p-2 shadow-sm border border-[#156669]/20">
                    <p className="text-xs font-bold text-[#156669] text-center">Sunset Avenue</p>
                  </div>
                </div>

                <div className="flex justify-start pl-3.5">
                  <div className="w-0.5 h-1.5 bg-gradient-to-b from-teal-400 to-teal-500"></div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 bg-gradient-to-br from-[#156669] to-teal-600 rounded-full flex items-center justify-center shadow-md border-2 border-white flex-shrink-0">
                    <span className="text-white font-bold text-[10px]">3</span>
                  </div>
                  <div className="flex-1 bg-white rounded-lg p-2 shadow-sm border border-[#156669]/20">
                    <p className="text-xs font-bold text-[#156669] text-center">NP2 - Medical Equipment & Devices</p>
                  </div>
                </div>

                <div className="flex justify-start pl-3.5">
                  <div className="w-0.5 h-1.5 bg-gradient-to-b from-teal-500 to-[#156669]"></div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 bg-gradient-to-br from-[#156669] to-teal-600 rounded-full flex items-center justify-center shadow-md border-2 border-white flex-shrink-0">
                    <span className="text-white font-bold text-[10px]">4</span>
                  </div>
                  <div className="flex-1 bg-white rounded-lg p-2 shadow-sm border border-[#156669]/20">
                    <p className="text-xs font-bold text-[#156669] text-center">Section C</p>
                  </div>
                </div>

                <div className="flex justify-start pl-3.5">
                  <div className="w-0.5 h-1.5 bg-gradient-to-b from-[#156669] to-teal-600"></div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 bg-gradient-to-br from-[#156669] to-teal-600 rounded-full flex items-center justify-center shadow-md border-2 border-white flex-shrink-0">
                    <MapPin className="w-3.5 h-3.5 text-white fill-white" />
                  </div>
                  <div className="flex-1 bg-gradient-to-r from-teal-50 to-cyan-50 rounded-lg p-2 shadow-md border-2 border-[#156669]">
                    <p className="text-xs font-black text-[#156669] text-center">Booth NP2.C31 🎯</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}