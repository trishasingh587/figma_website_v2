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
  const allImages = [product.imageUrl, ...(product.additionalImages || [])];
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
        <div className="container mx-auto px-4 py-3">
          {/* Apple-style Back Button */}
          <button
            onClick={onBack}
            className="flex items-center gap-1 text-[#156669] active:opacity-50 transition-opacity mb-3"
          >
            <ChevronLeft className="w-5 h-5" />
            <span className="text-base font-medium">Back</span>
          </button>

          {/* Product Name & Category */}
          <div className="text-center pb-2">
            <p className="text-xs uppercase tracking-wider text-gray-400 mb-2 font-semibold">
              {product.category.replace('-', ' ')}
            </p>
            <h1 className="text-gray-900 leading-tight px-2 font-bold" style={{ fontSize: 'clamp(1.15rem, 4.5vw, 1.5rem)' }}>
              {product.name}
            </h1>
          </div>
        </div>
      </div>

      {/* Product Detail Content */}
      <div className="container mx-auto px-3 py-4 max-w-4xl">
        {/* Product Images */}
        <div className="mb-6">
          <div className="aspect-[4/3] overflow-hidden rounded-2xl bg-gray-100 relative group shadow-lg">
            <ImageWithFallback
              src={allImages[selectedImageIndex]}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            
            {/* Navigation Arrows */}
            {allImages.length > 1 && (
              <>
                <button
                  onClick={goToPrevImage}
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/95 hover:bg-white text-gray-800 rounded-full p-2 shadow-xl opacity-0 group-hover:opacity-100 transition-opacity"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={goToNextImage}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/95 hover:bg-white text-gray-800 rounded-full p-2 shadow-xl opacity-0 group-hover:opacity-100 transition-opacity"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
                
                {/* Image Counter */}
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-black/70 text-white px-3 py-1.5 rounded-full text-sm font-medium">
                  {selectedImageIndex + 1} / {allImages.length}
                </div>
              </>
            )}
            
            {/* Zoom In Button */}
            <button
              onClick={() => openImageViewer(selectedImageIndex)}
              className="absolute right-2 bottom-2 bg-white/95 hover:bg-white text-gray-800 rounded-full p-2 shadow-xl opacity-0 group-hover:opacity-100 transition-opacity"
              aria-label="Zoom in"
            >
              <ZoomIn className="w-5 h-5" />
            </button>
          </div>
          
          {/* Image Thumbnails */}
          {allImages.length > 1 && (
            <div className="flex gap-2 mt-3 overflow-x-auto pb-2">
              {allImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImageIndex(index)}
                  className={`flex-shrink-0 w-16 h-16 overflow-hidden rounded-lg bg-gray-100 border-2 transition-all ${
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
          <div className="bg-white rounded-2xl p-4 shadow-md border border-gray-100">
            <h3 className="text-[#156669] font-semibold mb-2 text-sm uppercase tracking-wide">Description</h3>
            <p className="text-gray-700 leading-relaxed text-sm">
              {product.description}
            </p>
          </div>

          {/* Detailed Explanation */}
          {product.detailedExplanation && (
            <div className="bg-white rounded-2xl p-4 shadow-md border border-gray-100">
              <h3 className="text-[#156669] font-semibold mb-2 text-sm uppercase tracking-wide">Detailed Overview</h3>
              <p className="text-gray-700 leading-relaxed text-sm">
                {product.detailedExplanation}
              </p>
            </div>
          )}

          {/* Technical Specifications */}
          {product.specifications && product.specifications.length > 0 && (
            <div className="bg-white rounded-2xl p-4 shadow-md border border-gray-100">
              <h3 className="text-[#156669] font-semibold mb-3 text-sm uppercase tracking-wide">Technical Specifications</h3>
              <div className="space-y-2">
                {product.specifications.map((spec, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-start py-2 border-b border-gray-100 last:border-b-0 gap-4"
                  >
                    <span className="text-gray-600 text-sm font-medium flex-shrink-0">{spec.label}</span>
                    <span className="text-gray-900 text-sm text-right">
                      {spec.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {!product.specifications && (
            <div className="bg-teal-50/50 rounded-2xl p-4 border border-[#156669]/20">
              <p className="text-[#156669] text-sm text-center">
                📋 Detailed specifications available upon request. Contact us for more information.
              </p>
            </div>
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

      {/* Request Information Dialog */}
      <Dialog open={isRequestInfoOpen} onOpenChange={setIsRequestInfoOpen}>
        <DialogContent className="sm:max-w-[500px] bg-gradient-to-br from-white to-teal-50/30 max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-center bg-gradient-to-r from-gray-900 via-[#156669] to-gray-900 bg-clip-text text-transparent">
              Request Product Information
            </DialogTitle>
            <DialogDescription className="text-center text-gray-600 text-sm">
              Get detailed information about this product
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-2">
            {/* Product Summary - Enhanced with bigger name */}
            <div className="bg-white rounded-2xl p-4 shadow-md border border-[#156669]/20">
              <div className="flex gap-4">
                <div className="w-24 h-24 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0 shadow-sm">
                  <ImageWithFallback
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 flex flex-col justify-center">
                  <p className="text-xs text-[#156669] uppercase tracking-wide mb-1 font-medium">
                    {product.category.replace('-', ' ')}
                  </p>
                  <h4 className="font-bold text-gray-900 leading-tight" style={{ fontSize: 'clamp(0.95rem, 3vw, 1.1rem)' }}>
                    {product.name}
                  </h4>
                </div>
              </div>
            </div>

            {/* Contact Information Cards */}
            <div className="bg-white rounded-2xl p-4 shadow-md border border-[#156669]/20 space-y-3">
              <p className="text-sm text-gray-600 text-center font-medium mb-3">Contact us for more details</p>
              
              <div className="flex items-center gap-3 p-3 bg-teal-50 rounded-xl">
                <div className="flex items-center justify-center w-10 h-10 bg-[#156669]/10 rounded-full flex-shrink-0">
                  <Phone className="w-5 h-5 text-[#156669]" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs text-gray-500">Phone Number</p>
                  <p className="text-sm font-semibold text-gray-900">+91 99999 99999</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-3 bg-teal-50 rounded-xl">
                <div className="flex items-center justify-center w-10 h-10 bg-[#156669]/10 rounded-full flex-shrink-0">
                  <Mail className="w-5 h-5 text-[#156669]" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs text-gray-500">Email Address</p>
                  <p className="text-sm font-semibold text-gray-900 truncate">info@snehasurgicals.com</p>
                </div>
              </div>
            </div>

            {/* WhatsApp Button */}
            <Button 
              className="w-full bg-green-600 hover:bg-green-700 text-white px-6 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all"
              onClick={handleWhatsAppRequest}
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              Send WhatsApp Inquiry
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Image Viewer Dialog - Full screen with pinch zoom */}
      <Dialog open={isImageViewerOpen} onOpenChange={setIsImageViewerOpen}>
        <DialogContent className="max-w-full w-full h-full p-0 bg-black/95 border-0">
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