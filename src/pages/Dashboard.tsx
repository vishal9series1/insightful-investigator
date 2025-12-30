import { AlertTriangle, AlertCircle, Shield, TrendingUp, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import KPICard from "@/components/shared/KPICard";
import { WeeklyAlertsChart, MonthlyTrendChart, FraudTypeChart } from "@/components/charts/FraudAnalyticsChart";
import { mockAlerts } from "@/data/mockData";
import RiskBadge from "@/components/shared/RiskBadge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Dashboard = () => {
  const navigate = useNavigate();
  
  const stats = {
    total: mockAlerts.length,
    high: mockAlerts.filter(a => a.riskLevel === "high").length,
    medium: mockAlerts.filter(a => a.riskLevel === "medium").length,
    low: mockAlerts.filter(a => a.riskLevel === "low").length,
  };

  const recentAlerts = mockAlerts.slice(0, 5);

  const formatAmount = (amount?: number) => {
    if (!amount) return "—";
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', notation: 'compact' }).format(amount);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground mt-1">Real-time fraud detection overview</p>
        </div>
        <Button onClick={() => navigate('/alerts')}>
          View All Alerts
          <ArrowUpRight className="w-4 h-4 ml-2" />
        </Button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard
          title="Total Alerts"
          value={stats.total}
          icon={AlertTriangle}
          trend={{ value: 12, isPositive: false }}
          description="vs last week"
        />
        <KPICard
          title="High Risk"
          value={stats.high}
          icon={AlertCircle}
          variant="danger"
          trend={{ value: 8, isPositive: false }}
          description="requires attention"
        />
        <KPICard
          title="Medium Risk"
          value={stats.medium}
          icon={Shield}
          variant="warning"
          trend={{ value: 5, isPositive: true }}
          description="under monitoring"
        />
        <KPICard
          title="Resolution Rate"
          value="94%"
          icon={TrendingUp}
          variant="success"
          trend={{ value: 3, isPositive: true }}
          description="this month"
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <WeeklyAlertsChart />
        <MonthlyTrendChart />
        <FraudTypeChart />
      </div>

      {/* Recent Alerts */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between pb-4">
          <CardTitle className="text-base font-semibold">Recent High-Priority Alerts</CardTitle>
          <Button variant="ghost" size="sm" onClick={() => navigate('/alerts')}>
            View all
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentAlerts.map((alert) => (
              <div 
                key={alert.id}
                className="flex items-center justify-between p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors cursor-pointer group"
                onClick={() => navigate(`/alerts/${alert.id}`)}
              >
                <div className="flex items-center gap-4">
                  <RiskBadge level={alert.riskLevel} />
                  <div>
                    <p className="font-medium group-hover:text-primary transition-colors">{alert.fraudType}</p>
                    <p className="text-sm text-muted-foreground">{alert.vendor || alert.source}</p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <p className="font-semibold">{formatAmount(alert.amount)}</p>
                    <p className="text-xs text-muted-foreground">{alert.confidence}% confidence</p>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
