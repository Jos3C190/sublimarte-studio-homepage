import { getAssetPath } from './utils'

export interface Product {
  id: string
  name: string
  category: string
  price: number
  imageIdx: number
  theme: string
  collection: string
  garmentType: 'camisetas' | 'hoodies' | 'accesorios'
}

export interface Collection {
  slug: string
  name: string
  theme: string
  description: string
  image: string
  videoUrl?: string
  videoRotate?: number
}

export const collectionsData: Collection[] = [
  {
    slug: 'attack-on-titan',
    name: 'Attack on Titan',
    theme: 'anime',
    description: 'Prendas exclusivas del Cuerpo de Exploración y los Titanes.',
    image: 'https://image.tmdb.org/t/p/w500/hTP1DtLGFamjfu8WqjnuQdP1n4i.jpg',
    videoUrl: '/Videos/Attack-On-Titan.mp4',
    videoRotate: -90
  },
  {
    slug: 'solo-leveling',
    name: 'Solo Leveling',
    theme: 'anime',
    description: 'Colección oficial inspirada en el Hunter más poderoso Sung Jin-Woo.',
    image: 'https://image.tmdb.org/t/p/w500/geCRueV3ElhRTr0xtJuEWJt6dJ1.jpg'
  },
  {
    slug: 'one-piece',
    name: 'One Piece',
    theme: 'anime',
    description: 'Luce el estilo del próximo Rey de los Piratas y su tripulación.',
    image: 'https://image.tmdb.org/t/p/w500/dB4EDhre2dsC2kxYDavyKWqLQwi.jpg'
  },
  {
    slug: 'dragon-ball',
    name: 'Dragon Ball',
    theme: 'anime',
    description: 'Entrena como un guerrero Saiyajin con diseños exclusivos y clásicos.',
    image: 'https://image.tmdb.org/t/p/w500/ehq5JRKVDo38HVdZagLrS7Jik7D.jpg'
  },
  {
    slug: 'nirvana',
    name: 'Nirvana & Grunge',
    theme: 'artistas',
    description: 'Estilo retro alternativo inspirado en la legendaria banda de Seattle.',
    image: 'https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?q=80&w=600&auto=format&fit=crop'
  },
  {
    slug: 'wu-tang',
    name: 'Wu-Tang & Hip-Hop',
    theme: 'artistas',
    description: 'Clásicos del rap de la costa este con estética streetwear de los 90.',
    image: 'https://images.unsplash.com/photo-1484755560693-a4074577af3a?q=80&w=600&auto=format&fit=crop'
  },
  {
    slug: 'jordan',
    name: 'Jordan & NBA Classics',
    theme: 'deportes',
    description: 'Diseños icónicos inspirados en el legado de Michael Jordan.',
    image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=600&auto=format&fit=crop'
  },
  {
    slug: 'skate-culture',
    name: 'Skateboarding Culture',
    theme: 'deportes',
    description: 'Estilo urbano y de calle inspirado en la cultura skater.',
    image: 'https://images.unsplash.com/photo-1556019443-39c1f49212f0?q=80&w=600&auto=format&fit=crop'
  },
  {
    slug: 'stranger-things',
    name: 'Stranger Things',
    theme: 'series',
    description: 'Viaja al Upside Down con diseños inspirados en la serie de Netflix.',
    image: 'https://image.tmdb.org/t/p/w500/uOOtwVbSr4QDjAGIifLDwpb2Pdl.jpg'
  },
  {
    slug: 'breaking-bad',
    name: 'Breaking Bad',
    theme: 'series',
    description: 'Diseños premium inspirados en Heisenberg y la icónica serie dramática.',
    image: 'https://image.tmdb.org/t/p/w500/ztkUQFLlC19CCMYHW9o1zWhJRNq.jpg'
  },
  {
    slug: 'spiderman',
    name: 'Spiderman',
    theme: 'peliculas',
    description: 'Tu amigable vecino Spiderman y héroes del multiverso arácnido.',
    image: 'https://image.tmdb.org/t/p/w500/8Vt6mWEReuy4Of61Lnj5Xj704m8.jpg'
  },
  {
    slug: 'super-mario',
    name: 'Super Mario',
    theme: 'videojuegos',
    description: 'Estilo retro gamer inspirado en los mundos del Reino Champiñón.',
    image: 'https://image.tmdb.org/t/p/w500/qNBAw9fNpM8GgZimJXP9MoV2Y2H.jpg'
  }
]

