import { Button } from "@repo/ui/components/button";
import Link from "next/link";
import React, { Fragment } from "react";

interface App {
  name: string;
  title: string;
  href: string;
}

const apps: Array<App> = [
  {
    name: "kiosk",
    title: "Kiosk",
    href: "/apps/kiosk",
  },
  {
    name: "inventory",
    title: "Inventory Dashboard",
    href: "/apps/app/inventory",
  },
  {
    name: "payroll_portal",
    title: "Payroll Portal",
    href: "/apps/app/payroll_portal",
  },
];

const AppsSelect = () => {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center bg-black">
      <h1 className="mx-auto my-1 items-center text-2xl font-semibold text-white">
        Total Mini & BMW
      </h1>
      <h1 className="mx-auto mb-10 items-center text-xl font-semibold text-white/20">
        Apps Self Service
      </h1>
      <div className="flex flex-col justify-around gap-3">
        {apps.map((app, index) => (
          <Fragment key={index}>
            <div className="px-3 py-2 border-[1px] border-primary rounded-lg items-center justify-between flex flex-row">
              <h1 className="text-sm font-semibold text-white">{app.title}</h1>
              <Button
                asChild
                className="ml-4 bg-gradient-to-tr from-[#16588E] to-[#E7222E]"
              >
                <Link href={app.href}>{"Go ->"}</Link>
              </Button>
            </div>
          </Fragment>
        ))}
      </div>
    </div>
  );
};

export default AppsSelect;
