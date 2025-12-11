// "use client"

// import { useCart } from "@/context/CartContext"
// export default function ShoppingCartPage() {
//   const { cart, incrementQuantity} = useCart()

//   return (
//     <main>
//       <h1>Carrito de Compras</h1>
//       {cart.length === 0? (
//         <p>Tu carrito está vacío</p>
//       )
//     : (
//       cart.map((item.id) => (
//         <div key={item.id}>
//           <h2>{item.name} </h2>
//           <p> Precio: ${item.price} </p>
//           <p>Cantidad: {item.quantity} </p>
//           <button onClick={() => incrementQuantity(item.id)}>+</button>
//         </div>
//       ))
//     )}
//     </main>
//   )
// }



// import { CartItem } from "@/types/cart";
// import axios from "axios";
// import { useState } from "react";

// export default function ShoppingCartPage() {
//   const [cart, setCart] = useState<CartItem[]>([]);

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
//   return (
//     <main>
//       <h1>Carrito de Compras</h1>
//       <p>Aquí verás los productos que hayas agregado.</p>
//       <div>
//         {cart.length === 0 ? (
//           <p>Tu carrito está vacío</p>
//         ) : (
//           cart.map((item) => (
//             <div key={item.id}>
//               <h2>{item.name}</h2>
//               <p>Precio: ${item.price}</p>
//               <p>Cantidad: {item.quantity}</p>
//             </div>
            
//           ))
          
//         )}
//       </div>
//     </main>
//   );
// }
