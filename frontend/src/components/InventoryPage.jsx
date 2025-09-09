import React, { useState } from 'react';
import '../App.css';
import '../css/InventoryPage.css';

// Mock inventory data
const inventoryData = [
  {
    id: 1,
    name: "Emergency Medical Kits",
    category: "Medical",
    currentStock: 156,
    minThreshold: 100,
    maxCapacity: 500,
    unit: "kits",
    location: "Houston Medical Center",
    lastUpdated: "2 hours ago",
    status: "adequate",
    cost: 45.99,
    supplier: "MedSupply Corp",
  },
  {
    id: 2,
    name: "Blood Supply (Type O)",
    category: "Medical",
    currentStock: 23,
    minThreshold: 50,
    maxCapacity: 200,
    unit: "units",
    location: "Regional Blood Bank",
    lastUpdated: "30 minutes ago",
    status: "critical",
    cost: 125.0,
    supplier: "Blood Services Inc",
  },
  {
    id: 3,
    name: "MRE (Meals Ready to Eat)",
    category: "Food",
    currentStock: 3400,
    minThreshold: 2000,
    maxCapacity: 10000,
    unit: "meals",
    location: "Central Food Warehouse",
    lastUpdated: "1 hour ago",
    status: "adequate",
    cost: 8.5,
    supplier: "Emergency Foods LLC",
  },
  {
    id: 4,
    name: "Emergency Blankets",
    category: "Shelter",
    currentStock: 1200,
    minThreshold: 800,
    maxCapacity: 3000,
    unit: "blankets",
    location: "Supply Depot A",
    lastUpdated: "45 minutes ago",
    status: "adequate",
    cost: 12.99,
    supplier: "Shelter Solutions",
  },
  {
    id: 5,
    name: "Portable Generators",
    category: "Equipment",
    currentStock: 19,
    minThreshold: 25,
    maxCapacity: 100,
    unit: "units",
    location: "Equipment Center",
    lastUpdated: "3 hours ago",
    status: "low",
    cost: 899.99,
    supplier: "Power Systems Pro",
  },
  {
    id: 6,
    name: "Water Purification Tablets",
    category: "Water",
    currentStock: 5600,
    minThreshold: 3000,
    maxCapacity: 15000,
    unit: "tablets",
    location: "Water Treatment Facility",
    lastUpdated: "1 hour ago",
    status: "adequate",
    cost: 0.25,
    supplier: "AquaPure Systems",
  },
  {
    id: 7,
    name: "Communication Radios",
    category: "Equipment",
    currentStock: 8,
    minThreshold: 15,
    maxCapacity: 50,
    unit: "radios",
    location: "Communications Hub",
    lastUpdated: "2 hours ago",
    status: "critical",
    cost: 245.0,
    supplier: "CommTech Solutions",
  },
  {
    id: 8,
    name: "Emergency Tents",
    category: "Shelter",
    currentStock: 67,
    minThreshold: 40,
    maxCapacity: 200,
    unit: "tents",
    location: "Supply Depot B",
    lastUpdated: "4 hours ago",
    status: "adequate",
    cost: 89.99,
    supplier: "Shelter Solutions",
  },
];

const locations = [
  { id: 1, name: "Houston Medical Center", type: "Medical Facility", capacity: "85%" },
  { id: 2, name: "Central Food Warehouse", type: "Food Storage", capacity: "67%" },
  { id: 3, name: "Supply Depot A", type: "General Storage", capacity: "72%" },
  { id: 4, name: "Supply Depot B", type: "General Storage", capacity: "58%" },
  { id: 5, name: "Equipment Center", type: "Equipment Storage", capacity: "91%" },
];

