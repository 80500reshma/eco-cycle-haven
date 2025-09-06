import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { 
  Search,
  Package, 
  Truck, 
  CheckCircle2, 
  Star, 
  MessageCircle,
  Download,
  RotateCcw,
  ShoppingBag,
  Calendar
} from "lucide-react";
import { Link } from "react-router-dom";

const mockPurchases = [
  {
    id: "order-1",
    orderNumber: "ECO-2024-001",
    date: "2024-01-20",
    status: "delivered",
    total: 89.00,
    items: [
      {
        id: "item-1",
        title: "Vintage Leather Jacket - Excellent Condition",
        price: 81.00,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1520975954732-35dd22299614?w=300&h=300&fit=crop",
        seller: { name: "Sarah M.", id: "seller1" },
        category: "clothing",
        condition: "excellent"
      }
    ],
    shipping: 8.00,
    deliveryDate: "2024-01-22",
    trackingNumber: "1Z999AA1234567890",
    reviewed: true
  },
  {
    id: "order-2", 
    orderNumber: "ECO-2024-002",
    date: "2024-01-15",
    status: "in-transit",
    total: 1215.00,
    items: [
      {
        id: "item-2",
        title: "MacBook Pro 2019 - Barely Used",
        price: 1200.00,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&h=300&fit=crop",
        seller: { name: "Mike R.", id: "seller2" },
        category: "electronics",
        condition: "excellent"
      }
    ],
    shipping: 15.00,
    estimatedDelivery: "2024-01-25",
    trackingNumber: "1Z999BB7654321098",
    reviewed: false
  },
  {
    id: "order-3",
    orderNumber: "ECO-2024-003",
    date: "2024-01-10",
    status: "processing",
    total: 475.00,
    items: [
      {
        id: "item-3",
        title: "Scandinavian Dining Table Set",
        price: 450.00,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&h=300&fit=crop",
        seller: { name: "Emma K.", id: "seller3" },
        category: "home",
        condition: "good"
      }
    ],
    shipping: 25.00,
    estimatedDelivery: "2024-01-28",
    reviewed: false
  }
];

