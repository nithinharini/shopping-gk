import React from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  CardTitle,
  CardDescription,
} from "../common/card";
import Badge from "../common/badge";
import Button from "../common/button";

export default function ProductCard({
  product,
  onAddToCart,
  onViewDetails,
}) {
  const isOutOfStock = !product?.inStock || product?.stockQty === 0;

  return (
    <Card className="overflow-hidden">
      <div className="aspect-[4/3] w-full overflow-hidden bg-slate-100">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover"
        />
      </div>

      <CardHeader className="space-y-2">
        <div className="flex items-start justify-between gap-3">
          <CardTitle className="line-clamp-1">{product.name}</CardTitle>

          {isOutOfStock ? (
            <Badge variant="danger">Out of Stock</Badge>
          ) : product.stockQty <= 5 ? (
            <Badge variant="warning">Low Stock</Badge>
          ) : (
            <Badge variant="success">In Stock</Badge>
          )}
        </div>

        <CardDescription className="line-clamp-2">
          {product.info}
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-2">
        <div className="text-sm text-slate-500">{product.category}</div>
        <div className="text-xl font-bold text-slate-900">
          ${product.price}
        </div>
        <div className="text-sm text-slate-500">
          Available: {product.stockQty}
        </div>
      </CardContent>

      <CardFooter className="flex gap-3">
        <Button
          variant="outline"
          className="flex-1"
          onClick={() => onViewDetails?.(product)}
        >
          View Details
        </Button>

        <Button
          variant="primary"
          className="flex-1"
          disabled={isOutOfStock}
          onClick={() => onAddToCart?.(product)}
        >
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}