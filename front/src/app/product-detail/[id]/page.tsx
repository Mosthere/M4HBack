import { getProductById } from "@/lib/api";
import { Product } from "@/types/product";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function ProductDetailPage({ params }: Props) {
  const { id } = await params;

  const product: Product = await getProductById(id);

  return (
    <main>
      <h1>Detalle del producto {product.name}</h1>
      <div>
        <h2>Producto:</h2>
        <p>$ {product.price}</p>
        <p>Descripción del producto:</p>
      </div>
    </main>
  );
}