const rawFeaturedImages = [
  '/Featured/Attack_Of_Titan_desing1_Black.webp',
  '/Featured/Attack_Of_Titan_desing2_Black.webp',
  '/Featured/Attack_Of_Titan_desing3_Black.webp',
  '/Featured/Daisy_Super_Mario_Desing_Black.webp',
  '/Featured/Solo_Leveling_Desing1_Black.webp',
  '/Featured/Spiderman_Desing1_Black.webp',
  '/Featured/Spiderman_Desing2_Black.webp',
  '/Featured/Spiderman_Desing3_Black.webp'
]

const rawFeaturedImagesBack = [
  '/Featured/Attack_Of_Titan_desing1_White.jpg',
  '/Featured/Attack_Of_Titan_desing2_White.jpg',
  '/Featured/Attack_Of_Titan_desing3_White.jpg',
  '/Featured/Daisy_Super_Mario_Desing_White.jpg',
  '/Featured/Solo_Leveling_Desing1_White.jpg',
  '/Featured/Spiderman_Desing1_White.jpg',
  '/Featured/Spiderman_Desing2_White.webp',
  '/Featured/Spiderman_Desing3_White.webp'
]

export const featuredImages = rawFeaturedImages.map(getAssetPath)
export const featuredImagesBack = rawFeaturedImagesBack.map(getAssetPath)

export const productsData: Product[] = [
  { id: 'p1', name: "Attack on Titan Shingeki", category: "Anime", price: 24.99, imageIdx: 0, theme: "anime", collection: "attack-on-titan", garmentType: "camisetas" },
  { id: 'p2', name: "Attack on Titan Scout Regiment", category: "Anime", price: 24.99, imageIdx: 1, theme: "anime", collection: "attack-on-titan", garmentType: "camisetas" },
  { id: 'p3', name: "Attack on Titan Colossus", category: "Anime", price: 24.99, imageIdx: 2, theme: "anime", collection: "attack-on-titan", garmentType: "camisetas" },
  { id: 'p4', name: "Daisy Super Mario Retro", category: "Deportes", price: 24.99, imageIdx: 3, theme: "videojuegos", collection: "super-mario", garmentType: "camisetas" },
  { id: 'p5', name: "Solo Leveling Hunter", category: "Anime", price: 24.99, imageIdx: 4, theme: "anime", collection: "solo-leveling", garmentType: "camisetas" },
  { id: 'p6', name: "Spiderman Streetwear", category: "Deportes", price: 24.99, imageIdx: 5, theme: "peliculas", collection: "spiderman", garmentType: "camisetas" },
  { id: 'p7', name: "Spiderman Spider-Verse", category: "Deportes", price: 24.99, imageIdx: 6, theme: "peliculas", collection: "spiderman", garmentType: "camisetas" },
  { id: 'p8', name: "Spiderman Retro Comic", category: "Artistas", price: 24.99, imageIdx: 7, theme: "peliculas", collection: "spiderman", garmentType: "camisetas" }
]

// ---------------------------------------------------------------------------
// Extended PDP Data Model
// ---------------------------------------------------------------------------

/** Price per fit type */
export const FIT_PRICES: Record<string, number> = {
  Oversize: 24.99,
  Regular: 18.99,
  Slim: 16.99,
}

/** Available color options */
export interface ColorOption {
  name: string
  hex: string
}

export const AVAILABLE_COLORS: ColorOption[] = [
  { name: 'Negro', hex: '#0a0a0a' },
  { name: 'Blanco', hex: '#f5f5f5' },
  { name: 'Gris Oscuro', hex: '#3a3a3a' },
]

/** Available sizes */
export const AVAILABLE_SIZES = ['S', 'M', 'L', 'XL', 'XXL'] as const
export type Size = typeof AVAILABLE_SIZES[number]

/** Available fits */
export const AVAILABLE_FITS = ['Oversize', 'Regular', 'Slim'] as const
export type Fit = typeof AVAILABLE_FITS[number]

/** Stock per variant (simplified — keyed by `${colorName}-${size}-${fit}`) */
export interface VariantStock {
  key: string
  stock: number
}

/** Size guide measurement row */
export interface SizeMeasurement {
  size: Size
  chest: number    // cm
  length: number   // cm
  sleeve: number   // cm
  shoulder: number // cm
}

