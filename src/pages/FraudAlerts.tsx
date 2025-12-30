import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AlertTriangle, AlertCircle, Shield, TrendingDown, Filter, Search, ChevronRight } from "lucide-react";
import KPICard from "@/components/shared/KPICard";
import RiskBadge from "@/components/shared/RiskBadge";
import { mockAlerts } from "@/data/mockData";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const FraudAlerts = () => {
  const navigate = useNavigate();
  const [riskFilter, setRiskFilter] = useState<string>("all");
  const [sourceFilter, setSourceFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredAlerts = mockAlerts.filter(alert => {
    if (riskFilter !== "all" && alert.riskLevel !== riskFilter) return false;
    if (sourceFilter !== "all" && alert.source !== sourceFilter) return false;
    if (searchQuery && !alert.id.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !alert.fraudType.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  const stats = {
    total: mockAlerts.length,
    high: mockAlerts.filter(a => a.riskLevel === "high").length,
    medium: mockAlerts.filter(a => a.riskLevel === "medium").length,
    low: mockAlerts.filter(a => a.riskLevel === "low").length,
  };

  const formatAmount = (amount?: number) => {
    if (!amount) return "—";
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-semibold">Fraud Alerts Dashboard</h1>
        <p className="text-muted-foreground mt-1">Monitor and investigate detected fraud cases</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          title="Total Alerts"
          value={stats.total}
          icon={AlertTriangle}
          trend={{ value: 12, isPositive: true }}
        />
        <KPICard
          title="High Risk"
          value={stats.high}
          icon={AlertCircle}
          variant="danger"
        />
        <KPICard
          title="Medium Risk"
          value={stats.medium}
          icon={Shield}
          variant="warning"
        />
        <KPICard
          title="Low Risk"
          value={stats.low}
          icon={TrendingDown}
          variant="success"
        />
      </div>

      {/* Filters */}
      <div className="card-elevated p-4">
        <div className="flex flex-wrap gap-4 items-center">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Filter className="w-4 h-4" />
            <span>Filters:</span>
          </div>
          
          <div className="relative flex-1 max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search alerts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>

          <Select value={riskFilter} onValueChange={setRiskFilter}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Risk Level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Risks</SelectItem>
              <SelectItem value="high">High Risk</SelectItem>
              <SelectItem value="medium">Medium Risk</SelectItem>
              <SelectItem value="low">Low Risk</SelectItem>
            </SelectContent>
          </Select>

          <Select value={sourceFilter} onValueChange={setSourceFilter}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Source Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Sources</SelectItem>
              <SelectItem value="Transaction">Transaction</SelectItem>
              <SelectItem value="Invoice">Invoice</SelectItem>
              <SelectItem value="Email">Email</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="outline" size="sm" onClick={() => {
            setRiskFilter("all");
            setSourceFilter("all");
            setSearchQuery("");
          }}>
            Clear Filters
          </Button>
        </div>
      </div>

      {/* Alerts Table */}
      <div className="card-elevated overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead className="font-semibold">Alert ID</TableHead>
              <TableHead className="font-semibold">Risk Level</TableHead>
              <TableHead className="font-semibold">Fraud Type</TableHead>
              <TableHead className="font-semibold">Source</TableHead>
              <TableHead className="font-semibold">Amount / Vendor</TableHead>
              <TableHead className="font-semibold">Status</TableHead>
              <TableHead className="font-semibold">Date</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAlerts.map((alert) => (
              <TableRow 
                key={alert.id}
                className="cursor-pointer hover:bg-muted/50 transition-colors"
                onClick={() => navigate(`/alerts/${alert.id}`)}
              >
                <TableCell className="font-medium">{alert.id}</TableCell>
                <TableCell>
                  <RiskBadge level={alert.riskLevel} />
                </TableCell>
                <TableCell>{alert.fraudType}</TableCell>
                <TableCell>
                  <Badge variant="outline">{alert.source}</Badge>
                </TableCell>
                <TableCell>
                  <div className="space-y-0.5">
                    <div className="font-medium">{formatAmount(alert.amount)}</div>
                    {alert.vendor && <div className="text-xs text-muted-foreground">{alert.vendor}</div>}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge 
                    variant={alert.status === "Resolved" ? "secondary" : "outline"}
                    className={alert.status === "New" ? "bg-primary/10 text-primary border-primary/20" : ""}
                  >
                    {alert.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-muted-foreground text-sm">
                  {formatDate(alert.createdAt)}
                </TableCell>
                <TableCell>
                  <ChevronRight className="w-4 h-4 text-muted-foreground" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default FraudAlerts;
