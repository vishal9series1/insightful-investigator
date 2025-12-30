import { Shield, Bell } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const TopNav = () => {
  return (
    <header className="h-16 border-b bg-card px-6 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center">
          <Shield className="w-5 h-5 text-primary-foreground" />
        </div>
        <div className="flex items-center gap-3">
          <h1 className="text-lg font-semibold">Fraud Detection Agent</h1>
          <Badge variant="outline" className="bg-warning/10 text-warning border-warning/30 text-xs">
            Demo
          </Badge>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button className="relative p-2 rounded-lg hover:bg-accent transition-colors">
          <Bell className="w-5 h-5 text-muted-foreground" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-destructive rounded-full" />
        </button>
        <Avatar className="w-9 h-9">
          <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=analyst" />
          <AvatarFallback>RA</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
};

export default TopNav;