/** Size guide data per fit */
export const SIZE_GUIDE: Record<Fit, SizeMeasurement[]> = {
  Oversize: [
    { size: 'S', chest: 116, length: 72, sleeve: 24, shoulder: 58 },
    { size: 'M', chest: 122, length: 74, sleeve: 25, shoulder: 60 },
    { size: 'L', chest: 128, length: 76, sleeve: 26, shoulder: 62 },
    { size: 'XL', chest: 134, length: 78, sleeve: 27, shoulder: 64 },
    { size: 'XXL', chest: 140, length: 80, sleeve: 28, shoulder: 66 },
  ],
  Regular: [
    { size: 'S', chest: 96, length: 68, sleeve: 20, shoulder: 44 },
    { size: 'M', chest: 102, length: 70, sleeve: 21, shoulder: 46 },
    { size: 'L', chest: 108, length: 72, sleeve: 22, shoulder: 48 },
    { size: 'XL', chest: 114, length: 74, sleeve: 23, shoulder: 50 },
    { size: 'XXL', chest: 120, length: 76, sleeve: 24, shoulder: 52 },
  ],
  Slim: [
    { size: 'S', chest: 90, length: 66, sleeve: 19, shoulder: 42 },
    { size: 'M', chest: 96, length: 68, sleeve: 20, shoulder: 44 },
    { size: 'L', chest: 102, length: 70, sleeve: 21, shoulder: 46 },
    { size: 'XL', chest: 108, length: 72, sleeve: 22, shoulder: 48 },
    { size: 'XXL', chest: 114, length: 74, sleeve: 23, shoulder: 50 },
  ],
}

/** Mock review for demo purposes */
export interface ProductReview {
  id: string
  author: string
  rating: number
  date: string
  comment: string
  verified: boolean
}

/** Full product detail for the PDP */
export interface ProductDetail {
  id: string
  slug: string
  name: string
  category: string
  subcategory?: string
  description: string
  features: string[]
  imageIdx: number
  badges: ('nuevo' | 'destacado')[]
  relatedProductIds: string[]
  seoTitle: string
  seoDescription: string
  reviews: ProductReview[]
  /** Stock map keyed by `${color}-${size}-${fit}` */
  stockMap: Record<string, number>
  theme: string
  collection: string
  garmentType: 'camisetas' | 'hoodies' | 'accesorios'
}

/** Helper: generate stock map for a product (all variants in stock for demo) */
function generateStockMap(): Record<string, number> {
  const map: Record<string, number> = {}
  for (const color of AVAILABLE_COLORS) {
    for (const size of AVAILABLE_SIZES) {
      for (const fit of AVAILABLE_FITS) {
        const key = `${color.name}-${size}-${fit}`
        // Simulate some variants being low/out of stock
        map[key] = Math.floor(Math.random() * 12) + 2
      }
    }
  }
  // Ensure a few are low stock for UI demo
  map['Blanco-XXL-Slim'] = 2
  map['Gris Oscuro-S-Oversize'] = 1
  return map
}

/** Helper: get stock for a specific variant */
export function getVariantStock(
  stockMap: Record<string, number>,
  color: string,
  size: string,
  fit: string
): number {
  return stockMap[`${color}-${size}-${fit}`] ?? 0
}

/** Helper: check if a size has any stock for a given color+fit combo */
export function isSizeAvailable(
  stockMap: Record<string, number>,
  color: string,
  size: string,
): boolean {
  return AVAILABLE_FITS.some(
    fit => (stockMap[`${color}-${size}-${fit}`] ?? 0) > 0
  )
}

/** Find a ProductDetail by slug */
export function getProductBySlug(slug: string): ProductDetail | undefined {
  return productsDetailData.find(p => p.slug === slug)
}

/** Find a ProductDetail by id */
export function getProductById(id: string): ProductDetail | undefined {
  return productsDetailData.find(p => p.id === id)
}

// Demo reviews pool
const demoReviews: ProductReview[][] = [
  [
    { id: 'r1', author: 'Carlos M.', rating: 5, date: '2026-05-15', comment: 'La calidad de la tela es increíble, mucho mejor de lo que esperaba. El estampado no se decolora ni después de varios lavados. ¡100% recomendado!', verified: true },
    { id: 'r2', author: 'Andrea G.', rating: 4, date: '2026-05-02', comment: 'Me encantó el diseño y la tela se siente premium. Solo le bajo una estrella porque tardó un día más de lo esperado, pero igual valió la pena.', verified: true },
    { id: 'r3', author: 'Roberto L.', rating: 5, date: '2026-04-20', comment: 'El corte oversize queda perfecto, justo el look streetwear que buscaba. Ya pedí dos más para regalar.', verified: true },
    { id: 'r4', author: 'María F.', rating: 5, date: '2026-04-10', comment: 'Impresionante la definición del estampado. Los colores son super vivos y la tela es gruesa y de calidad. Ya es mi camiseta favorita.', verified: true },
  ],
  [
    { id: 'r5', author: 'Diego S.', rating: 5, date: '2026-05-20', comment: 'Pedí para toda mi crew y quedaron espectaculares. La atención por WhatsApp fue excelente y el mockup me ayudó a decidirme rápido.', verified: true },
    { id: 'r6', author: 'Sofía R.', rating: 4, date: '2026-05-08', comment: 'El algodón es bien suave y no da calor a pesar de ser gruesa. Perfecta para el clima de acá. El diseño quedó idéntico al mockup.', verified: true },
    { id: 'r7', author: 'Fernando V.', rating: 5, date: '2026-04-28', comment: 'Sin duda la mejor camiseta que he comprado en El Salvador. El nivel de detalle en la sublimación es de otro mundo.', verified: true },
  ],
  [
    { id: 'r8', author: 'Alejandra P.', rating: 5, date: '2026-05-18', comment: 'Se la regalé a mi novio y se volvió su favorita. La calidad se nota desde que la tocas. Muy satisfecha con la compra.', verified: true },
    { id: 'r9', author: 'Josué M.', rating: 4, date: '2026-04-30', comment: 'Buena relación calidad-precio. La tela es resistente y el estampado aguanta bien las lavadas. Le daría 5 estrellas si tuvieran más colores.', verified: true },
    { id: 'r10', author: 'Karla T.', rating: 5, date: '2026-04-15', comment: 'Me encanta que puedas ver el mockup antes de que la estampen. Quedó exactamente como se veía en la vista previa. ¡Volveré a comprar!', verified: true },
  ],
]

