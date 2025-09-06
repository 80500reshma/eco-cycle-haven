import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  User, 
  Star, 
  Package, 
  ShoppingCart, 
  Heart, 
  Edit3, 
  Camera,
  TrendingUp,
  DollarSign,
  Eye
} from "lucide-react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [userProfile, setUserProfile] = useState({
    name: "Sarah Johnson",
    email: "sarah.johnson@email.com",
    location: "San Francisco, CA",
    bio: "Passionate about sustainable living and finding quality pre-owned items. Seller since 2023.",
    joinDate: "March 2023",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
  });

  const stats = {
    itemsSold: 24,
    totalEarnings: 1847,
    rating: 4.8,
    activeListings: 8,
    totalViews: 1234,
    favorites: 56
  };

  const recentActivity = [
    { type: "sale", item: "Vintage Leather Jacket", amount: 89, date: "2 days ago" },
    { type: "listing", item: "MacBook Pro 2019", views: 45, date: "3 days ago" },
    { type: "favorite", item: "Scandinavian Chair Set", date: "5 days ago" },
    { type: "sale", item: "Designer Handbag", amount: 150, date: "1 week ago" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back, {userProfile.name}!</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="border-0 shadow-md">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Package className="h-4 w-4 text-primary" />
                <span className="text-sm text-muted-foreground">Items Sold</span>
              </div>
              <div className="text-2xl font-bold">{stats.itemsSold}</div>
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

          <Card className="border-0 shadow-md">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Star className="h-4 w-4 text-yellow-500" />
                <span className="text-sm text-muted-foreground">Rating</span>
              </div>
              <div className="text-2xl font-bold">{stats.rating}</div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="h-4 w-4 text-primary" />
                <span className="text-sm text-muted-foreground">Active Listings</span>
              </div>
              <div className="text-2xl font-bold">{stats.activeListings}</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Profile Section */}
          <div className="lg:col-span-1">
            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Profile
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsEditing(!isEditing)}
                  >
                    <Edit3 className="h-4 w-4" />
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-col items-center text-center">
                  <div className="relative">
                    <Avatar className="h-20 w-20">
                      <AvatarImage src={userProfile.avatar} />
                      <AvatarFallback>SJ</AvatarFallback>
                    </Avatar>
                    {isEditing && (
                      <Button
                        size="icon"
                        className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full"
                      >
                        <Camera className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                  
                  {isEditing ? (
                    <div className="w-full space-y-3 mt-4">
                      <div>
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                          id="name"
                          value={userProfile.name}
                          onChange={(e) => setUserProfile({...userProfile, name: e.target.value})}
                        />
                      </div>
                      <div>
                        <Label htmlFor="location">Location</Label>
                        <Input
                          id="location"
                          value={userProfile.location}
                          onChange={(e) => setUserProfile({...userProfile, location: e.target.value})}
                        />
                      </div>
                      <div>
                        <Label htmlFor="bio">Bio</Label>
                        <Input
                          id="bio"
                          value={userProfile.bio}
                          onChange={(e) => setUserProfile({...userProfile, bio: e.target.value})}
                        />
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" onClick={() => setIsEditing(false)}>
                          Save
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => setIsEditing(false)}>
                          Cancel
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="mt-4 w-full">
                      <h3 className="font-semibold">{userProfile.name}</h3>
                      <p className="text-sm text-muted-foreground">{userProfile.location}</p>
                      <p className="text-sm mt-2">{userProfile.bio}</p>
                      <div className="flex items-center justify-center gap-1 mt-3">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className={`h-4 w-4 ${i < stats.rating ? 'text-yellow-500 fill-current' : 'text-muted-foreground'}`} />
                          ))}
                        </div>
                        <span className="text-sm text-muted-foreground ml-1">({stats.rating})</span>
                      </div>
                      <Badge variant="outline" className="mt-2">
                        Member since {userProfile.joinDate}
                      </Badge>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="border-0 shadow-md mt-6">
              <CardHeader>
                <CardTitle className="text-base">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link to="/sell" className="block">
                  <Button className="w-full justify-start gap-2">
                    <Package className="h-4 w-4" />
                    List New Item
                  </Button>
                </Link>
                <Link to="/my-listings" className="block">
                  <Button variant="outline" className="w-full justify-start gap-2">
                    <Eye className="h-4 w-4" />
                    Manage Listings
                  </Button>
                </Link>
                <Link to="/browse" className="block">
                  <Button variant="ghost" className="w-full justify-start gap-2">
                    <ShoppingCart className="h-4 w-4" />
                    Browse Items
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="activity" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="activity">Recent Activity</TabsTrigger>
                <TabsTrigger value="analytics">Analytics</TabsTrigger>
                <TabsTrigger value="favorites">Favorites</TabsTrigger>
              </TabsList>

              <TabsContent value="activity" className="space-y-4">
                <Card className="border-0 shadow-md">
                  <CardHeader>
                    <CardTitle className="text-base">Recent Activity</CardTitle>
                    <CardDescription>Your latest marketplace activities</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentActivity.map((activity, index) => (
                        <div key={index} className="flex items-center justify-between p-3 rounded-lg border">
                          <div className="flex items-center gap-3">
                            {activity.type === "sale" && <DollarSign className="h-4 w-4 text-success" />}
                            {activity.type === "listing" && <Package className="h-4 w-4 text-primary" />}
                            {activity.type === "favorite" && <Heart className="h-4 w-4 text-red-500" />}
                            <div>
                              <div className="font-medium text-sm">{activity.item}</div>
                              <div className="text-xs text-muted-foreground">
                                {activity.type === "sale" && `Sold for $${activity.amount}`}
                                {activity.type === "listing" && `${activity.views} views`}
                                {activity.type === "favorite" && "Added to favorites"}
                              </div>
                            </div>
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {activity.date}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="analytics" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card className="border-0 shadow-md">
                    <CardHeader>
                      <CardTitle className="text-base">View Statistics</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex justify-between">
                          <span className="text-sm">Total Views</span>
                          <span className="font-medium">{stats.totalViews}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">This Week</span>
                          <span className="font-medium">187</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Avg. per Item</span>
                          <span className="font-medium">42</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-0 shadow-md">
                    <CardHeader>
                      <CardTitle className="text-base">Sales Performance</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex justify-between">
                          <span className="text-sm">Conversion Rate</span>
                          <span className="font-medium">12.5%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Avg. Sale Price</span>
                          <span className="font-medium">$77</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Response Time</span>
                          <span className="font-medium">2.3 hrs</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="favorites" className="space-y-4">
                <Card className="border-0 shadow-md">
                  <CardHeader>
                    <CardTitle className="text-base">Saved Items</CardTitle>
                    <CardDescription>Items you've favorited ({stats.favorites} total)</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-8 text-muted-foreground">
                      <Heart className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>Your favorite items will appear here</p>
                      <Link to="/browse">
                        <Button variant="outline" className="mt-4">
                          Start Browsing
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;