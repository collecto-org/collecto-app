import { useNavigate } from "react-router-dom";
import RatingStars from "@/componentsUI/elements/RatingStars";

interface SellerCardProps {
  username: string;
  avatarUrl?: string;
  rating?: number;
  userId?: string;
}

export default function SellerCard({
  username,
  avatarUrl,
  rating = 4.5,
  userId,
}: SellerCardProps) {
  const navigate = useNavigate();

  return (
    <div className="mt-6 p-4 border rounded-xl shadow-sm max-w-sm">
      <h3 className="text-sm font-semibold mb-2">Vendedor:</h3>
      <div className="flex items-center gap-4 justify-between">
        <div className="flex items-center gap-4">
          <img
            src={avatarUrl || "https://github.com/mdo.png"}
            alt="avatar"
            className="w-12 h-12 rounded-full object-cover border"
          />
          <div className="text-sm">
            <p className="font-medium">{username}</p>
            <div className="flex items-center gap-2">
              <RatingStars rating={rating} />
              <p className="text-xs text-sage">
                {rating.toFixed(1)} · 354 reviews
              </p>
            </div>
          </div>
        </div>
        <button
          onClick={() => navigate(`/ratings/${userId}`)}
          className="text-sage text-sm hover:underline"
        >
          <span className="material-symbols-outlined text-xs">
            arrow_forward_ios
          </span>
        </button>
      </div>
    </div>
  );
}
