import Icon from "@/componentsUI/elements/Icon";

interface ActionBarProps {
  onEdit?: () => void ;
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
          size={20}
          onClick={onDelete}
          className="hover:text-coral transition-colors"
        />
      )}
      {onEdit && (
        <Icon
          name="Edit"
          size={20}
          onClick={onEdit}
          className="hover:text-coral transition-colors"
        />
      )}
      {onToggleFav && (
        <Icon
          name="heart"
          size={20}
          active={isFavorite}
          onClick={onToggleFav}
          className={`text-darkblue hover:text-coral transform transition-all duration-300 ease-in-out ${
            isFavorite ? "scale-125 drop-shadow-[0_0_4px_#e8796e]" : "scale-100"
          }`}
        />
      )}
    </div>
  );
}
