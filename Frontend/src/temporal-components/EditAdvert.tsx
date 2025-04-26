import React, { useState, useEffect } from "react";
import MainLayout from "@/componentsUI/layouts/MainLayout";
import Button from "@/componentsUI/elements/Button";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { selectBrands, selectConditions, selectProductTypes, selectStatus, selectTransactions, selectUniverses } from "@/store/selectors/optionsSelectors";
import { useEditAdvertMutation} from "@/services/advertsApi";
import { useNavigate } from "react-router-dom";
import { Advert } from "@/services/schemas/AdvertsSchemas";
import { z } from "zod";


interface CatalogOption {
  _id: string;
  name?: string;
  value?:string;
  label?:string
}

interface EditAdvert{
  advert:Advert
  handleEdit : () => void
}

const editAdvertSchema = z.object({
  title: z.string().min(3, "El título es obligatorio"),
  description: z.string().min(10, "La descripción tiene que tener al menos 10 caracteres"),
  price: z.string()
  .min(1, "El precio es obligatorio")
  .transform((val) => parseFloat(val)) // Convierte a número
  .refine((val) => val >= 0, {
    message: "El precio no puede ser negativo",
  }),
  transaction: z.string().min(1, "Selecciona un tipo de transacción"),
  status: z.string().min(1, "Selecciona un estado"),
  product_type: z.string().min(1, "Selecciona un tipo de producto"),
  universe: z.string().min(1, "Selecciona un universo"),
  condition: z.string().min(1, "Selecciona una condición"),
  brand: z.string().min(1, "Selecciona una marca"),
  collection: z.string().optional(),
  tags: z.array(z.string()),
});

