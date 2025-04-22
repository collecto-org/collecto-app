
interface NoResultsProps {
  message?: string;
}

export default function NoResults({ message = "No se encontraron resultados" }: NoResultsProps) {
  return (
    <div className="text-center text-gray-600 py-10">
      <p>{message}</p>
    </div>
  );
}