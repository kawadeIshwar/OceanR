import mongoose from 'mongoose';
import { config } from 'dotenv';
import AdminUser from './models/AdminUser.js';
import Category from './models/Category.js';
import Product from './models/Product.js';

config();

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB Connected');

    // Clear existing data
    await AdminUser.deleteMany({});
    await Category.deleteMany({});
    await Product.deleteMany({});
    console.log('Cleared existing data');

    // Create admin user
    const admin = await AdminUser.create({
      name: 'Admin',
      email: 'admin@oceanr.com',
      passwordHash: 'ChangeMe123',
      role: 'superadmin',
    });
    console.log('Admin user created:', admin.email);

    // Create categories based on OceanR's product lines
    const categories = await Category.insertMany([
      {
        name: 'Maintenance Material & Equipment\'s',
        description: 'Comprehensive range of industrial maintenance materials, tools, and equipment for facility upkeep and repair operations',
      },
      {
        name: 'Consumables',
        description: 'Essential consumable supplies including adhesives, tapes, cleaning materials, and disposable items for daily industrial operations',
      },
      {
        name: 'Electricals',
        description: 'Complete electrical solutions including wiring, cables, switches, connectors, and electrical installation materials',
      },
      {
        name: 'Electronics',
        description: 'Advanced electronic components, circuit boards, sensors, controllers, and automation devices for industrial applications',
      },
      {
        name: 'Press parts / Machining Parts',
        description: 'Precision-engineered press parts and custom machining components for manufacturing and production machinery',
      },
    ]);
    console.log(`Created ${categories.length} categories`);

    // Create sample products
    const sampleProducts = [
      {
        name: 'Industrial Lubricant Oil',
        SKU: 'MAINT-LUBE-001',
        description: 'High-performance industrial lubricant for machinery and equipment. 5L container.',
        category: categories.find(c => c.name === 'Maintenance Material & Equipment\'s')._id,
        specs: new Map([
          ['Volume', '5 Liters'],
          ['Viscosity', 'ISO VG 68'],
          ['Temperature Range', '-20°C to 120°C'],
          ['Application', 'General Purpose'],
        ]),
        featured: true,
        images: [],
      },
      {
        name: 'Industrial Adhesive Tape',
        SKU: 'CONS-TAPE-001',
        description: 'Heavy-duty industrial adhesive tape. High temperature resistance and excellent bonding strength.',
        category: categories.find(c => c.name === 'Consumables')._id,
        specs: new Map([
          ['Width', '50mm'],
          ['Length', '50 meters'],
          ['Temperature', 'Up to 150°C'],
          ['Material', 'Polyester'],
        ]),
        featured: true,
        images: [],
      },
      {
        name: 'Electrical Cable Wire',
        SKU: 'ELEC-WIRE-001',
        description: 'Multi-core copper electrical cable for industrial installations. Flexible and durable.',
        category: categories.find(c => c.name === 'Electricals')._id,
        specs: new Map([
          ['Core', '3 Core'],
          ['Size', '2.5mm²'],
          ['Length', '100 meters'],
          ['Voltage', '450/750V'],
        ]),
        featured: true,
        images: [],
      },
      {
        name: 'PLC Controller Module',
        SKU: 'ELEC-PLC-001',
        description: 'Programmable Logic Controller for industrial automation. Multiple I/O configurations available.',
        category: categories.find(c => c.name === 'Electronics')._id,
        specs: new Map([
          ['Input', '16 Digital'],
          ['Output', '12 Digital'],
          ['Power', '24V DC'],
          ['Programming', 'Ladder Logic'],
        ]),
        featured: true,
        images: [],
      },
      {
        name: 'Precision Machined Shaft',
        SKU: 'MACH-SHAFT-001',
        description: 'High-precision machined shaft for industrial press machines. Custom specifications available.',
        category: categories.find(c => c.name === 'Press parts / Machining Parts')._id,
        specs: new Map([
          ['Material', 'Stainless Steel'],
          ['Diameter', '50mm'],
          ['Length', '500mm'],
          ['Tolerance', '±0.01mm'],
        ]),
        featured: true,
        images: [],
      },
      {
        name: 'Industrial Cleaning Solution',
        SKU: 'CONS-CLEAN-001',
        description: 'Multi-purpose industrial cleaning solution. Biodegradable and environmentally friendly.',
        category: categories.find(c => c.name === 'Consumables')._id,
        specs: new Map([
          ['Volume', '5 Liters'],
          ['pH Level', '7-8'],
          ['Dilution', '1:10'],
          ['Biodegradable', 'Yes'],
        ]),
        featured: false,
        images: [],
      },
    ];

    const products = await Product.insertMany(sampleProducts);
    console.log(`Created ${products.length} sample products`);

    console.log('\n=== Seed Complete ===');
    console.log('Admin Credentials:');
    console.log('Email: admin@oceanr.com');
    console.log('Password: ChangeMe123');
    console.log('\nPlease change the admin password after first login!');

    process.exit(0);
  } catch (error) {
    console.error('Seed error:', error);
    process.exit(1);
  }
};

seedData();
