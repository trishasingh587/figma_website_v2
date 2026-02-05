export interface ProductSection {
  type: 'description' | 'list' | 'specifications';
  header?: string; // Custom header for each section
  content?: string; // For description type
  items?: string[]; // For list type
  specs?: { label: string; value: string; }[]; // For specifications type
}

export interface Product {
  id: string;
  name: string;
  description: string; // Short description for card view
  images: string[];
  category: string;
  subtitle?: string; // Optional text like "Sizes available"
  specs?: Array<{ label: string; value: string }>; // Simple specs table
  sections?: ProductSection[]; // Flexible sections with custom headers
  
  // Legacy fields for backward compatibility
  detailedExplanation?: string;
  specifications?: {
    label: string;
    value: string;
  }[];
  itemsIncluded?: string[];
  availableSizes?: string[];
}

export interface Category {
  id: string;
  name: string;
  description: string;
}