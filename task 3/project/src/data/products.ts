import { Product } from '../types';

export const products: Product[] = [
  {
    id: '1',
    name: 'Minimalist Desk Lamp',
    price: 89.99,
    description: 'Modern LED desk lamp with adjustable brightness and color temperature.',
    image: 'https://images.unsplash.com/photo-1534973652141-902b6b38d718',
    category: 'Lighting'
  },
  {
    id: '2',
    name: 'Ergonomic Office Chair',
    price: 299.99,
    description: 'Premium mesh office chair with lumbar support and adjustable features.',
    image: 'https://images.unsplash.com/photo-1580480055273-228ff5388ef8',
    category: 'Furniture'
  },
  {
    id: '3',
    name: 'Wireless Keyboard',
    price: 129.99,
    description: 'Mechanical wireless keyboard with customizable RGB backlight.',
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3',
    category: 'Electronics'
  },
  {
    id: '4',
    name: 'Smart Monitor',
    price: 449.99,
    description: '27" 4K monitor with built-in USB-C hub and speakers.',
    image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf',
    category: 'Electronics'
  }
];