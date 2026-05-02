import { Sidebar } from "@/components/sidebar";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let session = null;
  try {
    const headersList = await headers();
    const sanitizedHeaders = new Headers(headersList);
    sanitizedHeaders.delete("authorization");

    session = await auth.api.getSession({
      headers: sanitizedHeaders
    });
  } catch (err) {
    console.error("DASHBOARD_LAYOUT_ERROR:", err);
    const h = await headers();
    console.log("HEADERS_DEBUG:", JSON.stringify(Object.fromEntries(h.entries())));
  }

  if (!session) {
    redirect("/sign-in");
  }
  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <Sidebar />
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-[1400px] mx-auto p-6 md:p-10 lg:p-12">
          {children}
        </div>
      </main>
    </div>
  );
}
