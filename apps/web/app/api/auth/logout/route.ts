import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
// pages/api/hello.js
export async function GET(req: NextRequest, res: NextResponse) {
  const { searchParams } = new URL(req.url);
  const redirect = searchParams.get("redirect");
  const cookieStore = cookies();

  // call server to invalidate / logout token

  await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/auth/logout`, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + (await cookieStore).get("jwt")?.value,
    },
  });

  // delete client side cookie
  //(await cookieStore).delete("jwt");

  if (res.status == 200) {
    window.location.href = "/kiosk";
  }
  // redirect
  if (redirect == "kiosk")
    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_BASE_URL}/apps/kioskauth`
    );
  return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/apps/auth`);
}
