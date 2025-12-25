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
      <CardHeader className="p-0">
        {/* Reduced aspect ratio for mobile - shorter image */}
        <div className="aspect-[4/3] overflow-hidden bg-gray-100">
          <ImageWithFallback
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>
      </CardHeader>
      <CardContent className="p-4 text-center">
        {/* Category badge - subtle grey */}
        <div className="mb-2">
          <span className="text-xs uppercase tracking-wider text-gray-400 font-semibold">
            {product.category.replace('-', ' ')}
          </span>
        </div>
        
        {/* Product Title - Bold and prominent */}
        <h3 className="mb-3 text-gray-900 leading-tight font-bold" style={{ fontSize: 'clamp(1rem, 2.8vw, 1.15rem)' }}>
          {product.name}
        </h3>
        
        {/* Description */}
        <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">
          {product.description}
        </p>
      </CardContent>
    </Card>
  );
}