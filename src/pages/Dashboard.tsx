import React, { useState } from 'react';
import { 
  TrendingUp, 
  DollarSign,

  ShoppingCart,
  ArrowUpRight,
  ArrowDownRight,
  Package,

} from 'lucide-react';
import {
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { motion } from 'framer-motion';

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  icon: React.ReactNode;
  trend: 'up' | 'down';
}



const StatCard: React.FC<StatCardProps> = ({ title, value, change, icon, trend }) => (
  <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 hover:shadow-md transition-shadow">
    <div className="flex items-center justify-between mb-3 sm:mb-4">
      <div className="p-2 sm:p-3 bg-amber-50 rounded-lg">
        {icon}
      </div>
      <span className={`text-xs sm:text-sm font-medium ${trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
        {change}
      </span>
    </div>
    <h3 className="text-gray-600 text-xs sm:text-sm font-medium mb-1">{title}</h3>
    <p className="text-xl sm:text-2xl font-bold text-gray-900 break-words">{value}</p>
  </div>
);

interface ActivityItem {
  id: number;
  user: string;
  action: string;
  time: string;
}

const OaklyDashboard: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [timeRange, setTimeRange] = useState('7days');

  // Revenue data for line chart
  const revenueData = [
    { date: 'Mon', revenue: 8400, orders: 32, customers: 24 },
    { date: 'Tue', revenue: 11600, orders: 45, customers: 35 },
    { date: 'Wed', revenue: 9200, orders: 38, customers: 28 },
    { date: 'Thu', revenue: 12400, orders: 52, customers: 42 },
    { date: 'Fri', revenue: 15600, orders: 64, customers: 51 },
    { date: 'Sat', revenue: 17800, orders: 72, customers: 58 },
    { date: 'Sun', revenue: 13600, orders: 56, customers: 44 }
  ];


  // Wood type distribution for pie chart
  const productPerformance = [
    { name: 'Oak', value: 28, color: '#8b4513' },
    { name: 'Pine', value: 35, color: '#daa520' },
    { name: 'Maple', value: 22, color: '#cd853f' },
    { name: 'Cedar', value: 15, color: '#d2691e' }
  ];

  // Sales forecast data
  const forecastData = [
    { month: 'Jan', actual: 82000, forecast: 78000 },
    { month: 'Feb', actual: 91000, forecast: 87000 },
    { month: 'Mar', actual: 88000, forecast: 92000 },
    { month: 'Apr', actual: 105000, forecast: 98000 },
    { month: 'May', actual: 112000, forecast: 108000 },
    { month: 'Jun', actual: 124000, forecast: 118000 }
  ];

  // Top selling wood products
  const topProducts = [
    { name: 'Red Oak Boards (1x6x8)', sales: 2840, revenue: '$34,080', trend: 'up', change: '+18%', unit: 'bd ft' },
    { name: 'Pine Dimensional (2x4x8)', sales: 3650, revenue: '$29,200', trend: 'up', change: '+12%', unit: 'bd ft' },
    { name: 'Maple Hardwood Flooring', sales: 1920, revenue: '$38,400', trend: 'up', change: '+24%', unit: 'sq ft' },
    { name: 'Cedar Fence Boards (1x6x6)', sales: 2180, revenue: '$26,160', trend: 'down', change: '-5%', unit: 'bd ft' },
    { name: 'Birch Plywood (4x8 3/4")', sales: 890, revenue: '$35,600', trend: 'up', change: '+15%', unit: 'sheets' }
  ];

  const stats = [
    {
      title: 'Total Revenue',
      value: '$89,231',
      change: '+16.8%',
      icon: <DollarSign className="w-6 h-6 text-amber-700" />,
      trend: 'up' as const
    },
    {
      title: 'Board Feet Sold',
      value: '24,847',
      change: '+22.4%',
      icon: <Package className="w-6 h-6 text-amber-800" />,
      trend: 'up' as const
    },
    {
      title: 'Active Orders',
      value: '156',
      change: '+8.2%',
      icon: <ShoppingCart className="w-6 h-6 text-yellow-700" />,
      trend: 'up' as const
    },
    {
      title: 'Inventory Turnover',
      value: '4.8x',
      change: '+12.3%',
      icon: <TrendingUp className="w-6 h-6 text-orange-700" />,
      trend: 'up' as const
    }
  ];

  const recentActivity: ActivityItem[] = [
    { id: 1, user: 'Mountain View Builders', action: 'Ordered 2,400 bd ft Oak lumber', time: '12 mins ago' },
    { id: 2, user: 'Timber Creek Construction', action: 'Received shipment - Pine boards', time: '45 mins ago' },
    { id: 3, user: 'Heritage Furniture Co.', action: 'Requested quote for Walnut slabs', time: '1 hour ago' },
    { id: 4, user: 'Green Valley Homes', action: 'Bulk order - Cedar fencing', time: '2 hours ago' },
    { id: 5, user: 'Artisan Woodworks', action: 'Pickup scheduled - Maple planks', time: '3 hours ago' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
    
        {/* Blur Overlay for Mobile */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-30 lg:hidden transition-opacity duration-300"
            onClick={() => setSidebarOpen(false)}
          ></div>
        )}

        {/* Main Content */}
        <main className="flex-1 w-full max-w-full overflow-x-hidden px-6 sm:px-10 lg:px-12 mt-4 lg:pl-64">
          {/* Welcome Section */}

<motion.section
  className="relative flex flex-col items-center justify-center text-center bg-gray-50 min-h-[40vh] pt-[5rem] pb-24 px-4"
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8 }}
>
  <h2 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-gray-900 mb-6 leading-tight">
    Welcome back to <span className="text-amber-600">Oakly Lumber!</span>
  </h2>

  <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
    Your wood inventory and sales performance at a glance
  </p>
</motion.section>

         {/* Stats Grid */}

<div className="flex justify-center my-16 px-6">
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 w-full max-w-6xl">
    {stats.map((stat, index) => (
      <div
        key={index}
        className="bg-white rounded-2xl shadow-md p-5 w-full h-40 flex flex-col justify-center items-center
                   hover:scale-[1.02] transition-transform duration-300"
      >
        <StatCard {...stat} />
      </div>
    ))}
  </div>
</div>

        {/* Full-width Revenue Chart with side spacing */}
         <div className="h-5 sm:h-9"></div>
{/* Revenue Trend Chart */}
<div className="bg-white rounded-xl shadow-sm p-6 sm:p-8 mb-10">
  <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-5 sm:mb-6 gap-3">
    <h3 className="text-base sm:text-lg font-semibold text-gray-900">
      Lumber Sales Revenue
    </h3>
    <select 
      value={timeRange}
      onChange={(e) => setTimeRange(e.target.value)}
      className="px-3 sm:px-4 py-2 border border-gray-200 rounded-lg text-xs sm:text-sm 
                 focus:outline-none focus:ring-2 focus:ring-amber-500 w-full sm:w-auto"
    >
      <option value="7days">Last 7 days</option>
      <option value="30days">Last 30 days</option>
      <option value="90days">Last 90 days</option>
    </select>
  </div>

  {/* Added proper container with horizontal padding and negative margin compensation */}
  <div className="px-0 sm:px-0 pb-6 -mx-2 sm:-mx-4">
    <div className="px-4 sm:px-6">
      <ResponsiveContainer width="100%" height={280}>
        <AreaChart 
          data={revenueData}
          margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#92400e" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#92400e" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis dataKey="date" stroke="#6b7280" style={{ fontSize: '12px' }} />
          <YAxis stroke="#6b7280" style={{ fontSize: '12px' }} />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: '#fff', 
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
            }}
          />
          <Area 
            type="monotone" 
            dataKey="revenue" 
            stroke="#92400e" 
            strokeWidth={2}
            fillOpacity={1} 
            fill="url(#colorRevenue)" 
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  </div>
</div>

   



                    <div className="h-5 sm:h-9"></div>
           {/* Wood Type Distribution and Forecast Section */}
<div className="grid grid-cols-1 lg:grid-cols-2 gap-6 px-6 sm:px-10 mb-10">
  {/* Wood Type Distribution Pie Chart */}
  <div className="bg-white rounded-xl shadow-sm p-6 sm:p-8">
    <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4 sm:mb-6">
      Wood Type Distribution
    </h3>

    <ResponsiveContainer width="100%" height={220}>
      <PieChart>
        <Pie
          data={productPerformance}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={90}
          paddingAngle={5}
          dataKey="value"
        >
          {productPerformance.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>

    <div className="mt-8 space-y-3">
      {productPerformance.map((item, index) => (
        <div
          key={index}
          className="flex items-center justify-between text-xs sm:text-sm"
        >
          <div className="flex items-center gap-2">
            <div
              className="w-3 h-3 rounded-full flex-shrink-0"
              style={{ backgroundColor: item.color }}
            ></div>
            <span className="text-gray-700">{item.name}</span>
          </div>
          <span className="font-semibold text-gray-900">{item.value}%</span>
        </div>
      ))}
    </div>
  </div>

  {/* Lumber Sales Forecast */}
  <div className="bg-white rounded-xl shadow-sm p-6 sm:p-8">
    <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4 sm:mb-6">
      Lumber Sales Forecast vs Actual
    </h3>

    <ResponsiveContainer width="100%" height={280}>
      <LineChart data={forecastData}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
        <XAxis dataKey="month" stroke="#6b7280" style={{ fontSize: "11px" }} />
        <YAxis stroke="#6b7280" style={{ fontSize: "11px" }} />
        <Tooltip
          contentStyle={{
            backgroundColor: "#fff",
            border: "1px solid #e5e7eb",
            borderRadius: "8px",
          }}
        />
        <Legend wrapperStyle={{ fontSize: "12px" }} />
        <Line
          type="monotone"
          dataKey="actual"
          stroke="#059669"
          strokeWidth={2}
          dot={{ r: 4 }}
        />
        <Line
          type="monotone"
          dataKey="forecast"
          stroke="#ea580c"
          strokeWidth={2}
          strokeDasharray="5 5"
          dot={{ r: 4 }}
        />
      </LineChart>
    </ResponsiveContainer>
  </div>
</div>


                    <div className="h-5 sm:h-9"></div>

          {/* Top Wood Products and Recent Activity */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            {/* Top Selling Wood Products */}
            <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4 sm:mb-6">Top Selling Lumber Products</h3>
              <div className="space-y-3 sm:space-y-4">
                {topProducts.map((product, index) => (
                  <div key={index} className="flex items-start sm:items-center justify-between pb-3 sm:pb-4 border-b border-gray-100 last:border-0 gap-3">
                    <div className="flex items-start sm:items-center gap-2 sm:gap-3 flex-1 min-w-0">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 bg-amber-100 rounded-lg flex items-center justify-center font-semibold text-amber-800 text-xs sm:text-sm flex-shrink-0">
                        #{index + 1}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="font-medium text-gray-900 text-xs sm:text-sm break-words">{product.name}</p>
                        <p className="text-xs text-gray-500 mt-0.5">{product.sales} {product.unit} sold</p>
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="font-semibold text-gray-900 text-xs sm:text-sm whitespace-nowrap">{product.revenue}</p>
                      <div className="flex items-center gap-1 justify-end mt-0.5">
                        {product.trend === 'up' ? (
                          <ArrowUpRight className="w-3 h-3 sm:w-4 sm:h-4 text-green-600" />
                        ) : (
                          <ArrowDownRight className="w-3 h-3 sm:w-4 sm:h-4 text-red-600" />
                        )}
                        <span className={`text-xs font-medium ${product.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                          {product.change}
                        </span>
                      </div>
                    </div>
                  </div>
 ))}
              </div>
            </div>

            {/* Quick Actions */}
