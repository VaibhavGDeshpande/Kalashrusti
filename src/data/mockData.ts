import { Product, HamperItem, FestivalBannerConfig, OrderRequest } from '@/types';

export const MOCK_PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    slug: 'brass-kuber-peacock-diya',
    name: 'Royal Mayura Brass Akhand Diya',
    marathiName: 'मयूर अखंड दिवा (पितळ)',
    tagline: 'Pure virgin brass with hand-engraved peacock finial',
    description: 'Carved with intricate feather details by hereditary brass artisans. Designed for 24-hour uninterrupted festive illumination with balanced oil reservoir and heat-resistant base.',
    category: 'lamps',
    price: 1850,
    originalPrice: 2200,
    images: [
      '/images/crafts/brass_diya.png',
    ],
    dimensions: 'Height 8.5 in, Base 4.2 in',
    material: 'Virgin Brass with Antique Patina',
    inStock: true,
    featured: true,
    bestseller: true,
    festivalSpecial: true,
    has3DModel: true,
    modelType: 'diya',
    rating: 4.9,
    reviewCount: 38,
    artisanNote: 'Hand-chiselled over 14 hours by master craftsman Ramesh Sonar in Kolhapur.',
    careInstructions: ['Wipe clean with dry soft cotton cloth', 'Apply pitambari or lemon paste once a season for mirror shine']
  },
  {
    id: 'prod-2',
    slug: 'sholapith-marigold-toran-garland',
    name: 'Sola Pith Zendu Festive Toran',
    marathiName: 'झेंडूची फुले हस्तनिर्मित तोरण',
    tagline: 'Everlasting natural shola pith flowers with golden bead accents',
    description: 'Hand-carved organic plant pith blooms mimicking fresh golden and saffron marigold flowers. Strung with brass ghungroos and pearl tassels that will never wither or lose their cheerful festive warmth.',
    category: 'flowers',
    price: 980,
    originalPrice: 1250,
    images: [
      '/images/crafts/marigold_toran.png',
    ],
    dimensions: 'Length 42 inches (Standard Doorframe)',
    material: 'Organic Sola Pith (Aeschynomene aspera) & Brass Bells',
    inStock: true,
    featured: true,
    bestseller: true,
    rating: 4.8,
    reviewCount: 52,
    artisanNote: 'Carved with razor blades by traditional sola craftsmen, dyed with eco-friendly turmeric-infused dyes.',
    careInstructions: ['Keep away from direct moisture', 'Dust gently with a soft makeup brush']
  },
  {
    id: 'prod-3',
    slug: 'kundan-meenakari-rangoli-patch-set',
    name: 'Swastik & Shubh-Labh Kundan Rangoli Set',
    marathiName: 'शुभ-लाभ कुंदन रांगोळी पॅच संच',
    tagline: '7-piece modular jewel-studded portable rangoli',
    description: 'Arranged in seconds without messy powder. Acrylic base embellished with multifaceted maroon kundan stones, golden beads, and delicate micro-pearl florets. Reusable for years across entrances and puja thalis.',
    category: 'patches',
    price: 1250,
    originalPrice: 1500,
    images: [
      '/images/crafts/rangoli_patches.png',
    ],
    dimensions: 'Centerpiece 6 in, 6 Petals 4.5 in each',
    material: 'Clear Acrylic Base, Maroon Kundan Crystals & Seed Pearls',
    inStock: true,
    featured: true,
    rating: 4.9,
    reviewCount: 29,
    artisanNote: 'Every kundan gem is set by hand with jewelry-grade precision.',
    careInstructions: ['Store flat in the provided velvet sleeve', 'Wipe with microfiber cloth']
  },
  {
    id: 'prod-4',
    slug: 'paithani-motif-silk-table-runner',
    name: 'Royal Paithani Brocade Table Runner',
    marathiName: 'पैठणी पदर डिझाइन रेशमी टेबल रनर',
    tagline: 'Zari woven peacock & floral vine borders on royal maroon silk',
    description: 'Elevate your festive dining table or console. Features an opulent golden zari border inspired by 200-year-old Maharashtrian Paithani weave motifs, backed with soft cotton lining and handcrafted bullion fringe.',
    category: 'runners',
    price: 1650,
    originalPrice: 2100,
    images: [
      '/images/crafts/silk_runner.png',
    ],
    dimensions: '14 x 72 inches (Ideal for 6-8 seater tables)',
    material: 'Art Silk with Pure Zari Weave & Cotton Canvas Backing',
    inStock: true,
    featured: true,
    rating: 4.7,
    reviewCount: 19,
    artisanNote: 'Woven on Jacquard handlooms in Yeola, Maharashtra.',
    careInstructions: ['Dry clean only', 'Low iron on reverse cotton side']
  },
  {
    id: 'prod-5',
    slug: 'anandacha-sagar-grand-diwali-hamper',
    name: 'Anandacha Sagar Luxury Diwali Hamper',
    marathiName: 'आनंदाचा सागर भव्य दिवाळी भेटपेटी',
    tagline: 'Custom hand-finished box with brass diva, toran, organic dhoop & sweets',
    description: 'The signature Kalashrushti treasure box. Features our Mayura brass diya, 2 handcrafted marigold tassels, natural rosewood dhoop stand, pure cow ghee wicks, and brass pooja bell in a gold-embossed keepsake wooden box.',
    category: 'hampers',
    price: 3450,
    originalPrice: 4200,
    images: [
      '/images/crafts/diwali_hamper.png',
    ],
    dimensions: '12 x 10 x 5 inches Luxury Gift Trunk',
    material: 'Lacquered Pine Wood with Silk Lining & Brass Hardware',
    inStock: true,
    featured: true,
    bestseller: true,
    festivalSpecial: true,
    has3DModel: true,
    modelType: 'hamper',
    rating: 5.0,
    reviewCount: 44,
    artisanNote: 'Includes personalised handwritten Devanagari calligraphy note.',
    careInstructions: ['Keep box in a dry ambient space']
  },
  {
    id: 'prod-6',
    slug: 'terracotta-handpainted-diya-set',
    name: 'Panchmukhi Terracotta Hand-Painted Divas (Set of 6)',
    marathiName: 'हस्तचित्रित मातीचे दिवे संच (६ नग)',
    tagline: 'Natural baked red clay with gold liner and mirror work',
    description: 'Hand-thrown on traditional potter wheels in rural Maharashtra, sun-dried, kiln-baked, and vibrantly painted with non-toxic pigments in festive marigold and maroon shades.',
    category: 'lamps',
    price: 540,
    originalPrice: 700,
    images: [
      '/images/crafts/brass_diya.png',
    ],
    dimensions: '3.5 in diameter each',
    material: 'Baked Red Terracotta Clay & Eco-paints',
    inStock: true,
    featured: false,
    rating: 4.8,
    reviewCount: 65,
    artisanNote: 'Crafted by kumhar families in Kumbharwada.',
    careInstructions: ['Soak in water for 15 mins before first oil use']
  },
  {
    id: 'prod-7',
    slug: 'chanderi-silk-puja-aasan-mat',
    name: 'Chanderi Gold Thread Puja Aasan Mat',
    marathiName: 'चांदेरी रेशमी पूजा आसन',
    tagline: 'Quilted sacred seating mat with golden floral boota',
    description: 'Soft padded aasan for deity idols, festive thali displays, or meditation. Features genuine Chanderi silk with golden zari border and anti-skid cotton back.',
    category: 'mats',
    price: 720,
    originalPrice: 890,
    images: [
      '/images/crafts/pooja_mat.png',
    ],
    dimensions: '18 x 18 inches square',
    material: 'Chanderi Silk & Cotton Batting',
    inStock: true,
    rating: 4.6,
    reviewCount: 14,
    careInstructions: ['Gentle spot clean with damp cloth']
  },
  {
    id: 'prod-8',
    slug: 'brass-kamal-floating-flower-diya',
    name: 'Ashtadal Brass Lotus Floating Diya',
    marathiName: 'अष्टदल कमळ तरंगता दिवा',
    tagline: '8-petal blooming water diva for urli bowls',
    description: 'Engineered to float serenely inside water urli bowls flanked by fresh marigold petals. Refined petal curvature casts undulating golden reflections on water ripples.',
    category: 'lamps',
    price: 890,
    originalPrice: 1100,
    images: [
      '/images/crafts/brass_diya.png',
    ],
    dimensions: 'Diameter 5 in, Depth 1.2 in',
    material: 'Pure Hand-hammered Sheet Brass',
    inStock: true,
    featured: true,
    rating: 4.9,
    reviewCount: 31,
    artisanNote: 'Hand-hammered sheet brass allows perfect buoyancy.',
    careInstructions: ['Dry thoroughly after water use']
  }
];

