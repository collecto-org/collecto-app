import { useState, useEffect } from "react";
import {
    useGetUniversesQuery,
    useCreateUniverseMutation,
    useUpdateUniverseMutation,
    useDeleteUniverseMutation,
  } from "@/services/universesApi";
  import { Universe } from "@/services/schemas/UniverseSchemas";
  import GenericEditableTable from "@/componentsUI/tables/GenericEditableTable";
  import type { Column } from "@/componentsUI/tables/GenericEditableTable";
  
  
  export default function UniverseTable() {
    const { data = [] } = useGetUniversesQuery();
    const [universes, setUniverses] = useState<Universe[]>([]);
    const [createUniverse] = useCreateUniverseMutation();
    const [updateUniverse] = useUpdateUniverseMutation();
    const [deleteUniverse] = useDeleteUniverseMutation();
    
    useEffect(() => {
      setUniverses(data);
    }, [data]);;
    
    const columns = [
      { key: "name", label: "Nombre" },
      { key: "slug", label: "Slug" },
      { key: "logoUrl", label: "LogoURL" },
    ] as Column<Universe>[];
  
    return (
      <GenericEditableTable<Universe>
        data={universes}
        columns={columns}
        onCreate={(row) => createUniverse(row as Universe)}
        onUpdate={(id, updated) => updateUniverse({ id, data: updated })}
        onDelete={async (id) => {
            await deleteUniverse(id);
            setUniverses((prev) => prev.filter((u) => u._id !== id));
          }}
        renderPreview={(row) => (
            <>
              {row.logoUrl && (
                <img
                  src={row.logoUrl}
                  className="h-8 max-w-[80px] object-contain mx-auto"
                />
              )}
            </>
          )}
      />
    );
  }
  