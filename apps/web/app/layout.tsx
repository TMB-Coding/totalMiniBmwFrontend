import { Toaster } from "@repo/ui/components/toaster";
import "@repo/ui/globals.css";
import { CookiesProvider } from "next-client-cookies/server";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <CookiesProvider>
        <body className="flex flex-col bg-black min-h-screen">
          <main>{children}</main>
          <Toaster />
        </body>
      </CookiesProvider>
    </html>
  );
}
