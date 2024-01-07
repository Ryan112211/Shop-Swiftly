import PaginationSection from "@/components/pagination";
import ProductCard from "@/components/product-card";
import { getCategoryProducts } from "@/lib/utils";

interface HomeProps {
  params: any;
}

export default async function CategoryProduct({ params }: HomeProps) {
  const products = await getCategoryProducts(params?.category);

  return (
    <main>
      {products?.products?.length ? (
        <div className="container-full w-full mx-auto mt-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            {products?.products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="flex items-center  justify-center md:justify-end mt-4">
            <PaginationSection
              postsPerPage={products?.limit}
              totalPosts={products?.total}
            />
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center mb-4">
          <h1 className="text-2xl font-bold text-gray-700">
            No products found
          </h1>
        </div>
      )}
    </main>
  );
}