const recentTransactions = [
  {
    id: 1,
    type: "outbound",
    item: "Emergency Medical Kits",
    quantity: 25,
    destination: "Hurricane Response - Miami",
    timestamp: "2 hours ago",
    status: "completed",
  },
  {
    id: 2,
    type: "inbound",
    item: "MRE (Meals Ready to Eat)",
    quantity: 500,
    source: "Emergency Foods LLC",
    timestamp: "4 hours ago",
    status: "completed",
  },
  {
    id: 3,
    type: "outbound",
    item: "Emergency Blankets",
    quantity: 150,
    destination: "Flood Response - Houston",
    timestamp: "6 hours ago",
    status: "in-transit",
  },
  {
    id: 4,
    type: "inbound",
    item: "Portable Generators",
    quantity: 5,
    source: "Power Systems Pro",
    timestamp: "8 hours ago",
    status: "pending",
  },
];

// Inline SVG Icons
const PackageIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M12.89 1.48a.74.74 0 0 0-1.78 0L.92 8.44l11.08 6.06L23.08 8.44 12.89 1.48zM2.87 9.94l9.14 5.01-9.14 5.01a.75.75 0 0 1-.95-.69V10.63a.75.75 0 0 1 .8-.69zM21.13 9.94a.75.75 0 0 0-.8.69v9.14a.75.75 0 0 0 .95.69l9.14-5.01-9.14-5.01z" />
  </svg>
);
const AlertTriangleIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
    <line x1="12" y1="9" x2="12" y2="13" />
    <line x1="12" y1="17" x2="12.01" y2="17" />
  </svg>
);
const PlusIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);
const SearchIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);
const DownloadIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </svg>
);
const TruckIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M14 18l-6.19 2.5a.75.75 0 0 1-.81-.69V5.5L14 3v15z" />
    <path d="M14 18h6a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2H14" />
    <path d="M5 18a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" />
    <path d="M21 18a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" />
  </svg>
);
const MapPinIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M12 10s3-5.22-3-10-6 5.22-3 10c0 4.96 6 12 6 12s6-7.04 6-12z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);
const ClockIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);
const TrendingUpIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <polyline points="18 10 22 6 12 6 8 18 2 12" />
  </svg>
);
const TrendingDownIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <polyline points="18 10 22 6 12 6 8 18 2 12" />
  </svg>
);
const CheckCircleIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M22 11.08V12a10 10 0 1 1-5.93-8.64" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);

// Component for a styled card
const Card = ({ title, description, children }) => (
  <div className="bg-card-bg rounded-xl shadow-lg border border-border overflow-hidden card-transition">
    <div className="p-6">
      <h3 className="text-xl font-semibold text-heading">{title}</h3>
      <p className="text-sm text-muted mt-1">{description}</p>
      <div className="mt-4">{children}</div>
    </div>
  </div>
);

// Component for styled button
const Button = ({ variant = 'default', children, onClick, size = 'default' }) => {
  const baseClasses = 'px-4 py-2 rounded-lg text-sm font-medium transition-colors button-shadow';
  const variants = {
    default: 'bg-primary text-white hover:bg-primary-hover',
    outline: 'bg-transparent text-text border border-border hover:bg-secondary',
  };
  const sizes = {
    default: 'px-4 py-2 text-sm',
    sm: 'px-3 py-1 text-xs',
  };
  const classes = `${baseClasses} ${variants[variant]} ${sizes[size]}`;
  return <button className={classes} onClick={onClick}>{children}</button>;
};

// Component for a styled badge
const Badge = ({ variant = 'default', children, className = '' }) => {
  const baseClasses = 'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors';
  const variants = {
    outline: 'border border-border bg-card-bg text-text',
  };
  const classes = `${baseClasses} ${variants[variant]} ${className}`;
  return <div className={classes}>{children}</div>;
};

// Component for styled dialog
const Dialog = ({ open, onOpenChange, children }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black bg-opacity-50 dialog-overlay">
      <div className="bg-card-bg rounded-lg shadow-xl p-6 w-full max-w-md mx-4 dialog-content">
        {children}
      </div>
    </div>
  );
};

