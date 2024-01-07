"use client";
import * as React from "react";
import Zoom from "react-medium-image-zoom";

import Image from "next/image";
import { Product } from "@/@types";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { useProductStore } from "@/store/product";

interface ProductProps {
  product: Product;
}

export function CarouselProduct({ product }: ProductProps) {
  const { addProduct, cartItems } = useProductStore();

  const handleCartAdd = (event: any) => {
    if (cartItems.find((item) => item.id === product.id)) {
      toast.error("Product already in cart");
      return;
    }
    event.stopPropagation();
    addProduct({
      ...product,
      quantity: 1,
    });
    toast.success("Product added to cart");
  };
  return (
    <div className="flex items-start justify-start w-full h-full ">
      <div className="flex flex-col">
        <div className="container-full content-start mx-4 my-2">
          <Image
            src={product?.thumbnail}
            width={800}
            height={400}
            alt="product"
          />
        </div>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-2 lg:grid-cols-4 items-center justify-center">
          {product?.images?.map((image) => (
            <div className="w-full relative" key={image}>
              <Zoom>
                <Image
                  src={image}
                  width={0}
                  height={0}
                  sizes="100vw"
                  style={{ width: "82px", height: "auto" }}
                  alt="product"
                />
              </Zoom>
            </div>
          ))}
        </div>
        <div className="flex flex-col items-center justify-center">
          <Button onClick={handleCartAdd} className="w-full mt-4">
            Add to cart
          </Button>
        </div>
      </div>

      <div className="flex flex-col ">
        <div className="container-full content-start m-2  space-y-3">
          <h1 className="text-2xl md:4xl lg:text-6xl capitalize font-bold text-gray-700 dark:text-white">
            {product?.title}
          </h1>
          <div className="flex items-center ">
            <svg
              className="w-5 h-5 text-orange-300 me-1"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 22 20"
            >
              <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
            </svg>
            <p className="ms-2 text-md font-bold text-orange-500">
              {product.rating}
            </p>
          </div>
          <h1 className="text-md font-bold text-orange-500">
            Brand :
            <span className="text-gray-700 pl-2 uppercase dark:text-white">
              {product?.brand}
            </span>
          </h1>
          <h1 className="text-md font-bold  text-orange-500">
            Category :{" "}
            <span className="text-gray-700 pl-2 uppercase dark:text-white">
              {product?.category}
            </span>
          </h1>

          <h1 className="text-md font-bold text-orange-500">
            {product?.stock} items in stock
          </h1>

          <h1 className="text-4xl font-bold text-orange-400">
            {product?.price.toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            })}
          </h1>
          <h1 className="text-xl font-bold text-orange-500">
            Product Description
          </h1>
          <p className="text-gray-700 font-bold dark:text-white">
            {product?.description}
          </p>
        </div>
      </div>
    </div>
  );
}
