import { FileText, Download, Eye, Calendar, BarChart3, Shield, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const reports = [
  {
    id: 1,
    title: "Fraud Summary Report",
    description: "Weekly overview of all detected fraud cases, patterns, and resolutions",
    icon: BarChart3,
    lastGenerated: "2024-01-15",
    type: "summary",
  },
  {
    id: 2,
    title: "Compliance Report",
    description: "Audit-ready report for regulatory compliance and internal controls",
    icon: Shield,
    lastGenerated: "2024-01-14",
    type: "compliance",
  },
  {
    id: 3,
    title: "Case-wise Breakdown",
    description: "Detailed analysis of individual fraud cases with evidence",
    icon: AlertTriangle,
    lastGenerated: "2024-01-15",
    type: "cases",
  },
];

const Reports = () => {
  const { toast } = useToast();
  const [previewReport, setPreviewReport] = useState<number | null>(null);

  const handleExport = (format: string, reportTitle: string) => {
    toast({
      title: `Exporting ${format.toUpperCase()}`,
      description: `${reportTitle} is being prepared for download.`,
    });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-semibold">Reports & Summary</h1>
        <p className="text-muted-foreground mt-1">Generate investigation-ready outputs and audit reports</p>
      </div>

      {/* Report Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {reports.map((report) => {
          const Icon = report.icon;
          return (
            <div key={report.id} className="card-elevated p-6 flex flex-col">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold">{report.title}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <Calendar className="w-3 h-3 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">
                      Last: {new Date(report.lastGenerated).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
              
              <p className="text-sm text-muted-foreground mb-4 flex-1">
                {report.description}
              </p>

              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex-1"
                  onClick={() => setPreviewReport(previewReport === report.id ? null : report.id)}
                >
                  <Eye className="w-4 h-4 mr-1" />
                  Preview
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleExport("pdf", report.title)}
                >
                  <Download className="w-4 h-4" />
                </Button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Preview Panel */}
      {previewReport && (
        <div className="card-elevated overflow-hidden animate-slide-up">
          <div className="bg-muted/50 px-6 py-4 border-b flex items-center justify-between">
            <div className="flex items-center gap-3">
              <FileText className="w-5 h-5 text-primary" />
              <h2 className="font-semibold">
                {reports.find(r => r.id === previewReport)?.title}
              </h2>
              <Badge variant="outline">Preview</Badge>
            </div>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => handleExport("pdf", reports.find(r => r.id === previewReport)?.title || "")}
              >
                <Download className="w-4 h-4 mr-1" />
                PDF
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => handleExport("json", reports.find(r => r.id === previewReport)?.title || "")}
              >
                <Download className="w-4 h-4 mr-1" />
                JSON
              </Button>
            </div>
          </div>
          
          <div className="p-6">
            {previewReport === 1 && (
              <div className="prose prose-sm max-w-none">
                <h3 className="text-lg font-semibold mb-4">Weekly Fraud Summary Report</h3>
                <p className="text-muted-foreground mb-4">Report Period: January 8 - January 15, 2024</p>
                
                <div className="grid grid-cols-4 gap-4 mb-6">
                  <div className="p-4 bg-muted/50 rounded-lg text-center">
                    <p className="text-2xl font-semibold">6</p>
                    <p className="text-sm text-muted-foreground">Total Alerts</p>
                  </div>
                  <div className="p-4 bg-destructive/10 rounded-lg text-center">
                    <p className="text-2xl font-semibold text-destructive">2</p>
                    <p className="text-sm text-muted-foreground">High Risk</p>
                  </div>
                  <div className="p-4 bg-warning/10 rounded-lg text-center">
                    <p className="text-2xl font-semibold text-warning">2</p>
                    <p className="text-sm text-muted-foreground">Medium Risk</p>
                  </div>
                  <div className="p-4 bg-success/10 rounded-lg text-center">
                    <p className="text-2xl font-semibold text-success">2</p>
                    <p className="text-sm text-muted-foreground">Low Risk</p>
                  </div>
                </div>

                <h4 className="font-semibold mb-2">Key Findings</h4>
                <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground mb-4">
                  <li>Duplicate invoice fraud attempts increased 40% week-over-week</li>
                  <li>$313,900 in total flagged transaction value</li>
                  <li>1 suspected BEC attack identified and blocked</li>
                  <li>2 vendor accounts flagged for unusual activity</li>
                </ul>

                <h4 className="font-semibold mb-2">Recommendations</h4>
                <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                  <li>Implement enhanced vendor verification for payments over $25,000</li>
                  <li>Review email authentication policies for executive accounts</li>
                  <li>Schedule quarterly training on invoice fraud detection</li>
                </ul>
              </div>
            )}

            {previewReport === 2 && (
              <div className="prose prose-sm max-w-none">
                <h3 className="text-lg font-semibold mb-4">Compliance Report</h3>
                <p className="text-muted-foreground mb-4">Generated: January 15, 2024</p>
                
                <div className="p-4 bg-success/10 border border-success/20 rounded-lg mb-6">
                  <div className="flex items-center gap-2">
                    <Shield className="w-5 h-5 text-success" />
                    <span className="font-semibold text-success">Compliance Status: Active Monitoring</span>
                  </div>
                </div>

                <h4 className="font-semibold mb-2">Control Summary</h4>
                <table className="w-full text-sm mb-4">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2">Control Area</th>
                      <th className="text-left py-2">Status</th>
                      <th className="text-left py-2">Last Review</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="py-2">Transaction Monitoring</td>
                      <td className="py-2"><Badge className="bg-success/10 text-success">Active</Badge></td>
                      <td className="py-2">Jan 15, 2024</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2">Invoice Verification</td>
                      <td className="py-2"><Badge className="bg-success/10 text-success">Active</Badge></td>
                      <td className="py-2">Jan 15, 2024</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2">Email Security</td>
                      <td className="py-2"><Badge className="bg-success/10 text-success">Active</Badge></td>
                      <td className="py-2">Jan 14, 2024</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}

            {previewReport === 3 && (
              <div className="prose prose-sm max-w-none">
                <h3 className="text-lg font-semibold mb-4">Case-wise Breakdown</h3>
                <p className="text-muted-foreground mb-4">Active Cases: 5 | Resolved: 1</p>
                
                <div className="space-y-4">
                  {[
                    { id: "FRD-001", type: "Duplicate Invoice", risk: "High", amount: "$45,000", status: "New" },
                    { id: "FRD-002", type: "Unusual Transaction", risk: "High", amount: "$125,000", status: "Under Review" },
                    { id: "FRD-003", type: "Email Impersonation", risk: "Medium", amount: "N/A", status: "New" },
                  ].map((caseItem) => (
                    <div key={caseItem.id} className="p-4 bg-muted/50 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-semibold">{caseItem.id}</span>
                        <Badge variant={caseItem.risk === "High" ? "destructive" : "secondary"}>
                          {caseItem.risk} Risk
                        </Badge>
                      </div>
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">Type:</span>{" "}
                          <span>{caseItem.type}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Amount:</span>{" "}
                          <span>{caseItem.amount}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Status:</span>{" "}
                          <span>{caseItem.status}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Reports;