export const MOCK_HAMPER_ITEMS: HamperItem[] = [
  {
    id: 'h-1',
    name: 'Mayura Pure Brass Diya',
    marathiName: 'मयूर पितळी दिवा',
    category: 'diva',
    price: 850,
    weightGrams: 280,
    image: '/images/crafts/brass_diya.png',
    description: 'Hand-polished peacock brass single-wick oil lamp'
  },
  {
    id: 'h-2',
    name: 'Sola Marigold Blossom Mala',
    marathiName: 'झेंडूची हस्तनिर्मित माळ',
    category: 'decor',
    price: 380,
    weightGrams: 90,
    image: '/images/crafts/marigold_toran.png',
    description: 'Long-lasting eco marigold craft garland with ghungroo bells'
  },
  {
    id: 'h-3',
    name: 'Kundan Floral Rangoli Disc',
    marathiName: 'कुंदन रांगोळी पदक',
    category: 'decor',
    price: 490,
    weightGrams: 110,
    image: '/images/crafts/rangoli_patches.png',
    description: 'Ruby and gold portable rangoli disc for puja thalis'
  },
  {
    id: 'h-4',
    name: 'Organic Chandan Dhoop Cones',
    marathiName: 'शुद्ध चंदन धूप',
    category: 'fragrance',
    price: 260,
    weightGrams: 150,
    image: '/images/crafts/pooja_mat.png',
    description: 'Charcoal-free temple grade sandalwood incense cones (Pack of 20)'
  },
  {
    id: 'h-5',
    name: 'Ghiradelli & Kaju Katli Artisanal Box',
    marathiName: 'शुद्ध काजू कतली डबा',
    category: 'sweets',
    price: 650,
    weightGrams: 350,
    image: '/images/crafts/diwali_hamper.png',
    description: 'Pure silver vark topped artisanal sweets in gold tin'
  },
  {
    id: 'h-6',
    name: 'Solid Brass Pooja Bell (Ghanta)',
    marathiName: 'पितळी पूजा घंटा',
    category: 'keepsake',
    price: 420,
    weightGrams: 210,
    image: '/images/crafts/brass_diya.png',
    description: 'Resonant bell with Garuda emblem finial'
  }
];

