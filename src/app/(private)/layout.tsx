import { redirect } from "next/navigation";
import { auth } from "@/auth";

export default async function PrivateLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  if (!session) {
    redirect("/sing-in");
  }

  return (
    <div>
      {children}
    </div>
  );
}
