import React, { useState, useEffect } from "react";
import MainLayout from "@/componentsUI/layouts/MainLayout";
import Button from "@/componentsUI/elements/Button";
import { useGetUniversesQuery } from "@/services/universesApi";

interface CatalogOption {
  _id: string;
  name: string;
}

export default function NewAdvertPage() {
  const { data: universes = [], isLoading: isLoadingUniverses } = useGetUniversesQuery();

  const [transactionTypes, setTransactionTypes] = useState<CatalogOption[]>([]);
  const [brands, setBrands] = useState<CatalogOption[]>([]);
  const [statuses, setStatuses] = useState<CatalogOption[]>([]);
  const [conditions, setconditions] = useState<CatalogOption[]>([]);
  const [productType, setproductType] = useState<CatalogOption[]>([]);
  const [images, setImages] = useState<File[]>([])

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    transaction_type: "",
    status: "",
    product_type: "",
    universe: "",
    condition: "",
    collection: "",
    brand: "",
    tags: [],
  });

  useEffect(() => {
    setTransactionTypes([
      { _id: "1", name: "Venta" },
      { _id: "2", name: "Intercambio" },
      { _id: "3", name: "Donación" },
    ]);
    setBrands([
      { _id: "1", name: "Hasbro" },
      { _id: "2", name: "Bandai" },
      { _id: "3", name: "Hot Toys" },
    ]);
    setStatuses([
      { _id: "available", name: "Disponible" },
      { _id: "reserved", name: "Reservado" },
      { _id: "sold", name: "Vendido" },
    ]);
    setconditions([
      { _id: "Nuevo", name: "Nuevo" },
      { _id: "Usado", name: "Usado" },
      { _id: "EmpaqueDanado", name: "Empaque Dañado" },
    ]);
    setproductType([
      { _id: "Figura", name: "Figura" },
      { _id: "Estampa", name: "Estampa" },
      { _id: "Muneco", name: "Muneco" },
    ]);
  }, []);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const selectedFiles = Array.from(e.target.files);
    if (images.length + selectedFiles.length > 6) {
      alert("Solo puedes subir hasta 6 imágenes");
      return;
    }
    setImages([...images, ...selectedFiles]);
  };

  const removeImage = (index : number) =>{
    const updated = [...images]
    updated.splice(index,1 )
    setImages(updated)
  }


  return (
    <MainLayout>
      <div className="mt-10 max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-darkblue mb-6">Crear nuevo anuncio</h1>

        <form className="space-y-6">
          <div>
            <label className="block font-medium mb-1">Título</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />
          </div>



          <div>
            <label className="block font-medium mb-1">Descripción</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              rows={4}
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Precio</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-darkblue mb-1">Tipo de transacción</label>
              <select className="w-full border rounded px-3 py-2">
                {transactionTypes.map((t) => (
                  <option key={t._id} value={t._id}>{t.name}</option>
                ))}
              </select>
            </div>

            <div>
            <label className="block text-sm font-medium text-darkblue mb-1">Estado</label>
            <select className="w-full border rounded px-3 py-2">
              {statuses.map((s) => (
                <option key={s._id} value={s._id}>{s.name}</option>
              ))}
            </select>
          </div>

            <div>
              <label className="block font-medium mb-1">Tipo de producto</label>
              <select name="product_type" value={formData.product_type} onChange={handleChange} className="w-full border rounded px-3 py-2">
              {isLoadingUniverses ? (
                  <option>Cargando...</option>
                ) : (
                  productType.map((u: CatalogOption) => (
                    <option key={u._id} value={u._id}>{u.name}</option>
                  ))
                )}
              </select>
            </div>

            <div>
            <label className="block text-sm font-medium text-darkblue mb-1">Universo</label>
            <select className="w-full border rounded px-3 py-2">
              {isLoadingUniverses ? (
                <option>Cargando...</option>
              ) : (
                universes.map((u: CatalogOption) => (
                  <option key={u._id} value={u._id}>{u.name}</option>
                ))
              )}
            </select>
          </div>

          <div>
              <label className="block font-medium mb-1">Condicion</label>
              <select name="status" className="w-full border rounded px-3 py-2">
                {isLoadingUniverses ? (
                  <option>Cargando...</option>
                ) : (
                  conditions.map((u: CatalogOption) => (
                    <option key={u._id} value={u._id}>{u.name}</option>
                  ))
                )}
              </select>
            </div>


            <div>
              <label className="block text-sm font-medium text-darkblue mb-1">Marca</label>
              <select className="w-full border rounded px-3 py-2">
                {brands.map((b) => (
                  <option key={b._id} value={b._id}>{b.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block font-medium mb-1">Colección (opcional)</label>
            <input
              type="text"
              name="collection"
              value={formData.collection}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-darkblue mb-1">
                <input type="file" 
                accept="image/*"
                multiple
                onChange={handleImageChange}
                className="block w-full"
                />
                <div className="grid grid-cols-3 gap-4 mt-2">
                {images.map((file, idx) => (
                <div key={idx} className="relative">
                  <img
                    src={URL.createObjectURL(file)}
                    alt={`preview-${idx}`}
                    className="w-full h-32 object-cover rounded border-black"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(idx)}
                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full px-2 text-xs"
                  >
                    ✕
                  </button>
                </div>
              ))}
                </div>
            </label>
            </div>
          <Button type="submit" variant="turquoise">Continuar</Button>
        </form>
      </div>
    </MainLayout>
  );
}
