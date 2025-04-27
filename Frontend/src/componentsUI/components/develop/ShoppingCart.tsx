import { FaShoppingCart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function CartIcon() {
  const navigate = useNavigate();

  const goToCart = () => {
    navigate("/cart");
  };

  return (
    <button
      onClick={goToCart}
      className="relative text-darkblue hover:text-coral transition transform hover:scale-110 p-2"
    >
      <FaShoppingCart className="w-5 h-5" />
    </button>
  );
}
