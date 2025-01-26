import React, { useEffect, useState } from "react";
import FilterAndSearch from "./FilterAndSearch";
import { DataTable } from "./table/DataTable";
import { columns } from "./table/Columns";
import { useCookies } from "next-client-cookies";
import { Tool } from "../../../../types/ToolModel";
import { useToast } from "@repo/ui/hooks/use-toast";
import { CircleAlertIcon, Loader2 } from "lucide-react";
import InsufficientAuthorities from "../../error_views/InsufficientAuthorities";
import Loader from "../reusables/Loader";
const InventoryHome = () => {
  const cookies = useCookies();
  const { toast } = useToast();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [tableData, setTableData] = useState<Array<Tool>>([]);

  const [conditionFilter, setConditionFilter] = useState<string>("");

  const [cabinetFilter, setCabinetFilter] = useState<string>("");

  const [searchFilter, setSearchFilter] = useState<string>("");

  const clearFilters = (): void => {
    setConditionFilter("");
    setCabinetFilter("");
    setSearchFilter("");
  };

  useEffect(() => {
    async function queryTools() {
      setError(null);
      const req = await fetch("http://localhost:8080/tool/", {
        method: "GET",
        headers: { Authorization: "Bearer " + cookies.get("jwt") },
      });

      const res = await req.json();
      if (req.status == 500) {
        setError(
          "The server indicated your granted authorities are insufficient to access this resource."
        );
      }
      setLoading(false);
      setTableData(res);
    }
    queryTools();
  }, []);

  return (
    <div className="flex flex-col space-y-10 min-h-screen w-full">
      <>
        {!error && !loading && (
          <FilterAndSearch
            setConditionFilter={setConditionFilter}
            setCabinetFilter={setCabinetFilter}
            setSearchFilter={setSearchFilter}
            conditionFilter={conditionFilter}
            cabinetFilter={cabinetFilter}
            searchFilter={searchFilter}
            clear={clearFilters}
          />
        )}{" "}
      </>

      <div className="flex h-full flex-col">
        {loading && <Loader />}
        {error ? (
          <InsufficientAuthorities error={error} />
        ) : (
          <>
            {!loading && !error && (
              <DataTable
                conditionFilter={conditionFilter}
                cabinetFilter={cabinetFilter}
                searchFilter={searchFilter}
                columns={columns}
                data={tableData}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default InventoryHome;
