import React, { useState, useEffect } from "react";
import Button from "@/componentsUI/elements/Button";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import {
  selectAdvertStatus,
  selectBrands,
  selectConditions,
  selectProductTypes,
  selectTransactions,
  selectUniverses,
} from "@/store/selectors/optionsSelectors";
import { useNewAdvertMutation } from "@/services/advertsApi";
import { useNavigate } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import { z } from "zod";
import LoadingSpinner from "@/componentsUI/elements/LoadingSpinner";
import { BrandSchema, ConditionSchema, ProductTypeSchema, statusSchema, TransactionSchema } from "@/services/schemas/UniverseSchemas";


const newAdvertSchema = z.object({
  title: z.string().min(3, "El título es obligatorio"),
  description: z
    .string()
    .min(10, "La descripción tiene que tener al menos 10 caracteres"),
  price: z
    .string()
    .min(1, "El precio es obligatorio")
    .transform((val) => parseFloat(val))
    .refine((val) => val >= 0, { message: "El precio no puede ser negativo" }),
  transaction: z.string().min(1, "Selecciona un tipo de transacción"),
  status: z.string().min(1, "Selecciona un estado"),
  product_type: z.string().min(1, "Selecciona un tipo de producto"),
  universe: z.string().min(1, "Selecciona un universo"),
  condition: z.string().min(1, "Selecciona una condición"),
  brand: z.string().min(1, "Selecciona una marca"),
  collection: z.string().optional(),
  tags: z.array(z.string()),
});

