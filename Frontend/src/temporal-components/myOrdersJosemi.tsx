import { useGetMyOrdersQuery } from "@/services/ordersApi";


export function MyOrders() {
  const {data} =  useGetMyOrdersQuery({})

    const orders = data



  if (orders && orders.length > 0) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-7 px-4 mx-2 sm:px-6 py-4">
        {orders.map((notification) => (
          <div key={notification.advertId._id} className="p-4 bg-white text-darkblue shadow rounded">
            <p className="font-semibold text-darkblue">Orden</p>
            <p>{notification.advertId.title}</p>
          </div>
        ))}
      </div>
    );
  }

  return <p className="px-4 py-2 text-gray-500">No hay notificaciones.</p>;
}
