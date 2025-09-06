import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, ShoppingCart, Eye, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  id: string;
  title: string;
  price: number;
  category: string;
  condition: 'excellent' | 'good' | 'fair';
  location: string;
  image: string;
  seller: {
    name: string;
    rating: number;
  };
  isLiked?: boolean;
  className?: string;
}

export const ProductCard = ({ 
  id, 
  title, 
  price, 
  category, 
  condition, 
  location, 
  image, 
  seller,
  isLiked = false,
  className 
}: ProductCardProps) => {
  const [liked, setLiked] = useState(isLiked);
  const [isHovered, setIsHovered] = useState(false);

  const conditionColors = {
    excellent: "bg-success text-success-foreground",
    good: "bg-primary text-primary-foreground", 
    fair: "bg-accent text-accent-foreground"
  };

  return (
    <Card 
      className={cn(
        "group relative overflow-hidden border-0 shadow-md hover:shadow-eco transition-all duration-300 hover:-translate-y-1",
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-square overflow-hidden bg-muted">
        <img
          src={image}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        
        {/* Overlay Actions */}
        <div className={cn(
          "absolute inset-0 bg-black/40 flex items-center justify-center gap-2 transition-opacity duration-300",
          isHovered ? "opacity-100" : "opacity-0"
        )}>
          <Button size="sm" variant="secondary" className="gap-2">
            <Eye className="h-4 w-4" />
            Quick View
          </Button>
          <Button size="sm" className="gap-2">
            <ShoppingCart className="h-4 w-4" />
            Add to Cart
          </Button>
        </div>

        {/* Condition Badge */}
        <Badge className={cn("absolute top-2 left-2", conditionColors[condition])}>
          {condition}
        </Badge>

        {/* Like Button */}
        <Button
          size="icon"
          variant="ghost"
          className={cn(
            "absolute top-2 right-2 h-8 w-8 bg-background/80 hover:bg-background",
            liked && "text-red-500"
          )}
          onClick={(e) => {
            e.preventDefault();
            setLiked(!liked);
          }}
        >
          <Heart className={cn("h-4 w-4", liked && "fill-current")} />
        </Button>
      </div>

      <CardContent className="p-4">
        <div className="space-y-2">
          <Link to={`/product/${id}`} className="group">
            <h3 className="font-semibold text-sm leading-tight line-clamp-2 group-hover:text-primary transition-colors">
              {title}
            </h3>
          </Link>
          
          <div className="flex items-center justify-between">
            <p className="text-lg font-bold text-primary">
              ${price}
            </p>
            <Badge variant="outline" className="text-xs">
              {category}
            </Badge>
          </div>

          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <MapPin className="h-3 w-3" />
            <span>{location}</span>
          </div>

          <div className="flex items-center justify-between pt-2">
            <div className="text-xs text-muted-foreground">
              by {seller.name}
            </div>
            <div className="flex items-center gap-1">
              <div className="flex text-xs">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className={cn(
                    "text-muted-foreground",
                    i < seller.rating && "text-yellow-400"
                  )}>
                    ★
                  </span>
                ))}
              </div>
              <span className="text-xs text-muted-foreground ml-1">
                ({seller.rating})
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};