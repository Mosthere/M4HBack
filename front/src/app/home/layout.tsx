export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">


      <header className="bg-white shadow p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">Mi Ecommerce</h1>
        <nav className="space-x-4">
          <a href="/home" className="hover:underline">Inicio</a>
          <a href="/shopping-cart" className="hover:underline">Carrito</a>
          <a href="/dashboard" className="hover:underline">Mi Cuenta</a>
        </nav>
      </header>



      <main className="flex-1 p-8">{children}</main>


      <footer className="bg-gray-100 text-center p-4 text-sm">
        © {new Date().getFullYear()} Mi Ecommerce. Todos los derechos reservados.
      </footer>
    </div>
  );
}