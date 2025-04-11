const Index = () => {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
        <h1 className="text-5xl font-bold text-white mb-4">
          ¡Hola, Tailwind CSS!
        </h1>
        <p className="text-lg text-white">
          Este es un componente de prueba para verificar la integración de Tailwind CSS.
        </p>
        <button className="mt-6 px-6 py-3 bg-white text-blue-600 rounded-md shadow hover:bg-gray-100">
          Empezar
        </button>
      </div>
    );
  };
  
  export default Index;