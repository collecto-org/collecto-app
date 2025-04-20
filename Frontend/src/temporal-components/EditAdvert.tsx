import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useEditAdvertMutation } from "@/services/advertsApi";
import { selectSelectedAdvert } from "@/store/selectors/advertsSelectors";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { usePriceChangeMutation, useStatusChangeMutation } from "@/services/notificationsApi";
import { Advert } from "@/services/schemas/AdvertsSchemas";

const schema = z.object({
  title: z.string(),
  description: z.string().max(250, "Has superado el limite de caracteres"),
  price: z.coerce.number().min(0, "El precio no puede ser menor de 0"),
  transaction: z.string(),
  status: z.string(),
  product_type: z.string(),
  universe: z.string(),
  condition: z.string(),
  collection: z.string(),
  brand: z.string(),
  tags: z.string(),
  images: z.any(),
});

type FormData = z.infer<typeof schema>;

type Props = {
  advert:Advert
}
function Editadvert({...props}:Props) {
  const advertToedit = props.advert
  
  const originalAdvert = advertToedit

  const [Editadvert] = useEditAdvertMutation();
  const [notificationStatus] = useStatusChangeMutation()
  const [notificationPrice] = usePriceChangeMutation()
  const defaultValues = advertToedit
    ? {
        title: advertToedit.title,
        description: advertToedit.description,
        price: advertToedit.price,
        transaction: advertToedit.transaction,
        status: advertToedit.status,
        product_type: advertToedit.product_type,
        universe: advertToedit.universe,
        condition: advertToedit.condition,
        collection: advertToedit.collection,
        brand: advertToedit.brand,
        tags: Array.isArray(advertToedit.tags)
          ? advertToedit.tags.join(", ")
          : "",
        images: undefined,
      }
    : {};

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onSubmit",
    defaultValues: defaultValues,
  });
  const onSubmit = async (data: FormData) => {
    try {
      if (advertToedit) {
        const formData = new FormData();

        Object.entries(data).forEach(([key, value]) => {
          if (key === "images") {
            const files = value as FileList;
            Array.from(files).forEach((file) => {
              formData.append("images", file);
            });
          } else {
            formData.append(key, value.toString());
          }
        });
        const id = advertToedit._id;
        console.log(id);
        await Editadvert({ formData, id });
        console.log(data.status, originalAdvert?.status)
        if(advertToedit.status != data.status){
          await notificationStatus({advertId: advertToedit._id, status:"sold"})
        }
        if(advertToedit.price != data.price){
          await notificationPrice({advertId: advertToedit._id})
        }

      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4 max-w-md mx-auto p-4 bg-white shadow rounded-xl"
    >
      {[
        "title",
        "description",
        "price",
        "transaction",
        "status",
        "product_type",
        "universe",
        "condition",
        "collection",
        "brand",
        "tags",
      ].map((field) => (
        <div key={field} className="flex flex-col">
          <label htmlFor={field} className="capitalize text-sm text-gray-700">
            {field.replace("_", " ")}
          </label>
          <input
            id={field}
            type={field === "price" ? "number" : "text"}
            {...register(field as keyof FormData)}
            className="border rounded px-3 py-2"
            defaultValue={field}
          />
          {errors[field as keyof typeof errors] && (
            <span className="text-red-500 text-xs mt-1">
              {errors[field as keyof typeof errors]?.message?.toString()}
            </span>
          )}
        </div>
      ))}

      <div className="flex flex-col">
        <label htmlFor="images" className="capitalize text-sm text-gray-700">
          Imágenes
        </label>
        <input
          id="images"
          type="file"
          accept="image/*"
          multiple
          {...register("images")}
          className="border rounded px-3 py-2"
        />
        {errors.images && (
          <span className="text-red-500 text-xs mt-1">
            {errors.images?.message?.toString()}
          </span>
        )}
      </div>

      <button
        type="submit"
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
      >
        Enviar
      </button>
    </form>
  );
}

export default Editadvert;
