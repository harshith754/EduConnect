import { Toaster } from "@/components/ui/sonner";
import "./globals.css";
import { AuthProvider } from "./Providers";

export const metadata = {
  title: "EduConnect",
  description: "Empowering enginnering colleges.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
