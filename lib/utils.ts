import { Product, ProductResponse } from "@/@types";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function getCategories() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/products/categories`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export async function getProducts(page: number, limit: number, q: string) {
  const offset = (page - 1) * limit || 0;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/products/search?q=${q}&limit=${limit}&skip=${offset}`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json() as Promise<ProductResponse>;
}

export async function getCategoryProducts(category: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/products/category/${category}`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json() as Promise<ProductResponse>;
}

export async function getProduct(id: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/product/${id}`);

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json() as Promise<Product>;
}