export const productsDetailData: ProductDetail[] = [
  {
    id: 'p1',
    slug: 'attack-on-titan-shingeki',
    name: 'Attack on Titan Shingeki',
    category: 'Anime',
    subcategory: 'Shonen',
    description: 'Camiseta premium inspirada en el icónico anime Shingeki no Kyojin. Estampado de alta definición con sublimación avanzada que captura la intensidad de la serie. Confeccionada en algodón peinado de alta densidad para una textura ultra suave y duradera. Perfecta para los fans que quieren llevar el espíritu de los titanes con estilo streetwear.',
    features: [
      'Sublimación de alta definición resistente a 100+ lavados',
      'Algodón peinado 100% de alta densidad (200 GSM)',
      'Costuras reforzadas en cuello y hombros',
      'Etiqueta interior impresa (sin etiqueta que pique)',
      'Pre-encogido para mantener la talla original',
    ],
    imageIdx: 0,
    badges: ['destacado'],
    relatedProductIds: ['p2', 'p3', 'p5'],
    seoTitle: 'Camiseta Attack on Titan Shingeki — Streetwear Anime Premium | Sublimarte Studio',
    seoDescription: 'Compra tu camiseta Attack on Titan Shingeki con sublimación premium en algodón de alta densidad. Envíos express a todo El Salvador. ¡Mockup 3D gratis!',
    reviews: demoReviews[0],
    stockMap: generateStockMap(),
    theme: 'anime',
    collection: 'attack-on-titan',
    garmentType: 'camisetas',
  },
  {
    id: 'p2',
    slug: 'attack-on-titan-scout-regiment',
    name: 'Attack on Titan Scout Regiment',
    category: 'Anime',
    subcategory: 'Shonen',
    description: 'Representa al Cuerpo de Exploración con esta camiseta exclusiva. Diseño detallado del emblema Scout Regiment con acabados streetwear urbano. La tecnología de sublimación garantiza colores vibrantes que no se desvanecen. Ideal para el día a día o para destacar en cualquier evento otaku.',
    features: [
      'Diseño exclusivo del emblema Scout Regiment',
      'Sublimación full-color de ultra alta resolución',
      'Algodón peinado premium (200 GSM)',
      'Cortes disponibles: Oversize, Regular y Slim',
      'Acabado pre-encogido y anti-deformación',
    ],
    imageIdx: 1,
    badges: ['destacado'],
    relatedProductIds: ['p1', 'p3', 'p5'],
    seoTitle: 'Camiseta Scout Regiment Attack on Titan — Anime Streetwear | Sublimarte Studio',
    seoDescription: 'Camiseta Attack on Titan Scout Regiment en algodón premium. Sublimación de alta definición, envíos a todo El Salvador. ¡Cotiza tu mockup gratis!',
    reviews: demoReviews[1],
    stockMap: generateStockMap(),
    theme: 'anime',
    collection: 'attack-on-titan',
    garmentType: 'camisetas',
  },
  {
    id: 'p3',
    slug: 'attack-on-titan-colossus',
    name: 'Attack on Titan Colossus',
    category: 'Anime',
    subcategory: 'Shonen',
    description: 'El Titán Colosal cobra vida en esta pieza de arte wearable. Impresión de sublimación en alta definición que captura cada detalle del diseño con una fidelidad impresionante. La tela de algodón premium de alta densidad ofrece comodidad superior durante todo el día.',
    features: [
      'Arte original del Titán Colosal en alta resolución',
      'Sublimación DTF de precisión profesional',
      'Algodón peinado 100% de 200 GSM',
      'Costuras dobles en puños y dobladillo',
      'Lavable a máquina sin perder calidad',
    ],
    imageIdx: 2,
    badges: ['nuevo'],
    relatedProductIds: ['p1', 'p2', 'p5'],
    seoTitle: 'Camiseta Titán Colosal Attack on Titan — Premium Anime | Sublimarte Studio',
    seoDescription: 'Camiseta del Titán Colosal de Attack on Titan. Sublimación premium, algodón de alta densidad. Envío express a El Salvador. ¡Mockup digital gratis!',
    reviews: demoReviews[2],
    stockMap: generateStockMap(),
    theme: 'anime',
    collection: 'attack-on-titan',
    garmentType: 'camisetas',
  },
  {
    id: 'p4',
    slug: 'daisy-super-mario-retro',
    name: 'Daisy Super Mario Retro',
    category: 'Deportes',
    subcategory: 'Videojuegos',
    description: 'Homenaje retro a la Princesa Daisy del universo Super Mario. Diseño vibrante con estética vintage gamer que fusiona la nostalgia de los 90s con el streetwear contemporáneo. Perfecta para gamers, coleccionistas y amantes de la cultura pop japonesa.',
    features: [
      'Diseño retro de la Princesa Daisy en estilo pixel art moderno',
      'Colores ultra vibrantes con sublimación de alta durabilidad',
      'Algodón premium peinado de 200 GSM',
      'Corte unisex disponible en Oversize, Regular y Slim',
      'Resistente a la decoloración por lavado y sol',
    ],
    imageIdx: 3,
    badges: ['nuevo', 'destacado'],
    relatedProductIds: ['p6', 'p7', 'p8'],
    seoTitle: 'Camiseta Daisy Super Mario Retro — Streetwear Gamer | Sublimarte Studio',
    seoDescription: 'Camiseta Daisy Super Mario estilo retro. Sublimación premium en algodón de alta calidad. Envíos a todo El Salvador. ¡Cotiza tu mockup gratis!',
    reviews: demoReviews[0],
    stockMap: generateStockMap(),
    theme: 'videojuegos',
    collection: 'super-mario',
    garmentType: 'camisetas',
  },
  {
    id: 'p5',
    slug: 'solo-leveling-hunter',
    name: 'Solo Leveling Hunter',
    category: 'Anime',
    subcategory: 'Manhwa',
    description: 'Canaliza el poder de Sung Jin-Woo con esta camiseta inspirada en el fenómeno Solo Leveling. Diseño dark streetwear con la estética del Hunter más poderoso. La sublimación de ultra alta definición captura la intensidad y los detalles del arte original del manhwa.',
    features: [
      'Arte inspirado en el manhwa Solo Leveling',
      'Estética dark streetwear con detalles luminosos',
      'Sublimación profesional de ultra alta definición',
      'Algodón peinado de 200 GSM, suave y resistente',
      'Costuras reforzadas para máxima durabilidad',
    ],
    imageIdx: 4,
    badges: ['nuevo'],
    relatedProductIds: ['p1', 'p2', 'p3'],
    seoTitle: 'Camiseta Solo Leveling Hunter — Manhwa Streetwear | Sublimarte Studio',
    seoDescription: 'Camiseta Solo Leveling Hunter con sublimación premium. Diseño dark streetwear en algodón de alta densidad. Envíos a todo El Salvador.',
    reviews: demoReviews[1],
    stockMap: generateStockMap(),
    theme: 'anime',
    collection: 'solo-leveling',
    garmentType: 'camisetas',
  },
  {
    id: 'p6',
    slug: 'spiderman-streetwear',
    name: 'Spiderman Streetwear',
    category: 'Deportes',
    subcategory: 'Comics',
    description: 'Tu amigable vecino Spider-Man reimaginado con estilo urbano contemporáneo. Diseño exclusivo que fusiona el universo Marvel con la cultura streetwear salvadoreña. Estampado con tecnología de sublimación avanzada para colores que realmente resaltan.',
    features: [
      'Diseño exclusivo Spider-Man en estilo streetwear urbano',
      'Sublimación avanzada con colores ultra saturados',
      'Algodón premium peinado (200 GSM)',
      'Disponible en 3 cortes: Oversize, Regular, Slim',
      'Tela pre-lavada para mayor suavidad desde el primer uso',
    ],
    imageIdx: 5,
    badges: ['destacado'],
    relatedProductIds: ['p7', 'p8', 'p4'],
    seoTitle: 'Camiseta Spiderman Streetwear — Marvel Urbano | Sublimarte Studio',
    seoDescription: 'Camiseta Spiderman estilo streetwear urbano. Sublimación premium, algodón de alta densidad. Envío express a todo El Salvador. ¡Mockup gratis!',
    reviews: demoReviews[2],
    stockMap: generateStockMap(),
    theme: 'peliculas',
    collection: 'spiderman',
    garmentType: 'camisetas',
  },
  {
    id: 'p7',
    slug: 'spiderman-spider-verse',
    name: 'Spiderman Spider-Verse',
    category: 'Deportes',
    subcategory: 'Comics',
    description: 'Inspirada en el multiverso arácnido de Spider-Verse. Diseño con la estética visual de la película animada que revolucionó el género. Colores pop vibrantes con acabado mate premium. Una pieza de colección para los verdaderos fans del Spiderverse.',
    features: [
      'Estética visual inspirada en Spider-Verse',
      'Paleta de colores pop con acabado mate premium',
      'Sublimación de alta fidelidad en 200 GSM',
      'Corte holgado streetwear disponible en todas las tallas',
      'Etiqueta interior sin costuras para mayor comodidad',
    ],
    imageIdx: 6,
    badges: [],
    relatedProductIds: ['p6', 'p8', 'p4'],
    seoTitle: 'Camiseta Spider-Verse — Streetwear Marvel Premium | Sublimarte Studio',
    seoDescription: 'Camiseta Spider-Verse con sublimación de alta definición. Algodón premium, diseño exclusivo. Envíos a todo El Salvador. ¡Mockup digital gratis!',
    reviews: demoReviews[0],
    stockMap: generateStockMap(),
    theme: 'peliculas',
    collection: 'spiderman',
    garmentType: 'camisetas',
  },
  {
    id: 'p8',
    slug: 'spiderman-retro-comic',
    name: 'Spiderman Retro Comic',
    category: 'Artistas',
    subcategory: 'Comics',
    description: 'Viaja al pasado con esta edición retro inspirada en los cómics clásicos de Spider-Man. Diseño vintage con la tipografía y los trazos característicos de la era dorada del cómic. La combinación perfecta de nostalgia y tendencia urbana moderna.',
    features: [
      'Diseño vintage inspirado en cómics clásicos de los 80s',
      'Tipografía retro con trazos originales restaurados',
      'Sublimación avanzada sobre algodón peinado de 200 GSM',
      'Acabado mate que resalta los colores vintage',
      'Corte y telas unisex de alta calidad',
    ],
    imageIdx: 7,
    badges: [],
    relatedProductIds: ['p6', 'p7', 'p4'],
    seoTitle: 'Camiseta Spiderman Retro Comic — Vintage Streetwear | Sublimarte Studio',
    seoDescription: 'Camiseta Spiderman estilo retro comic vintage. Sublimación premium en algodón de alta densidad. Envíos a todo El Salvador. ¡Cotiza gratis!',
    reviews: demoReviews[1],
    stockMap: generateStockMap(),
    theme: 'peliculas',
    collection: 'spiderman',
    garmentType: 'camisetas',
  },
]

