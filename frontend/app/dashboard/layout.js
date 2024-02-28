"use client";

import Navbar from "@/components/Navbar";
import SideBar from "@/components/SideBar";
import { SideBarProvider } from "@/context/context";

export default function RootLayout({ children }) {
  return (
    <SideBarProvider>
      <div className="h-screen flex flex-row gap-2 divide-x divide-primary-foreground divide-solid">
        <SideBar />
        {children}
      </div>
    </SideBarProvider>
  );
}
