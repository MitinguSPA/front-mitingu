import React, { useState, useEffect } from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  LogOut,
  Home,
  Menu,
  X,
  ScanBarcode,
  History,
  // Truck,
} from "lucide-react";
import { useAuth } from "../../store/AuthStore";

const AdminLayout: React.FC = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const navItems = [
    { icon: LayoutDashboard, label: "Dashboard", path: "/admin" },
    { icon: Package, label: "Inventario", path: "/admin/products" },
    { icon: ShoppingCart, label: "Pedidos", path: "/admin/orders" },
    // { icon: ScanBarcode, label: "Ventas", path: "/admin/sales" },
    // {
    //   icon: History,
    //   label: "Historial de ventas",
    //   path: "/admin/sales-history",
    // },
    ];

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setIsSidebarOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleLogout = async (e: React.FormEvent) => {
    e.preventDefault();
    await logout();
    console.log("Logging out...");
    navigate("/");
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="min-h-screen bg-secondary-100 relative">
      <button
        onClick={toggleSidebar}
        className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-md bg-white shadow-lg text-[#F4A9B6] hover:bg-primary-50 transition-colors"
        aria-label="Toggle sidebar"
      >
        {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {isSidebarOpen && isMobile && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={toggleSidebar}
        ></div>
      )}

      <aside
        className={`
          fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-40
          transition-transform duration-300 ease-in-out
          ${
            isMobile
              ? isSidebarOpen
                ? "translate-x-0"
                : "-translate-x-full"
              : "translate-x-0"
          }
        `}
      >
        <div className="p-6">
          <h1 className="text-xl font-bold text-[#DD6E81] flex items-center">
            Admin Console
          </h1>
        </div>

        <nav className="mt-6">
          {navItems.map(({ icon: Icon, label, path }) => (
            <NavLink
              key={path}
              to={path}
              end
              onClick={() => isMobile && setIsSidebarOpen(false)}
              className={({ isActive }) => `
                flex items-center px-6 py-3 text-sm font-medium transition-colors
                ${
                  isActive
                    ? "text-[#DD6E81] bg-primary-50 border-r-4 border-[#DD6E81]"
                    : "text-secondary-600 hover:bg-secondary-50"
                }
              `}
            >
              <Icon size={20} className="mr-3" />
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-6">
          <button
            onClick={() => {
              navigate("/");
              isMobile && setIsSidebarOpen(false);
            }}
            className="flex items-center text-error-600 hover:text-error-700 transition-colors"
          >
            <Home size={20} className="mr-2" />
            Home
          </button>
          <br />
          <button
            onClick={(e) => {
              handleLogout(e);
              isMobile && setIsSidebarOpen(false);
            }}
            className="flex items-center text-error-600 hover:text-error-700 transition-colors"
          >
            <LogOut size={20} className="mr-2" />
            Cerrar Sesion
          </button>
        </div>
      </aside>

      <main
        className={`
          p-4 pt-16 md:pt-8 md:pl-8
          transition-all duration-300 ease-in-out
          ${isMobile ? "ml-0" : "ml-64"}
        `}
      >
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
