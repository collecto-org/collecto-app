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
  const [images, setImages] = useState<File[]>([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    transaction: "",
    status: "",
    product_type: "",
    universe: "",
    condition: "",
    collection: "",
    brand: "",
    tags: ["general"],
  });
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    setTransactionTypes([
      { _id: "6805120d475633a8d1937383", name: "Venta" },
      { _id: "6805120d475633a8d1937386", name: "Compra" },
    ]);
    setBrands([
      { _id: "68050e09d0b1665043adc674", name: "Hasbro" },
      { _id: "68050e08d0b1665043adc665", name: "Bandai" },
      { _id: "68050e09d0b1665043adc677", name: "Hot Toys" },
    ]);
    setStatuses([
      { _id: "68051032bdeebe0615b2ea70", name: "available" },
      { _id: "68051032bdeebe0615b2ea73", name: "Reservado" },
      { _id: "68051032bdeebe0615b2ea76", name: "Vendido" },
    ]);
    setconditions([
      { _id: "680510bcdc96ef29affe20a1", name: "Nuevo" },
      { _id: "680510bcdc96ef29affe20a4", name: "Usado" },
      { _id: "680510bddc96ef29affe20a7", name: "Empaque Dañado" },
    ]);
    setproductType([
      { _id: "68051d1221020cef9e10b6c6", name: "Figura" },
      { _id: "68051d1221020cef9e10b6c7", name: "Estampa" },
      { _id: "68051d1221020cef9e10b6c8", name: "Muneco" },
    ]);
  }, []);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const selectedFiles = Array.from(e.target.files);
    if (images.length + selectedFiles.length > 6) {
      alert("Solo puedes subir hasta 6 imágenes");
      return;
    }
    setImages([...images, ...selectedFiles]);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const advertForm = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
      if (key === "tags" && Array.isArray(value)) {
        value.forEach((tag) => advertForm.append("tags", tag));
      } else {
        advertForm.append(key, value as string);
      }
    });

    advertForm.append("type", "advert");
    images.forEach((img) => advertForm.append("images", img));
    
    console.log("FormData enviado:");
    for (const pair of advertForm.entries()) {
      console.log(pair[0], pair[1]);
    }

    try {
      console.log("datos del formulario: ",advertForm )
      const res = await fetch("http://localhost:3000/api/adverts", {
        method: "POST",
        body: advertForm,
        credentials: "include",
      });

      if (!res.ok) {
        const errorData = await res.json();
        console.error("Error del servidor:", errorData);
        throw new Error(errorData.message);
      }

      setMessage("Anuncio creado exitosamente");
      setImages([]);
    } catch (err: any) {
      setMessage(err.message || "Error al crear el anuncio");
    }
  };

  return (
    <MainLayout>
      <div className="mt-10 max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-darkblue mb-6">Crear nuevo anuncio</h1>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <label className="block">Título</label>
          <input name="title" placeholder="Título" onChange={handleChange} className="w-full border rounded px-3 py-2" />

          <label className="block">Descripción</label>
          <textarea name="description" placeholder="Descripción" onChange={handleChange} className="w-full border rounded px-3 py-2" />

          <label className="block">Precio</label>
          <input name="price" type="number" placeholder="Precio" onChange={handleChange} className="w-full border rounded px-3 py-2" />

          <label className="block">Tipo de transacción</label>
          <select name="transaction" onChange={handleChange} className="w-full border rounded px-3 py-2">
            <option value="">Selecciona una opción</option>
            {transactionTypes.map(t => <option key={t._id} value={t._id}>{t.name}</option>)}
          </select>

          <label className="block">Estado</label>
          <select name="status" onChange={handleChange} className="w-full border rounded px-3 py-2">
            <option value="">Selecciona un estado</option>
            {statuses.map(s => <option key={s._id} value={s._id}>{s.name}</option>)}
          </select>

          <label className="block">Tipo de producto</label>
          <select name="product_type" onChange={handleChange} className="w-full border rounded px-3 py-2">
            <option value="">Selecciona un tipo</option>
            {productType.map(p => <option key={p._id} value={p._id}>{p.name}</option>)}
          </select>

          <label className="block">Universo</label>
          <select name="universe" onChange={handleChange} className="w-full border rounded px-3 py-2">
            <option value="">Selecciona un universo</option>
            {universes.map(u => <option key={u._id} value={u._id}>{u.name}</option>)}
          </select>

          <label className="block">Condición</label>
          <select name="condition" onChange={handleChange} className="w-full border rounded px-3 py-2">
            <option value="">Selecciona una condición</option>
            {conditions.map(c => <option key={c._id} value={c._id}>{c.name}</option>)}
          </select>

          <label className="block">Marca</label>
          <select name="brand" onChange={handleChange} className="w-full border rounded px-3 py-2">
            <option value="">Selecciona una marca</option>
            {brands.map(b => <option key={b._id} value={b._id}>{b.name}</option>)}
          </select>

          <label className="block">Colección (opcional)</label>
          <input
            type="text"
            name="collection"
            placeholder="Colección"
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />

          <label className="block">Imágenes</label>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageChange}
            className="block w-full border rounded px-3 py-2"
          />

          <div className="grid grid-cols-3 gap-4">
            {images.map((file, idx) => (
              <div key={idx} className="relative border rounded">
                <img
                  src={URL.createObjectURL(file)}
                  alt={`preview-${idx}`}
                  className="w-full h-32 object-cover"
                />
              </div>
            ))}
          </div>

          <Button type="submit" variant="turquoise">Subir</Button>
          {message && <p className="text-sm text-darkblue mt-2">{message}</p>}
        </form>
      </div>
    </MainLayout>
  );
}
