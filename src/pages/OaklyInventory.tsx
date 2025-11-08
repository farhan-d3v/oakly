import React, { useState } from 'react';
import {
  Package,
  Search,
  Download,
  Upload,
  Plus,
  Edit2,
  Trash2,
  AlertTriangle,
  CheckCircle,
  XCircle,
  TrendingDown,
  Eye} from 'lucide-react';

interface WoodProduct {
  id: string;
  name: string;
  category: string;
  woodType: string;
  dimensions: {
    thickness: string;
    width: string;
    length: string;
  };
  unit: string;
  currentStock: number;
  reorderPoint: number;
  pricePerUnit: number;
  supplier: string;
  lastRestocked: string;
  status: 'In Stock' | 'Low Stock' | 'Out of Stock' | 'Reorder';
}

const OaklyInventory: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [sortBy,] = useState<'name' | 'stock' | 'price'>('name');

  // Sample inventory data
  const inventoryData: WoodProduct[] = [
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
      lastRestocked: '2024-11-01',
      status: 'In Stock'
    },
    {
      id: 'OAK-002',
      name: 'White Oak Planks',
      category: 'Hardwood Lumber',
      woodType: 'Oak',
      dimensions: { thickness: '1"', width: '8"', length: '10 ft' },
      unit: 'bd ft',
      currentStock: 3200,
      reorderPoint: 2000,
      pricePerUnit: 14.50,
      supplier: 'Timber Mountain Suppliers',
      lastRestocked: '2024-10-28',
      status: 'In Stock'
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
      lastRestocked: '2024-11-03',
      status: 'In Stock'
    },
    {
      id: 'PINE-002',
      name: 'Pine Boards (1x6x8)',
      category: 'Softwood Lumber',
      woodType: 'Pine',
      dimensions: { thickness: '1"', width: '6"', length: '8 ft' },
      unit: 'bd ft',
      currentStock: 6500,
      reorderPoint: 3000,
      pricePerUnit: 7.50,
      supplier: 'Northwest Lumber Co.',
      lastRestocked: '2024-11-02',
      status: 'In Stock'
    },
    {
      id: 'MAPLE-001',
      name: 'Maple Hardwood Flooring',
      category: 'Wood Flooring',
      woodType: 'Maple',
      dimensions: { thickness: '3/4"', width: '3.25"', length: 'Random' },
      unit: 'sq ft',
      currentStock: 1800,
      reorderPoint: 1500,
      pricePerUnit: 20.00,
      supplier: 'Premium Flooring Supply',
      lastRestocked: '2024-10-25',
      status: 'Low Stock'
    },
    {
      id: 'MAPLE-002',
      name: 'Hard Maple Boards',
      category: 'Hardwood Lumber',
      woodType: 'Maple',
      dimensions: { thickness: '1"', width: '6"', length: '8 ft' },
      unit: 'bd ft',
      currentStock: 2800,
      reorderPoint: 2000,
      pricePerUnit: 13.00,
      supplier: 'Hardwood Specialists Inc.',
      lastRestocked: '2024-10-30',
      status: 'In Stock'
    },
    {
      id: 'CEDAR-001',
      name: 'Cedar Fence Boards',
      category: 'Softwood Lumber',
      woodType: 'Cedar',
      dimensions: { thickness: '1"', width: '6"', length: '6 ft' },
      unit: 'bd ft',
      currentStock: 1400,
      reorderPoint: 1800,
      pricePerUnit: 12.00,
      supplier: 'Cedar Valley Lumber',
      lastRestocked: '2024-10-20',
      status: 'Reorder'
    },
    {
      id: 'CEDAR-002',
      name: 'Cedar Decking',
      category: 'Softwood Lumber',
      woodType: 'Cedar',
      dimensions: { thickness: '1"', width: '6"', length: '12 ft' },
      unit: 'bd ft',
      currentStock: 3600,
      reorderPoint: 2500,
      pricePerUnit: 15.00,
      supplier: 'Cedar Valley Lumber',
      lastRestocked: '2024-11-01',
      status: 'In Stock'
    },
    {
      id: 'BIRCH-001',
      name: 'Birch Plywood (4x8 3/4")',
      category: 'Plywood & Panels',
      woodType: 'Birch',
      dimensions: { thickness: '3/4"', width: '4 ft', length: '8 ft' },
      unit: 'sheets',
      currentStock: 620,
      reorderPoint: 200,
      pricePerUnit: 40.00,
      supplier: 'Plywood Wholesale Inc.',
      lastRestocked: '2024-10-29',
      status: 'In Stock'
    },
    {
      id: 'BIRCH-002',
      name: 'Birch Plywood (4x8 1/2")',
      category: 'Plywood & Panels',
      woodType: 'Birch',
      dimensions: { thickness: '1/2"', width: '4 ft', length: '8 ft' },
      unit: 'sheets',
      currentStock: 180,
      reorderPoint: 200,
      pricePerUnit: 32.00,
      supplier: 'Plywood Wholesale Inc.',
      lastRestocked: '2024-10-18',
      status: 'Reorder'
    },
    {
      id: 'WALNUT-001',
      name: 'Black Walnut Boards',
      category: 'Hardwood Lumber',
      woodType: 'Walnut',
      dimensions: { thickness: '1"', width: '8"', length: '8 ft' },
      unit: 'bd ft',
      currentStock: 850,
      reorderPoint: 500,
      pricePerUnit: 22.00,
      supplier: 'Premium Hardwoods LLC',
      lastRestocked: '2024-10-22',
      status: 'In Stock'
    },
    {
      id: 'CHERRY-001',
      name: 'Cherry Hardwood',
      category: 'Hardwood Lumber',
      woodType: 'Cherry',
      dimensions: { thickness: '1"', width: '6"', length: '8 ft' },
      unit: 'bd ft',
      currentStock: 120,
      reorderPoint: 400,
      pricePerUnit: 18.00,
      supplier: 'Premium Hardwoods LLC',
      lastRestocked: '2024-09-15',
      status: 'Out of Stock'
    }
  ];

  // Filter inventory
  const filteredInventory = inventoryData.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.woodType.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesStatus = selectedStatus === 'All' || item.status === selectedStatus;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  // Sort inventory
  const sortedInventory = [...filteredInventory].sort((a, b) => {
    if (sortBy === 'name') return a.name.localeCompare(b.name);
    if (sortBy === 'stock') return b.currentStock - a.currentStock;
    if (sortBy === 'price') return b.pricePerUnit - a.pricePerUnit;
    return 0;
  });

  // Calculate inventory stats
  const totalProducts = inventoryData.length;
  const inStock = inventoryData.filter(item => item.status === 'In Stock').length;
  const lowStock = inventoryData.filter(item => item.status === 'Low Stock').length;
  const outOfStock = inventoryData.filter(item => item.status === 'Out of Stock').length;
  const needsReorder = inventoryData.filter(item => item.status === 'Reorder').length;
  const totalValue = inventoryData.reduce((sum, item) => sum + (item.currentStock * item.pricePerUnit), 0);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'In Stock': return 'bg-green-100 text-green-800';
      case 'Low Stock': return 'bg-yellow-100 text-yellow-800';
      case 'Out of Stock': return 'bg-red-100 text-red-800';
      case 'Reorder': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'In Stock': return <CheckCircle className="w-4 h-4" />;
      case 'Low Stock': return <AlertTriangle className="w-4 h-4" />;
      case 'Out of Stock': return <XCircle className="w-4 h-4" />;
      case 'Reorder': return <TrendingDown className="w-4 h-4" />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
    
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">              
            </div>
           <button className="px-4 sm:px-5 py-2.5 bg-amber-600 text-white rounded-lg hover:bg-green-500  transition-colors flex items-center gap-2 text-sm font-medium shadow-sm">
  <Plus className="w-4 h-4" />
  <span className="hidden sm:inline">Add Product</span>
