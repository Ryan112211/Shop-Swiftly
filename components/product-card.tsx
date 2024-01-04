"use client";

import { Cart, Product } from "@/@types";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { Button } from "./ui/button";
import { useProductStore } from "@/store/product";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface ProductCardProps {
  product: Cart | Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addProduct, cartItems } = useProductStore();
  const router = useRouter();
  const handleCartAdd = (event: any) => {
    event.stopPropagation();
    if (cartItems.find((item) => item.id === product.id)) {
      toast.error("Product already in cart");
      return;
    }

    addProduct({
      ...product,
      quantity: 1,
    });
    toast.success("Product added to cart");
  };
  return (
    <Card
      className="lg:max-w-md w-full cursor-pointer"
      onClick={() => router.push(`/product/${product.id}`)}
    >
      <CardHeader>
        <CardTitle>{product.title}</CardTitle>
        {/* <CardDescription>{product.description}</CardDescription> */}
      </CardHeader>
      <CardContent className="flex items-center justify-center ">
        <div className="items-center justify-center">
          <Image
            style={{
              objectFit: "contain",
              height: "220px",
            }}
            src={product.thumbnail}
            width="428"
            height="59"
            alt="logo"
          />
          <div className="flex items-center pt-4">
            <svg
              className="w-4 h-4 text-yellow-300 me-1"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 22 20"
            >
              <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
            </svg>
            <p className="ms-2 text-sm font-bold text-gray-900 dark:text-white">
              {product.rating}
            </p>
            <p className="ms-2 font-bold text-sm text-gray-700 dark:text-gray-200">
              Product By {product.brand}
            </p>
            {product?.stock < 30 && (
              <p
                className="ms-2 font-bold text-sm text-red-700 dark:text-red-200  
              animate-pulse 
              "
              >
                Only {product.stock} left
              </p>
            )}
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <div className="flex justify-between items-center flex-auto pt-4">
          <span className="text-2xl font-bold text-gray-800 dark:text-white">
            {product.price.toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            })}
          </span>
          <Button onClick={handleCartAdd}>Add to cart</Button>
        </div>
      </CardFooter>
    </Card>
  );
}
