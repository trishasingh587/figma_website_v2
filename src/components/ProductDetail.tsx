import { Product } from "../types/product";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog";
import { ArrowLeft, ChevronLeft, ChevronRight, MessageCircle, Phone, Mail, X, ZoomIn } from "lucide-react";
import { useState } from "react";

interface ProductDetailProps {
  product: Product;
  onBack: () => void;
}

export function ProductDetail({ product, onBack }: ProductDetailProps) {
  const allImages = product.images;
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isRequestInfoOpen, setIsRequestInfoOpen] = useState(false);
  const [isImageViewerOpen, setIsImageViewerOpen] = useState(false);
  const [viewerImageIndex, setViewerImageIndex] = useState(0);

  const goToPrevImage = () => {
    setSelectedImageIndex((prev) => (prev === 0 ? allImages.length - 1 : prev - 1));
  };

  const goToNextImage = () => {
    setSelectedImageIndex((prev) => (prev === allImages.length - 1 ? 0 : prev + 1));
  };

  const goToPrevViewerImage = () => {
    setViewerImageIndex((prev) => (prev === 0 ? allImages.length - 1 : prev - 1));
  };

  const goToNextViewerImage = () => {
    setViewerImageIndex((prev) => (prev === allImages.length - 1 ? 0 : prev + 1));
  };

  const openImageViewer = (index: number) => {
    setViewerImageIndex(index);
    setIsImageViewerOpen(true);
  };

  const handleWhatsAppRequest = () => {
    const message = encodeURIComponent(`Hi, I'd like to request info about this product: ${product.name}`);
    const phoneNumber = "919820548883"; // Replace with actual phone number
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Sticky Header with Apple-style Back Button & Product Name */}
      <div className="sticky top-0 z-50 bg-white/95 backdrop-blur-md shadow-md border-b border-gray-200">
        <div className="container mx-auto px-3 py-2.5">
          {/* Back Button - Left aligned */}
          <div className="flex items-start mb-2">
            <button
              onClick={onBack}
              className="flex items-center gap-0.5 text-[#156669] active:opacity-50 transition-opacity"
            >
              <ChevronLeft className="w-5 h-5" />
              <span className="text-sm font-medium">Back</span>
            </button>
          </div>

          {/* Category and Product Name - Both Centered */}
          <div className="text-center">
            <p className="text-[10px] uppercase tracking-wider text-gray-400 font-semibold mb-1.5">
              {product.category.replace('-', ' ')}
            </p>
            <h1 className="text-[#156669] leading-tight font-bold px-2" style={{ fontSize: 'clamp(1rem, 4vw, 1.35rem)' }}>
              {product.name}
            </h1>
          </div>
        </div>
      </div>

      {/* Specs Table - Below Header */}
      {product.specs && product.specs.length > 0 && (
        <div className="container mx-auto px-3 py-3 max-w-4xl">
          <div className="bg-white rounded-xl p-4 border border-[#156669]/10 shadow-sm">
            <div className="space-y-1.5">
              {product.specs.map((spec, index) => (
                <div key={index} className="flex justify-between gap-3 text-xs sm:text-sm">
                  <span className="text-gray-600 font-medium">{spec.label}</span>
                  <span className="text-[#156669] font-semibold text-right">{spec.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Product Detail Content */}
      <div className="container mx-auto px-3 py-4 max-w-4xl">
        {/* Product Images */}
        <div className="mb-6">
          <div 
            className="aspect-[4/3] overflow-hidden rounded-2xl bg-gray-100 relative group shadow-lg cursor-pointer"
            onClick={() => openImageViewer(selectedImageIndex)}
          >
            <ImageWithFallback
              src={allImages[selectedImageIndex]}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            
            {/* Navigation Arrows - Semi-transparent teal */}
            {allImages.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    goToPrevImage();
                  }}
                  className="absolute left-2 top-1/2 -translate-y-1/2 text-white rounded-full p-2.5 transition-all"
                  style={{
                    background: 'rgba(0, 0, 0, 0.3)',
                    backdropFilter: 'blur(8px)',
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.2)',
                  }}
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-5 h-5" style={{ filter: 'drop-shadow(0 1px 2px rgba(0, 0, 0, 0.5))' }} />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    goToNextImage();
                  }}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-white rounded-full p-2.5 transition-all"
                  style={{
                    background: 'rgba(0, 0, 0, 0.3)',
                    backdropFilter: 'blur(8px)',
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.2)',
                  }}
                  aria-label="Next image"
                >
                  <ChevronRight className="w-5 h-5" style={{ filter: 'drop-shadow(0 1px 2px rgba(0, 0, 0, 0.5))' }} />
                </button>
                
                {/* Image Counter */}
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-black/70 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-xs font-medium">
                  {selectedImageIndex + 1} / {allImages.length}
                </div>
              </>
            )}
            
            {/* Tap to Zoom Hint */}
            <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-xs font-medium flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
              <ZoomIn className="w-3.5 h-3.5" />
              Tap to zoom
            </div>
          </div>
          
          {/* Image Thumbnails */}
          {allImages.length > 1 && (
            <div className="flex flex-wrap gap-2 mt-3 justify-center pb-2">
              {allImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImageIndex(index)}
                  className={`w-16 h-16 overflow-hidden rounded-lg bg-gray-100 border-2 transition-all ${
                    selectedImageIndex === index
                      ? 'border-[#156669] ring-2 ring-[#156669]/30'
                      : 'border-transparent hover:border-gray-300'
                  }`}
                >
                  <ImageWithFallback
                    src={image}
                    alt={`${product.name} view ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Information */}
        <div className="space-y-5">
          {/* Description */}
          <div className="bg-white rounded-2xl p-5 border border-[#156669]/10" style={{ boxShadow: '0 4px 12px rgba(21, 102, 105, 0.08)' }}>
            <h3 className="text-[#156669] font-bold text-sm uppercase tracking-wide mb-4 pb-2 border-b border-[#156669]/10">Description</h3>
            <p className="text-gray-700 leading-relaxed text-sm font-medium">
              {product.description}
            </p>
          </div>

          {/* Subtitle / Additional Info */}
          {product.subtitle && (
            <div className="bg-white rounded-2xl p-5 border border-[#156669]/10" style={{ boxShadow: '0 4px 12px rgba(21, 102, 105, 0.08)' }}>
              <div className="text-gray-700 leading-relaxed text-sm font-medium space-y-2">
                {product.subtitle.split('\n').map((line, index) => (
                  <div key={index}>{line}</div>
                ))}
              </div>
            </div>
          )}

          {/* New Flexible Sections */}
          {product.sections && product.sections.length > 0 ? (
            product.sections.map((section, index) => (
              <div key={index} className="bg-white rounded-2xl p-5 border border-[#156669]/10" style={{ boxShadow: '0 4px 12px rgba(21, 102, 105, 0.08)' }}>
                {section.header && (
                  <h3 className="text-[#156669] font-bold text-sm uppercase tracking-wide mb-4 pb-2 border-b border-[#156669]/10">
                    {section.header}
                  </h3>
                )}
                
                {/* Description Type */}
                {section.type === 'description' && section.content && (
                  <p className="text-gray-700 leading-relaxed text-sm font-medium">
                    {section.content}
                  </p>
                )}
                
                {/* List Type - With Numbers */}
                {section.type === 'list' && section.items && (
                  <div className="space-y-3">
                    {section.items.map((item, itemIndex) => (
                      <div 
                        key={itemIndex} 
                        className="flex items-start gap-3 p-3 bg-white rounded-xl border border-[#156669]/10"
                        style={{ boxShadow: '0 2px 8px rgba(21, 102, 105, 0.08)' }}
                      >
                        <div className="flex-shrink-0 w-8 h-8 bg-[#156669] rounded-lg flex items-center justify-center">
                          <span className="text-white font-bold text-sm">
                            {itemIndex + 1}
                          </span>
                        </div>
                        <span className="text-gray-700 text-sm leading-relaxed flex-1 font-medium">{item}</span>
                      </div>
                    ))}
                  </div>
                )}
                
                {/* Specifications Type */}
                {section.type === 'specifications' && section.specs && (
                  <div className="space-y-2">
                    {section.specs.map((spec, specIndex) => (
                      <div
                        key={specIndex}
                        className="flex justify-between items-start gap-4 py-2 border-b border-gray-100 last:border-0"
                      >
                        <span className="text-gray-600 text-sm font-medium">{spec.label}</span>
                        <span className="text-[#156669] text-sm font-semibold text-right">
                          {spec.value}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))
          ) : null}

          {/* Legacy Fields - Show only if no sections defined */}
          {!product.sections && (
            <>
              {/* Detailed Explanation */}
              {product.detailedExplanation && (
                <div className="bg-white rounded-2xl p-5 border border-[#156669]/10" style={{ boxShadow: '0 4px 12px rgba(21, 102, 105, 0.08)' }}>
                  <h3 className="text-[#156669] font-bold text-sm uppercase tracking-wide mb-4 pb-2 border-b border-[#156669]/10">Detailed Overview</h3>
                  <p className="text-gray-700 leading-relaxed text-sm font-medium">
                    {product.detailedExplanation}
                  </p>
                </div>
              )}

              {/* Items Included */}
              {product.itemsIncluded && product.itemsIncluded.length > 0 && (
                <div className="bg-white rounded-2xl p-5 border border-[#156669]/10" style={{ boxShadow: '0 4px 12px rgba(21, 102, 105, 0.08)' }}>
                  <h3 className="text-[#156669] font-bold text-sm uppercase tracking-wide mb-4 pb-2 border-b border-[#156669]/10">Items Included</h3>
                  <div className="space-y-2">
                    {product.itemsIncluded.map((item, index) => (
                      <div key={index} className="flex items-start gap-3 py-1.5">
                        <div className="flex-shrink-0 w-7 h-7 bg-[#156669] rounded-lg flex items-center justify-center">
                          <span className="text-white font-bold text-xs">
                            {String(index + 1).padStart(2, '0')}
                          </span>
                        </div>
                        <span className="text-gray-700 text-sm leading-relaxed flex-1 font-medium">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Available Sizes */}
              {product.availableSizes && product.availableSizes.length > 0 && (
                <div className="bg-white rounded-2xl p-5 border border-[#156669]/10" style={{ boxShadow: '0 4px 12px rgba(21, 102, 105, 0.08)' }}>
                  <h3 className="text-[#156669] font-bold text-sm uppercase tracking-wide mb-4 pb-2 border-b border-[#156669]/10">Also Available In</h3>
                  <div className="flex flex-wrap gap-2.5">
                    {product.availableSizes.map((size, index) => (
                      <div key={index} className="bg-teal-50/50 border border-[#156669]/20 rounded-lg px-4 py-2.5 hover:bg-teal-50 hover:border-[#156669]/40 transition-all">
                        <p className="text-[#156669] font-semibold text-sm">{size}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Technical Specifications */}
              {product.specifications && product.specifications.length > 0 && (
                <div className="bg-white rounded-2xl p-5 border border-[#156669]/10" style={{ boxShadow: '0 4px 12px rgba(21, 102, 105, 0.08)' }}>
                  <h3 className="text-[#156669] font-bold text-sm uppercase tracking-wide mb-4 pb-2 border-b border-[#156669]/10">Technical Specifications</h3>
                  <div className="space-y-2">
                    {product.specifications.map((spec, index) => (
                      <div
                        key={index}
                        className="flex justify-between items-start gap-4 py-2 border-b border-gray-100 last:border-0"
                      >
                        <span className="text-gray-600 text-sm font-medium">{spec.label}</span>
                        <span className="text-[#156669] text-sm font-semibold text-right">
                          {spec.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {!product.specifications && (
                <div className="bg-teal-50/30 rounded-2xl p-4 border border-[#156669]/10">
                  <p className="text-[#156669] text-sm text-center">
                    Detailed specifications available upon request. Contact us for more information.
                  </p>
                </div>
              )}
            </>
          )}

          {/* Call to Action - Mobile Optimized */}
          <div className="sticky bottom-4 z-10">
            <Button 
              className="w-full bg-[#156669] hover:bg-[#0d4a4d] text-white py-6 rounded-2xl shadow-2xl text-base font-semibold"
              onClick={() => setIsRequestInfoOpen(true)}
            >
              Request Information
            </Button>
          </div>
        </div>
      </div>

      {/* Request Info Dialog - WhatsApp Card Style */}
      <Dialog open={isRequestInfoOpen} onOpenChange={setIsRequestInfoOpen}>
        <DialogContent className="w-[calc(100%-2rem)] max-w-sm bg-gradient-to-br from-white to-teal-50/30">
          <DialogHeader>
            <DialogTitle className="text-center bg-gradient-to-r from-gray-900 via-[#156669] to-gray-900 bg-clip-text text-transparent text-base sm:text-lg">
              Request Product Information
            </DialogTitle>
            <DialogDescription className="text-center text-gray-600 text-xs px-2">
              Get detailed information about this product
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-3 py-2">
            {/* Product Summary - Enhanced with bigger name */}
            <div className="bg-white rounded-2xl p-3 shadow-md border border-[#156669]/20">
              <div className="flex gap-3">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0 shadow-sm">
                  <ImageWithFallback
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 flex flex-col justify-center min-w-0">
                  <p className="text-[9px] sm:text-[10px] uppercase tracking-wider text-gray-400 mb-1 font-semibold">
                    {product.category.replace('-', ' ')}
                  </p>
                  <h4 className="font-bold text-[#156669] leading-tight text-sm sm:text-base">
                    {product.name}
                  </h4>
                </div>
              </div>
            </div>

            {/* Contact Information Card */}
            <div className="bg-white rounded-2xl p-3 shadow-md border border-[#156669]/20 space-y-2.5">
              <p className="text-xs font-semibold text-gray-700 mb-2">Contact us for more details</p>
              
              <div className="flex items-center gap-2.5">
                <div className="flex items-center justify-center w-9 h-9 bg-teal-100 rounded-full flex-shrink-0">
                  <Phone className="w-4 h-4 text-[#156669]" />
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] text-gray-500">Phone Number</p>
                  <p className="text-xs font-semibold text-gray-900">+91-98205 48883</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2.5">
                <div className="flex items-center justify-center w-9 h-9 bg-teal-100 rounded-full flex-shrink-0">
                  <Mail className="w-4 h-4 text-[#156669]" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[10px] text-gray-500">Email Address</p>
                  <p className="text-[11px] sm:text-xs font-semibold text-gray-900 break-all">
                    info@snehasurgicals.com
                  </p>
                </div>
              </div>
            </div>

            {/* WhatsApp Button */}
            <Button 
              className="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-5 rounded-xl shadow-lg hover:shadow-xl transition-all text-sm"
              onClick={handleWhatsAppRequest}
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              Send WhatsApp Inquiry
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Image Viewer Dialog - Full screen with pinch zoom */}
      <Dialog open={isImageViewerOpen} onOpenChange={setIsImageViewerOpen}>
        <DialogContent className="max-w-full w-full h-full p-0 bg-black/95 border-0">
          <DialogHeader className="sr-only">
            <DialogTitle>Product Image Viewer</DialogTitle>
            <DialogDescription>Full screen view of product image</DialogDescription>
          </DialogHeader>
          <div className="relative w-full h-full flex items-center justify-center">
            {/* Close Button */}
            <button
              onClick={() => setIsImageViewerOpen(false)}
              className="absolute top-4 right-4 z-50 bg-white/20 hover:bg-white/30 text-white rounded-full p-3 shadow-xl backdrop-blur-sm transition-all"
              aria-label="Close"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Image Counter */}
            {allImages.length > 1 && (
              <div className="absolute top-4 left-1/2 -translate-x-1/2 z-50 bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium">
                {viewerImageIndex + 1} / {allImages.length}
              </div>
            )}
            
            {/* Main Image - Zoomable */}
            <div className="w-full h-full flex items-center justify-center p-4">
              <img
                src={allImages[viewerImageIndex]}
                alt={product.name}
                className="max-w-full max-h-full object-contain cursor-zoom-in"
                style={{ touchAction: 'pan-x pan-y pinch-zoom' }}
              />
            </div>
            
            {/* Navigation Arrows */}
            {allImages.length > 1 && (
              <>
                <button
                  onClick={goToPrevViewerImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white rounded-full p-3 shadow-xl transition-all"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={goToNextViewerImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white rounded-full p-3 shadow-xl transition-all"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}