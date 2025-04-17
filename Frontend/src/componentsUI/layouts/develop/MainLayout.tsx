import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export default function MainLayout({ children }:Props) {
  return (
    <div className=" bg-gray-100 ">
      <div className="bg-white p-0 rounded-md shadow">
        {children}
      </div>
    </div>
  );
}
