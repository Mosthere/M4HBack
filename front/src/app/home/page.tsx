// const mockProducts = [
//   { id: 1, name: "Producto A", price: 100 },
//   { id: 2, name: "Producto B", price: 250 },
//   { id: 3, name: "Producto C", price: 400 },
// ];

import { getProducts } from "../../lib/api"
import { Product } from "@/types/product"
import Link from "next/link"

export default async function HomePage() {

    const products: Product[] = await getProducts()

//     const [cart, setCart] = useState<CartItem[]>([]);

//   async function addToCart(product: CartItem) {
//     try {
//       await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/cart/add`, {
//         productId: product.id,
//         quantity: 1,
//       });

//       setCart((prev) => {
//         const exist = prev.find((item) => item.id === product.id);
//         if (exist) {
//           return prev.map((item) =>
//             item.id ? { ...item, quantity: item.quantity + 1 } : item
//           );
//         } else {
//           return [...prev, { ...product, quantity: 1 }];
//         }
//       });
//     } catch (err) {
//       console.error("Error al agregar producto al carrito", err);
//     }
//   }
    
    return (
        <main>
            <h1>Catálogo de productos</h1>
            <div>
                {
                /* {products.map((p) =>(
                    <div key={p.id}>
                        <h2>
                            {p.name}
                        </h2>
                        <p>
                            ${p.price}
                        </p>
                        <a href={`/product-detail/${p.id}`}>
                        Ver detalle</a>
                    </div>
                ))} */
                
                products.map((p: Product) => (
                <div key={p.id}>
                    <h2>{p.name}</h2>
                    <p>${p.price}</p>
                    <Link href={`/product-detail/${p.id}`}> Ver detalle </Link>
 
                </div>
                    ))
                }
            </div>
        </main>  
    )
     
}