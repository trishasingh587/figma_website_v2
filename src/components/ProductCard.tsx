import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Product } from "../types/product";

interface ProductCardProps {
  product: Product;
  onClick: () => void;
}

export function ProductCard({ product, onClick }: ProductCardProps) {
  return (
    <Card 
      className="h-full hover:shadow-xl transition-all cursor-pointer border border-gray-200 hover:border-[#156669]/30 overflow-hidden"
      onClick={onClick}
    >
      <CardHeader className="p-0 m-0">
        {/* Reduced aspect ratio for mobile - shorter image */}
        <div className="aspect-[4/3] overflow-hidden bg-gray-100">
          <ImageWithFallback
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>
      </CardHeader>
      <CardContent className="px-3 pb-3 pt-0 -mt-1 text-center">
        {/* Category badge - subtle grey */}
        <div className="mb-1 -mt-1">
          <span className="text-[10px] sm:text-xs uppercase tracking-wider text-gray-400 font-semibold leading-none block">
            {product.category.replace('-', ' ')}
          </span>
        </div>
        
        {/* Product Title - Green and Bold */}
        <h3 className="mb-2 text-[#156669] leading-tight font-bold" style={{ fontSize: 'clamp(0.9rem, 3.5vw, 1.1rem)' }}>
          {product.name}
        </h3>
        
        {/* Description */}
        <p className="text-xs sm:text-sm text-gray-600 line-clamp-2 leading-relaxed">
          {product.description}
        </p>
      </CardContent>
    </Card>
  );
}