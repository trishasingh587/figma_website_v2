import { Product } from "../types/product";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog";
import { ChevronLeft, ChevronRight, MessageCircle } from "lucide-react";
import { useState } from "react";

interface ProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ProductModal({ product, isOpen, onClose }: ProductModalProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  if (!product) return null;

  const allImages = product.images.filter(img => img !== '');
  const hasMultipleImages = allImages.length > 1;

  const goToPrevImage = () => {
    setSelectedImageIndex((prev) => (prev === 0 ? allImages.length - 1 : prev - 1));
  };

  const goToNextImage = () => {
    setSelectedImageIndex((prev) => (prev === allImages.length - 1 ? 0 : prev + 1));
  };

  const handleWhatsAppRequest = () => {
    const message = encodeURIComponent(`Hi, I'd like to enquire about: ${product.name}`);
    const phoneNumber = "971XXXXXXXXX";
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  };

  const handleClose = () => {
    setSelectedImageIndex(0);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="w-[calc(100%-2rem)] max-w-sm bg-gradient-to-br from-white to-teal-50/30 max-h-[90vh] overflow-y-auto p-0">
        <DialogHeader className="sr-only">
          <DialogTitle>{product.name}</DialogTitle>
          <DialogDescription>Product details and information</DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 pb-4">
          {/* Main Image with Navigation - No Box */}
          <div className="relative w-full flex items-center justify-center py-6 pt-12">
            <ImageWithFallback
              src={allImages[selectedImageIndex]}
              alt={product.name}
              className="w-full max-h-[40vh] object-contain"
            />
            
            {/* Navigation Arrows */}
            {hasMultipleImages && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    goToPrevImage();
                  }}
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm hover:bg-white text-[#156669] rounded-full p-2 shadow-lg hover:shadow-xl transition-all"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    goToNextImage();
                  }}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm hover:bg-white text-[#156669] rounded-full p-2 shadow-lg hover:shadow-xl transition-all"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </>
            )}
          </div>
          
          {/* Thumbnail Gallery */}
          {hasMultipleImages && (
            <div className="flex flex-wrap gap-2 justify-center px-4">
              {allImages.map((image, index) => (
                <button
                  key={index}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedImageIndex(index);
                  }}
                  className={`w-14 h-14 overflow-hidden rounded-lg transition-all ${ 
                    selectedImageIndex === index
                      ? 'ring-2 ring-[#156669] ring-offset-2'
                      : 'ring-1 ring-gray-200 opacity-60 hover:opacity-100'
                  }`}
                >
                  <ImageWithFallback
                    src={image}
                    alt={`View ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}

          {/* Product Name */}
          <h2 className="text-center text-xl font-bold text-[#156669] px-4 mb-2">
            {product.name}
          </h2>

          {/* Divider Line - Like Sneha Surgicals */}
          <div className="h-0.5 w-1/2 bg-gradient-to-r from-[#156669] via-[#1a8a8e] to-transparent rounded-full mx-auto"></div>

          {/* Text/Subtitle */}
          {product.subtitle && (
            <p className="text-center text-sm text-gray-700 font-semibold px-6">
              {product.subtitle}
            </p>
          )}

          {/* WhatsApp Button */}
          <div className="px-2 pb-2">
            <Button 
              className="w-full bg-green-600 hover:bg-green-700 text-white text-base px-6 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all"
              onClick={handleWhatsAppRequest}
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              Enquire about this product
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}