import React from "react";

const KioskHome = () => {
  return (
    <div className="flex h-screen p-12">
      <div className="flex flex-col">
        <h1 className="text-white text-2xl font-semibold mb-4">
          Welcome to TMB KIOSK
        </h1>
        <h1 className="text-white/20 text-lg font-medium">
          Account: Finn Carmichael
        </h1>
        <h1 className="text-white/20 text-lg font-medium">
          Currently Checked Out: 5
        </h1>
        <h1 className="text-white text-lg font-medium mt-4 mb-1">Audit Log</h1>
        <div className="flex flex-col border-[1px] border-primary h-full rounded-xl text-white w-full p-3 flex-grow max-w-4xl">
          <div className="flex flex-col gap-2">
            <span className="flex flex-row">
              <h1 className="text-white/20 font-regular text-md">
                532991 - THU, JAN 30 @ 3:00PM -&nbsp;
              </h1>
              <h1 className="text-white font-medium text-md">
                Recognized check-out of "Piston Ring Remover"
              </h1>
            </span>
            <span className="flex flex-row">
              <h1 className="text-white/20 font-regular text-md">
                532991 - THU, JAN 30 @ 3:21PM -&nbsp;
              </h1>
              <h1 className="text-white font-medium text-md">
                Recognized check-in of "Piston Ring Remover"
              </h1>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KioskHome;
