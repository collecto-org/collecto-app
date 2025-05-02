import { useUpdateAdvertStatusMutation } from "@/services/advertsApi";

export default function useToggleReserved() {
  const [updateAdvertStatus] = useUpdateAdvertStatusMutation();

  const handleToggleReserved = async (
    advertId: string,
    isCurrentlyReserved: boolean
  ) => {
    const newStatus = isCurrentlyReserved ? "available" : "reserved";

    try {
      await updateAdvertStatus({ id: advertId, status: newStatus }).unwrap();
    } catch (error) {
      console.error("Error al cambiar estado reservado:", error);
      throw error;
    }
  };

  return handleToggleReserved;
}
