export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-lg p-6">
        <h1 className="text-2xl font-semibold text-center mb-6">Iniciar sesión</h1>
        
        <form className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              Usuario
            </label>
            <input
              id="username"
              name="username"
              type="text"
              className="mt-1 block w-full rounded-lg border border-gray-300 p-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
              placeholder="Ingresá tu usuario"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Contraseña
            </label>
            <input
              id="password"
              name="password"
              type="password"
              className="mt-1 block w-full rounded-lg border border-gray-300 p-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Ingresar
          </button>
        </form>
      </div>
    </div>
  );
}