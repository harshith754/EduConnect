import Navbar from "@/components/Navbar";
import SideBar from "@/components/SideBar";

export default function RootLayout({ children }) {
  return (
    <div>
      <div className="flex flex-row gap-2 divide-x divide-primary-foreground divide-solid">
        <SideBar />
        {children}
      </div>
    </div>
  );
}