const Purchases = () => {
  const [purchases, setPurchases] = useState(mockPurchases);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "delivered": return <CheckCircle2 className="h-4 w-4 text-success" />;
      case "in-transit": return <Truck className="h-4 w-4 text-primary" />;
      case "processing": return <Package className="h-4 w-4 text-orange-500" />;
      default: return <Package className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "delivered": return "bg-success text-success-foreground";
      case "in-transit": return "bg-primary text-primary-foreground";
      case "processing": return "bg-orange-500 text-white";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const filteredPurchases = purchases.filter(purchase => {
    const matchesSearch = purchase.items.some(item => 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      purchase.orderNumber.toLowerCase().includes(searchQuery.toLowerCase())
    );
    const matchesTab = activeTab === "all" || purchase.status === activeTab;
    return matchesSearch && matchesTab;
  });

  const stats = {
    total: purchases.length,
    delivered: purchases.filter(p => p.status === "delivered").length,
    inTransit: purchases.filter(p => p.status === "in-transit").length,
    processing: purchases.filter(p => p.status === "processing").length,
    totalSpent: purchases.reduce((sum, p) => sum + p.total, 0)
  };

  if (purchases.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-20">
          <Card className="max-w-md mx-auto text-center border-0 shadow-lg">
            <CardContent className="py-12">
              <ShoppingBag className="h-16 w-16 mx-auto mb-6 text-muted-foreground opacity-50" />
              <h2 className="text-2xl font-bold mb-2">No purchases yet</h2>
              <p className="text-muted-foreground mb-8">
                Start shopping for sustainable finds and your orders will appear here
              </p>
              <Link to="/browse">
                <Button size="lg" className="bg-gradient-primary hover:opacity-90">
                  Start Shopping
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Purchase History</h1>
          <p className="text-muted-foreground">Track your orders and manage your purchases</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="border-0 shadow-md">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <ShoppingBag className="h-4 w-4 text-primary" />
                <span className="text-sm text-muted-foreground">Total Orders</span>
              </div>
              <div className="text-2xl font-bold">{stats.total}</div>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-md">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle2 className="h-4 w-4 text-success" />
                <span className="text-sm text-muted-foreground">Delivered</span>
              </div>
              <div className="text-2xl font-bold">{stats.delivered}</div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Truck className="h-4 w-4 text-primary" />
                <span className="text-sm text-muted-foreground">In Transit</span>
              </div>
              <div className="text-2xl font-bold">{stats.inTransit}</div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-lg">💰</span>
                <span className="text-sm text-muted-foreground">Total Spent</span>
              </div>
              <div className="text-2xl font-bold">${stats.totalSpent.toFixed(2)}</div>
            </CardContent>
          </Card>
        </div>

        {/* Search & Filters */}
        <div className="mb-6">
          <div className="flex gap-4 mb-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search orders..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full max-w-md grid-cols-4">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="delivered">Delivered</TabsTrigger>
              <TabsTrigger value="in-transit">In Transit</TabsTrigger>
              <TabsTrigger value="processing">Processing</TabsTrigger>
            </TabsList>

            <TabsContent value={activeTab} className="mt-6">
              <div className="space-y-4">
                {filteredPurchases.map((purchase) => (
                  <Card key={purchase.id} className="border-0 shadow-md">
                    <CardContent className="p-6">
                      {/* Order Header */}
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          {getStatusIcon(purchase.status)}
                          <div>
                            <div className="font-semibold">{purchase.orderNumber}</div>
                            <div className="text-sm text-muted-foreground flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {new Date(purchase.date).toLocaleDateString()}
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge className={`${getStatusColor(purchase.status)} mb-1`}>
                            {purchase.status.replace('-', ' ')}
                          </Badge>
                          <div className="font-bold">${purchase.total.toFixed(2)}</div>
                        </div>
                      </div>

                      {/* Order Items */}
                      <div className="space-y-3">
                        {purchase.items.map((item) => (
                          <div key={item.id} className="flex gap-4 p-3 rounded-lg bg-muted/30">
                            <img
                              src={item.image}
                              alt={item.title}
                              className="w-16 h-16 object-cover rounded-lg flex-shrink-0"
                            />
                            <div className="flex-1 min-w-0">
                              <h4 className="font-medium text-sm line-clamp-2 mb-1">
                                {item.title}
                              </h4>
                              <div className="flex items-center gap-2 mb-2">
                                <Badge variant="outline" className="text-xs">
                                  {item.category}
                                </Badge>
                                <Badge className="text-xs bg-primary text-primary-foreground">
                                  {item.condition}
                                </Badge>
                              </div>
                              <div className="text-xs text-muted-foreground">
                                Sold by {item.seller.name}
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="font-bold">${item.price.toFixed(2)}</div>
                              <div className="text-xs text-muted-foreground">Qty: {item.quantity}</div>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Order Actions */}
                      <div className="flex items-center justify-between mt-4 pt-4 border-t">
                        <div className="text-sm text-muted-foreground">
                          {purchase.status === "delivered" && purchase.deliveryDate && (
                            <>Delivered on {new Date(purchase.deliveryDate).toLocaleDateString()}</>
                          )}
                          {purchase.status !== "delivered" && purchase.estimatedDelivery && (
                            <>Expected by {new Date(purchase.estimatedDelivery).toLocaleDateString()}</>
                          )}
                          {purchase.trackingNumber && (
                            <> • Tracking: {purchase.trackingNumber}</>
                          )}
                        </div>

                        <div className="flex gap-2">
                          {purchase.status === "delivered" && !purchase.reviewed && (
                            <Button size="sm" variant="outline" className="gap-2">
                              <Star className="h-3 w-3" />
                              Write Review
                            </Button>
                          )}
                          {purchase.status !== "processing" && (
                            <Button size="sm" variant="outline" className="gap-2">
                              <Truck className="h-3 w-3" />
                              Track Package
                            </Button>
                          )}
                          <Button size="sm" variant="outline" className="gap-2">
                            <MessageCircle className="h-3 w-3" />
                            Contact Seller
                          </Button>
                          {purchase.status === "delivered" && (
                            <Button size="sm" variant="outline" className="gap-2">
                              <RotateCcw className="h-3 w-3" />
                              Return/Exchange
                            </Button>
                          )}
                          <Button size="sm" variant="outline" className="gap-2">
                            <Download className="h-3 w-3" />
                            Receipt
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Purchases;