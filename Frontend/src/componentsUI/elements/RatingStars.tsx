interface RatingStarsProps {
    rating: number;
    onRate?: (value: number) => void;
  }
  
  export default function RatingStars({ rating, onRate }: RatingStarsProps) {
    const totalStars = 5;
    const fullStars = Math.floor(rating);
    const hasHalf = rating - fullStars >= 0.5;
  
    return (
      <div className="flex items-center">
        {Array.from({ length: totalStars }, (_, i) => {
          const isFilled = i < fullStars;
          const isHalf = i === fullStars && hasHalf;
  
          return (
            <button
              key={i}
              onClick={() => onRate?.(i + 1)}
              className="transition-transform hover:scale-125"
            >
              <svg
                className={`w-5 h-5 ${
                  isFilled || isHalf ? "text-yellow-400" : "text-gray-300"
                }`}
                fill={isHalf ? "url(#half)" : isFilled ? "currentColor" : "none"}
                stroke="currentColor"
                strokeWidth="1"
                viewBox="0 0 24 24"
              >
                {isHalf && (
                  <defs>
                    <linearGradient id="half">
                      <stop offset="50%" stopColor="currentColor" />
                      <stop offset="50%" stopColor="transparent" />
                    </linearGradient>
                  </defs>
                )}
                <path d="M12 .587l3.668 7.431 8.2 1.193-5.934 5.782 1.4 8.173L12 18.896l-7.334 3.87 1.4-8.173L.132 9.211l8.2-1.193z" />
              </svg>
            </button>
          );
        })}
      </div>
    );
  }
  