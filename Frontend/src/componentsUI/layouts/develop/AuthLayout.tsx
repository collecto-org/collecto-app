import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export default function AuthLayout({ children }: Props) {
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-4">Auth Layout</h1>
      <div className="bg-white p-4 rounded-md shadow">{children}</div>
    </div>
  );
}