const DialogHeader = ({ title, description }) => (
  <div className="text-center space-y-2">
    <h3 className="text-xl font-bold text-heading">{title}</h3>
    <p className="text-sm text-muted">{description}</p>
  </div>
);

const DialogFooter = ({ children }) => (
  <div className="flex justify-end gap-2 mt-4">{children}</div>
);

const DialogTrigger = ({ children, asChild, onClick }) => {
  if (asChild) {
    return React.cloneElement(children, { onClick });
  }
  return <Button onClick={onClick}>{children}</Button>;
};

// Component for styled tabs
const Tabs = ({ defaultValue, children }) => {
  const [activeTab, setActiveTab] = useState(defaultValue);
  return (
    <div className="space-y-6">
      {React.Children.map(children, (child) =>
        React.cloneElement(child, { activeTab, setActiveTab })
      )}
    </div>
  );
};

const TabsList = ({ children, activeTab, setActiveTab }) => (
  <div className="grid grid-cols-4 w-full bg-secondary rounded-lg p-1">
    {React.Children.map(children, (child) =>
      React.cloneElement(child, { activeTab, setActiveTab })
    )}
  </div>
);

const TabsTrigger = ({ value, children, activeTab, setActiveTab }) => (
  <button
    className={`p-2 rounded-md transition-colors ${
      activeTab === value
        ? 'bg-card-bg text-heading shadow tabs-trigger-active'
        : 'text-muted hover:text-heading tabs-trigger-inactive'
    }`}
    onClick={() => setActiveTab(value)}
  >
    {children}
  </button>
);

const TabsContent = ({ value, children, activeTab }) => {
  if (value !== activeTab) return null;
  return <div>{children}</div>;
};

// Component for styled progress bar
const Progress = ({ value }) => (
  <div className="w-full h-2 bg-secondary rounded-full overflow-hidden progress-bar">
    <div className="h-full bg-primary transition-all duration-300 progress-fill" style={{ width: `${value}%` }}></div>
  </div>
);

// Component for styled table
const Table = ({ children }) => (
  <div className="overflow-x-auto">
    <table className="min-w-full divide-y divide-border">{children}</table>
  </div>
);

const TableHeader = ({ children }) => <thead>{children}</thead>;
const TableBody = ({ children }) => <tbody className="divide-y divide-border">{children}</tbody>;
const TableRow = ({ children }) => <tr className="hover:bg-secondary transition-colors table-row-hover">{children}</tr>;
const TableHead = ({ children }) => <th className="px-6 py-3 text-left text-xs font-medium text-muted uppercase tracking-wider">{children}</th>;
const TableCell = ({ children, className = '' }) => <td className={`px-6 py-4 whitespace-nowrap text-sm text-text ${className}`}>{children}</td>;

// Component for styled input
const Input = ({ className = '', ...props }) => (
  <input className={`w-full p-2 border border-border rounded-md focus:ring focus:ring-primary ${className}`} {...props} />
);

// Component for styled label
const Label = ({ children, htmlFor }) => (
  <label htmlFor={htmlFor} className="block text-sm font-medium text-text mb-1">
    {children}
  </label>
);

// Component for styled select
const Select = ({ value, onValueChange, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(value);

  const handleSelect = (itemValue) => {
    setSelected(itemValue);
    onValueChange(itemValue);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      {React.Children.map(children, (child) =>
        React.cloneElement(child, {
          onClick: () => setIsOpen(!isOpen),
          selected: selected,
        })
      )}
      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-card-bg border border-border rounded-lg shadow-lg">
          {React.Children.map(children, (child) =>
            React.cloneElement(child, { onSelect: handleSelect, selected: selected })
          )}
        </div>
      )}
    </div>
  );
};

const SelectTrigger = ({ onClick, children }) => (
  <button onClick={onClick} className="w-full text-left p-2 border border-border rounded-md bg-card-bg text-text flex items-center justify-between">
    {children}
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
    </svg>
  </button>
);

const SelectValue = ({ placeholder }) => <span>{placeholder}</span>;