export default function EditAdvertPage({advert,handleEdit}:EditAdvert) {

  const navigate = useNavigate()

const universes = useSelector((state:RootState)=> selectUniverses(state))
const brandsOptions = useSelector((state:RootState)=> selectBrands(state))
const transactionsOptions = useSelector((state:RootState)=> selectTransactions(state))
const conditionsOptions = useSelector((state:RootState)=> selectConditions(state))
const productTypesOptions = useSelector((state:RootState)=> selectProductTypes(state))
const statusOptions = useSelector((state:RootState)=> selectStatus(state))

const [existingImages, setExistingImages] = useState<string[]>(advert.images || []);

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

  useEffect(() => {
    if (advert) {
      setFormData({
        title: advert.title || "",
        description: advert.description || "",
        price: String(advert.price) || "",
        transaction: advert.transaction?._id || "",
        status: advert.status?._id || "",
        product_type: advert.product_type?._id || "",
        universe: advert.universe?._id || "",
        condition: advert.condition?._id || "",
        collection: advert.collection || "",
        brand: advert.brand?._id || "",
        tags: advert.tags?.length ? advert.tags : ["general"],
      });
    }
  }, [advert]);
  const [message, setMessage] = useState<string>("");

  const [editAdvert,{isLoading,isError,  data}]= useEditAdvertMutation()

  useEffect(() => {
    setTransactionTypes(transactionsOptions || []);
    setBrands(brandsOptions|| []);
    setStatuses(statusOptions || []);
    setconditions(conditionsOptions || []);
    setproductType(productTypesOptions || []);
  }, [brandsOptions,transactionsOptions,conditionsOptions,productTypesOptions,statusOptions]);
  
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
    setMessage("");
  
    const result = editAdvertSchema.safeParse(formData);
  
    if (!result.success) {
      const firstError = result.error.errors[0]?.message;
      setMessage(firstError || "Hay errores en el formulario");
      return;
    }
  
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
    existingImages.forEach((url) => advertForm.append("imagesUrl", url));

    
   
      if (images.length + existingImages.length > 6) {
        console.log("fallo");      
        setMessage("No puedes subir más de 6 imágenes");
        return
      }

      if (existingImages.length <=0 && images.length <=0) {
        console.log("fallo");      
        setMessage("Debes de subir al menos una imagen");
        return
      }
      
  
     const response = await editAdvert({ formData: advertForm, id: advert._id });      

      

      if (isLoading) {
        setMessage("Cargando...");
        return;
      }
    
      if (isError) {
        setMessage( "Error al editar el anuncio");
        return;
      }
      if (response.data) {
        setMessage("Anuncio editado exitosamente");
        setImages([]); 
        handleEdit()
        navigate(`/adverts/${response.data.advert.slug}`)

      }
    };
     

  
  return (
    <MainLayout>
      <div className="mt-10 max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-darkblue mb-6">
          Editar anuncio
        </h1>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <label className="block">Título</label>
          <input
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />

          <label className="block">Descripción</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />

          <label className="block">Precio</label>
          <input
            name="price"
            type="number"
            value={formData.price}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />

          <label className="block">Tipo de transacción</label>
          <select
            name="transaction"
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          >
            <option value={advert.transaction.label}>
              Selecciona una opción
            </option>
            {transactionTypes.map((t) => (
              <option
                selected={t._id === advert.transaction._id}
                key={t._id}
                value={t._id}
              >
                {t.value}
              </option>
            ))}
          </select>

          <label className="block">Está Disponible</label>
          <select
            name="status"
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          >
            <option value="">Selecciona un estado</option>
            {statuses.map((s) => (
              <option
                selected={s._id === advert.status._id}
                key={s._id}
                value={s._id}
              >
                {s.label}
              </option>
            ))}
          </select>

          <label className="block">Tipo de producto</label>
          <select
            name="product_type"
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          >
            <option value="">Selecciona un tipo</option>
            {productType.map((p) => (
              <option
                selected={p._id === advert.product_type._id}
                key={p._id}
                value={p._id}
              >
                {p.name}
              </option>
            ))}
          </select>

          <label className="block">Universo</label>
          <select
            name="universe"
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          >
            <option value="">Selecciona un universo</option>
            {universes?.map((u) => (
              <option
                selected={u._id === advert.universe._id}
                key={u._id}
                value={u._id}
              >
                {u.name}
              </option>
            ))}
          </select>

          <label className="block">Condición</label>
          <select
            name="condition"
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          >
            <option value="">Selecciona una condición</option>
            {conditions.map((c) => (
              <option
                selected={c._id === advert.condition._id}
                key={c._id}
                value={c._id}
              >
                {c.value}
              </option>
            ))}
          </select>

          <label className="block">Marca</label>
          <select
            name="brand"
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          >
            <option value="">Selecciona una marca</option>
            {brands.map((b) => (
              <option
                selected={b._id === advert.brand._id}
                key={b._id}
                value={b._id}
              >
                {b.name}
              </option>
            ))}
          </select>

          <label className="block">Collección</label>
          <textarea
            name="collection"
            value={formData.collection}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />

          <label className="block">Imágenes</label>
          <input
            type="file"
            name="images"

            accept="image/*"
            multiple
            onChange={handleImageChange}
            className="block w-full border rounded px-3 py-2"
          />

          <div className="grid grid-cols-3 gap-4">
            {existingImages.map((url, idx) => (
              <div key={`existing-${idx}`} className="relative border rounded">
                <img
                  src={url}
                  alt={`existing-${idx}`}
                  className="w-full h-32 object-cover"
                />
                <button
                  type="button"
                  onClick={() =>
                    setExistingImages(
                      existingImages.filter((_, i) => i !== idx)
                    )
                  }
                  className="absolute top-1 right-1 bg-red-500 text-white px-2 py-1 text-xs rounded"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-3 gap-4">
            {images.map((file, idx) => (
              <div key={idx} className="relative border rounded">
                <img
                  src={URL.createObjectURL(file)}
                  alt={`preview-${idx}`}
                  className="w-full h-32 object-cover"
                />
                <button
                  type="button"
                  onClick={() => setImages(images.filter((_, i) => i !== idx))}
                  className="absolute top-1 right-1 bg-red-500 text-white px-2 py-1 text-xs rounded"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>

          <Button type="submit" variant="turquoise" disabled={isLoading}>
            {isLoading ? "Cargando..." : "Enviar"}
          </Button>
          {message && <p className="text-sm text-darkblue mt-2">{message}</p>}
        </form>
      </div>
    </MainLayout>
  );
}
