import Icon from "@/componentsUI/elements/Icon";

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
  return (
    <div className="flex gap-2">
      {onDelete && (
        <Icon
          name="Trash"
          size={25}
          onClick={onDelete}
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
