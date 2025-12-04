import React, { useState } from 'react';
import {
  Users,
  Search,
  Download,
  Plus,
  Eye,
  Edit2,
  Phone,
  Mail,
  MapPin,
  Building2,
  Calendar,
  DollarSign,
  ShoppingCart,
  TrendingUp,
  Star,
  MessageSquare,
  FileText,
  Clock,
  CheckCircle,
  XCircle,
  Award,
  Briefcase
} from 'lucide-react';

interface ContractorProject {
  projectName: string;
  orderNumber: string;
  date: string;
  amount: number;
  status: 'Completed' | 'In Progress' | 'Pending';
}

interface Contractor {
  id: string;
  companyName: string;
  contactPerson: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  type: 'Contractor' | 'Builder' | 'Retailer' | 'Manufacturer';
  status: 'Active' | 'Inactive' | 'VIP';
  rating: number;
  joinedDate: string;
  totalOrders: number;
  totalSpent: number;
  lastOrderDate: string;
  projects: ContractorProject[];
  notes?: string;
  paymentTerms: string;
  creditLimit: number;
  outstandingBalance: number;
}

const OaklyContractors: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [selectedContractor, setSelectedContractor] = useState<Contractor | null>(null);
  const [showContractorDetail, setShowContractorDetail] = useState(false);

  // Sample contractors data
  const contractorsData: Contractor[] = [
    {
      id: 'CON-001',
      companyName: 'Mountain View Builders',
      contactPerson: 'Robert Martinez',
      email: 'robert@mountainviewbuilders.com',
      phone: '(555) 123-4567',
      address: '1234 Construction Ave',
      city: 'Portland',
      state: 'OR',
      zipCode: '97201',
      type: 'Contractor',
      status: 'VIP',
      rating: 5,
      joinedDate: '2022-03-15',
      totalOrders: 47,
      totalSpent: 385420,
      lastOrderDate: '2024-11-05',
      paymentTerms: 'Net 30',
      creditLimit: 100000,
      outstandingBalance: 12500,
      projects: [
        { projectName: 'Oak Ridge Development', orderNumber: 'OAK-2024-1001', date: '2024-11-05', amount: 44314, status: 'In Progress' },
        { projectName: 'Riverside Homes Phase 2', orderNumber: 'OAK-2024-0987', date: '2024-10-28', amount: 52800, status: 'Completed' },
        { projectName: 'Downtown Condos', orderNumber: 'OAK-2024-0945', date: '2024-10-15', amount: 38200, status: 'Completed' }
      ],
      notes: 'Preferred customer. Always pays on time. Bulk order discounts applied.'
    },
    {
      id: 'CON-002',
      companyName: 'Timber Creek Construction',
      contactPerson: 'Sarah Johnson',
      email: 'sarah@timbercreek.com',
      phone: '(555) 234-5678',
      address: '5678 Builder Blvd',
      city: 'Seattle',
      state: 'WA',
      zipCode: '98101',
      type: 'Builder',
      status: 'Active',
      rating: 4.5,
      joinedDate: '2021-07-22',
      totalOrders: 62,
      totalSpent: 478950,
      lastOrderDate: '2024-11-06',
      paymentTerms: 'Net 30',
      creditLimit: 150000,
      outstandingBalance: 8900,
      projects: [
        { projectName: 'Cedar Grove Estates', orderNumber: 'OAK-2024-1002', date: '2024-11-06', amount: 15270, status: 'In Progress' },
        { projectName: 'Lakefront Villas', orderNumber: 'OAK-2024-0998', date: '2024-11-01', amount: 67500, status: 'Completed' },
        { projectName: 'Mountain View Cabins', orderNumber: 'OAK-2024-0976', date: '2024-10-22', amount: 42100, status: 'Completed' }
      ],
      notes: 'Specializes in high-end residential projects. Prefers cedar and premium hardwoods.'
    },
    {
      id: 'CON-003',
      companyName: 'Heritage Furniture Co.',
      contactPerson: 'David Chen',
      email: 'david@heritagefurniture.com',
      phone: '(555) 345-6789',
      address: '910 Furniture Pkwy',
      city: 'San Francisco',
      state: 'CA',
      zipCode: '94102',
      type: 'Manufacturer',
      status: 'VIP',
      rating: 5,
      joinedDate: '2020-01-10',
      totalOrders: 128,
      totalSpent: 892340,
      lastOrderDate: '2024-11-04',
      paymentTerms: 'Net 45',
      creditLimit: 200000,
      outstandingBalance: 24500,
      projects: [
        { projectName: 'Custom Dining Sets Q4', orderNumber: 'OAK-2024-1003', date: '2024-11-04', amount: 20504, status: 'Completed' },
        { projectName: 'Executive Office Collection', orderNumber: 'OAK-2024-0989', date: '2024-10-29', amount: 58900, status: 'Completed' },
        { projectName: 'Bedroom Furniture Line', orderNumber: 'OAK-2024-0961', date: '2024-10-10', amount: 72300, status: 'Completed' }
      ],
      notes: 'Premium furniture manufacturer. High volume orders. Requires premium grade lumber only.'
    },
    {
      id: 'CON-004',
      companyName: 'Green Valley Homes',
      contactPerson: 'Michael Thompson',
      email: 'mike@greenvalleyhomes.com',
      phone: '(555) 456-7890',
      address: '2468 Valley Rd',
      city: 'Austin',
      state: 'TX',
      zipCode: '78701',
      type: 'Contractor',
      status: 'Active',
      rating: 4,
      joinedDate: '2022-09-18',
      totalOrders: 34,
      totalSpent: 298650,
      lastOrderDate: '2024-11-07',
      paymentTerms: 'Net 30',
      creditLimit: 75000,
      outstandingBalance: 15200,
      projects: [
        { projectName: 'Suburban Development Phase 3', orderNumber: 'OAK-2024-1004', date: '2024-11-07', amount: 22212, status: 'Pending' },
        { projectName: 'Fencing Project - Oak Hills', orderNumber: 'OAK-2024-0992', date: '2024-10-30', amount: 18900, status: 'Completed' },
        { projectName: 'Deck Renovation Contract', orderNumber: 'OAK-2024-0970', date: '2024-10-18', amount: 14500, status: 'Completed' }
      ],
      notes: 'Focus on residential fencing and decking. Seasonal peaks in spring/summer.'
    },
    {
      id: 'CON-005',
      companyName: 'Artisan Woodworks Studio',
      contactPerson: 'Emily Rodriguez',
      email: 'emily@artisanwood.com',
      phone: '(555) 567-8901',
      address: '1357 Workshop St',
      city: 'Denver',
      state: 'CO',
      zipCode: '80202',
      type: 'Retailer',
      status: 'Active',
      rating: 4.5,
      joinedDate: '2023-02-14',
      totalOrders: 28,
      totalSpent: 156780,
      lastOrderDate: '2024-11-03',
      paymentTerms: 'Net 15',
      creditLimit: 50000,
      outstandingBalance: 6800,
      projects: [
        { projectName: 'Custom Flooring Installation', orderNumber: 'OAK-2024-1005', date: '2024-11-03', amount: 9820, status: 'Completed' },
        { projectName: 'Boutique Store Fixtures', orderNumber: 'OAK-2024-0994', date: '2024-10-31', amount: 12400, status: 'Completed' },
        { projectName: 'Residential Remodel', orderNumber: 'OAK-2024-0982', date: '2024-10-25', amount: 8900, status: 'Completed' }
      ],
      notes: 'Small batch custom work. Prefers exotic and premium hardwoods.'
    },
    {
      id: 'CON-006',
      companyName: 'Skyline Developments Corp',
      contactPerson: 'James Wilson',
      email: 'jwilson@skylinedev.com',
      phone: '(555) 678-9012',
      address: '7890 Skyline Dr',
      city: 'Phoenix',
      state: 'AZ',
      zipCode: '85001',
      type: 'Builder',
      status: 'Active',
      rating: 3.5,
      joinedDate: '2023-06-20',
      totalOrders: 18,
      totalSpent: 124500,
      lastOrderDate: '2024-10-20',
      paymentTerms: 'Net 30',
      creditLimit: 60000,
      outstandingBalance: 4200,
      projects: [
        { projectName: 'Commercial Plaza Build', orderNumber: 'OAK-2024-0988', date: '2024-10-20', amount: 28900, status: 'Completed' },
        { projectName: 'Office Complex Interior', orderNumber: 'OAK-2024-0965', date: '2024-10-12', amount: 35600, status: 'Completed' }
      ],
      notes: 'Commercial projects. Payment sometimes delayed. Monitor credit limit.'
    },
    {
      id: 'CON-007',
      companyName: 'Premier Home Solutions',
      contactPerson: 'Jennifer Lee',
      email: 'jlee@premierhome.com',
      phone: '(555) 789-0123',
      address: '3690 Home Ave',
      city: 'Boston',
      state: 'MA',
      zipCode: '02101',
      type: 'Contractor',
      status: 'VIP',
      rating: 5,
      joinedDate: '2021-11-08',
      totalOrders: 89,
      totalSpent: 654320,
      lastOrderDate: '2024-10-30',
      paymentTerms: 'Net 30',
      creditLimit: 175000,
      outstandingBalance: 18900,
      projects: [
        { projectName: 'Historic Home Restoration', orderNumber: 'OAK-2024-0993', date: '2024-10-30', amount: 48200, status: 'In Progress' },
        { projectName: 'Luxury Kitchen Remodels', orderNumber: 'OAK-2024-0980', date: '2024-10-24', amount: 36800, status: 'Completed' },
        { projectName: 'Hardwood Flooring Package', orderNumber: 'OAK-2024-0968', date: '2024-10-16', amount: 42100, status: 'Completed' }
      ],
      notes: 'Top tier contractor. Specializes in historic restorations. Excellent payment history.'
    },
    {
      id: 'CON-008',
      companyName: 'Coastal Construction LLC',
      contactPerson: 'Mark Anderson',
      email: 'mark@coastalconstruction.com',
      phone: '(555) 890-1234',
      address: '4567 Coastal Hwy',
      city: 'Miami',
      state: 'FL',
      zipCode: '33101',
      type: 'Contractor',
      status: 'Inactive',
      rating: 3,
      joinedDate: '2022-04-12',
      totalOrders: 12,
      totalSpent: 89450,
      lastOrderDate: '2024-06-15',
      paymentTerms: 'Net 30',
      creditLimit: 40000,
      outstandingBalance: 0,
      projects: [
        { projectName: 'Beachfront Deck Project', orderNumber: 'OAK-2024-0756', date: '2024-06-15', amount: 24500, status: 'Completed' },
        { projectName: 'Waterfront Renovation', orderNumber: 'OAK-2024-0698', date: '2024-05-10', amount: 18900, status: 'Completed' }
      ],
      notes: 'Inactive for 5 months. Follow up to re-engage.'
    }
  ];

  // Filter contractors
  const filteredContractors = contractorsData.filter(contractor => {
    const matchesSearch = 
      contractor.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contractor.contactPerson.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contractor.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contractor.phone.includes(searchQuery);
    
    const matchesType = selectedType === 'All' || contractor.type === selectedType;
    const matchesStatus = selectedStatus === 'All' || contractor.status === selectedStatus;
    
    return matchesSearch && matchesType && matchesStatus;
  });

  // Calculate stats
  const totalContractors = contractorsData.length;
  const activeContractors = contractorsData.filter(c => c.status === 'Active').length;
  const vipContractors = contractorsData.filter(c => c.status === 'VIP').length;
  const inactiveContractors = contractorsData.filter(c => c.status === 'Inactive').length;
  const totalRevenue = contractorsData.reduce((sum, c) => sum + c.totalSpent, 0);
  const avgOrderValue = totalRevenue / contractorsData.reduce((sum, c) => sum + c.totalOrders, 0);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800 border-green-200';
      case 'VIP': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'Inactive': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Active': return <CheckCircle className="w-4 h-4" />;
      case 'VIP': return <Award className="w-4 h-4" />;
      case 'Inactive': return <XCircle className="w-4 h-4" />;
      default: return null;
    }
  };

  const getProjectStatusColor = (status: string) => {
    switch (status) {
      case 'Completed': return 'text-green-600';
      case 'In Progress': return 'text-blue-600';
      case 'Pending': return 'text-yellow-600';
      default: return 'text-gray-600';
    }
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-4 h-4 ${
              star <= rating 
                ? 'fill-yellow-400 text-yellow-400' 
                : 'text-gray-300'
            }`}
          />
        ))}
        <span className="ml-1 text-sm text-gray-600">({rating})</span>
      </div>
    );
  };

  const openContractorDetail = (contractor: Contractor) => {
    setSelectedContractor(contractor);
    setShowContractorDetail(true);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Contractors & Clients</h1>
        </div>
        <button className="px-4 py-2 bg-amber-800 text-white rounded-lg hover:bg-amber-900 transition-colors flex items-center justify-center gap-2 text-sm sm:text-base">
          <Plus className="w-5 h-5" />
          Add Client
        </button>
      </div>


              <div className="h-5 sm:h-9"></div>

      {/* Stats Cards */}
      <div className="px-4 sm:px-6 lg:px-8 py-4">
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-7xl">
    <div className="bg-white rounded-xl shadow-sm p-6 sm:p-8 border-2 border-gray-300">
      <div className="flex items-center justify-between mb-3">
        <p className="text-sm sm:text-base text-gray-600 font-medium">Total Clients</p>
        <Users className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400" />
      </div>
      <p className="text-3xl sm:text-4xl font-bold text-gray-900">{totalContractors}</p>
    </div>
    
    <div className="bg-white rounded-xl shadow-sm p-6 sm:p-8 border-2 border-gray-300">
      <div className="flex items-center justify-between mb-3">
        <p className="text-sm sm:text-base text-gray-600 font-medium">Active</p>
        <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
      </div>
      <p className="text-3xl sm:text-4xl font-bold text-green-600">{activeContractors}</p>
    </div>
    
    <div className="bg-white rounded-xl shadow-sm p-6 sm:p-8 border-2 border-gray-300">
      <div className="flex items-center justify-between mb-3">
        <p className="text-sm sm:text-base text-gray-600 font-medium">VIP</p>
        <Award className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600" />
      </div>
      <p className="text-3xl sm:text-4xl font-bold text-purple-600">{vipContractors}</p>
    </div>
    
    <div className="bg-white rounded-xl shadow-sm p-6 sm:p-8 border-2 border-gray-300">
      <div className="flex items-center justify-between mb-3">
        <p className="text-sm sm:text-base text-gray-600 font-medium">Inactive</p>
        <XCircle className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400" />
      </div>
      <p className="text-3xl sm:text-4xl font-bold text-gray-600">{inactiveContractors}</p>
    </div>
    
    <div className="bg-white rounded-xl shadow-sm p-6 sm:p-8 border-2 border-gray-300">
      <div className="flex items-center justify-between mb-3">
        <p className="text-sm sm:text-base text-gray-600 font-medium">Total Revenue</p>
        <DollarSign className="w-5 h-5 sm:w-6 sm:h-6 text-amber-600" />
      </div>
      <p className="text-2xl sm:text-3xl font-bold text-amber-800">${(totalRevenue / 1000).toFixed(0)}k</p>
    </div>
    
    <div className="bg-white rounded-xl shadow-sm p-6 sm:p-8 border-2 border-gray-300">
      <div className="flex items-center justify-between mb-3">
        <p className="text-sm sm:text-base text-gray-600 font-medium">Avg Order</p>
        <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
      </div>
      <p className="text-2xl sm:text-3xl font-bold text-blue-600">${(avgOrderValue / 1000).toFixed(1)}k</p>
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
              placeholder="             Search by company name, contact person, email, or phone..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-600"
            />
          </div>

          {/* Type Filter */}
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-600 bg-white"
          >
            <option value="All">All Types</option>
            <option value="Contractor">Contractors</option>
            <option value="Builder">Builders</option>
            <option value="Retailer">Retailers</option>
            <option value="Manufacturer">Manufacturers</option>
          </select>

          {/* Status Filter */}
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-600 bg-white"
          >
            <option value="All">All Status</option>
            <option value="Active">Active</option>
            <option value="VIP">VIP</option>
            <option value="Inactive">Inactive</option>
          </select>

          {/* Export Button */}
          <button className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-2 text-sm">
            <Download className="w-4 h-4" />
            <span className="hidden sm:inline">Export</span>
          </button>
        </div>
      </div>

         <div className="h-5 sm:h-9"></div>



      {/* Contractors Grid - Desktop */}
      <div className="hidden lg:grid grid-cols-1 xl:grid-cols-2 gap-6">
        {filteredContractors.map((contractor) => (
          <div key={contractor.id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden">
            {/* Card Header */}
            <div className="bg-gradient-to-r from-amber-50 to-amber-100 p-6 border-b border-amber-200">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-bold text-gray-900 break-words">{contractor.companyName}</h3>
                  <p className="text-sm text-gray-600 mt-1">{contractor.contactPerson}</p>
                </div>
                <span className={`ml-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border flex-shrink-0 ${getStatusColor(contractor.status)}`}>
                  {getStatusIcon(contractor.status)}
                  {contractor.status}
                </span>
              </div>
              {renderStars(contractor.rating)}
            </div>

            {/* Card Body */}
            <div className="p-6 space-y-4">
              {/* Contact Info */}
              <div className="grid grid-cols-1 gap-2 text-sm">
                <div className="flex items-center gap-2 text-gray-600">
                  <Mail className="w-4 h-4 flex-shrink-0" />
                  <span className="truncate">{contractor.email}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Phone className="w-4 h-4 flex-shrink-0" />
                  <span>{contractor.phone}</span>
                </div>
                <div className="flex items-start gap-2 text-gray-600">
                  <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5" />
                  <span>{contractor.address}, {contractor.city}, {contractor.state} {contractor.zipCode}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Briefcase className="w-4 h-4 flex-shrink-0" />
                  <span>{contractor.type}</span>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-100">
                <div>
                  <p className="text-xs text-gray-500">Total Orders</p>
                  <p className="text-lg font-bold text-gray-900">{contractor.totalOrders}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Total Spent</p>
                  <p className="text-lg font-bold text-amber-800">${(contractor.totalSpent / 1000).toFixed(0)}k</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Balance</p>
                  <p className="text-lg font-bold text-blue-600">${(contractor.outstandingBalance / 1000).toFixed(1)}k</p>
                </div>
              </div>

              {/* Last Order */}
              <div className="flex items-center justify-between text-xs text-gray-500 pt-2 border-t border-gray-100">
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  Last order: {new Date(contractor.lastOrderDate).toLocaleDateString()}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  Joined: {new Date(contractor.joinedDate).toLocaleDateString()}
                </span>
              </div>
            </div>

            {/* Card Footer */}
            <div className="bg-gray-50 px-6 py-3 flex items-center gap-2">
              <button 
                onClick={() => openContractorDetail(contractor)}
                className="flex-1 px-3 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-1.5"
              >
                <Eye className="w-4 h-4" />
                View Profile
              </button>
              <button className="px-3 py-2 text-sm bg-white border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-1.5">
                <Edit2 className="w-4 h-4" />
                Edit
              </button>
              <button className="px-3 py-2 text-sm bg-white border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                <MessageSquare className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Contractors Cards - Mobile */}
      <div className="lg:hidden space-y-4">
        {filteredContractors.map((contractor) => (
          <div key={contractor.id} className="bg-white rounded-xl shadow-sm p-4">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1 min-w-0">
                <h3 className="text-base font-bold text-gray-900 break-words">{contractor.companyName}</h3>
                <p className="text-sm text-gray-600 mt-0.5">{contractor.contactPerson}</p>
                <div className="mt-2">{renderStars(contractor.rating)}</div>
              </div>
              <span className={`ml-2 inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border flex-shrink-0 ${getStatusColor(contractor.status)}`}>
                {getStatusIcon(contractor.status)}
              </span>
            </div>

            <div className="space-y-2 text-xs mb-3">
              <div className="flex items-center gap-2 text-gray-600">
                <Mail className="w-3 h-3" />
                <span className="truncate">{contractor.email}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Phone className="w-3 h-3" />
                <span>{contractor.phone}</span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 mb-3 text-xs">
              <div>
                <p className="text-gray-500">Orders</p>
                <p className="font-bold text-gray-900">{contractor.totalOrders}</p>
              </div>
              <div>
                <p className="text-gray-500">Spent</p>
                <p className="font-bold text-amber-800">${(contractor.totalSpent / 1000).toFixed(0)}k</p>
              </div>
              <div>
                <p className="text-gray-500">Balance</p>
                <p className="font-bold text-blue-600">${(contractor.outstandingBalance / 1000).toFixed(1)}k</p>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-3 border-t border-gray-100">
              <button 
                onClick={() => openContractorDetail(contractor)}
                className="flex-1 px-3 py-2 text-xs bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-1"
              >
                <Eye className="w-3 h-3" />
                View
              </button>
              <button className="flex-1 px-3 py-2 text-xs bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center gap-1">
                <Edit2 className="w-3 h-3" />
                Edit
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* No Results */}
      {filteredContractors.length === 0 && (
        <div className="bg-white rounded-xl shadow-sm p-12 text-center">
          <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 text-lg">No contractors found matching your filters</p>
          <p className="text-gray-400 text-sm mt-2">Try adjusting your search or filters</p>
        </div>
      )}

      {/* Contractor Detail Modal */}
      {showContractorDetail && selectedContractor && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="sticky top-0 bg-gradient-to-r from-amber-800 to-amber-900 text-white px-6 py-5">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h2 className="text-2xl font-bold">{selectedContractor.companyName}</h2>
                  <p className="text-amber-100 mt-1">{selectedContractor.contactPerson} • {selectedContractor.type}</p>
                  <div className="mt-3 flex items-center gap-3">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border bg-white ${getStatusColor(selectedContractor.status)}`}>
                      {getStatusIcon(selectedContractor.status)}
                      {selectedContractor.status}
                    </span>
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`w-5 h-5 ${
                            star <= selectedContractor.rating 
                              ? 'fill-yellow-300 text-yellow-300' 
                              : 'text-amber-200'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setShowContractorDetail(false)}
                  className="p-2 hover:bg-amber-700 rounded-lg transition-colors"
                >
                  <XCircle className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6">
              {/* Key Metrics */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-blue-50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <ShoppingCart className="w-5 h-5 text-blue-600" />
                  </div>
                  <p className="text-xs text-gray-600 mb-1">Total Orders</p>
                  <p className="text-2xl font-bold text-gray-900">{selectedContractor.totalOrders}</p>
                </div>
                <div className="bg-amber-50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <DollarSign className="w-5 h-5 text-amber-600" />
                  </div>
                  <p className="text-xs text-gray-600 mb-1">Total Spent</p>
                  <p className="text-2xl font-bold text-amber-800">${selectedContractor.totalSpent.toLocaleString()}</p>
                </div>
                <div className="bg-green-50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <TrendingUp className="w-5 h-5 text-green-600" />
                  </div>
                  <p className="text-xs text-gray-600 mb-1">Avg Order</p>
                  <p className="text-2xl font-bold text-green-600">${(selectedContractor.totalSpent / selectedContractor.totalOrders).toLocaleString(undefined, {maximumFractionDigits: 0})}</p>
                </div>
                <div className="bg-purple-50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <FileText className="w-5 h-5 text-purple-600" />
                  </div>
                  <p className="text-xs text-gray-600 mb-1">Outstanding</p>
                  <p className="text-2xl font-bold text-purple-600">${selectedContractor.outstandingBalance.toLocaleString()}</p>
                </div>
              </div>

              {/* Contact & Business Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Contact Information */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <Phone className="w-5 h-5 text-amber-800" />
                    Contact Information
                  </h3>
                  <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                    <div className="flex items-center gap-3">
                      <Mail className="w-4 h-4 text-gray-400 flex-shrink-0" />
                      <a href={`mailto:${selectedContractor.email}`} className="text-sm text-blue-600 hover:underline break-all">
                        {selectedContractor.email}
                      </a>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone className="w-4 h-4 text-gray-400 flex-shrink-0" />
                      <a href={`tel:${selectedContractor.phone}`} className="text-sm text-gray-900">
                        {selectedContractor.phone}
                      </a>
                    </div>
                    <div className="flex items-start gap-3">
                      <MapPin className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" />
                      <div className="text-sm text-gray-900">
                        <p>{selectedContractor.address}</p>
                        <p>{selectedContractor.city}, {selectedContractor.state} {selectedContractor.zipCode}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Business Information */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <Building2 className="w-5 h-5 text-amber-800" />
                    Business Information
                  </h3>
                  <div className="bg-gray-50 rounded-lg p-4 space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Payment Terms:</span>
                      <span className="font-medium text-gray-900">{selectedContractor.paymentTerms}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Credit Limit:</span>
                      <span className="font-medium text-gray-900">${selectedContractor.creditLimit.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Joined Date:</span>
                      <span className="font-medium text-gray-900">
                        {new Date(selectedContractor.joinedDate).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Last Order:</span>
                      <span className="font-medium text-gray-900">
                        {new Date(selectedContractor.lastOrderDate).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recent Projects */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Briefcase className="w-5 h-5 text-amber-800" />
                  Recent Projects
                </h3>
                <div className="border border-gray-200 rounded-lg overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Project</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Order #</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                        <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Amount</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {selectedContractor.projects.map((project, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                          <td className="px-4 py-3 text-sm text-gray-900">{project.projectName}</td>
                          <td className="px-4 py-3 text-sm text-gray-600">{project.orderNumber}</td>
                          <td className="px-4 py-3 text-sm text-gray-600">
                            {new Date(project.date).toLocaleDateString()}
                          </td>
                          <td className="px-4 py-3 text-sm font-medium text-right text-gray-900">
                            ${project.amount.toLocaleString()}
                          </td>
                          <td className="px-4 py-3">
                            <span className={`text-xs font-medium ${getProjectStatusColor(project.status)}`}>
                              {project.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Notes */}
              {selectedContractor.notes && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <FileText className="w-5 h-5 text-amber-800" />
                    Account Notes
                  </h3>
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <p className="text-sm text-gray-700">{selectedContractor.notes}</p>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-4 border-t border-gray-200">
                <button className="px-4 py-2 bg-amber-800 text-white rounded-lg hover:bg-amber-900 transition-colors flex items-center justify-center gap-2 text-sm">
                  <ShoppingCart className="w-4 h-4" />
                  New Order
                </button>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 text-sm">
                  <FileText className="w-4 h-4" />
                  Statement
                </button>
                <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-2 text-sm">
                  <Edit2 className="w-4 h-4" />
                  Edit
                </button>
                <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-2 text-sm">
                  <MessageSquare className="w-4 h-4" />
                  Message
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OaklyContractors;