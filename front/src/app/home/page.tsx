const mockProducts = [
  { id: 1, name: "Producto A", price: 100 },
  { id: 2, name: "Producto B", price: 250 },
  { id: 3, name: "Producto C", price: 400 },
];

export default function HomePage() {
    return (
        <main>
            <h1>Catálogo de productos</h1>
            <div>
                {mockProducts.map((p) =>(
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
                ))}
            </div>
        </main>  
    )
     
}