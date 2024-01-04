"use client";
import * as React from "react";
import Zoom from "react-medium-image-zoom";

import Image from "next/image";
import { Product } from "@/@types";

interface ProductProps {
  product: Product;
}

export function CarouselProduct({ product }: ProductProps) {
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-2 lg:grid-cols-4">
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
  );
}
