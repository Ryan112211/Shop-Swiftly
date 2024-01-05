"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import Image from "next/image";
import { SearchInput } from "./search-input";
import { ModeToggle } from "./theme-toggle";
import { useRouter } from "next/navigation";
import { CartComponent } from "./cart-component";

export function NavigationMenuSwift({ categories }: { categories: any[] }) {
  const router = useRouter();
  return (
    <div className="flex items-center justify-between mb-8">
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem
            className="pr-4 cursor-pointer"
            onClick={() => router.push("/")}
          >
            <Image
              src="/icons/shopLogoOrange.png"
              width="258"
              height="59"
              alt="logo"
            />
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Categories</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[300px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[800px] text-gray-500">
                {categories.map((category) => (
                  <ListItem
                    key={category}
                    title={category}
                    className="capitalize"
                    href={`/category/${category}`}
                  />
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <SearchInput />
          </NavigationMenuItem>
          <NavigationMenuItem className="pr-2">
            <ModeToggle />
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>

      <CartComponent />
    </div>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
