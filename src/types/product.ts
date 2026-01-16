// types/product.ts

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  category: string;
  image: string;
  images: string[];
  inStock: boolean;
  stockQuantity: number;
  minOrderQuantity: number;
  maxOrderQuantity: number;
  unit: string;
  sku: string;
  brand: string;
  rating: number;
  reviewCount: number;
  featured: boolean;
  specifications: { [key: string]: string };
  tags: string[];
  bulkPricing: BulkPricing[];
  shippingInfo: ShippingInfo;
  returnPolicy: string;
  warranty: string;
  certifications: string[];
  countryOfOrigin: string;
  weight: number;
  dimensions: {
    length: number;
    width: number;
    height: number;
  };
  createdAt: string;
  updatedAt: string;
}

export interface BulkPricing {
  minQuantity: number;
  maxQuantity: number;
  price: number;
  discount: number;
}

export interface ShippingInfo {
  freeShipping: boolean;
  shippingCost: number;
  estimatedDelivery: string;
  availableRegions: string[];
}

export interface Category {
  id: number;
  name: string;
  description: string;
  image: string;
  productCount: number;
  featured: boolean;
  parentId?: number;
  subcategories?: Category[];
}

export interface ProductFilters {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  brand?: string;
  rating?: number;
  inStock?: boolean;
  sortBy?: 'price' | 'name' | 'rating' | 'newest';
  sortOrder?: 'asc' | 'desc';
  page?: number;
  limit?: number;
}

export interface ProductResponse {
  products: Product[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface Review {
  id: number;
  userId: number;
  userName: string;
  rating: number;
  comment: string;
  date: string;
  verified: boolean;
}

export interface Company {
  id: number;
  name: string;
  type: string;
  verified: boolean;
  description?: string;
  location?: string;
  logo?: string;
  website?: string;
  email?: string;
  phone?: string;
  address?: string;
  establishedYear?: number;
  employeeCount?: string;
  certifications?: string[];
  rating?: number;
  reviewCount?: number;
}
