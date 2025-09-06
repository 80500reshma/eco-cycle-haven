import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  Heart, 
  MessageCircle,
  Shield,
  Truck,
  Tag
} from "lucide-react";
import { Link } from "react-router-dom";

const mockCartItems = [
  {
    id: "1",
    title: "Vintage Leather Jacket - Excellent Condition",
    price: 89,
    originalPrice: 120,
    category: "clothing",
    condition: "excellent",
    image: "https://images.unsplash.com/photo-1520975954732-35dd22299614?w=300&h=300&fit=crop",
    seller: { name: "Sarah M.", rating: 5, id: "seller1" },
    quantity: 1,
    shippingCost: 8,
    isLiked: true
  },
  {
    id: "2", 
    title: "MacBook Pro 2019 - Barely Used",
    price: 1200,
    originalPrice: 1800,
    category: "electronics",
    condition: "excellent",
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&h=300&fit=crop",
    seller: { name: "Mike R.", rating: 5, id: "seller2" },
    quantity: 1,
    shippingCost: 15,
    isLiked: false
  },
  {
    id: "3",
    title: "Scandinavian Dining Table Set",
    price: 450,
    originalPrice: 700,
    category: "home",
    condition: "good",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&h=300&fit=crop",
    seller: { name: "Emma K.", rating: 4, id: "seller3" },
    quantity: 1,
    shippingCost: 25,
    isLiked: true
  }
];

const Cart = () => {
  const [cartItems, setCartItems] = useState(mockCartItems);
  const [promoCode, setPromoCode] = useState("");
  const [appliedPromo, setAppliedPromo] = useState<{code: string, discount: number} | null>(null);

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity === 0) {
      removeItem(id);
    } else {
      setCartItems(items => 
        items.map(item => 
          item.id === id ? { ...item, quantity: newQuantity } : item
        )
      );
    }
  };

  const removeItem = (id: string) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const toggleLike = (id: string) => {
    setCartItems(items => 
      items.map(item => 
        item.id === id ? { ...item, isLiked: !item.isLiked } : item
      )
    );
  };

  const applyPromoCode = () => {
    // Mock promo code validation
    if (promoCode.toLowerCase() === "eco10") {
      setAppliedPromo({ code: promoCode, discount: 10 });
    } else if (promoCode.toLowerCase() === "save20") {
      setAppliedPromo({ code: promoCode, discount: 20 });
    }
    setPromoCode("");
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shippingTotal = cartItems.reduce((sum, item) => sum + item.shippingCost, 0);
  const promoDiscount = appliedPromo ? (subtotal * appliedPromo.discount) / 100 : 0;
  const total = subtotal + shippingTotal - promoDiscount;

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-20">
          <Card className="max-w-md mx-auto text-center border-0 shadow-lg">
            <CardContent className="pt-12 pb-12">
              <ShoppingBag className="h-16 w-16 mx-auto mb-6 text-muted-foreground opacity-50" />
              <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
              <p className="text-muted-foreground mb-8">
                Discover amazing sustainable finds and add them to your cart
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
          <h1 className="text-3xl font-bold mb-2">Shopping Cart</h1>
          <p className="text-muted-foreground">
            {cartItems.length} item{cartItems.length !== 1 ? 's' : ''} in your cart
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <Card key={item.id} className="border-0 shadow-md">
                <CardContent className="p-6">
                  <div className="flex gap-4">
                    {/* Item Image */}
                    <div className="relative w-24 h-24 flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover rounded-lg"
                      />
                      <Button
                        size="icon"
                        variant="ghost"
                        className={`absolute -top-2 -right-2 h-6 w-6 bg-background/80 hover:bg-background ${
                          item.isLiked ? 'text-red-500' : ''
                        }`}
                        onClick={() => toggleLike(item.id)}
                      >
                        <Heart className={`h-3 w-3 ${item.isLiked ? 'fill-current' : ''}`} />
                      </Button>
                    </div>

                    {/* Item Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <div className="min-w-0">
                          <Link to={`/product/${item.id}`}>
                            <h3 className="font-semibold text-sm leading-tight line-clamp-2 hover:text-primary transition-colors">
                              {item.title}
                            </h3>
                          </Link>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="outline" className="text-xs">
                              {item.category}
                            </Badge>
                            <Badge 
                              className={`text-xs ${
                                item.condition === 'excellent' 
                                  ? 'bg-success text-success-foreground'
                                  : 'bg-primary text-primary-foreground'
                              }`}
                            >
                              {item.condition}
                            </Badge>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeItem(item.id)}
                          className="text-muted-foreground hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-primary">${item.price}</span>
                            {item.originalPrice > item.price && (
                              <span className="text-xs text-muted-foreground line-through">
                                ${item.originalPrice}
                              </span>
                            )}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            by {item.seller.name} • ★{item.seller.rating}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            Shipping: ${item.shippingCost}
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <Button
                            size="icon"
                            variant="outline"
                            className="h-8 w-8"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="w-8 text-center text-sm">{item.quantity}</span>
                          <Button
                            size="icon"
                            variant="outline"
                            className="h-8 w-8"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>

                      <div className="flex gap-2 mt-3">
                        <Button size="sm" variant="outline" className="text-xs gap-1">
                          <MessageCircle className="h-3 w-3" />
                          Message Seller
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            <Card className="border-0 shadow-md">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Order Summary</h3>
                
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>${shippingTotal.toFixed(2)}</span>
                  </div>
                  {appliedPromo && (
                    <div className="flex justify-between text-success">
                      <span>Promo ({appliedPromo.code})</span>
                      <span>-${promoDiscount.toFixed(2)}</span>
                    </div>
                  )}
                  <Separator />
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>

                <div className="mt-6 space-y-3">
                  <Button className="w-full bg-gradient-primary hover:opacity-90" size="lg">
                    Proceed to Checkout
                  </Button>
                  <Link to="/browse">
                    <Button variant="outline" className="w-full">
                      Continue Shopping
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Promo Code */}
            <Card className="border-0 shadow-md">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <Tag className="h-4 w-4" />
                  Promo Code
                </h3>
                <div className="flex gap-2">
                  <Input
                    placeholder="Enter code"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                  />
                  <Button 
                    variant="outline" 
                    onClick={applyPromoCode}
                    disabled={!promoCode}
                  >
                    Apply
                  </Button>
                </div>
                {appliedPromo && (
                  <div className="mt-2 text-sm text-success">
                    ✓ {appliedPromo.discount}% discount applied!
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Trust Badges */}
            <Card className="border-0 shadow-md">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Shield className="h-5 w-5 text-primary" />
                    <div>
                      <div className="font-medium text-sm">Buyer Protection</div>
                      <div className="text-xs text-muted-foreground">
                        Money back guarantee
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Truck className="h-5 w-5 text-primary" />
                    <div>
                      <div className="font-medium text-sm">Secure Shipping</div>
                      <div className="text-xs text-muted-foreground">
                        Tracked delivery
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;