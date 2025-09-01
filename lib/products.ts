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
  {
    id: '4',
    name: 'Poster Système Kora XL',
    price: 19.99,
    description: 'Poster haute qualité 60x90cm représentant le système solaire Kora avec ses six planètes habitables.',
    category: 'Goodies',
  },
  {
    id: '5',
    name: 'Mug Électrique Thermoréactif',
    price: 16.99,
    description: 'Mug noir qui révèle des éclairs bleus électriques quand vous versez une boisson chaude.',
    category: 'Goodies',
  },
  {
    id: '6',
    name: 'Artbook Concept Art Deluxe',
    price: 39.99,
    description: 'Collection exclusive de 128 pages des concept arts, croquis et illustrations originales de l\'univers Lightning Lucie.',
    category: 'Édition limitée',
  },
  {
    id: '7',
    name: 'Porte-clés Éclair Holographique',
    price: 12.99,
    description: 'Porte-clés premium en métal avec effet holographique représentant l\'éclair signature de Lucie.',
    category: 'Goodies',
  },
  {
    id: '8',
    name: 'Casquette Lightning Force',
    price: 24.99,
    description: 'Casquette snapback noire avec broderie électrique bleue et logo Lightning Lucie en relief.',
    category: 'Goodies',
  },
];