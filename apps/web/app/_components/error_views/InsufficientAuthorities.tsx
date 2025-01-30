import { CircleAlertIcon } from "lucide-react";
import { useCookies } from "next-client-cookies";
import React from "react";
import { jwtDecode, JwtPayload } from "jwt-decode";

interface InsufficientAuthoritiesProps {
  error: string;
}

interface CustomJwt extends JwtPayload {
  session: "ONLY_KIOSK" | "ALL_APPS";
}

const InsufficientAuthorities = ({ error }: InsufficientAuthoritiesProps) => {
  const cookies = useCookies();

  const jwt = cookies.get("jwt");
  const decodedJwt: CustomJwt = jwtDecode(jwt ?? "");

  return (
    <div className="flex flex-col gap-2 items-center justify-center mx-auto h-full">
      <CircleAlertIcon className="text-destructive" />
      <h1 className="text-lg font-semibold text-white">Access Denied</h1>
      <h1 className="text-sm font-regular text-white/20">{error && error}</h1>
      <h1 className="text-sm font-regular text-white/20">
        Claim: {decodedJwt ? decodedJwt.session : "JWT has no session claim."}
      </h1>
    </div>
  );
};

export default InsufficientAuthorities;
