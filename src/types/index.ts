export interface Product {
  id: string;
  slug: string;
  name: string;
  marathiName: string;
  tagline: string;
  description: string;
  category: 'flowers' | 'rangoli' | 'runners' | 'lamps' | 'mats' | 'patches' | 'hampers';
  price: number;
  originalPrice?: number;
  images: string[];
  dimensions?: string;
  material: string;
  inStock: boolean;
  featured?: boolean;
  bestseller?: boolean;
  festivalSpecial?: boolean;
  has3DModel?: boolean;
  modelType?: 'diya' | 'hamper' | 'brass_lamp';
  rating?: number;
  reviewCount?: number;
  careInstructions?: string[];
  artisanNote?: string;
}

export interface HamperItem {
  id: string;
  name: string;
  marathiName: string;
  category: 'diva' | 'decor' | 'sweets' | 'fragrance' | 'keepsake';
  price: number;
  weightGrams: number;
  image: string;
  description: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor?: string;
  customizationNote?: string;
}

export interface HamperBoxCustomization {
  boxStyle: 'royal-maroon' | 'golden-lattice' | 'vintage-terracotta';
  boxName: string;
  selectedItems: HamperItem[];
  giftNote: string;
  recipientName: string;
  totalPrice: number;
}

export interface FestivalBannerConfig {
  isActive: boolean;
  title: string;
  marathiTitle: string;
  subtitle: string;
  couponCode?: string;
  discountPercentage?: number;
  accentColor: string;
  theme: 'diwali' | 'navratri' | 'ganeshotsav' | 'wedding';
  countdownDate?: string;
}

export interface OrderRequest {
  id: string;
  customerName: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  pincode: string;
  items: CartItem[];
  customHamper?: HamperBoxCustomization;
  subtotal: number;
  shipping: number;
  total: number;
  status: 'pending' | 'crafting' | 'dispatched' | 'delivered';
  createdAt: string;
  specialInstructions?: string;
}
