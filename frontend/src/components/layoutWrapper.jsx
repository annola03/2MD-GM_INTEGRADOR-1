"use client";
import { usePathname } from "next/navigation";
import Sidebar from "@/components/blocks/Navbar/Sidebar";
import Header from "@/components/blocks/Navbar/Header";
import BaterPontoWidget from "@/components/BaterPontoWidget/BaterPontoWidget";
import SidebarAdmin from "@/components/blocks/Navbar/SidebarAdmin";
import HeaderAdmin from "@/components/blocks/Navbar/HeaderAdmin";

export default function layoutWrapper({ children }) {
  const pathname = usePathname();
   const isAdminPage = pathname?.startsWith("/Admin");

  return (
    <>
      <div className="app-container">
          {pathname !== "/" && isAdminPage ? <SidebarAdmin /> : pathname !== "/" && <Sidebar />}
          <main className="main-content">
            {pathname !== "/" && isAdminPage ? <HeaderAdmin /> : pathname !== "/" && <Header />}
            {children}
            {!pathname.startsWith("/Admin") && pathname !== "/" && <BaterPontoWidget />}

          </main>
        </div>
    </>
  );
}