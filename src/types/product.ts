export interface Product {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  additionalImages?: string[];
  detailedExplanation?: string;
  category: string;
  specifications?: {
    label: string;
    value: string;
  }[];
}

export interface Category {
  id: string;
  name: string;
  description: string;
}