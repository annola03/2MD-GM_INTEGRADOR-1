"use client";
import { usePathname } from "next/navigation";
import Sidebar from "@/components/blocks/Navbar/Sidebar";
import Header from "@/components/blocks/Navbar/Header";
import SidebarAdmin from "@/components/blocks/Navbar/SidebarAdmin";
import HeaderAdmin from "@/components/blocks/Navbar/HeaderAdmin";
import UserProvider from "@/context/UserContext";
import { AuthProvider } from "@/context/AuthContext";

export default function layoutWrapper({ children }) {
  const pathname = usePathname();
  const isAdminPage = pathname?.startsWith("/Admin");

  return (
    <>
      <UserProvider>
        <AuthProvider>
          <div className="app-container">
            {pathname !== "/" && isAdminPage ? <SidebarAdmin /> : pathname !== "/" && <Sidebar />}
            <main className="main-content">
              {pathname !== "/" && isAdminPage ? <HeaderAdmin /> : pathname !== "/" && <Header />}
              {children}

            </main>
          </div>
        </AuthProvider>
      </UserProvider>

    </>
  );
}