export const MOCK_FESTIVAL_BANNER: FestivalBannerConfig = {
  isActive: true,
  title: 'Diwali Mahotsav Collection Live',
  marathiTitle: 'शुभ दीपावली महासंग्रह सुरू आहे • पूर्वनोंदणी सुरू',
  subtitle: 'Handmade with love in Pune • Complimentary brass diya on orders above ₹1,999',
  couponCode: 'DIWALIJOY',
  discountPercentage: 15,
  accentColor: '#F5A623',
  theme: 'diwali'
};

export const MOCK_ORDERS: OrderRequest[] = [
  {
    id: 'ORD-7291',
    customerName: 'Ananya Kulkarni',
    phone: '+91 81490 65483',
    email: 'ananya.k@gmail.com',
    address: 'Flat 402, Rohan Mithila, Viman Nagar',
    city: 'Pune',
    pincode: '411014',
    items: [
      {
        product: MOCK_PRODUCTS[0],
        quantity: 2
      },
      {
        product: MOCK_PRODUCTS[1],
        quantity: 1
      }
    ],
    subtotal: 4680,
    shipping: 0,
    total: 4680,
    status: 'crafting',
    createdAt: '2026-10-10T14:30:00Z',
    specialInstructions: 'Please add a Diwali gift tag wishing Happy Deepawali to Mama & Mami.'
  },
  {
    id: 'ORD-7290',
    customerName: 'Rohit Deshmukh',
    phone: '+91 98902 11477',
    email: 'rohit.d@outlook.com',
    address: 'B-12, Sagar Complex, Baner Road',
    city: 'Pune',
    pincode: '411045',
    items: [
      {
        product: MOCK_PRODUCTS[4],
        quantity: 1
      }
    ],
    subtotal: 3450,
    shipping: 0,
    total: 3450,
    status: 'dispatched',
    createdAt: '2026-10-09T18:15:00Z'
  },
  {
    id: 'ORD-7288',
    customerName: 'Priya Joshi',
    phone: '+91 97654 32190',
    email: 'priyajoshi@yahoo.co.in',
    address: '14, Prabhat Road, Lane 6',
    city: 'Pune',
    pincode: '411004',
    items: [
      {
        product: MOCK_PRODUCTS[2],
        quantity: 2
      },
      {
        product: MOCK_PRODUCTS[5],
        quantity: 3
      }
    ],
    subtotal: 4120,
    shipping: 100,
    total: 4220,
    status: 'pending',
    createdAt: '2026-10-11T09:20:00Z'
  }
];
