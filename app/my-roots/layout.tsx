import type { ReactNode } from "react";
import MyRootsFooter from "./MyRootsFooter";
import MyRootsHeader from "./MyRootsHeader";

export default function MyRootsLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[#f6f1e7] text-[#1f2a25]">
      <MyRootsHeader />
      {children}
      <MyRootsFooter />
    </div>
  );
}

