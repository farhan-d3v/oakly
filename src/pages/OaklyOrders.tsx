import React, { useState } from 'react';
import {
  ShoppingCart,
  Search,
  Download,
  Plus,
  Eye,
  Edit2,
  Trash2,
  Truck,
  CheckCircle,
  Clock,
  XCircle,
  Package,
  DollarSign,
  User,
  Phone,
  Mail,
  MapPin,
  FileText,
  AlertCircle
} from 'lucide-react';

interface OrderItem {
  productName: string;
  quantity: number;
  unit: string;
  pricePerUnit: number;
  total: number;
}

interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  customerType: 'Contractor' | 'Builder' | 'Retailer' | 'DIY';
  customerEmail: string;
  customerPhone: string;
  deliveryAddress: string;
  orderDate: string;
  deliveryDate: string;
  status: 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
  items: OrderItem[];
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  notes?: string;
}

const OaklyOrders: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [selectedCustomerType, setSelectedCustomerType] = useState('All');
  //const [dateFilter, setDateFilter] = useState('All Time');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [showOrderDetail, setShowOrderDetail] = useState(false);

  // Sample orders data
  const ordersData: Order[] = [
    {
      id: 'ORD-001',
      orderNumber: 'OAK-2024-1001',
      customerName: 'Mountain View Builders',
      customerType: 'Contractor',
      customerEmail: 'contact@mountainviewbuilders.com',
      customerPhone: '(555) 123-4567',
      deliveryAddress: '1234 Construction Ave, Portland, OR 97201',
      orderDate: '2024-11-05',
      deliveryDate: '2024-11-12',
      status: 'Processing',
      items: [
        { productName: 'Red Oak Boards (1x6x8)', quantity: 2400, unit: 'bd ft', pricePerUnit: 12.00, total: 28800 },
        { productName: 'Pine Dimensional (2x4x8)', quantity: 1500, unit: 'bd ft', pricePerUnit: 8.00, total: 12000 }
      ],
      subtotal: 40800,
      tax: 3264,
      shipping: 250,
      total: 44314,
      notes: 'Delivery to site office. Contact foreman before delivery.'
    },
    {
      id: 'ORD-002',
      orderNumber: 'OAK-2024-1002',
      customerName: 'Timber Creek Construction',
      customerType: 'Builder',
      customerEmail: 'orders@timbercreek.com',
      customerPhone: '(555) 234-5678',
      deliveryAddress: '5678 Builder Blvd, Seattle, WA 98101',
      orderDate: '2024-11-06',
      deliveryDate: '2024-11-08',
      status: 'Shipped',
      items: [
        { productName: 'Cedar Decking (1x6x12)', quantity: 800, unit: 'bd ft', pricePerUnit: 15.00, total: 12000 },
        { productName: 'Birch Plywood (4x8 3/4")', quantity: 50, unit: 'sheets', pricePerUnit: 40.00, total: 2000 }
      ],
      subtotal: 14000,
      tax: 1120,
      shipping: 150,
      total: 15270,
      notes: 'Rush order - deliver before 10 AM'
    },
    {
      id: 'ORD-003',
      orderNumber: 'OAK-2024-1003',
      customerName: 'Heritage Furniture Co.',
      customerType: 'Retailer',
      customerEmail: 'purchasing@heritagefurniture.com',
      customerPhone: '(555) 345-6789',
      deliveryAddress: '910 Furniture Pkwy, San Francisco, CA 94102',
      orderDate: '2024-11-04',
      deliveryDate: '2024-11-06',
      status: 'Delivered',
      items: [
        { productName: 'Black Walnut Boards (1x8x8)', quantity: 500, unit: 'bd ft', pricePerUnit: 22.00, total: 11000 },
        { productName: 'Hard Maple Boards (1x6x8)', quantity: 600, unit: 'bd ft', pricePerUnit: 13.00, total: 7800 }
      ],
      subtotal: 18800,
      tax: 1504,
      shipping: 200,
      total: 20504,
      notes: 'Premium quality required. Inspect before delivery.'
    },
    {
      id: 'ORD-004',
      orderNumber: 'OAK-2024-1004',
      customerName: 'Green Valley Homes',
      customerType: 'Contractor',
      customerEmail: 'info@greenvalleyhomes.com',
      customerPhone: '(555) 456-7890',
      deliveryAddress: '2468 Valley Rd, Austin, TX 78701',
      orderDate: '2024-11-07',
      deliveryDate: '2024-11-14',
      status: 'Pending',
      items: [
        { productName: 'Cedar Fence Boards (1x6x6)', quantity: 1200, unit: 'bd ft', pricePerUnit: 12.00, total: 14400 },
        { productName: 'Pine Boards (1x6x8)', quantity: 800, unit: 'bd ft', pricePerUnit: 7.50, total: 6000 }
      ],
      subtotal: 20400,
      tax: 1632,
      shipping: 180,
      total: 22212,
      notes: 'Multiple delivery addresses - call before shipping'
    },
    {
      id: 'ORD-005',
      orderNumber: 'OAK-2024-1005',
      customerName: 'Artisan Woodworks',
      customerType: 'DIY',
      customerEmail: 'john@artisanwood.com',
      customerPhone: '(555) 567-8901',
      deliveryAddress: '1357 Workshop St, Denver, CO 80202',
      orderDate: '2024-11-03',
      deliveryDate: '2024-11-05',
      status: 'Delivered',
      items: [
        { productName: 'Maple Hardwood Flooring', quantity: 450, unit: 'sq ft', pricePerUnit: 20.00, total: 9000 }
      ],
      subtotal: 9000,
      tax: 720,
      shipping: 100,
      total: 9820,
      notes: 'Customer pickup available'
    },
    {
      id: 'ORD-006',
      orderNumber: 'OAK-2024-1006',
      customerName: 'Skyline Developments',
      customerType: 'Builder',
      customerEmail: 'orders@skylinedev.com',
      customerPhone: '(555) 678-9012',
      deliveryAddress: '7890 Skyline Dr, Phoenix, AZ 85001',
      orderDate: '2024-11-02',
      deliveryDate: '2024-11-04',
      status: 'Cancelled',
      items: [
        { productName: 'White Oak Planks (1x8x10)', quantity: 400, unit: 'bd ft', pricePerUnit: 14.50, total: 5800 }
      ],
      subtotal: 5800,
      tax: 464,
      shipping: 120,
      total: 6384,
      notes: 'Customer requested cancellation - material defect'
    }
  ];

  // Filter orders
  const filteredOrders = ordersData.filter(order => {
    const matchesSearch = 
      order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.id.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = selectedStatus === 'All' || order.status === selectedStatus;
    const matchesCustomerType = selectedCustomerType === 'All' || order.customerType === selectedCustomerType;
    
    return matchesSearch && matchesStatus && matchesCustomerType;
  });

  // Calculate stats
  const totalOrders = ordersData.length;
  const pendingOrders = ordersData.filter(o => o.status === 'Pending').length;
  const processingOrders = ordersData.filter(o => o.status === 'Processing').length;
  const shippedOrders = ordersData.filter(o => o.status === 'Shipped').length;
  const deliveredOrders = ordersData.filter(o => o.status === 'Delivered').length;
  const totalRevenue = ordersData
    .filter(o => o.status !== 'Cancelled')
    .reduce((sum, order) => sum + order.total, 0);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Processing': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Shipped': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'Delivered': return 'bg-green-100 text-green-800 border-green-200';
      case 'Cancelled': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Pending': return <Clock className="w-4 h-4" />;
      case 'Processing': return <Package className="w-4 h-4" />;
      case 'Shipped': return <Truck className="w-4 h-4" />;
      case 'Delivered': return <CheckCircle className="w-4 h-4" />;
      case 'Cancelled': return <XCircle className="w-4 h-4" />;
      default: return null;
    }
  };

  const openOrderDetail = (order: Order) => {
    setSelectedOrder(order);
    setShowOrderDetail(true);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <p className="text-sm sm:text-base text-gray-600 mt-1">Manage and track your lumber orders</p>
        </div>
        <button className="px-4 py-2 bg-amber-800 text-white rounded-lg hover:bg-amber-900 transition-colors flex items-center justify-center gap-2 text-sm sm:text-base">
          <Plus className="w-5 h-5" />
          New Order
        </button>
      </div>

         <div className="h-5 sm:h-9"></div>

      {/* Stats Cards */}
     <div className="px-4 sm:px-6 lg:px-8 py-4">
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-7xl">
    <div className="bg-white rounded-xl shadow-sm p-6 sm:p-8 border-2 border-gray-300">
      <div className="flex items-center justify-between mb-3">
        <p className="text-sm sm:text-base text-gray-600 font-medium">Total Orders</p>
        <ShoppingCart className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400" />
      </div>
      <p className="text-3xl sm:text-4xl font-bold text-gray-900">{totalOrders}</p>
    </div>
    
    <div className="bg-white rounded-xl shadow-sm p-6 sm:p-8 border-2 border-gray-300">
      <div className="flex items-center justify-between mb-3">
        <p className="text-sm sm:text-base text-gray-600 font-medium">Pending</p>
        <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-600" />
      </div>
      <p className="text-3xl sm:text-4xl font-bold text-yellow-600">{pendingOrders}</p>
    </div>
    
    <div className="bg-white rounded-xl shadow-sm p-6 sm:p-8 border-2 border-gray-300">
      <div className="flex items-center justify-between mb-3">
        <p className="text-sm sm:text-base text-gray-600 font-medium">Processing</p>
        <Package className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
      </div>
      <p className="text-3xl sm:text-4xl font-bold text-blue-600">{processingOrders}</p>
    </div>
    
    <div className="bg-white rounded-xl shadow-sm p-6 sm:p-8 border-2 border-gray-300">
      <div className="flex items-center justify-between mb-3">
        <p className="text-sm sm:text-base text-gray-600 font-medium">Shipped</p>
        <Truck className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600" />
      </div>
      <p className="text-3xl sm:text-4xl font-bold text-purple-600">{shippedOrders}</p>
    </div>
    
    <div className="bg-white rounded-xl shadow-sm p-6 sm:p-8 border-2 border-gray-300">
      <div className="flex items-center justify-between mb-3">
        <p className="text-sm sm:text-base text-gray-600 font-medium">Delivered</p>
        <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
      </div>
      <p className="text-3xl sm:text-4xl font-bold text-green-600">{deliveredOrders}</p>
    </div>
    
    <div className="bg-white rounded-xl shadow-sm p-6 sm:p-8 border-2 border-gray-300">
      <div className="flex items-center justify-between mb-3">
        <p className="text-sm sm:text-base text-gray-600 font-medium">Revenue</p>
        <DollarSign className="w-5 h-5 sm:w-6 sm:h-6 text-amber-600" />
      </div>
      <p className="text-2xl sm:text-3xl font-bold text-amber-800">${(totalRevenue / 1000).toFixed(1)}k</p>
    </div>
  </div>
</div>

         <div className="h-5 sm:h-9"></div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm p-4">
        <div className="flex flex-col lg:flex-row gap-3">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by order number, customer name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-600"
            />
          </div>

          {/* Status Filter */}
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-600 bg-white"
          >
            <option value="All">All Status</option>
            <option value="Pending">Pending</option>
            <option value="Processing">Processing</option>
            <option value="Shipped">Shipped</option>
            <option value="Delivered">Delivered</option>
            <option value="Cancelled">Cancelled</option>
          </select>

          {/* Customer Type Filter */}
          <select
            value={selectedCustomerType}
            onChange={(e) => setSelectedCustomerType(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-600 bg-white"
          >
            <option value="All">All Customers</option>
            <option value="Contractor">Contractors</option>
            <option value="Builder">Builders</option>
            <option value="Retailer">Retailers</option>
            <option value="DIY">DIY</option>
          </select>

          {/* Export Button */}
          <button className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-2 text-sm">
            <Download className="w-4 h-4" />
            <span className="hidden sm:inline">Export</span>
          </button>
        </div>
      </div>

         <div className="h-5 sm:h-9"></div>

{/* Orders Table - Desktop */}
      <div className="hidden lg:block bg-white rounded-xl shadow-sm overflow-hidden border-2 border-gray-300">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b-2 border-gray-300">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Delivery
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Items
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y-2 divide-gray-300">
              {filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-200 transition-colors">
                  <td className="px-6 py-4">
                    <div>
                      <p className="text-sm font-semibold text-gray-900">{order.orderNumber}</p>
                      <p className="text-xs text-gray-500">{order.id}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{order.customerName}</p>
                      <p className="text-xs text-gray-500">{order.customerType}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-gray-900">{new Date(order.orderDate).toLocaleDateString()}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-gray-900">{new Date(order.deliveryDate).toLocaleDateString()}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-gray-900">{order.items.length} items</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm font-semibold text-gray-900">${order.total.toLocaleString()}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border-2 ${getStatusColor(order.status)}`}>
                      {getStatusIcon(order.status)}
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => openOrderDetail(order)}
                        className="p-1.5 text-blue-600 hover:bg-blue-200 rounded-lg transition-colors border border-blue-300"
                        title="View Details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 text-green-600 hover:bg-green-200 rounded-lg transition-colors border border-green-300" title="Edit">
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 text-red-600 hover:bg-red-200 rounded-lg transition-colors border border-red-300" title="Delete">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Orders Cards - Mobile */}
      <div className="lg:hidden space-y-5">
        {filteredOrders.map((order) => (
          <div key={order.id} className="bg-white rounded-xl shadow-md p-5 border-2 border-gray-400 hover:border-gray-600 hover:bg-gray-100 transition-all">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1 min-w-0">
                <h3 className="text-base font-semibold text-gray-900 break-words">{order.orderNumber}</h3>
                <p className="text-sm text-gray-600 mt-1">{order.customerName}</p>
              </div>
              <span className={`ml-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border-2 flex-shrink-0 ${getStatusColor(order.status)}`}>
                {getStatusIcon(order.status)}
                {order.status}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm mb-4 pb-4 border-b-2 border-gray-300">
              <div className="p-3 bg-gray-50 rounded-lg border border-gray-300">
                <p className="text-xs text-gray-600 font-medium mb-1">Order Date</p>
                <p className="font-medium text-gray-900">{new Date(order.orderDate).toLocaleDateString()}</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg border border-gray-300">
                <p className="text-xs text-gray-600 font-medium mb-1">Delivery Date</p>
                <p className="font-medium text-gray-900">{new Date(order.deliveryDate).toLocaleDateString()}</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg border border-gray-300">
                <p className="text-xs text-gray-600 font-medium mb-1">Items</p>
                <p className="font-medium text-gray-900">{order.items.length} items</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg border border-gray-300">
                <p className="text-xs text-gray-600 font-medium mb-1">Total</p>
                <p className="font-semibold text-amber-800 text-base">${order.total.toLocaleString()}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button 
                onClick={() => openOrderDetail(order)}
                className="flex-1 px-4 py-2.5 text-sm bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors flex items-center justify-center gap-2 font-medium border-2 border-blue-300"
              >
                <Eye className="w-4 h-4" />
                View Details
              </button>
              <button className="flex-1 px-4 py-2.5 text-sm bg-green-50 text-green-700 rounded-lg hover:bg-green-200 transition-colors flex items-center justify-center gap-2 font-medium border-2 border-green-300">
                <Edit2 className="w-4 h-4" />
                Edit
              </button>
              <button className="px-4 py-2.5 text-sm bg-red-50 text-red-700 rounded-lg hover:bg-red-200 transition-colors border-2 border-red-300">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* No Results */}
      {filteredOrders.length === 0 && (
        <div className="bg-white rounded-xl shadow-sm p-12 text-center border-2 border-gray-300">
          <ShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 text-lg">No orders found matching your filters</p>
          <p className="text-gray-400 text-sm mt-2">Try adjusting your search or filters</p>
        </div>
      )}
      {/* Order Detail Modal */}
      {showOrderDetail && selectedOrder && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-gray-900">{selectedOrder.orderNumber}</h2>
                <p className="text-sm text-gray-500">Order Details</p>
              </div>
              <button
                onClick={() => setShowOrderDetail(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <XCircle className="w-6 h-6 text-gray-500" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6">
              {/* Status and Date Info */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-xs text-gray-500 mb-1">Status</p>
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(selectedOrder.status)}`}>
                    {getStatusIcon(selectedOrder.status)}
                    {selectedOrder.status}
                  </span>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-xs text-gray-500 mb-1">Order Date</p>
                  <p className="text-sm font-semibold text-gray-900">
                    {new Date(selectedOrder.orderDate).toLocaleDateString('en-US', { 
                      weekday: 'short', 
                      year: 'numeric', 
                      month: 'short', 
                      day: 'numeric' 
                    })}
                  </p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-xs text-gray-500 mb-1">Delivery Date</p>
                  <p className="text-sm font-semibold text-gray-900">
                    {new Date(selectedOrder.deliveryDate).toLocaleDateString('en-US', { 
                      weekday: 'short', 
                      year: 'numeric', 
                      month: 'short', 
                      day: 'numeric' 
                    })}
                  </p>
                </div>
              </div>

              {/* Customer Information */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <User className="w-5 h-5 text-amber-800" />
                  Customer Information
                </h3>
                <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                  <div className="flex items-start gap-3">
                    <User className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">{selectedOrder.customerName}</p>
                      <p className="text-xs text-gray-500">{selectedOrder.customerType}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="w-4 h-4 text-gray-400 flex-shrink-0" />
                    <p className="text-sm text-gray-900">{selectedOrder.customerEmail}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-gray-400 flex-shrink-0" />
                    <p className="text-sm text-gray-900">{selectedOrder.customerPhone}</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-gray-900">{selectedOrder.deliveryAddress}</p>
                  </div>
                </div>
              </div>

              {/* Order Items */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <Package className="w-5 h-5 text-amber-800" />
                  Order Items
                </h3>
                <div className="border border-gray-200 rounded-lg overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Product</th>
                        <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Qty</th>
                        <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Price</th>
                        <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Total</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {selectedOrder.items.map((item, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                          <td className="px-4 py-3 text-sm text-gray-900">{item.productName}</td>
                          <td className="px-4 py-3 text-sm text-right text-gray-900">
                            {item.quantity.toLocaleString()} {item.unit}
                          </td>
                          <td className="px-4 py-3 text-sm text-right text-gray-900">
                            ${item.pricePerUnit.toFixed(2)}
                          </td>
                          <td className="px-4 py-3 text-sm font-medium text-right text-gray-900">
                            ${item.total.toLocaleString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Order Summary */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Order Summary</h3>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Subtotal:</span>
                    <span className="text-gray-900">${selectedOrder.subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Tax (8%):</span>
                    <span className="text-gray-900">${selectedOrder.tax.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Shipping:</span>
                    <span className="text-gray-900">${selectedOrder.shipping.toLocaleString()}</span>
                  </div>
                  <div className="border-t border-gray-200 pt-2 mt-2 flex justify-between">
                    <span className="text-base font-semibold text-gray-900">Total:</span>
                    <span className="text-lg font-bold text-amber-800">${selectedOrder.total.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Notes */}
              {selectedOrder.notes && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <FileText className="w-5 h-5 text-amber-800" />
                    Order Notes
                  </h3>
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-gray-700">{selectedOrder.notes}</p>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-200">
                <button className="flex-1 px-4 py-2 bg-amber-800 text-white rounded-lg hover:bg-amber-900 transition-colors flex items-center justify-center gap-2">
                  <FileText className="w-4 h-4" />
                  Generate Invoice
                </button>
                <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
                  <Truck className="w-4 h-4" />
                  Track Shipment
                </button>
                <button className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
                  <Edit2 className="w-4 h-4" />
                  Edit Order
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OaklyOrders;