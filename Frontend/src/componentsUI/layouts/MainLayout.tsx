import { ReactNode } from "react";
import Navbar from "@/componentsUI/containers/develop/Navbar";
import Footer from "@/componentsUI/containers/develop/Footer";

type Props = {
  children: ReactNode;
};

export default function MainLayout({ children }: Props) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 bg-background text-darkblue">{children}</main>
      <Footer />
    </div>
  );
}
