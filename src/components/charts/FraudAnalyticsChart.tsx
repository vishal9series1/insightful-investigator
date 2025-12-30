import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, Legend } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const weeklyData = [
  { day: "Mon", high: 4, medium: 8, low: 12 },
  { day: "Tue", high: 3, medium: 6, low: 9 },
  { day: "Wed", high: 7, medium: 10, low: 8 },
  { day: "Thu", high: 2, medium: 5, low: 14 },
  { day: "Fri", high: 5, medium: 9, low: 11 },
  { day: "Sat", high: 1, medium: 3, low: 5 },
  { day: "Sun", high: 2, medium: 4, low: 6 },
];

const monthlyTrendData = [
  { month: "Jan", alerts: 45, resolved: 38 },
  { month: "Feb", alerts: 52, resolved: 48 },
  { month: "Mar", alerts: 38, resolved: 35 },
  { month: "Apr", alerts: 65, resolved: 58 },
  { month: "May", alerts: 48, resolved: 45 },
  { month: "Jun", alerts: 72, resolved: 65 },
];

const fraudTypeData = [
  { name: "Duplicate Invoice", value: 35, color: "hsl(var(--destructive))" },
  { name: "Unusual Pattern", value: 28, color: "hsl(var(--warning))" },
  { name: "Email Impersonation", value: 20, color: "hsl(var(--primary))" },
  { name: "Account Change", value: 12, color: "hsl(var(--success))" },
  { name: "Other", value: 5, color: "hsl(var(--muted-foreground))" },
];

export const WeeklyAlertsChart = () => {
  return (
    <Card className="border-0 shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-semibold">Weekly Alert Distribution</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[280px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={weeklyData} barGap={2}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
              <XAxis 
                dataKey="day" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
              />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
              />
              <Tooltip 
                contentStyle={{ 
                  background: 'hsl(var(--card))', 
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                }}
                labelStyle={{ color: 'hsl(var(--foreground))' }}
              />
              <Bar dataKey="high" stackId="a" fill="hsl(var(--destructive))" radius={[0, 0, 0, 0]} name="High Risk" />
              <Bar dataKey="medium" stackId="a" fill="hsl(var(--warning))" radius={[0, 0, 0, 0]} name="Medium Risk" />
              <Bar dataKey="low" stackId="a" fill="hsl(var(--success))" radius={[4, 4, 0, 0]} name="Low Risk" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export const MonthlyTrendChart = () => {
  return (
    <Card className="border-0 shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-semibold">Monthly Trend</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[280px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={monthlyTrendData}>
              <defs>
                <linearGradient id="alertsGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="resolvedGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--success))" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="hsl(var(--success))" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
              <XAxis 
                dataKey="month" 
                axisLine={false} 
                tickLine={false}
                tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
              />
              <YAxis 
                axisLine={false} 
                tickLine={false}
                tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
              />
              <Tooltip 
                contentStyle={{ 
                  background: 'hsl(var(--card))', 
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                }}
              />
              <Area 
                type="monotone" 
                dataKey="alerts" 
                stroke="hsl(var(--primary))" 
                strokeWidth={2}
                fill="url(#alertsGradient)" 
                name="Total Alerts"
              />
              <Area 
                type="monotone" 
                dataKey="resolved" 
                stroke="hsl(var(--success))" 
                strokeWidth={2}
                fill="url(#resolvedGradient)" 
                name="Resolved"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export const FraudTypeChart = () => {
  return (
    <Card className="border-0 shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-semibold">Fraud by Type</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[280px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={fraudTypeData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={4}
                dataKey="value"
              >
                {fraudTypeData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  background: 'hsl(var(--card))', 
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                }}
                formatter={(value: number) => [`${value}%`, 'Share']}
              />
              <Legend 
                verticalAlign="bottom" 
                height={36}
                formatter={(value) => <span className="text-xs text-muted-foreground">{value}</span>}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};