const SelectContent = ({ children, onSelect }) => (
  <div>
    {React.Children.map(children, (child) =>
      React.cloneElement(child, { onSelect })
    )}
  </div>
);

const SelectItem = ({ value, children, onSelect }) => (
  <div onClick={() => onSelect(value)} className="p-2 hover:bg-secondary cursor-pointer">
    {children}
  </div>
);

// Main Application Component
export default function InventoryPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("all");
  const [isRequestDialogOpen, setIsRequestDialogOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const getStatusColor = (status) => {
    switch (status) {
      case "critical":
        return "badge-critical";
      case "low":
        return "badge-low";
      case "adequate":
        return "badge-adequate";
      default:
        return "";
    }
  };

  const getStockPercentage = (current, max) => {
    return (current / max) * 100;
  };

  const filteredInventory = inventoryData.filter((item) => {
    const matchesCategory = selectedCategory === "all" || item.category.toLowerCase() === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLocation = selectedLocation === "all" || item.location === selectedLocation;
    return matchesCategory && matchesSearch && matchesLocation;
  });

  const criticalItems = inventoryData.filter((item) => item.status === "critical").length;
  const lowStockItems = inventoryData.filter((item) => item.status === "low").length;
  const totalValue = inventoryData.reduce((sum, item) => sum + item.currentStock * item.cost, 0);

  return (
    <div className="min-h-screen bg-background text-text font-inter py-8 px-4">
      <div className="container mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-heading mb-2">Inventory Management</h1>
            <p className="text-muted">
              Optimize relief operations through intelligent inventory tracking and distribution
            </p>
          </div>
          <div className="flex gap-2 mt-4 md:mt-0">
            <Button variant="outline">
              <DownloadIcon className="w-4 h-4 mr-2" />
              Export Report
            </Button>
            <Dialog open={isRequestDialogOpen} onOpenChange={setIsRequestDialogOpen}>
              <DialogTrigger asChild onClick={() => setIsRequestDialogOpen(true)}>
                <Button>
                  <PlusIcon className="w-4 h-4 mr-2" />
                  Request Supplies
                </Button>
              </DialogTrigger>
              <div className="absolute inset-0 flex items-center justify-center">
                {isRequestDialogOpen && (
                  <div className="bg-card-bg rounded-lg shadow-xl p-6 w-full max-w-md">
                    <DialogHeader title="Request Emergency Supplies" description="Submit a request for additional inventory items" />
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="item-select">Select Item</Label>
                        <Select value={selectedItem} onValueChange={setSelectedItem}>
                          <SelectTrigger>
                            <SelectValue placeholder="Choose inventory item" />
                          </SelectTrigger>
                          <SelectContent>
                            {inventoryData.map((item) => (
                              <SelectItem key={item.id} value={item.name}>
                                {item.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="quantity">Quantity Needed</Label>
                        <Input id="quantity" type="number" placeholder="Enter quantity" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="priority">Priority Level</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select priority" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="critical">Critical - Immediate</SelectItem>
                            <SelectItem value="high">High - Within 24 hours</SelectItem>
                            <SelectItem value="medium">Medium - Within 3 days</SelectItem>
                            <SelectItem value="low">Low - Within 1 week</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="destination">Destination</Label>
                        <Input id="destination" placeholder="Delivery location" />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setIsRequestDialogOpen(false)}>
                        Cancel
                      </Button>
                      <Button onClick={() => setIsRequestDialogOpen(false)}>Submit Request</Button>
                    </DialogFooter>
                  </div>
                )}
              </div>
            </Dialog>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card title="Total Items" description={`Across ${locations.length} locations`}>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold text-heading">{inventoryData.length}</div>
              <PackageIcon className="h-4 w-4 text-muted" />
            </div>
          </Card>
          <Card title="Critical Items" description="Require immediate attention">
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold text-critical">{criticalItems}</div>
              <AlertTriangleIcon className="h-4 w-4 text-muted" />
            </div>
          </Card>
          <Card title="Low Stock" description="Need reordering soon">
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold text-warning">{lowStockItems}</div>
              <TrendingDownIcon className="h-4 w-4 text-muted" />
            </div>
          </Card>
          <Card title="Total Value" description="Current inventory value">
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold text-heading">${totalValue.toLocaleString()}</div>
              <TrendingUpIcon className="h-4 w-4 text-muted" />
            </div>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="inventory">
          <TabsList>
            <TabsTrigger value="inventory">Current Inventory</TabsTrigger>
            <TabsTrigger value="locations">Storage Locations</TabsTrigger>
            <TabsTrigger value="transactions">Recent Activity</TabsTrigger>
            <TabsTrigger value="optimization">Optimization</TabsTrigger>
          </TabsList>
          <TabsContent value="inventory">
            {/* Filters */}
            <Card title="Inventory Filters">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="search">Search Items</Label>
                  <div className="relative">
                    <SearchIcon className="absolute left-2 top-2.5 h-4 w-4 text-muted" />
                    <Input id="search" placeholder="Search inventory..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-8" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger>
                      <SelectValue placeholder="All Categories" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      <SelectItem value="medical">Medical</SelectItem>
                      <SelectItem value="food">Food</SelectItem>
                      <SelectItem value="shelter">Shelter</SelectItem>
                      <SelectItem value="equipment">Equipment</SelectItem>
                      <SelectItem value="water">Water</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                    <SelectTrigger>
                      <SelectValue placeholder="All Locations" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Locations</SelectItem>
                      {locations.map((location) => (
                        <SelectItem key={location.id} value={location.name}>
                          {location.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="All Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="critical">Critical</SelectItem>
                      <SelectItem value="low">Low Stock</SelectItem>
                      <SelectItem value="adequate">Adequate</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </Card>

            {/* Inventory Table */}
            <Card title={`Inventory Items (${filteredInventory.length})`} description="Current stock levels and status across all locations">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Item Name</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Current Stock</TableHead>
                    <TableHead>Stock Level</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Last Updated</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredInventory.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">{item.name}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{item.category}</Badge>
                      </TableCell>
                      <TableCell>
                        {item.currentStock.toLocaleString()} {item.unit}
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <Progress value={getStockPercentage(item.currentStock, item.maxCapacity)} />
                          <div className="text-xs text-muted">
                            {Math.round(getStockPercentage(item.currentStock, item.maxCapacity))}% of capacity
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className={getStatusColor(item.status)}>
                          {item.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm">{item.location}</TableCell>
                      <TableCell className="text-sm text-muted">{item.lastUpdated}</TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Button size="sm" variant="outline">
                            <TruckIcon className="w-3 h-3" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <PlusIcon className="w-3 h-3" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          </TabsContent>

          <TabsContent value="locations">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {locations.map((location) => (
                <Card key={location.id}>
                  <div className="p-6">
                    <h3 className="flex items-center text-xl font-bold text-heading">
                      <MapPinIcon className="w-5 h-5 mr-2" />
                      {location.name}
                    </h3>
                    <p className="text-sm text-muted mt-1">{location.type}</p>
                    <div className="mt-4 space-y-4">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Capacity Utilization</span>
                          <span className="font-medium text-text">{location.capacity}</span>
                        </div>
                        <Progress value={Number.parseInt(location.capacity)} />
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Items Stored</span>
                          <span className="font-medium text-text">
                            {inventoryData.filter((item) => item.location === location.name).length}
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Critical Items</span>
                          <span className="font-medium text-critical">
                            {
                              inventoryData.filter(
                                (item) => item.location === location.name && item.status === "critical"
                              ).length
                            }
                          </span>
                        </div>
                      </div>
                      <Button variant="outline">View Details</Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="transactions">
            <Card title="Recent Transactions" description="Latest inventory movements and supply requests">
              <div className="space-y-4">
                {recentTransactions.map((transaction) => (
                  <div key={transaction.id} className="flex items-center justify-between p-4 border border-border rounded-lg bg-card-bg">
                    <div className="flex items-center space-x-4">
                      <div
                        className={`w-3 h-3 rounded-full ${
                          transaction.type === "inbound" ? "bg-success" : "bg-primary"
                        }`}
                      />
                      <div>
                        <div className="font-medium text-text">
                          {transaction.type === "inbound" ? "Received" : "Dispatched"}: {transaction.item}
                        </div>
                        <div className="text-sm text-muted">
                          Quantity: {transaction.quantity} •{" "}
                          {transaction.type === "inbound" ? transaction.source : transaction.destination} •{" "}
                          {transaction.timestamp}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge
                        variant="outline"
                        className={
                          transaction.status === "completed"
                            ? "badge-success"
                            : transaction.status === "in-transit"
                            ? "badge-primary"
                            : "badge-warning"
                        }
                      >
                        {transaction.status === "completed" && <CheckCircleIcon className="w-3 h-3 mr-1" />}
                        {transaction.status === "in-transit" && <TruckIcon className="w-3 h-3 mr-1" />}
                        {transaction.status === "pending" && <ClockIcon className="w-3 h-3 mr-1" />}
                        {transaction.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="optimization">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card title="Optimization Recommendations" description="AI-powered suggestions to improve inventory efficiency">
                <div className="space-y-4">
                  <div className="p-4 bg-critical-bg border border-critical rounded-lg">
                    <div className="flex items-start space-x-3">
                      <AlertTriangleIcon className="w-5 h-5 text-critical mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-critical">Critical Stock Alert</h4>
                        <p className="text-sm text-critical">
                          Blood Supply (Type O) and Communication Radios are critically low. Immediate reorder recommended.
                        </p>
                        <Button variant="outline" className="mt-2">
                          Reorder Now
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 bg-warning-bg border border-warning rounded-lg">
                    <div className="flex items-start space-x-3">
                      <TrendingDownIcon className="w-5 h-5 text-warning mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-warning">Redistribution Opportunity</h4>
                        <p className="text-sm text-warning">
                          Supply Depot A is at 72% capacity while Depot B is at 58%. Consider redistributing Emergency Blankets.
                        </p>
                        <Button variant="outline" className="mt-2">
                          Plan Transfer
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 bg-primary-bg border border-primary rounded-lg">
                    <div className="flex items-start space-x-3">
                      <TrendingUpIcon className="w-5 h-5 text-primary mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-primary">Seasonal Preparation</h4>
                        <p className="text-sm text-primary">
                          Hurricane season approaching. Increase MRE and Water Purification Tablet stock by 25%.
                        </p>
                        <Button variant="outline" className="mt-2">
                          Adjust Targets
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>

              <Card title="Supply Chain Efficiency" description="Performance metrics and optimization targets">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-text">Inventory Turnover Rate</span>
                      <span className="font-medium text-text">2.4x/year</span>
                    </div>
                    <Progress value={75} />
                    <p className="text-xs text-muted">Target: 3.0x/year</p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-text">Stock Accuracy</span>
                      <span className="font-medium text-text">94.2%</span>
                    </div>
                    <Progress value={94} />
                    <p className="text-xs text-muted">Target: 98%</p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-text">Order Fulfillment Time</span>
                      <span className="font-medium text-text">4.2 hours</span>
                    </div>
                    <Progress value={85} />
                    <p className="text-xs text-muted">Target: 3.0 hours</p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-text">Cost Optimization</span>
                      <span className="font-medium text-text">87%</span>
                    </div>
                    <Progress value={87} />
                    <p className="text-xs text-muted">Target: 90%</p>
                  </div>
                  <Button className="w-full mt-4">
                    <TrendingUpIcon className="w-4 h-4 mr-2" />
                    Generate Optimization Report
                  </Button>
                </div>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}