import { NavLink, useLocation } from "react-router-dom";
import { 
  Upload, 
  AlertTriangle, 
  MessageSquare, 
  FileText, 
  Settings,
  ChevronLeft,
  ChevronRight,
  LayoutDashboard,
  LogOut
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

const navItems = [
  { to: "/", icon: LayoutDashboard, label: "Dashboard" },
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
        collapsed ? "w-20" : "w-64"
      )}
    >
      <nav className="flex-1 p-4 space-y-1.5">
        {navItems.map(({ to, icon: Icon, label }) => {
          const isActive = location.pathname === to || 
            (to === "/alerts" && location.pathname.startsWith("/alerts/"));
          return (
            <NavLink
              key={to}
              to={to}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200",
                isActive 
                  ? "bg-primary text-primary-foreground shadow-md" 
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              )}
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              {!collapsed && <span className="truncate">{label}</span>}
            </NavLink>
          );
        })}
      </nav>

      <div className="p-4 space-y-2 border-t">
        <NavLink
          to="/auth"
          className={cn(
            "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200",
            "text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
          )}
        >
          <LogOut className="w-5 h-5 flex-shrink-0" />
          {!collapsed && <span>Sign Out</span>}
        </NavLink>
        
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="w-full flex items-center justify-center p-3 rounded-xl hover:bg-accent transition-colors text-muted-foreground"
        >
          {collapsed ? (
            <ChevronRight className="w-5 h-5" />
          ) : (
            <>
              <ChevronLeft className="w-5 h-5 mr-2" />
              <span className="text-sm">Collapse</span>
            </>
          )}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
