
import { Product } from '../types';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Aurelia Kadife Koltuk',
    price: 18500,
    description: 'Zarafetin ve konforun buluştuğu nokta. İtalyan kadife dokusuyla salonunuza saray havası katın.',
    category: 'Oturma Grubu',
    imageUrl: 'https://picsum.photos/seed/sofa1/800/600',
    modelUrl: 'https://modelviewer.dev/shared-assets/models/Astronaut.glb', // Placeholder model
    dimensions: { width: 220, height: 85, depth: 95 },
    stock: 5
  },
  {
    id: '2',
    name: 'Lumiera Mermer Masa',
    price: 12400,
    description: 'Doğal damarlı Carrara mermeri ve altın varaklı ayaklarla akşam yemeklerinizi sanata dönüştürün.',
    category: 'Yemek Odası',
    imageUrl: 'https://picsum.photos/seed/table1/800/600',
    modelUrl: 'https://modelviewer.dev/shared-assets/models/Astronaut.glb',
    dimensions: { width: 180, height: 75, depth: 90 },
    stock: 3
  },
  {
    id: '3',
    name: 'Zephyr Minimalist Berjer',
    price: 6800,
    description: 'Modern çizgiler, sürdürülebilir ahşap iskelet. Avyna kalitesiyle minimalizmin doruklarına ulaşın.',
    category: 'Oturma Grubu',
    imageUrl: 'https://picsum.photos/seed/chair1/800/600',
    modelUrl: 'https://modelviewer.dev/shared-assets/models/Astronaut.glb',
    dimensions: { width: 80, height: 95, depth: 85 },
    stock: 12
  }
];
