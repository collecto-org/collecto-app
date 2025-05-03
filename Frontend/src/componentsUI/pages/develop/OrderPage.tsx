import { useNavigate } from "react-router-dom";

export default function Orderpage() {
  const navigate = useNavigate();

  return (
    <div className="max-w-3xl mx-auto py-24 px-4 text-darkblue">
      <h1 className="text-2xl font-bold mb-2">Orden de compra</h1>
      <p className="text-sage mb-6">
        Aquí se mostrará el proceso de compra de un articulo: <strong></strong>
      </p>

      <button
        onClick={() => navigate(-1)}
        className="bg-coral text-white px-4 py-2 rounded hover:bg-darkblue"
      >
        ← Volver al anuncio
      </button>
    </div>
  );
}