export default function NewAdvertPage() {
  const navigate = useNavigate();

  const universes = useSelector((state: RootState) => selectUniverses(state));
  const brandsOptions = useSelector((state: RootState) => selectBrands(state));
  const transactionsOptions = useSelector((state: RootState) =>
    selectTransactions(state)
  );
  const conditionsOptions = useSelector((state: RootState) =>
    selectConditions(state)
  );
  const productTypesOptions = useSelector((state: RootState) =>
    selectProductTypes(state)
  );
  const statusOptions = useSelector((state: RootState) =>
    selectAdvertStatus(state)
  );

  const [transactionTypes, setTransactionTypes] = useState<TransactionSchema[]>([]);
  const [brands, setBrands] = useState<BrandSchema[]>([]);
  const [statuses, setStatuses] = useState<statusSchema[]>([]);
  const [conditions, setconditions] = useState<ConditionSchema[]>([]);
  const [productType, setproductType] = useState<ProductTypeSchema[]>([]);
  const [images, setImages] = useState<File[]>([]);
  const [currentTag, setCurrentTag] = useState("");

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
  const [newAdvert, { isLoading, isError }] = useNewAdvertMutation();

  useEffect(() => {
    setTransactionTypes(transactionsOptions || []);
    setBrands(brandsOptions || []);
    setStatuses(statusOptions || []);
    setconditions(conditionsOptions || []);
    setproductType(productTypesOptions || []);
  }, [
    brandsOptions,
    transactionsOptions,
    conditionsOptions,
    productTypesOptions,
    statusOptions,
  ]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const selectedFiles = Array.from(e.target.files);
    if (images.length + selectedFiles.length > 6) {
      setMessage("Solo puedes subir hasta 6 imágenes");
      return;
    }
    setImages([...images, ...selectedFiles]);
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const trimmed = currentTag.trim();
      if (trimmed && !formData.tags.includes(trimmed)) {
        setFormData((prev) => ({ ...prev, tags: [...prev.tags, trimmed] }));
        setCurrentTag("");
      }
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    if (images.length === 0) {
      setMessage("Debes subir al menos una imagen.");
      return;
    }

    if (images.length > 6) {
      setMessage("Solo puedes subir hasta 6 imágenes.");
      return;
    }

    const result = newAdvertSchema.safeParse(formData);
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

    const response = await newAdvert({ formData: advertForm });

    if (isLoading) {
      setMessage("Cargando...");
      return;
    }

    if (isError) {
      setMessage("Error al crear el anuncio");
      return;
    }
    if (response.data) {
      setMessage("Anuncio creado exitosamente");
      setImages([]);
      navigate(`/adverts/${response.data.advert.slug}`);
    }
  };

  return (
    <>
      <div className="mt-24 max-w-4xl mx-auto px-4 py-8">
        <Button
          onClick={() => navigate(-1)}
          className="mb-4 flex items-center gap-2"
          variant="turquoise"
        >
          <FiArrowLeft className="w-5 h-5" />
          Volver
        </Button>
        <h1 className="text-3xl font-bold text-darkblue mb-6">
          Agrega un nuevo anuncio
        </h1>
        <form className="space-y-5" onSubmit={handleSubmit}>
          <label className="block font-bold mb-0">Nombre del producto</label>
          <input
            name="title"
            placeholder="Agregar un nombre descriptivo"
            onChange={handleChange}
            className="w-full border border-coral rounded px-3 py-2"
          />

          <label className="block font-bold mb-0">Descripción</label>
          <textarea
            name="description"
            placeholder="Descripción del producto"
            onChange={handleChange}
            className="w-full border border-coral rounded px-3 py-2"
          />

          <label className="block font-bold mb-0">Precio</label>
          <input
            name="price"
            type="number"
            placeholder="Precio"
            onChange={handleChange}
            className="w-full border border-coral rounded px-3 py-2"
          />

          <label className="block font-bold mb-0">Tipo de transacción</label>
          <select
            name="transaction"
            onChange={handleChange}
            className="w-full border border-coral rounded px-3 py-2"
          >
            <option value="">Selecciona una opción</option>
            {transactionTypes?.map((t) => (
              <option key={t._id} value={t._id}>
                {t.value}
              </option>
            ))}
          </select>

          <label className="block font-bold mb-0">Estado del anuncio</label>
          <select
            name="status"
            onChange={handleChange}
            className="w-full border border-coral rounded px-3 py-2"
          >
            <option value="">Selecciona un estado</option>
            {statuses?.map((s) => (
              <option key={s._id} value={s._id}>
                {s.label}
              </option>
            ))}
          </select>

          <label className="block font-bold mb-0">Tipo de producto</label>
          <select
            name="product_type"
            onChange={handleChange}
            className="w-full border border-coral rounded px-3 py-2"
          >
            <option value="">Selecciona un tipo</option>
            {productType?.map((p) => (
              <option key={p._id} value={p._id}>
                {p.name}
              </option>
            ))}
          </select>

          <label className="block font-bold mb-0">Universo</label>
          <select
            name="universe"
            onChange={handleChange}
            className="w-full border border-coral rounded px-3 py-2"
          >
            <option value="">Selecciona un universo</option>
            {universes?.map((u) => (
              <option key={u._id} value={u._id}>
                {u.name}
              </option>
            ))}
          </select>

          <label className="block font-bold mb-0">Marca</label>
          <select
            name="brand"
            onChange={handleChange}
            className="w-full border border-coral rounded px-3 py-2"
          >
            <option value="">Selecciona una marca</option>
            {brands?.map((b) => (
              <option key={b._id} value={b._id}>
                {b.name}
              </option>
            ))}
          </select>

          <label className="block font-bold mb-0">Condición</label>
          <select
            name="condition"
            onChange={handleChange}
            className="w-full border border-coral rounded px-3 py-2"
          >
            <option value="">Selecciona una condición</option>
            {conditions?.map((c) => (
              <option key={c._id} value={c._id}>
                {c.value}
              </option>
            ))}
          </select>

          <label className="block font-bold mb-0">Colección (opcional)</label>
          <input
            type="text"
            name="collection"
            placeholder="Colección"
            onChange={handleChange}
            className="w-full border border-coral rounded px-3 py-2"
          />

          <label className="block font-bold mb-0">Tags (opcional)</label>
          <input
            type="text"
            name="tags"
            placeholder="Escribe un tag y presiona Enter"
            value={currentTag}
            onChange={(e) => setCurrentTag(e.target.value)}
            onKeyDown={handleAddTag}
            className="w-full border border-coral rounded px-3 py-2"
          />

          <div className="mt-2 flex gap-2 flex-wrap">
            {formData.tags.map((tag, index) => (
              <div
                key={index}
                className="flex items-center bg-lightgray text-darkblue px-2 py-1 rounded-full text-xs"
              >
                #{tag}
                <button
                  type="button"
                  onClick={() => handleRemoveTag(tag)}
                  className="ml-1 text-coral font-bold hover:text-red-600"
                >
                  ×
                </button>
              </div>
            ))}
          </div>

          <label className="block font-bold mb-0">
            Agrega máximo 5 imágenes
          </label>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageChange}
            className="block w-full border border-coral rounded px-3 py-2"
          />

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

          <Button type="submit" variant="primary" disabled={isLoading}>
            {isLoading ? "Cargando..." : "Enviar"}
          </Button>
          {message && <p className="text-sm text-darkblue mt-2">{message}</p>}
          {isLoading ? <LoadingSpinner /> : null}
        </form>
      </div>
    </>
  );
}
