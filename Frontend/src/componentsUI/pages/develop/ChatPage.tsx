import { useNavigate, useParams } from "react-router-dom";

export default function ChatPage() {
  const { userId } = useParams();
  const navigate = useNavigate();

  return (
    <div className="max-w-4xl mx-auto p-6 text-darkblue text-center">
      <h1 className="text-2xl font-bold mb-4">Chat con el usuario</h1>
      <p>Esta será la zona de conversación con el usuario ID: <strong>{userId}</strong></p>

      <button
        onClick={() => navigate(-1)}
        className="mt-6 inline-flex items-center px-4 py-2 text-sm rounded-lg bg-sage text-white hover:bg-darkblue"
      >
        ← Volver al anuncio
      </button>
    </div>
  );
}
