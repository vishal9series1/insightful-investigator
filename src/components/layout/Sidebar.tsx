import { NavLink, useLocation } from "react-router-dom";
import { 
  Upload, 
  AlertTriangle, 
  MessageSquare, 
  FileText, 
  Settings,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

const navItems = [
  { to: "/upload", icon: Upload, label: "Upload Data" },
  { to: "/alerts", icon: AlertTriangle, label: "Fraud Alerts" },
  { to: "/chat", icon: MessageSquare, label: "Investigator Chat" },
  { to: "/reports", icon: FileText, label: "Reports" },
  { to: "/settings", icon: Settings, label: "Settings" },
];

const Sidebar = () => {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside 
      className={cn(
        "bg-card border-r flex flex-col transition-all duration-300",
        collapsed ? "w-16" : "w-60"
      )}
    >
      <nav className="flex-1 p-3 space-y-1">
        {navItems.map(({ to, icon: Icon, label }) => {
          const isActive = location.pathname === to || (to === "/alerts" && location.pathname === "/");
          return (
            <NavLink
              key={to}
              to={to}
              className={cn(
                "nav-item",
                isActive ? "nav-item-active" : "nav-item-inactive"
              )}
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              {!collapsed && <span>{label}</span>}
            </NavLink>
          );
        })}
      </nav>

      <div className="p-3 border-t">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="w-full flex items-center justify-center p-2 rounded-lg hover:bg-accent transition-colors text-muted-foreground"
        >
          {collapsed ? (
            <ChevronRight className="w-5 h-5" />
          ) : (
            <ChevronLeft className="w-5 h-5" />
          )}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
