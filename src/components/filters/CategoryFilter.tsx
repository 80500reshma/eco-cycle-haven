import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Shirt, 
  Laptop, 
  Home, 
  Baby, 
  Gamepad2, 
  Camera, 
  Book, 
  Car,
  X
} from "lucide-react";

const categories = [
  { id: "clothing", name: "Clothing", icon: Shirt, count: 234 },
  { id: "electronics", name: "Electronics", icon: Laptop, count: 156 },
  { id: "home", name: "Home & Garden", icon: Home, count: 189 },
  { id: "baby", name: "Baby & Kids", icon: Baby, count: 87 },
  { id: "sports", name: "Sports & Games", icon: Gamepad2, count: 143 },
  { id: "cameras", name: "Photography", icon: Camera, count: 65 },
  { id: "books", name: "Books & Media", icon: Book, count: 201 },
  { id: "automotive", name: "Automotive", icon: Car, count: 76 },
];

interface CategoryFilterProps {
  selectedCategories: string[];
  onCategoryChange: (categories: string[]) => void;
}

export const CategoryFilter = ({ selectedCategories, onCategoryChange }: CategoryFilterProps) => {
  const handleCategoryToggle = (categoryId: string) => {
    if (selectedCategories.includes(categoryId)) {
      onCategoryChange(selectedCategories.filter(id => id !== categoryId));
    } else {
      onCategoryChange([...selectedCategories, categoryId]);
    }
  };

  const clearAllCategories = () => {
    onCategoryChange([]);
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base">Categories</CardTitle>
          {selectedCategories.length > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearAllCategories}
              className="h-auto p-1 text-xs text-muted-foreground hover:text-foreground"
            >
              <X className="h-3 w-3 mr-1" />
              Clear all
            </Button>
          )}
        </div>
        {selectedCategories.length > 0 && (
          <div className="flex flex-wrap gap-1 pt-2">
            {selectedCategories.map((categoryId) => {
              const category = categories.find(c => c.id === categoryId);
              return category ? (
                <Badge key={categoryId} variant="secondary" className="text-xs">
                  {category.name}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-auto p-0 ml-1 hover:bg-transparent"
                    onClick={() => handleCategoryToggle(categoryId)}
                  >
                    <X className="h-2 w-2" />
                  </Button>
                </Badge>
              ) : null;
            })}
          </div>
        )}
      </CardHeader>
      <CardContent className="space-y-2">
        {categories.map((category) => {
          const Icon = category.icon;
          const isSelected = selectedCategories.includes(category.id);
          
          return (
            <Button
              key={category.id}
              variant={isSelected ? "default" : "ghost"}
              className="w-full justify-start gap-3 h-auto py-3"
              onClick={() => handleCategoryToggle(category.id)}
            >
              <Icon className="h-4 w-4" />
              <div className="flex-1 text-left">
                <div className="font-medium text-sm">{category.name}</div>
              </div>
              <Badge 
                variant={isSelected ? "secondary" : "outline"} 
                className="ml-auto text-xs"
              >
                {category.count}
              </Badge>
            </Button>
          );
        })}
      </CardContent>
    </Card>
  );
};