</button>
          </div>
        </div>
      

      <main className="p-4 sm:p-8 lg:p-9 max-w-7xl mx-auto">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7 mb-9">
        <div className="bg-white rounded-xl shadow-md p-6 sm:p-8 flex flex-col justify-center items-center">
  <p className="text-sm text-gray-600 mb-2">Total Products</p>
  <p className="text-3xl sm:text-4xl font-bold text-gray-900">{totalProducts}</p>
</div>
          <div className="bg-white rounded-2xl shadow-md p-6 sm:p-8 flex flex-col justify-center items-center">
            <p className="text-sm text-gray-600 mb-2">In Stock</p>
            <p className="text-3xl sm:text-4xl font-bold text-green-600">{inStock}</p>
          </div>
          <div className="bg-white rounded-2xl shadow-md p-6 sm:p-8 flex flex-col justify-center items-center">
            <p className="text-sm text-gray-600 mb-2">Low Stock</p>
            <p className="text-3xl sm:text-4xl font-bold text-yellow-600">{lowStock}</p>
          </div>
          <div className="bg-white rounded-2xl shadow-md p-6 sm:p-8 flex flex-col justify-center items-center">
            <p className="text-sm text-gray-600 mb-2">Out of Stock</p>
            <p className="text-3xl sm:text-4xl font-bold text-red-600">{outOfStock}</p>
          </div>
          <div className="bg-white rounded-2xl shadow-md p-6 sm:p-8 flex flex-col justify-center items-center">
            <p className="text-sm text-gray-600 mb-2">Needs Reorder</p>
            <p className="text-3xl sm:text-4xl font-bold text-orange-600">{needsReorder}</p>
          </div>
          <div className="bg-white rounded-2xl shadow-md p-6 sm:p-8 flex flex-col justify-center items-center">
            <p className="text-sm text-gray-600 mb-2">Total Value</p>
            <p className="text-3xl sm:text-4xl font-bold text-gray-900">${totalValue.toLocaleString()}</p>
          </div>
        </div>
      
               <div className="h-5 sm:h-9"></div>

        {/* Search and Filters */}
        <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 mb-8">
          <div className="flex flex-col sm:flex-row gap-3">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="          Search by name, wood type, or SKU..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-600 text-sm"
              />
            </div>

            {/* Category Filter */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-600 text-sm"
            >
              <option value="All">All Categories</option>
              <option value="Hardwood Lumber">Hardwood Lumber</option>
              <option value="Softwood Lumber">Softwood Lumber</option>
              <option value="Plywood & Panels">Plywood & Panels</option>
              <option value="Wood Flooring">Wood Flooring</option>
            </select>

            {/* Status Filter */}
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-600 text-sm"
            >
              <option value="All">All Status</option>
              <option value="In Stock">In Stock</option>
              <option value="Low Stock">Low Stock</option>
              <option value="Out of Stock">Out of Stock</option>
              <option value="Reorder">Needs Reorder</option>
            </select>

            {/* Action Buttons */}
            <div className="flex gap-2">
              <button className="px-4 py-2.5 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2 text-sm">
                <Download className="w-4 h-4" />
                <span className="hidden sm:inline">Export</span>
              </button>
              <button className="px-4 py-2.5 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2 text-sm">
                <Upload className="w-4 h-4" />
                <span className="hidden sm:inline">Import</span>
              </button>
            </div>
          </div>
        </div>
        
                 <div className="h-5 sm:h-9"></div>

      
        {/* Inventory Display - Card Style for All Screens */}
       <div className="space-y-6">
  {sortedInventory.map((product) => (
    <div 
      key={product.id} 
      className="bg-white rounded-xl shadow-md p-5 sm:p-6 hover:shadow-lg transition-shadow border-2 border-gray-400 hover:border-gray-500"
    >
      {/* Header Row */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 bg-gradient-to-br from-amber-100 to-amber-200 rounded-lg flex items-center justify-center flex-shrink-0 border-2 border-amber-400">
              <Package className="w-6 h-6 text-amber-700" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 break-words">{product.name}</h3>
              <p className="text-xs sm:text-sm text-gray-500 mt-0.5">SKU: {product.id} • {product.woodType}</p>
            </div>
          </div>
        </div>
        <span className={`ml-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium flex-shrink-0 ${getStatusColor(product.status)}`}>
          {getStatusIcon(product.status)}
          <span>{product.status}</span>
        </span>
      </div>

      {/* Details Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4 pb-4 border-b-2 border-gray-400">
        <div className="p-3 bg-gray-100 rounded-lg border-2 border-gray-400">
          <p className="text-xs text-gray-600 mb-1 font-medium">Category</p>
          <p className="text-sm font-medium text-gray-900 break-words">{product.category}</p>
        </div>
        <div className="p-3 bg-gray-100 rounded-lg border-2 border-gray-400">
          <p className="text-xs text-gray-600 mb-1 font-medium">Dimensions</p>
          <p className="text-sm font-medium text-gray-900">
            {product.dimensions.thickness} × {product.dimensions.width} × {product.dimensions.length}
          </p>
        </div>
        <div className="p-3 bg-gray-100 rounded-lg border-2 border-gray-400">
          <p className="text-xs text-gray-600 mb-1 font-medium">Stock Level</p>
          <p className="text-sm font-semibold text-gray-900">
            {product.currentStock.toLocaleString()} {product.unit}
          </p>
          <p className="text-xs text-gray-500 mt-0.5">
            Reorder: {product.reorderPoint.toLocaleString()}
          </p>
        </div>
        <div className="p-3 bg-gray-100 rounded-lg border-2 border-gray-400">
          <p className="text-xs text-gray-600 mb-1 font-medium">Price per Unit</p>
          <p className="text-sm font-semibold text-gray-900">${product.pricePerUnit.toFixed(2)}</p>
          <p className="text-xs text-gray-500 mt-0.5">
            Total: ${(product.currentStock * product.pricePerUnit).toLocaleString()}
          </p>
        </div>
      </div>

      {/* Additional Info & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="text-xs text-gray-600">
          <span className="font-semibold">Supplier:</span> {product.supplier} • 
          <span className="ml-1"><span className="font-semibold">Last Restocked:</span> {new Date(product.lastRestocked).toLocaleDateString()}</span>
        </div>
        
        <div className="flex items-center gap-2">
          <button className="px-3 py-1.5 text-xs bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors flex items-center gap-1.5 font-medium border-2 border-blue-400">
            <Eye className="w-3.5 h-3.5" />
            View
          </button>
          <button className="px-3 py-1.5 text-xs bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors flex items-center gap-1.5 font-medium border-2 border-green-400">
            <Edit2 className="w-3.5 h-3.5" />
            Edit
          </button>
          <button className="px-3 py-1.5 text-xs bg-red-50 text-red-700 rounded-lg hover:bg-red-100 transition-colors flex items-center gap-1.5 font-medium border-2 border-red-400">
            <Trash2 className="w-3.5 h-3.5" />
            Delete
          </button>
        </div>
      </div>
    </div>
  ))}
</div>

        {/* No Results */}
        {sortedInventory.length === 0 && (
          <div className="bg-white rounded-xl shadow-sm p-12 text-center">
            <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg font-medium">No products found matching your filters</p>
            <p className="text-gray-400 text-sm mt-2">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default OaklyInventory;