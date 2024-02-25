import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="w-full min-h-screen flex flex-col justify-start items-center ">
      <Navbar />
      <div className>Hello World</div>
      <Button>Click me</Button>
    </main>
  );
}
