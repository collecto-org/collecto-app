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
import { useEditAdvertMutation } from "@/services/advertsApi";
import { useNavigate } from "react-router-dom";
import { Advert } from "@/services/schemas/AdvertsSchemas";
import { z } from "zod";
import MessageBanner from "@/componentsUI/elements/MessageBanner";
import { FiArrowLeft } from "react-icons/fi";

interface CatalogOption {
  _id: string;
  name?: string;
  value?: string;
  label?: string;
}

interface EditAdvert {
  advert: Advert;
  refetch: () => void;
  handleEdit: () => void;
}

const editAdvertSchema = z.object({
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

export default function EditAdvertPage({
  advert,
  handleEdit,
  refetch,
}: EditAdvert) {
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

  const [existingImages, setExistingImages] = useState<string[]>(
    advert.images || []
  );
  const [transactionTypes, setTransactionTypes] = useState<CatalogOption[]>([]);
  const [brands, setBrands] = useState<CatalogOption[]>([]);
  const [statuses, setStatuses] = useState<CatalogOption[]>([]);
  const [conditions, setConditions] = useState<CatalogOption[]>([]);
  const [productType, setProductType] = useState<CatalogOption[]>([]);
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
  const [editAdvert, { isLoading, isError, isSuccess }] =
    useEditAdvertMutation();

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

  useEffect(() => {
    setTransactionTypes(transactionsOptions || []);
    setBrands(brandsOptions || []);
    setStatuses(statusOptions || []);
    setConditions(conditionsOptions || []);
    setProductType(productTypesOptions || []);
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
      alert("Solo puedes subir hasta 6 imágenes");
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
      setMessage("No puedes subir más de 6 imágenes");
      return;
    }

    if (existingImages.length <= 0 && images.length <= 0) {
      setMessage("Debes de subir al menos una imagen");
      return;
    }

    const response = await editAdvert({ formData: advertForm, id: advert._id });

    if (isLoading) {
      setMessage("Cargando...");
      return;
    }

    if (isError) {
      setMessage("Error al editar el anuncio");
      return;
    }
    if (response.data) {
      setMessage("Anuncio editado exitosamente");

      setTimeout(() => {
        setImages([]);
        handleEdit();

        if (advert.title === formData.title) {
          refetch();
        }
      }, 3000);
      navigate(`/adverts/${response.data.advert.slug}`);
    }
  };

  return (
    <div className="mt-24 max-w-4xl mx-auto px-4 py-8">
      <Button
        onClick={() => navigate(-1)}
        className="mb-4 flex items-center gap-2"
        variant="turquoise"
      >
        <FiArrowLeft className="w-5 h-5" />
        Salir
      </Button>
      <h1 className="text-3xl font-bold text-darkblue mb-6">Editar anuncio</h1>

      <form className="space-y-5" onSubmit={handleSubmit}>
        <label className="block font-bold mb-0">Título</label>
        <input
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="w-full border border-coral rounded px-3 py-2"
        />

        <label className="block font-bold mb-0">Descripción</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="w-full border border-coral rounded px-3 py-2"
        />

        <label className="block font-bold mb-0">Precio</label>
        <input
          name="price"
          type="number"
          value={formData.price}
          onChange={handleChange}
          className="w-full border border-coral rounded px-3 py-2"
        />

        <label className="block font-bold mb-0">Tipo de transacción</label>
        <select
          name="transaction"
          onChange={handleChange}
          className="w-full border border-coral rounded px-3 py-2"
        >
          <option value={advert.transaction.value}>
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

        <label className="block font-bold mb-0">Está Disponible</label>
        <select
          name="status"
          onChange={handleChange}
          className="w-full border border-coral rounded px-3 py-2"
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

        <label className="block font-bold mb-0">Tipo de producto</label>
        <select
          name="product_type"
          onChange={handleChange}
          className="w-full border border-coral rounded px-3 py-2"
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

        <label className="block font-bold mb-0">Universo</label>
        <select
          name="universe"
          onChange={handleChange}
          className="w-full border border-coral rounded px-3 py-2"
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

        <label className="block font-bold mb-0">Condición</label>
        <select
          name="condition"
          onChange={handleChange}
          className="w-full border border-coral rounded px-3 py-2"
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

        <label className="block font-bold mb-0">Marca</label>
        <select
          name="brand"
          onChange={handleChange}
          className="w-full border border-coral rounded px-3 py-2"
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

        <label className="block font-bold mb-0">Colección (opcional)</label>
        <textarea
          name="collection"
          value={formData.collection}
          onChange={handleChange}
          className="w-full border border-coral rounded px-3 py-2"
        />
        <label className="block font-bold mb-0">Tags (opcional)</label>
        <input
          type="text"
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
        <label className="block font-bold mb-0">Imágenes</label>
        <input
          type="file"
          name="images"
          accept="image/*"
          multiple
          onChange={handleImageChange}
          className="block w-full border border-coral rounded px-3 py-2"
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
                  setExistingImages(existingImages.filter((_, i) => i !== idx))
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
            <div key={idx} className="relative border border-coral rounded">
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
        <Button
          type="submit"
          variant="primary"
          disabled={isLoading || isSuccess}
        >
          {isLoading ? "Cargando..." : "Guardar cambios"}
        </Button>
        {message && isError && <MessageBanner type="error" text={message} />}
        {message && !isError && <MessageBanner type="info" text={message} />}
      </form>
    </div>
  );
}
