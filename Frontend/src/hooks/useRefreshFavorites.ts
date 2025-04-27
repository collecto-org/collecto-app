import {
  useSetAdvertFavMutation,
  useRemoveAdvertFavMutation,
} from "@/services/usersApi";

export default function useRefreshFavorites() {
  const [setAdvertFav] = useSetAdvertFavMutation();
  const [removeAdvertFav] = useRemoveAdvertFavMutation();

  const refreshFavorites = async (id: string, isCurrentlyFavorite: boolean) => {
    if (isCurrentlyFavorite) {
      await removeAdvertFav(id);
    } else {
      await setAdvertFav(id);
    }
  };

  return refreshFavorites;
}
