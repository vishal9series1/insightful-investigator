import { Shield, Bell, Search, Moon, Sun } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNavigate } from "react-router-dom";

const TopNav = () => {
  const navigate = useNavigate();

  return (
    <header className="h-16 border-b bg-card/80 backdrop-blur-sm px-6 flex items-center justify-between sticky top-0 z-50">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-lg shadow-primary/25">
            <Shield className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-lg font-bold tracking-tight">Fraud Detection</h1>
            <p className="text-xs text-muted-foreground -mt-0.5">AI Agent</p>
          </div>
        </div>
        <Badge variant="outline" className="bg-warning/10 text-warning border-warning/30 text-xs font-semibold ml-2">
          Demo
        </Badge>
      </div>

      <div className="flex-1 max-w-md mx-8 hidden md:block">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input 
            placeholder="Search alerts, vendors, or transactions..." 
            className="pl-10 h-10 bg-muted/50 border-0 focus-visible:ring-1"
          />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="w-5 h-5 text-muted-foreground" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-destructive rounded-full animate-pulse" />
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-3 p-1.5 rounded-xl hover:bg-accent transition-colors">
              <Avatar className="w-9 h-9 border-2 border-primary/20">
                <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=analyst" />
                <AvatarFallback>RA</AvatarFallback>
              </Avatar>
              <div className="text-left hidden lg:block">
                <p className="text-sm font-medium">Risk Analyst</p>
                <p className="text-xs text-muted-foreground">Admin</p>
              </div>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => navigate('/settings')}>
              Settings
            </DropdownMenuItem>
            <DropdownMenuItem>Support</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => navigate('/auth')} className="text-destructive">
              Sign out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default TopNav;
