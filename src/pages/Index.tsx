import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ProductCard } from "@/components/product/ProductCard";
import { Header } from "@/components/layout/Header";
import { 
  Leaf, 
  Recycle, 
  Globe, 
  Users, 
  Star,
  ArrowRight,
  ShoppingBag,
  Heart,
  TrendingUp
} from "lucide-react";

const Index = () => {
  // Mock featured products
  const featuredProducts = [
    {
      id: "1",
      title: "Vintage Leather Jacket - Excellent Condition",
      price: 89,
      category: "clothing",
      condition: "excellent" as const,
      location: "New York, NY",
      image: "https://images.unsplash.com/photo-1520975954732-35dd22299614?w=400&h=400&fit=crop",
      seller: { name: "Sarah M.", rating: 5 }
    },
    {
      id: "2",
      title: "MacBook Pro 2019 - Barely Used",
      price: 1200,
      category: "electronics",
      condition: "excellent" as const,
      location: "San Francisco, CA",
      image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=400&fit=crop",
      seller: { name: "Mike R.", rating: 5 }
    },
    {
      id: "3",
      title: "Scandinavian Dining Table Set",
      price: 450,
      category: "home",
      condition: "good" as const,
      location: "Chicago, IL",
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop",
      seller: { name: "Emma K.", rating: 4 }
    },
    {
      id: "4",
      title: "Baby Stroller - Premium Brand",
      price: 200,
      category: "baby",
      condition: "good" as const,
      location: "Austin, TX",
      image: "https://images.unsplash.com/photo-1544717302-de2939b7ef71?w=400&h=400&fit=crop",
      seller: { name: "Lisa P.", rating: 5 }
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-muted/30 via-background to-accent/20">
        <div className="container mx-auto px-4 py-20 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge className="bg-success/10 text-success border-success/20">
                  🌱 Sustainable Shopping
                </Badge>
                <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                  Find Amazing{" "}
                  <span className="bg-gradient-to-r from-primary to-success bg-clip-text text-transparent">
                    Second-Hand
                  </span>{" "}
                  Treasures
                </h1>
                <p className="text-lg text-muted-foreground max-w-md">
                  Join our sustainable marketplace where every purchase helps reduce waste and extends product lifecycles. Buy and sell pre-owned items with confidence.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/browse">
                  <Button size="lg" className="bg-gradient-primary hover:opacity-90 w-full sm:w-auto">
                    <ShoppingBag className="h-5 w-5 mr-2" />
                    Start Shopping
                  </Button>
                </Link>
                <Link to="/sell">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto">
                    Sell Your Items
                    <ArrowRight className="h-5 w-5 ml-2" />
                  </Button>
                </Link>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-8 pt-8 border-t">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">50K+</div>
                  <div className="text-sm text-muted-foreground">Happy Users</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">100K+</div>
                  <div className="text-sm text-muted-foreground">Items Sold</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">95%</div>
                  <div className="text-sm text-muted-foreground">Satisfaction</div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <Card className="overflow-hidden shadow-eco">
                    <img 
                      src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=300&h=200&fit=crop" 
                      alt="Sustainable fashion"
                      className="w-full h-32 object-cover"
                    />
                    <CardContent className="p-3">
                      <div className="text-sm font-medium">Vintage Fashion</div>
                      <div className="text-xs text-muted-foreground">From $25</div>
                    </CardContent>
                  </Card>
                  <Card className="overflow-hidden shadow-eco">
                    <img 
                      src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=300&h=200&fit=crop" 
                      alt="Electronics"
                      className="w-full h-32 object-cover"
                    />
                    <CardContent className="p-3">
                      <div className="text-sm font-medium">Electronics</div>
                      <div className="text-xs text-muted-foreground">From $50</div>
                    </CardContent>
                  </Card>
                </div>
                <div className="space-y-4 mt-8">
                  <Card className="overflow-hidden shadow-eco">
                    <img 
                      src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=300&h=200&fit=crop" 
                      alt="Home decor"
                      className="w-full h-32 object-cover"
                    />
                    <CardContent className="p-3">
                      <div className="text-sm font-medium">Home & Garden</div>
                      <div className="text-xs text-muted-foreground">From $15</div>
                    </CardContent>
                  </Card>
                  <Card className="overflow-hidden shadow-eco">
                    <img 
                      src="https://images.unsplash.com/photo-1503602642458-232111445657?w=300&h=200&fit=crop" 
                      alt="Books"
                      className="w-full h-32 object-cover"
                    />
                    <CardContent className="p-3">
                      <div className="text-sm font-medium">Books & Media</div>
                      <div className="text-xs text-muted-foreground">From $5</div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Why Choose EcoFinds?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We're more than just a marketplace - we're a community committed to sustainable living and conscious consumption.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Leaf,
                title: "Eco-Friendly",
                description: "Reduce waste by giving items a second life"
              },
              {
                icon: Users,
                title: "Trusted Community",
                description: "Buy and sell with verified, rated users"
              },
              {
                icon: Globe,
                title: "Local Impact",
                description: "Support your local community and environment"
              },
              {
                icon: TrendingUp,
                title: "Great Value",
                description: "Find quality items at unbeatable prices"
              }
            ].map((feature, index) => (
              <Card key={index} className="text-center border-0 shadow-md hover:shadow-eco transition-all duration-300 hover:-translate-y-1">
                <CardContent className="p-6">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-primary mb-4">
                    <feature.icon className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <h3 className="font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold mb-2">Featured Items</h2>
              <p className="text-muted-foreground">Discover amazing finds from our community</p>
            </div>
            <Link to="/browse">
              <Button variant="outline">
                View All
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary/5 via-success/5 to-primary/5">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto space-y-8">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-primary mb-6">
              <Heart className="h-10 w-10 text-primary-foreground" />
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold">
              Ready to Make a Difference?
            </h2>
            <p className="text-lg text-muted-foreground">
              Join thousands of users who are already making sustainable choices. Start buying and selling today!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/auth">
                <Button size="lg" className="bg-gradient-primary hover:opacity-90">
                  Get Started Free
                </Button>
              </Link>
              <Link to="/browse">
                <Button variant="outline" size="lg">
                  Explore Marketplace
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-muted/50 py-12 border-t">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <Link to="/" className="flex items-center gap-2 mb-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-primary">
                  <Leaf className="h-5 w-5 text-primary-foreground" />
                </div>
                <span className="font-bold text-lg">EcoFinds</span>
              </Link>
              <p className="text-sm text-muted-foreground">
                The sustainable marketplace for conscious consumers.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Marketplace</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link to="/browse" className="hover:text-primary">Browse Items</Link></li>
                <li><Link to="/sell" className="hover:text-primary">Sell Items</Link></li>
                <li><Link to="/categories" className="hover:text-primary">Categories</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Account</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link to="/dashboard" className="hover:text-primary">Dashboard</Link></li>
                <li><Link to="/profile" className="hover:text-primary">Profile</Link></li>
                <li><Link to="/purchases" className="hover:text-primary">Order History</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Support</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary">Help Center</a></li>
                <li><a href="#" className="hover:text-primary">Contact Us</a></li>
                <li><a href="#" className="hover:text-primary">Safety</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2024 EcoFinds. All rights reserved. Making sustainable shopping accessible to everyone.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
