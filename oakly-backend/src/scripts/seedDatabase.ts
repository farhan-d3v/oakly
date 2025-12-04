import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User.model';
import Inventory from '../models/Inventory.model';
import Order from '../models/Order.model';
import Contractor from '../models/Contractor.model';

dotenv.config();

const sampleInventory = [
  {
    id: 'OAK-001',
    name: 'Red Oak Boards',
    category: 'Hardwood Lumber',
    woodType: 'Oak',
    dimensions: { thickness: '1"', width: '6"', length: '8 ft' },
    unit: 'bd ft',
    currentStock: 5400,
    reorderPoint: 2000,
    pricePerUnit: 12.00,
    supplier: 'Timber Mountain Suppliers',
    sku: 'OAK-RB-001',
  },
  {
    id: 'PINE-001',
    name: 'Pine Dimensional (2x4x8)',
    category: 'Softwood Lumber',
    woodType: 'Pine',
    dimensions: { thickness: '2"', width: '4"', length: '8 ft' },
    unit: 'bd ft',
    currentStock: 8200,
    reorderPoint: 3000,
    pricePerUnit: 8.00,
    supplier: 'Northwest Lumber Co.',
    sku: 'PINE-DIM-001',
  },
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI as string);
    console.log('📦 Connected to MongoDB');

    // Clear existing data
    await User.deleteMany({});
    await Inventory.deleteMany({});
    await Order.deleteMany({});
    await Contractor.deleteMany({});
    console.log('🗑️  Cleared existing data');

    // Create admin user
    const admin = await User.create({
      name: 'Admin User',
      email: 'admin@oakly.com',
      password: 'admin123',
      role: 'admin',
      isEmailVerified: true,
      isActive: true,
    });
    console.log('👤 Admin user created:', admin.email);

    // Create inventory
    const inventory = await Inventory.insertMany(sampleInventory);
    console.log(`📦 ${inventory.length} inventory items created`);

    console.log('\n✅ Database seeding completed successfully!');
    console.log('\n🔐 Admin Credentials:');
    console.log('   Email: admin@oakly.com');
    console.log('   Password: admin123');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