<div className="bg-white rounded-xl shadow-sm p-4 sm:p-5">
  <h3 className="text-sm sm:text-base font-semibold text-gray-900 mb-3">Quick Actions</h3>
  <div className="grid grid-cols-2 gap-2 sm:gap-2.5">
    <button className="px-3 sm:px-3.5 py-2 sm:py-2.5 bg-red-600 text-white rounded-lg hover:bg-amber-700 active:bg-amber-800 transition-colors font-medium text-xs sm:text-sm shadow-sm">
      New Order
    </button>
    <button className="px-3 sm:px-3.5 py-2 sm:py-2.5 bg-amber-600 text-white rounded-lg hover:bg-amber-700 active:bg-amber-800 transition-colors font-medium text-xs sm:text-sm shadow-sm">
      Add Lumber
    </button>
    <button className="px-3 sm:px-3.5 py-2 sm:py-2.5 bg-amber-600 text-white rounded-lg hover:bg-amber-700 active:bg-amber-800 transition-colors font-medium text-xs sm:text-sm shadow-sm">
      View Inventory
    </button>
    <button className="px-3 sm:px-3.5 py-2 sm:py-2.5 bg-amber-600 text-white rounded-lg hover:bg-amber-700 active:bg-amber-800 transition-colors font-medium text-xs sm:text-sm shadow-sm">
      Generate Report
    </button>
  </div>
</div>
  


                                <div className="h-5 sm:h-9"></div>

          {/* Wood Inventory & Sales Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-1 gap-4 sm:gap-6 mt-4 sm:mt-6">
            
            {/* Recent Activity */}
            <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4 sm:mb-6">Recent Orders & Activity</h3>
              <div className="space-y-3 sm:space-y-4">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-start gap-2 sm:gap-3 pb-3 sm:pb-4 border-b border-gray-100 last:border-0 last:pb-0">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0">
                      <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5 text-amber-800" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs sm:text-sm font-medium text-gray-900 break-words">{activity.user}</p>
                      <p className="text-xs sm:text-sm text-gray-600 mt-0.5 break-words">{activity.action}</p>
                      <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
           
          </div>
        </main>
      </div>

  );
};

export default OaklyDashboard;