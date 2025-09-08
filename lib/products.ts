export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  isNew?: boolean;
  isLimited?: boolean;
}

export const products: Product[] = [
  {
    id: '1',
    name: 'Lightning Lucie - BD Collector',
    price: 24.99,
    description: 'La bande dessinée complète de Lightning Lucie dans une édition collector premium avec couverture rigide et finitions dorées.',
    category: 'BD',
    isNew: true,
  },
  {
    id: '2',
    name: 'Coffret Prestige Lightning Lucie',
    price: 89.99,
    description: 'Coffret collector contenant la BD, un artbook exclusif de 64 pages, une figurine de Lucie et un poster géant du système Kora.',
    category: 'Édition limitée',
    isLimited: true,
  },
  {
    id: '3',
    name: 'T-shirt Lightning Strike',
    price: 29.99,
    description: 'T-shirt premium noir avec impression phosphorescente du logo Lightning Lucie qui brille dans le noir.',
    category: 'Goodies',
  },
];