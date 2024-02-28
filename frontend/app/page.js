import LoginForm from "@/components/LoginForm";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "./api/auth/[...nextauth]/route";

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (session) redirect("/dashboard");

  return (
    <main className="w-full min-h-screen flex flex-col justify-start items-center ">
      {/* <Navbar /> */}
      <LoginForm />
    </main>
  );
}
