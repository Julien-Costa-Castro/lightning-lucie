export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  image: string;
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
    image: 'BD.png',
    isNew: true,
  },
  {
    id: '2',
    name: 'Affiche A3 - Lightning Lucie',
    price: 19.99,
    description: 'Affiche grand format (A3) de Lightning Lucie, parfaite pour décorer votre espace de travail ou votre chambre.',
    category: 'Goodies',
    image: 'affiche-A3.png',
  },
  {
    id: '3',
    name: 'Affiche A4 - Lightning Lucie',
    price: 14.99,
    description: 'Affiche format A4 de Lightning Lucie, idéale pour les plus petits espaces.',
    category: 'Goodies',
    image: 'affiche-A4.png',
  },
];