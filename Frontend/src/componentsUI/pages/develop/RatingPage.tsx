import { useParams, useNavigate } from "react-router-dom";

export default function RatingsPage() {
  const { userId } = useParams();
  const navigate = useNavigate();

  return (
    <div className="max-w-3xl mx-auto py-24 px-4 text-darkblue">
      <h1 className="text-2xl font-bold mb-2">Valoraciones del vendedor</h1>
      <p className="text-sage mb-6">
        Aquí se mostrarán las reseñas y comentarios del usuario con ID:{" "}
        <strong>{userId}</strong>
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
