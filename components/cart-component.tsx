"use client";

import { Cart } from "@/@types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useProductStore } from "@/store/product";
import { ShoppingCartIcon, Trash2Icon } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";

export function CartComponent() {
  const { cartItems, clearCart, deleteProduct, updateCartQuantity } =
    useProductStore();

  const totalDiscount = cartItems?.reduce(
    (acc, item) => Math.round(acc + item?.discountPercentage * item?.quantity),
    0
  );

  const totalPrice = cartItems?.reduce(
    (acc, item) => acc + item?.price * item?.quantity,
    0
  );

  const totalPriceWithDiscount = totalPrice - totalDiscount;

  const handleDelete = (id: number) => {
    deleteProduct(id);
    toast.success("Product removed from cart");
  };

  const handleQuantityChange = (e: any, product: Cart) => {
    if (e.target.value === "0") {
      deleteProduct(product?.id);
      return;
    }
    if (e.target.value > product?.stock) {
      toast.error(
        `You can't add more than available quantity ${product?.stock}`
      );
      return;
    }

    updateCartQuantity(product?.id, e.target.value);
  };
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="flex items-center justify-between px-4 py-2 space-x-2">
          <ShoppingCartIcon size={30} />
          <span
            className="absolute top-10 right-10 inline-flex items-center justify-center px-2 py-1   text-xs font-bold leading-none text-white bg-red-950 
          dark:bg-white dark:text-black transform translate-x-2 -translate-y-2
          
          rounded-full"
          >
            {cartItems?.length}
          </span>
        </Button>
      </SheetTrigger>
      <SheetContent side="top" className="h-full overflow-auto ">
        <SheetHeader>
          <SheetTitle>Cart</SheetTitle>
          <SheetDescription>
            {!!cartItems.length ? (
              cartItems?.map((item) => (
                <div
                  className="grid grid-cols-5 gap-4 px-2 py-2 border-b border-orange-700 items-center"
                  key={item?.id}
                >
                  <Image
                    src={item?.thumbnail}
                    width={70}
                    height={120}
                    alt="product"
                  />
                  <Label className="text-sm font-bold truncate">
                    {item?.title}
                  </Label>
                  <Label className="text-sm font-bold">
                    {(item?.price * item?.quantity).toLocaleString("en-US", {
                      style: "currency",
                      currency: "USD",
                    })}{" "}
                  </Label>
                  <Input
                    type="number"
                    className="w-20 mx-auto"
                    value={item?.quantity}
                    onChange={(e) => handleQuantityChange(e, item)}
                  />
                  <Button
                    variant="destructive"
                    className="w-20 mx-auto"
                    onClick={() => handleDelete(item?.id)}
                  >
                    <Trash2Icon size={16} />
                  </Button>
                </div>
              ))
            ) : (
              <div className="flex items-center justify-center mb-4">
                <h1 className="text-2xl font-bold text-gray-700 dark:text-white">
                  No Items in Cart
                </h1>
              </div>
            )}

            <div className="flex flex-end items-center justify-end gap-4 px-10 py-2 ">
              <Label className="text-sm font-bold ">Total Items</Label>
              <Label className="text-sm font-bold">{cartItems?.length}</Label>
            </div>

            <div className="flex flex-end items-center justify-end gap-4 px-10 py-2 ">
              <Label className="text-sm font-bold">Total Price</Label>
              <Label className="text-sm font-bold">
                {cartItems
                  ?.reduce((acc, item) => acc + item?.price * item?.quantity, 0)
                  .toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                  })}{" "}
              </Label>
            </div>
            <div className="flex flex-end items-center justify-end gap-4 px-10 py-2 border-b border-orange-500">
              <Label className="text-sm font-bold text-orange-400">
                Discount
              </Label>
              <Label className="text-sm font-bold text-orange-400">
                {totalDiscount.toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                })}{" "}
              </Label>
            </div>
            <div className="flex flex-end items-center justify-end gap-4 px-10 py-2 border-b border-orange-500">
              <Label className="text-sm font-bold ">
                Total Price After Discount
              </Label>
              <Label className="text-sm font-bold">
                {totalPriceWithDiscount.toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                })}{" "}
              </Label>
            </div>
          </SheetDescription>
        </SheetHeader>

        {!!cartItems.length && (
          <SheetFooter>
            <Button className="w-200 m-2">Checkout</Button>
            <Button
              variant="destructive"
              className="w-200 m-2"
              onClick={() => {
                clearCart();
              }}
            >
              Clear
            </Button>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  );
}
