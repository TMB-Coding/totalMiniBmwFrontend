import { Button } from "@repo/ui/components/button";
import React from "react";
import { WrenchIcon } from "lucide-react";
import { Input } from "@repo/ui/components/input";
import Link from "next/link";
import ConditionDropdown from "../reusables/dropdowns/Condition";
import CabinetDropdown from "../reusables/dropdowns/Cabinet";

interface FilterAndSearchProps {
  clear: () => void;
  setConditionFilter: (v: string) => void;
  setCabinetFilter: (v: string) => void;
  setSearchFilter: (v: string) => void;

  conditionFilter: string;
  cabinetFilter: string;
  searchFilter: string;
}

const FilterAndSearch = ({
  clear,
  setConditionFilter,
  setCabinetFilter,
  setSearchFilter,

  conditionFilter,
  cabinetFilter,
  searchFilter,
}: FilterAndSearchProps) => {
  return (
    <div className="flex flex-col w-full px-10 mt-2">
      <div className="flex flex-col border-[1px] border-primary h-full rounded-xl text-white w-full">
        <div className="flex flex-row pt-6 px-5 items-center w-full">
          <h1 className="text-white font-semibold text-2xl flex flex-row items-center gap-3">
            <WrenchIcon />
            BMW Tools
          </h1>
          <Button
            asChild
            variant={"outline"}
            className="ml-auto right-0 text-black"
          >
            <Link href={"/apps/app/inventory?view=create"}>
              +&nbsp; Create Tool
            </Link>
          </Button>
        </div>
        <hr className="bg-primary border-0  h-px my-6 rounded-xl" />
        <div className="flex flex-row px-5 mb-6 w-full items-center gap-3">
          <ConditionDropdown
            condition={conditionFilter}
            setCondition={setConditionFilter}
          />
          <CabinetDropdown
            cabinet={cabinetFilter}
            setCabinet={setCabinetFilter}
          />
          {/* Vertical Divider */}
          <div className="inline-block h-full mx-auto w-0.5 bg-primary"></div>
          <div className="flex flex-col">
            <h1 className="mb-2 text-sm text-white">Search tools</h1>
            <Input
              placeholder={"Piston Ring Remover...."}
              onChange={(event) => setSearchFilter(event.target.value)}
              value={searchFilter}
              className="border-primary placeholder:text-white/30 text-white"
            />
          </div>
          <Button
            className="ml-auto right-0"
            variant={"destructive"}
            onClick={() => clear()}
          >
            Clear
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FilterAndSearch;
