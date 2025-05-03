import Icon from "@/componentsUI/elements/Icon";
import { toast } from "react-toastify";

interface ActionBarProps {
  onEdit?: () => void;
  onDelete?: () => void;
  onToggleFav?: () => void;
  isFavorite?: boolean;
}

export default function ActionBar({
  onEdit,
  onDelete,
  onToggleFav,
  isFavorite = false,
}: ActionBarProps) {
  const handleDeleteClick = () => {
    toast.info(
      ({ closeToast }) => (
        <div className="text-center">
          <p className="mb-2">¿Estás seguro de borrar este anuncio?</p>
          <div className="flex justify-center gap-2">
            <button
              className="px-3 py-1 bg-coral text-white rounded hover:bg-[#e4685c] transition"
              onClick={() => {
                onDelete && onDelete();
                closeToast();
              }}
            >
              Sí, borrar
            </button>
            <button
              className="px-3 py-1 bg-gray-300 text-darkblue rounded hover:bg-gray-400 transition"
              onClick={closeToast}
            >
              Cancelar
            </button>
          </div>
        </div>
      ),
      { autoClose: false }
    );
  };

  return (
    <div className="flex gap-4">
      {onDelete && (
        <Icon
          name="Trash"
          size={23}
          onClick={handleDeleteClick}
          className="hover:text-coral transition-colors"
        />
      )}
      {onEdit && (
        <Icon
          name="Edit"
          size={25}
          onClick={onEdit}
          className="hover:text-coral transition-colors"
        />
      )}
      {onToggleFav && (
        <Icon
          name="heart"
          size={25}
          active={isFavorite}
          onClick={onToggleFav}
          className={`text-coral hover:text-coral transform transition-all duration-300 ease-in-out ${
            isFavorite ? "scale-115" : "scale-115"
          }`}
        />
      )}
    </div>
  );
}