export interface DepartmentSEOData {
  slug: string
  name: string
  capital: string
  cities: string[]
  description: string
  shippingTime: string
  carrier: string
  localKeywords: string[]
  latitude: number
  longitude: number
}

export const departmentsData: DepartmentSEOData[] = [
  {
    slug: 'san-salvador',
    name: 'San Salvador',
    capital: 'San Salvador',
    cities: ['San Salvador', 'Soyapango', 'Mejicanos', 'Ilopango', 'Ciudad Delgado', 'San Marcos', 'Paseo General Escalón', 'San Benito'],
    description: 'Cotiza tus camisetas personalizadas en San Salvador con entrega express a domicilio. Confección premium 100% algodón, ideal para amantes de la cultura streetwear, anime y música en la capital.',
    shippingTime: '24 horas',
    carrier: 'Envío Express a domicilio (Gran San Salvador)',
    localKeywords: ['streetwear san salvador', 'camisetas personalizadas san salvador', 'sublimacion san salvador', 'ropa oversize salvadoreña'],
    latitude: 13.7018,
    longitude: -89.2244
  },
  {
    slug: 'la-libertad',
    name: 'La Libertad',
    capital: 'Santa Tecla',
    cities: ['Santa Tecla', 'Antiguo Cuscatlán', 'Nuevo Cuscatlán', 'Colón', 'Zaragoza', 'El Sunzal', 'Puerto de La Libertad'],
    description: 'Estampado y sublimación de alta gama en La Libertad. Entregas en Santa Tecla, Antiguo Cuscatlán y áreas costeras. Diseños urbanos y streetwear premium con envíos rápidos.',
    shippingTime: '24 horas',
    carrier: 'Envío Express vía Motorizado & Cargo Expreso',
    localKeywords: ['camisetas personalizadas santa tecla', 'streetwear la libertad', 'oversize antiguo cuscatlan', 'sublimacion premium la libertad'],
    latitude: 13.6767,
    longitude: -89.2797
  },
  {
    slug: 'santa-ana',
    name: 'Santa Ana',
    capital: 'Santa Ana',
    cities: ['Santa Ana', 'Chalchuapa', 'Metapán', 'Coatepeque', 'El Congo', 'Texistepeque'],
    description: 'Servicio de camisetas personalizadas en la Ciudad Heroica de Santa Ana. Lleva tu estilo urbano a otro nivel con estampados premium de anime, música y videojuegos. Envíos 100% garantizados.',
    shippingTime: '24-48 horas',
    carrier: 'Cargo Expreso / C807 Express',
    localKeywords: ['camisetas personalizadas santa ana', 'streetwear santa ana', 'sublimacion premium santa ana', 'ropa oversize santa ana'],
    latitude: 13.9942,
    longitude: -89.5597
  },
  {
    slug: 'san-miguel',
    name: 'San Miguel',
    capital: 'San Miguel',
    cities: ['San Miguel', 'Chinameca', 'El Tránsito', 'Ciudad Barrios', 'Lolotique', 'Moncagua'],
    description: 'El streetwear más fresco llega a la Perla de Oriente. Camisetas personalizadas en San Miguel con tecnología de sublimación avanzada resistente al calor. Diseños únicos 100% algodón.',
    shippingTime: '24-48 horas',
    carrier: 'Cargo Expreso & Envíos Nacionales',
    localKeywords: ['camisetas personalizadas san miguel', 'streetwear de oriente', 'sublimacion san miguel', 'ropa premium san miguel'],
    latitude: 13.4833,
    longitude: -88.1833
  },
  {
    slug: 'sonsonate',
    name: 'Sonsonate',
    capital: 'Sonsonate',
    cities: ['Sonsonate', 'Izalco', 'Acajutla', 'Armenia', 'Juayúa', 'Salcoatitán'],
    description: 'Confección de prendas streetwear y camisetas personalizadas en Sonsonate y la hermosa Ruta de las Flores. Calidad textil superior y colores vibrantes que no se caen.',
    shippingTime: '24-48 horas',
    carrier: 'Cargo Expreso a domicilio',
    localKeywords: ['camisetas personalizadas sonsonate', 'streetwear sonsonate', 'sublimacion izalco', 'ruta de las flores oversize'],
    latitude: 13.7189,
    longitude: -89.7242
  },
  {
    slug: 'ahuachapan',
    name: 'Ahuachapán',
    capital: 'Ahuachapán',
    cities: ['Ahuachapán', 'Concepción de Ataco', 'Apaneca', 'El Refugio', 'San Lorenzo', 'Turín'],
    description: 'Luce camisetas personalizadas premium en el occidente del país. Diseños streetwear listos para enviar a Ahuachapán, Apaneca y Ataco. Algodón de alta densidad.',
    shippingTime: '24-48 horas',
    carrier: 'Cargo Expreso a domicilio',
    localKeywords: ['camisetas personalizadas ahuachapan', 'ataco streetwear', 'sublimacion premium ahuachapan'],
    latitude: 13.9214,
    longitude: -89.8450
  },
  {
    slug: 'la-paz',
    name: 'La Paz',
    capital: 'Zacatecoluca',
    cities: ['Zacatecoluca', 'Olocuilta', 'San Luis Talpa', 'San Pedro Masahuat', 'Costa del Sol', 'Santiago Nonualco'],
    description: 'Personaliza tu ropa con el mejor estilo urbano en La Paz. Cobertura completa en Zacatecoluca, Olocuilta y la Costa del Sol. Camisetas de anime y música 100% personalizables.',
    shippingTime: '24-48 horas',
    carrier: 'Cargo Expreso / Servicio Nacional',
    localKeywords: ['camisetas personalizadas la paz', 'streetwear zacatecoluca', 'sublimacion la paz el salvador'],
    latitude: 13.5167,
    longitude: -88.9500
  },
  {
    slug: 'usulutan',
    name: 'Usulután',
    capital: 'Usulután',
    cities: ['Usulután', 'Jiquilisco', 'Santiago de María', 'Berlín', 'Puerto El Triunfo', 'Santa Elena'],
    description: 'Estampados personalizados y streetwear premium en Usulután. Diseños inspirados en el skate, música y anime. Tela fresca de alta durabilidad con envíos seguros.',
    shippingTime: '24-48 horas',
    carrier: 'Cargo Expreso / Envíos al Oriente',
    localKeywords: ['camisetas personalizadas usulutan', 'streetwear usulutan', 'sublimacion usulutan'],
    latitude: 13.3500,
    longitude: -88.4500
  },
  {
    slug: 'cuscatlan',
    name: 'Cuscatlán',
    capital: 'Cojutepeque',
    cities: ['Cojutepeque', 'Suchitoto', 'San Pedro Perulapán', 'Tenancingo', 'El Carmen', 'San Rafael Cedros'],
    description: 'Camisetas personalizadas con los mejores diseños urbanos en Cuscatlán. Envíos directos a Cojutepeque y el emblemático Suchitoto. ¡Sorprende con prendas premium de algodón!',
    shippingTime: '24-48 horas',
    carrier: 'Cargo Expreso a domicilio',
    localKeywords: ['camisetas personalizadas cojutepeque', 'suchitoto streetwear', 'sublimacion premium cuscatlan'],
    latitude: 13.7214,
    longitude: -88.9367
  },
  {
    slug: 'chalatenango',
    name: 'Chalatenango',
    capital: 'Chalatenango',
    cities: ['Chalatenango', 'La Palma', 'San Ignacio', 'Dulce Nombre de María', 'Nueva Concepción', 'Tejutla'],
    description: 'El estilo streetwear y las camisetas personalizadas premium suben a las zonas más altas de Chalatenango. Envíos express a La Palma, San Ignacio y cabecera.',
    shippingTime: '48 horas',
    carrier: 'Cargo Expreso & Correo Nacional',
    localKeywords: ['camisetas personalizadas chalatenango', 'la palma streetwear', 'sublimacion chalatenango'],
    latitude: 14.0333,
    longitude: -88.9333
  },
  {
    slug: 'cabanas',
    name: 'Cabañas',
    capital: 'Sensuntepeque',
    cities: ['Sensuntepeque', 'Ilobasco', 'Tejutepeque', 'Victoria', 'Dolores', 'San Isidro'],
    description: 'Lleva arte en tu ropa. Camisetas personalizadas en Cabañas con cobertura express en Sensuntepeque e Ilobasco. Diseños streetwear de alta costura y telas de alta calidad.',
    shippingTime: '48 horas',
    carrier: 'Cargo Expreso a domicilio',
    localKeywords: ['camisetas personalizadas cabanas', 'ilobasco streetwear', 'sensuntepeque camisetas'],
    latitude: 13.8667,
    longitude: -88.6333
  },
  {
    slug: 'san-vicente',
    name: 'San Vicente',
    capital: 'San Vicente',
    cities: ['San Vicente', 'Apastepeque', 'Tecoluca', 'San Sebastián', 'Guadalupe', 'Verapaz'],
    description: 'Estampados de alta costura y streetwear único en San Vicente. Algodón premium y tecnología de punta para lucir un estilo urbano inconfundible con envíos garantizados.',
    shippingTime: '24-48 horas',
    carrier: 'Cargo Expreso a domicilio',
    localKeywords: ['camisetas personalizadas san vicente', 'streetwear san vicente', 'sublimacion san vicente'],
    latitude: 13.6333,
    longitude: -88.7833
  },
  {
    slug: 'morazan',
    name: 'Morazán',
    capital: 'San Francisco Gotera',
    cities: ['San Francisco Gotera', 'Perquín', 'Arambala', 'Corinto', 'Cacaopera', 'Jocoaitique'],
    description: 'Camisetas personalizadas y streetwear premium en Morazán. Despachamos a San Francisco Gotera y la ruta de paz en Perquín. Impresión duradera y resistente.',
    shippingTime: '48 horas',
    carrier: 'Cargo Expreso / Ruta de Oriente',
    localKeywords: ['camisetas personalizadas morazan', 'perquin streetwear', 'sublimacion morazan'],
    latitude: 13.6939,
    longitude: -88.1075
  },
  {
    slug: 'la-union',
    name: 'La Unión',
    capital: 'La Unión',
    cities: ['La Unión', 'Conchagua', 'Santa Rosa de Lima', 'San Alejo', 'Anamorós', 'El Carmen'],
    description: 'Llega la moda streetwear premium al Golfo de Fonseca. Camisetas personalizadas en La Unión y Santa Rosa de Lima. Algodón peinado fresco de alta duración.',
    shippingTime: '48 horas',
    carrier: 'Cargo Expreso / Envíos Nacionales',
    localKeywords: ['camisetas personalizadas la union', 'santa rosa de lima streetwear', 'sublimacion la union'],
    latitude: 13.3333,
    longitude: -87.8333
  }
]
