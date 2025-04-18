import React, { ReactNode } from "react";
import Footer from "@/componentsUI/containers/develop/Footer";

interface Props {
  children: ReactNode;
}

export default function AuthLayout({ children }: Props) {
  return (
    <div className="min-h-screen flex flex-col bg-cream text-darkblue">
      <main className="flex-1 flex justify-center items-center px-4 py-12">
        {children}
      </main>
      <Footer />
    </div>
  );
}
