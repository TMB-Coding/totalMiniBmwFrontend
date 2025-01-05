import React, { useState } from "react";
import FilterAndSearch from "./FilterAndSearch";
import { DataTable } from "./table/DataTable";
import { columns } from "./table/Columns";
import { Table } from "@tanstack/react-table";
const InventoryHome = () => {
  const [conditionFilter, setConditionFilter] = useState<string>("");

  const [cabinetFilter, setCabinetFilter] = useState<string>("");

  const [searchFilter, setSearchFilter] = useState<string>("");

  const clearFilters = (): void => {
    setConditionFilter("");
    setCabinetFilter("");
    setSearchFilter("");
  };

  return (
    <div className="flex flex-col space-y-10 h-screen w-full">
      <FilterAndSearch
        setConditionFilter={setConditionFilter}
        setCabinetFilter={setCabinetFilter}
        setSearchFilter={setSearchFilter}
        conditionFilter={conditionFilter}
        cabinetFilter={cabinetFilter}
        searchFilter={searchFilter}
        clear={clearFilters}
      />
      <DataTable
        conditionFilter={conditionFilter}
        cabinetFilter={cabinetFilter}
        searchFilter={searchFilter}
        columns={columns}
        data={[
          {
            name: "Example 1",
            barcode: 323551,
            group: "32",
            subGroup: "11",
            id: "1",
            condition: "okay",
            cabinet: "1",
          },
          {
            name: "Example 2",
            barcode: 45345,
            group: "11",
            subGroup: "12",
            id: "2",
            condition: "broken",
            cabinet: "1",
          },
          {
            name: "Example 3",
            barcode: 45345,
            group: "11",
            subGroup: "12",
            id: "3",
            condition: "broken",
            cabinet: "2",
          },
          {
            name: "Example 4",
            barcode: 45345,
            group: "11",
            subGroup: "12",
            id: "4",
            condition: "broken",
            cabinet: "2",
          },
          {
            name: "Example 5",
            barcode: 45345,
            group: "34",
            subGroup: "12",
            id: "5",
            condition: "broken",
            cabinet: "3",
          },
          {
            name: "Example 6",
            barcode: 45345,
            group: "24",
            subGroup: "12",
            id: "6",
            condition: "broken",
            cabinet: "3",
          },
          {
            name: "Example 7",
            barcode: 45345,
            group: "17",
            subGroup: "12",
            id: "7",
            condition: "broken",
            cabinet: "3",
          },
          {
            name: "Example 8",
            barcode: 45345,
            group: "11",
            subGroup: "12",
            id: "8",
            condition: "broken",
            cabinet: "3",
          },
          {
            name: "Example 9",
            barcode: 45345,
            group: "87",
            subGroup: "12",
            id: "9",
            condition: "broken",
            cabinet: "3",
          },
          {
            name: "Example 10",
            barcode: 45345,
            group: "43",
            subGroup: "12",
            id: "10",
            condition: "broken",
            cabinet: "3",
          },
          {
            name: "Example 11",
            barcode: 45345,
            group: "35",
            subGroup: "12",
            id: "11",
            condition: "broken",
            cabinet: "3",
          },
          {
            name: "Example 12",
            barcode: 45345,
            group: "76",
            subGroup: "12",
            id: "12",
            condition: "broken",
            cabinet: "3",
          },
          {
            name: "Example 13",
            barcode: 45345,
            group: "99",
            subGroup: "12",
            id: "13",
            condition: "broken",
            cabinet: "3",
          },
        ]}
      />
    </div>
  );
};

export default InventoryHome;
