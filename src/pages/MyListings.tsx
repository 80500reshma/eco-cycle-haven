import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  MoreHorizontal, 
  Package, 
  DollarSign,
  TrendingUp,
  Clock,
  CheckCircle2,
  PauseCircle
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link } from "react-router-dom";

const mockListings = [
  {
    id: "1",
    title: "Vintage Leather Jacket - Excellent Condition",
    price: 89,
    category: "clothing",
    condition: "excellent",
    status: "active",
    views: 45,
    likes: 12,
    image: "https://images.unsplash.com/photo-1520975954732-35dd22299614?w=300&h=300&fit=crop",
    createdAt: "2024-01-15",
    updatedAt: "2024-01-15"
  },
  {
    id: "2",
    title: "MacBook Pro 2019 - Barely Used",
    price: 1200,
    category: "electronics",
    condition: "excellent",
    status: "sold",
    views: 123,
    likes: 28,
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&h=300&fit=crop",
    createdAt: "2024-01-10",
    updatedAt: "2024-01-20",
    soldDate: "2024-01-20"
  },
  {
    id: "3",
    title: "Scandinavian Dining Table Set",
    price: 450,
    category: "home",
    condition: "good",
    status: "paused",
    views: 67,
    likes: 15,
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&h=300&fit=crop",
    createdAt: "2024-01-05",
    updatedAt: "2024-01-18"
  },
  {
    id: "4",
    title: "Designer Handbag - Authentic",
    price: 150,
    category: "clothing",
    condition: "good",
    status: "draft",
    views: 0,
    likes: 0,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300&h=300&fit=crop",
    createdAt: "2024-01-22",
    updatedAt: "2024-01-22"
  }
];

const MyListings = () => {
  const [listings, setListings] = useState(mockListings);
  const [activeTab, setActiveTab] = useState("all");

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active": return <CheckCircle2 className="h-4 w-4 text-success" />;
      case "sold": return <DollarSign className="h-4 w-4 text-primary" />;
      case "paused": return <PauseCircle className="h-4 w-4 text-orange-500" />;
      case "draft": return <Clock className="h-4 w-4 text-muted-foreground" />;
      default: return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-success text-success-foreground";
      case "sold": return "bg-primary text-primary-foreground";
      case "paused": return "bg-orange-500 text-white";
      case "draft": return "bg-muted text-muted-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const filteredListings = listings.filter(listing => {
    if (activeTab === "all") return true;
    return listing.status === activeTab;
  });

  const stats = {
    total: listings.length,
    active: listings.filter(l => l.status === "active").length,
    sold: listings.filter(l => l.status === "sold").length,
    drafts: listings.filter(l => l.status === "draft").length,
    totalViews: listings.reduce((sum, l) => sum + l.views, 0),
    totalEarnings: listings.filter(l => l.status === "sold").reduce((sum, l) => sum + l.price, 0)
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">My Listings</h1>
            <p className="text-muted-foreground">Manage your items and track performance</p>
          </div>
          <Link to="/sell">
            <Button className="bg-gradient-primary hover:opacity-90 gap-2">
              <Plus className="h-4 w-4" />
              Add New Item
            </Button>
          </Link>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="border-0 shadow-md">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Package className="h-4 w-4 text-primary" />
                <span className="text-sm text-muted-foreground">Total Items</span>
              </div>
              <div className="text-2xl font-bold">{stats.total}</div>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-md">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle2 className="h-4 w-4 text-success" />
                <span className="text-sm text-muted-foreground">Active</span>
              </div>
              <div className="text-2xl font-bold">{stats.active}</div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Eye className="h-4 w-4 text-primary" />
                <span className="text-sm text-muted-foreground">Total Views</span>
              </div>
              <div className="text-2xl font-bold">{stats.totalViews}</div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <DollarSign className="h-4 w-4 text-success" />
                <span className="text-sm text-muted-foreground">Earnings</span>
              </div>
              <div className="text-2xl font-bold">${stats.totalEarnings}</div>
            </CardContent>
          </Card>
        </div>

        {/* Listings Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full max-w-md grid-cols-5">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="sold">Sold</TabsTrigger>
            <TabsTrigger value="paused">Paused</TabsTrigger>
            <TabsTrigger value="draft">Drafts</TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="mt-6">
            {filteredListings.length === 0 ? (
              <Card className="border-0 shadow-md">
                <CardContent className="py-12 text-center">
                  <Package className="h-16 w-16 mx-auto mb-4 text-muted-foreground opacity-50" />
                  <h3 className="text-xl font-semibold mb-2">No items found</h3>
                  <p className="text-muted-foreground mb-6">
                    {activeTab === "all" 
                      ? "You haven't listed any items yet."
                      : `No items with status "${activeTab}".`
                    }
                  </p>
                  <Link to="/sell">
                    <Button className="bg-gradient-primary hover:opacity-90">
                      List Your First Item
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4">
                {filteredListings.map((listing) => (
                  <Card key={listing.id} className="border-0 shadow-md">
                    <CardContent className="p-6">
                      <div className="flex gap-4">
                        {/* Item Image */}
                        <div className="w-20 h-20 flex-shrink-0">
                          <img
                            src={listing.image}
                            alt={listing.title}
                            className="w-full h-full object-cover rounded-lg"
                          />
                        </div>

                        {/* Item Details */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between mb-2">
                            <div className="min-w-0 flex-1">
                              <h3 className="font-semibold text-sm leading-tight line-clamp-2 mb-1">
                                {listing.title}
                              </h3>
                              <div className="flex items-center gap-2 mb-2">
                                <Badge variant="outline" className="text-xs">
                                  {listing.category}
                                </Badge>
                                <Badge className={`text-xs ${getStatusColor(listing.status)}`}>
                                  {listing.status}
                                </Badge>
                              </div>
                            </div>
                            
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>
                                  <Eye className="h-4 w-4 mr-2" />
                                  View Details
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Edit className="h-4 w-4 mr-2" />
                                  Edit Listing
                                </DropdownMenuItem>
                                {listing.status === "active" && (
                                  <DropdownMenuItem>
                                    <PauseCircle className="h-4 w-4 mr-2" />
                                    Pause Listing
                                  </DropdownMenuItem>
                                )}
                                {listing.status === "paused" && (
                                  <DropdownMenuItem>
                                    <CheckCircle2 className="h-4 w-4 mr-2" />
                                    Activate Listing
                                  </DropdownMenuItem>
                                )}
                                <DropdownMenuItem className="text-destructive">
                                  <Trash2 className="h-4 w-4 mr-2" />
                                  Delete Listing
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>

                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                            <div>
                              <div className="text-muted-foreground">Price</div>
                              <div className="font-bold text-primary">${listing.price}</div>
                            </div>
                            <div>
                              <div className="text-muted-foreground">Views</div>
                              <div className="font-medium">{listing.views}</div>
                            </div>
                            <div>
                              <div className="text-muted-foreground">Likes</div>
                              <div className="font-medium">{listing.likes}</div>
                            </div>
                            <div>
                              <div className="text-muted-foreground">
                                {listing.status === "sold" ? "Sold" : "Updated"}
                              </div>
                              <div className="font-medium">
                                {new Date(listing.status === "sold" ? listing.soldDate! : listing.updatedAt).toLocaleDateString()}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default MyListings;