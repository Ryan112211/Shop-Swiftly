import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useCallback } from "react";

export function SearchInput() {
  const [search, setSearch] = React.useState("");

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === "") {
      router.push(pathname);
    }
    setSearch(e.target.value);
  };

  const handleSearch = () => {
    if (search) {
      router.push("/" + "?" + createQueryString("search", String(search)));
    }
  };
  return (
    <div className="w-full hidden md:flex max-w-sm items-center space-x-2">
      <Input
        type="search"
        placeholder="Search..."
        value={search}
        onChange={handleChange}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSearch();
          }
        }}
      />
      <Button onClick={handleSearch}>
        <SearchIcon size={16} />
      </Button>
    </div>
  );
}
