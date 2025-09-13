export interface FoodItem {
  id: number;
  name: string;
  description?: string;
  price: number;
  image: string; // path under /assets/images/...
  rating?: number;
  chef?: string;
}
