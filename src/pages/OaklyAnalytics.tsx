import React, { useState } from 'react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp, TrendingDown, DollarSign, Package, ShoppingCart, AlertCircle, Users, Factory } from 'lucide-react';

export default function OaklyAnalytics() {
  const [timeRange, setTimeRange] = useState('7days');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Sample data for sales over time
  const salesData = [
    { date: 'Nov 1', sales: 45000, orders: 12, profit: 12000 },
    { date: 'Nov 2', sales: 52000, orders: 15, profit: 14000 },
    { date: 'Nov 3', sales: 48000, orders: 13, profit: 13000 },
    { date: 'Nov 4', sales: 61000, orders: 18, profit: 16500 },
    { date: 'Nov 5', sales: 55000, orders: 16, profit: 15000 },
    { date: 'Nov 6', sales: 58000, orders: 17, profit: 15800 },
    { date: 'Nov 7', sales: 63000, orders: 19, profit: 17200 }
  ];

  // Product category performance
  const categoryData = [
    { name: 'Teak Wood', value: 35, sales: 180000, color: '#8B4513' },
    { name: 'Oak', value: 25, sales: 130000, color: '#D2691E' },
    { name: 'Pine', value: 20, sales: 105000, color: '#CD853F' },
    { name: 'Mahogany', value: 15, sales: 78000, color: '#A0522D' },
    { name: 'Others', value: 5, sales: 26000, color: '#DEB887' }
  ];

  // Inventory status
  const inventoryData = [
    { category: 'Teak', inStock: 850, lowStock: 120, outOfStock: 5 },
    { category: 'Oak', inStock: 720, lowStock: 95, outOfStock: 8 },
    { category: 'Pine', inStock: 940, lowStock: 80, outOfStock: 3 },
    { category: 'Mahogany', inStock: 560, lowStock: 110, outOfStock: 12 }
  ];

  // Top products
  const topProducts = [
    { name: 'Premium Teak Planks', sold: 245, revenue: 73500, trend: 'up', change: 12 },
    { name: 'Oak Beams 4x6', sold: 189, revenue: 56700, trend: 'up', change: 8 },
    { name: 'Pine Lumber Standard', sold: 312, revenue: 46800, trend: 'up', change: 15 },
    { name: 'Mahogany Boards', sold: 156, revenue: 62400, trend: 'down', change: -5 },
    { name: 'Oak Flooring Sets', sold: 134, revenue: 53600, trend: 'up', change: 22 }
  ];

  // Key metrics
  const metrics = [
    {
      title: 'Total Revenue',
      value: '₹3.82L',
      change: '+12.5%',
      trend: 'up',
      icon: DollarSign,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: 'Total Orders',
      value: '110',
      change: '+8.3%',
      trend: 'up',
      icon: ShoppingCart,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Inventory Value',
      value: '₹12.5L',
      change: '-2.1%',
      trend: 'down',
      icon: Package,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      title: 'Low Stock Items',
      value: '405',
      change: '+15.2%',
      trend: 'down',
      icon: AlertCircle,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50'
    }
  ];

  // Customer segments
  const customerData = [
    { segment: 'Retailers', count: 45, revenue: 220000 },
    { segment: 'Wholesalers', count: 28, revenue: 180000 },
    { segment: 'Contractors', count: 67, revenue: 145000 },
    { segment: 'Direct', count: 92, revenue: 98000 }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50">
      {/* Header */}
               <div className="h-5 sm:h-9"></div>
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 mt-1">Comprehensive insights for Oakly Manufacturing</p>
            </div>
            <div className="flex gap-3">
              <select 
                value={timeRange} 
                onChange={(e) => setTimeRange(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
              >
                <option value="7days">Last 7 Days</option>
                <option value="30days">Last 30 Days</option>
                <option value="90days">Last 90 Days</option>
                <option value="year">This Year</option>
              </select>
              <button className="px-6 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors font-medium shadow-sm">
                Export Report
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Key Metrics Grid - 2x2 Layout */}
                 <div className="h-5 sm:h-9"></div>

        <div className="px-4 sm:px-6 lg:px-8 py-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-6xl mx-auto mb-8">
            {metrics.map((metric, index) => {
              const Icon = metric.icon;
              return (
                <div 
                  key={index} 
                  className="bg-white rounded-xl shadow-md p-8 sm:p-10 border-2 border-gray-300 hover:shadow-xl hover:border-gray-400 hover:bg-gray-50 transition-all cursor-pointer"
                >
                  <div className="flex items-center justify-between mb-6">
                    <div className={`p-4 rounded-xl ${metric.bgColor}`}>
                      <Icon className={`w-8 h-8 ${metric.color}`} />
                    </div>
                    <span className={`flex items-center text-base font-semibold ${metric.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                      {metric.trend === 'up' ? <TrendingUp className="w-5 h-5 mr-1.5" /> : <TrendingDown className="w-5 h-5 mr-1.5" />}
                      {metric.change}
                    </span>
                  </div>
                  <h3 className="text-gray-600 text-base font-semibold mb-2">{metric.title}</h3>
                  <p className="text-4xl sm:text-5xl font-bold text-gray-900">{metric.value}</p>
                </div>
              );
            })}
          </div>
        </div>

         <div className="h-5 sm:h-9"></div>

        {/* Sales and Profit Chart */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8 border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-gray-900">Sales & Profit Trends</h2>
              <p className="text-gray-600 text-sm mt-1">Daily performance overview</p>
            </div>
            <div className="flex gap-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-amber-600 rounded-full"></div>
                <span className="text-sm text-gray-600">Sales</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-600 rounded-full"></div>
                <span className="text-sm text-gray-600">Profit</span>
              </div>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={salesData}>
              <defs>
                <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#D97706" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#D97706" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#059669" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#059669" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="date" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip 
                contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
                formatter={(value) => `₹${value.toLocaleString()}`}
              />
              <Area type="monotone" dataKey="sales" stroke="#D97706" fillOpacity={1} fill="url(#colorSales)" strokeWidth={2} />
              <Area type="monotone" dataKey="profit" stroke="#059669" fillOpacity={1} fill="url(#colorProfit)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>


         <div className="h-5 sm:h-9"></div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Category Distribution */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Sales by Category</h2>
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={90}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `${value}%`} />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-4 space-y-2">
              {categoryData.map((cat, idx) => (
                <div key={idx} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: cat.color }}></div>
                    <span className="text-sm font-medium text-gray-700">{cat.name}</span>
                  </div>
                  <span className="text-sm font-semibold text-gray-900">₹{(cat.sales / 1000).toFixed(0)}K</span>
                </div>
              ))}
            </div>
          </div>


          {/* Inventory Status */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Inventory Status</h2>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={inventoryData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="category" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
                />
                <Legend />
                <Bar dataKey="inStock" fill="#10b981" name="In Stock" radius={[4, 4, 0, 0]} />
                <Bar dataKey="lowStock" fill="#f59e0b" name="Low Stock" radius={[4, 4, 0, 0]} />
                <Bar dataKey="outOfStock" fill="#ef4444" name="Out of Stock" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

         <div className="h-5 sm:h-9"></div>

        {/* Top Products Table */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8 border border-gray-100">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Top Performing Products</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Product Name</th>
                  <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">Units Sold</th>
                  <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">Revenue</th>
                  <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">Trend</th>
                </tr>
              </thead>
              <tbody>
                {topProducts.map((product, idx) => (
                  <tr key={idx} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-orange-500 rounded-lg flex items-center justify-center">
                          <Package className="w-5 h-5 text-white" />
                        </div>
                        <span className="font-medium text-gray-900">{product.name}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-right font-medium text-gray-900">{product.sold}</td>
                    <td className="py-4 px-4 text-right font-semibold text-gray-900">₹{product.revenue.toLocaleString()}</td>
                    <td className="py-4 px-4 text-right">
                      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-semibold ${
                        product.trend === 'up' 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-red-100 text-red-700'
                      }`}>
                        {product.trend === 'up' ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                        {product.change > 0 ? '+' : ''}{product.change}%
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>


         <div className="h-5 sm:h-9"></div>

        {/* Customer Segments */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Customer Segments</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={customerData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis type="number" stroke="#9ca3af" />
              <YAxis type="category" dataKey="segment" stroke="#9ca3af" width={100} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
                formatter={(value, name) => {
                  if (name === 'revenue') return [`₹${value.toLocaleString()}`, 'Revenue'];
                  return [value, 'Customers'];
                }}
              />
              <Legend />
              <Bar dataKey="count" fill="#3b82f6" name="Customers" radius={[0, 4, 4, 0]} />
              <Bar dataKey="revenue" fill="#10b981" name="Revenue (₹)" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>


         <div className="h-5 sm:h-9"></div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg p-6 text-white">
            <Users className="w-10 h-10 mb-4 opacity-90" />
            <h3 className="text-lg font-semibold mb-2">Total Customers</h3>
            <p className="text-3xl font-bold">232</p>
            <p className="text-blue-100 text-sm mt-2">+18 new this week</p>
          </div>
          <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-lg p-6 text-white">
            <Factory className="w-10 h-10 mb-4 opacity-90" />
            <h3 className="text-lg font-semibold mb-2">Production Output</h3>
            <p className="text-3xl font-bold">3,470</p>
            <p className="text-purple-100 text-sm mt-2">units this week</p>
          </div>
          <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl shadow-lg p-6 text-white">
            <DollarSign className="w-10 h-10 mb-4 opacity-90" />
            <h3 className="text-lg font-semibold mb-2">Avg. Order Value</h3>
            <p className="text-3xl font-bold">₹34,727</p>
            <p className="text-green-100 text-sm mt-2">+5.2% from last week</p>
          </div>
        </div>
                 <div className="h-5 sm:h-9"></div>

      </div>
    </div>
  );
}