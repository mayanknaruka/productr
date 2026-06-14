require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./models/Product');

const products = [
  {
    name: 'Floral Summer Dress',
    description: 'A beautiful floral print dress perfect for summer outings. Lightweight breathable fabric with a relaxed fit.',
    price: 49.99,
    category: 'Women',
    image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=500&q=80',
    stock: 30,
    rating: 4.8,
  },
  {
    name: 'Classic White Blouse',
    description: 'Timeless white blouse with subtle details. Versatile enough for office or casual wear.',
    price: 34.99,
    category: 'Women',
    image: 'https://images.unsplash.com/photo-1485968579580-b6d095142e6e?w=500&q=80',
    stock: 45,
    rating: 4.6,
  },
  {
    name: 'Slim Fit Chinos',
    description: 'Modern slim fit chinos in a versatile neutral tone. Perfect for smart casual looks.',
    price: 59.99,
    category: 'Men',
    image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=500&q=80',
    stock: 60,
    rating: 4.5,
  },
  {
    name: 'Oxford Button-Down Shirt',
    description: 'Classic Oxford weave button-down shirt. A wardrobe essential for every man.',
    price: 44.99,
    category: 'Men',
    image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=500&q=80',
    stock: 50,
    rating: 4.7,
  },
  {
    name: 'Kids Denim Jacket',
    description: 'Durable and stylish denim jacket for kids. Great for layering in any season.',
    price: 29.99,
    category: 'Kids',
    image: 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=500&q=80',
    stock: 40,
    rating: 4.4,
  },
  {
    name: 'Girls Floral Skirt',
    description: 'Adorable floral print skirt for girls. Soft fabric with an elasticated waistband.',
    price: 19.99,
    category: 'Kids',
    image: 'https://images.unsplash.com/photo-1471286174890-9c112ffca5b4?w=500&q=80',
    stock: 55,
    rating: 4.6,
  },
  {
    name: 'Leather Tote Bag',
    description: 'Spacious genuine leather tote bag. Ideal for work or weekend shopping.',
    price: 79.99,
    category: 'Accessories',
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=500&q=80',
    stock: 25,
    rating: 4.9,
  },
  {
    name: 'Gold Hoop Earrings',
    description: 'Elegant gold-plated hoop earrings. Lightweight and perfect for any occasion.',
    price: 14.99,
    category: 'Accessories',
    image: 'https://images.unsplash.com/photo-1535632787350-4e68ef0ac584?w=500&q=80',
    stock: 80,
    rating: 4.3,
  },
  {
    name: 'Wrap Midi Dress',
    description: 'Flattering wrap style midi dress in a rich jewel tone. Great for parties and events.',
    price: 64.99,
    category: 'Women',
    image: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=500&q=80',
    stock: 20,
    rating: 4.7,
  },
  {
    name: 'Casual Linen Shirt',
    description: 'Relaxed fit linen shirt for warm weather. Breathable and effortlessly stylish.',
    price: 39.99,
    category: 'Men',
    image: 'https://images.unsplash.com/photo-1563389991-7deff069d1e7?w=500&q=80',
    stock: 35,
    rating: 4.5,
  },
  {
    name: 'Canvas Sneakers',
    description: 'Classic canvas sneakers in white. Pairs with everything in your wardrobe.',
    price: 34.99,
    category: 'Accessories',
    image: 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=500&q=80',
    stock: 70,
    rating: 4.6,
  },
  {
    name: 'Boys Graphic Tee',
    description: 'Fun graphic print t-shirt for boys. Soft cotton blend for all-day comfort.',
    price: 15.99,
    category: 'Kids',
    image: 'https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?w=500&q=80',
    stock: 90,
    rating: 4.4,
  },
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    await Product.deleteMany({});
    await Product.insertMany(products);
    console.log(`✓ Seeded ${products.length} products`);
    process.exit(0);
  } catch (err) {
    console.error('Seed error:', err.message);
    process.exit(1);
  }
}

seed();
