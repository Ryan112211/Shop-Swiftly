import { CarouselProduct } from "@/components/product-carousel";
import { getProduct } from "@/lib/utils";

interface HomeProps {
  params: any;
}

export default async function Product({ params }: HomeProps) {
  const product = await getProduct(params.product);

  return (
    <main>
      {product ? (
        <div className="container-full flex items-center justify-center">
          <CarouselProduct key={product.id} product={product} />
        </div>
      ) : (
        <div className="flex items-center justify-center mb-4">
          <h1 className="text-2xl font-bold text-gray-700 dark:text-white">
            No product found
          </h1>
        </div>
      )}
    </main>
  );
}
