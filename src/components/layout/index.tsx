import { useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboardIcon,
  UserIcon,
  BriefcaseMedicalIcon,
  LogOutIcon,
  MenuIcon,
  CalendarIcon
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLogout } from "@/api/auth/hooks";
import { useToast } from "@/hooks/use-toast";

const menuItems = [
  { path: "/calendario", icon: CalendarIcon, label: "Calendário" },
  { path: "/prescricoes", icon: LayoutDashboardIcon, label: "Prescrições" },
  { path: "/remedios", icon: BriefcaseMedicalIcon, label: "Remédios" },
  { path: "/perfil", icon: UserIcon, label: "Perfil" },
];

export default function Layout() {
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const navigate = useNavigate();

  const { mutateAsync: logout } = useLogout();

  const { toast } = useToast();

  const handleLogout = () => {
    try {
      logout();
      navigate("/");
    } catch (error) {
      toast({
        title: "Erro ao fazer logout",
        description:
          "Ocorreu um erro ao fazer logout, tente novamente mais tarde.",
      });
      console.error(error);
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <aside
        className={`bg-white shadow-md transition-all duration-300 ${
          isSidebarOpen ? "w-64" : "w-20"
        }`}
      >
        <div className="p-4 flex justify-between items-center">
          <h2
            className={`text-2xl font-semibold text-gray-800 ${
              isSidebarOpen ? "" : "hidden"
            }`}
          >
            ARI 
          </h2>
          <Button variant="ghost" size="icon" onClick={toggleSidebar}>
            <MenuIcon className="h-6 w-6" />
          </Button>
        </div>
        <nav className="mt-6">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center px-4 py-2 text-gray-700 hover:bg-gray-200 ${
                location.pathname === item.path ? "bg-gray-200" : ""
              }`}
            >
              <item.icon className="mr-3 h-5 w-5" />
              {isSidebarOpen && <span>{item.label}</span>}
            </Link>
          ))}
          <button
            onClick={handleLogout}
            className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-200 w-full text-left"
          >
            <LogOutIcon className="mr-3 h-5 w-5" />
            {isSidebarOpen && <span>Sair</span>}
          </button>
        </nav>
      </aside>

      <main className="flex-1 overflow-y-auto p-4">
        <Outlet />
      </main>
    </div>
  );
}
