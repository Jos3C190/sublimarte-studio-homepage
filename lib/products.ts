import { getAssetPath } from './utils'

export interface Product {
  id: string
  name: string
  category: string
  price: number
  imageIdx: number
}

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
  { id: 'p1', name: "Attack on Titan Shingeki", category: "Anime", price: 24.99, imageIdx: 0 },
  { id: 'p2', name: "Attack on Titan Scout Regiment", category: "Anime", price: 24.99, imageIdx: 1 },
  { id: 'p3', name: "Attack on Titan Colossus", category: "Anime", price: 24.99, imageIdx: 2 },
  { id: 'p4', name: "Daisy Super Mario Retro", category: "Deportes", price: 24.99, imageIdx: 3 },
  { id: 'p5', name: "Solo Leveling Hunter", category: "Anime", price: 24.99, imageIdx: 4 },
  { id: 'p6', name: "Spiderman Streetwear", category: "Deportes", price: 24.99, imageIdx: 5 },
  { id: 'p7', name: "Spiderman Spider-Verse", category: "Deportes", price: 24.99, imageIdx: 6 },
  { id: 'p8', name: "Spiderman Retro Comic", category: "Artistas", price: 24.99, imageIdx: 7 }
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
