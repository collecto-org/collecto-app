import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useNewAdvertMutation } from "../../services/advertsApi";



    const schema = z.object({
        title:z.string(),
        description:z.string().max(250,"Has superado el limite de caracteres"),
        price: z.coerce.number().min(0, "El precio no puede ser menor de 0"),
        transaction:z.string(),
        status:z.string(),
        product_type:z.string(),
        universe:z.string(),
        condition:z.string(),
        collection:z.string(),
        brand:z.string(),
        tags:z.string(),
        images:z.any()
    })

    type FormData = z.infer<typeof schema>;


    function NewAdvert(){
        const [newAdvert] = useNewAdvertMutation()

        const {register,handleSubmit,formState:{errors}} =
         useForm<FormData>({resolver:zodResolver(schema),
            mode:"onSubmit",
            
         })
         const onSubmit = async (data: FormData) => {
            const token = localStorage.getItem("token")
            try {
                if(token){
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
                    
                  }
                )
                await newAdvert({formData})}
               } catch (error) {
                console.log(error)
            }
          };
        
          return (
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 max-w-md mx-auto p-4 bg-white shadow rounded-xl">
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
                "tags"
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
        
        export default NewAdvert;