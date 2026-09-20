import type { ReactNode } from "react";
import MyRootsFooter from "@/app/my-roots/MyRootsFooter";
import MyRootsHeader from "@/app/my-roots/MyRootsHeader";

export default function MyRootsEnglishLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[#f6f1e7] text-[#1f2a25]">
      <MyRootsHeader language="en" />
      {children}
      <MyRootsFooter language="en" />
    </div>
  );
}
