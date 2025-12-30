import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, AlertTriangle, FileText, Mail, CreditCard, Clock, CheckCircle, XCircle, MessageSquare } from "lucide-react";
import { mockAlerts } from "@/data/mockData";
import RiskBadge from "@/components/shared/RiskBadge";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const AlertDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [notes, setNotes] = useState("");
  
  const alert = mockAlerts.find(a => a.id === id);

  if (!alert) {
    return (
      <div className="flex flex-col items-center justify-center h-96 space-y-4">
        <AlertTriangle className="w-12 h-12 text-muted-foreground" />
        <p className="text-lg text-muted-foreground">Alert not found</p>
        <Button onClick={() => navigate("/alerts")}>Back to Alerts</Button>
      </div>
    );
  }

  const getSourceIcon = (type: string) => {
    switch (type) {
      case "Invoice": return FileText;
      case "Email": return Mail;
      case "Transaction": return CreditCard;
      default: return FileText;
    }
  };

  const handleAction = (action: string) => {
    toast({
      title: action === "false-positive" ? "Marked as False Positive" : "Marked as Confirmed Fraud",
      description: `Alert ${alert.id} has been updated.`,
    });
  };

  const handleSaveNotes = () => {
    toast({
      title: "Notes Saved",
      description: "Your investigator notes have been saved.",
    });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button 
          variant="ghost" 
          size="icon"
          onClick={() => navigate("/alerts")}
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-semibold">{alert.id}</h1>
            <RiskBadge level={alert.riskLevel} />
            <Badge variant="outline">{alert.status}</Badge>
          </div>
          <p className="text-muted-foreground mt-1">{alert.fraudType}</p>
        </div>
        <Button variant="outline" onClick={() => navigate("/chat")}>
          <MessageSquare className="w-4 h-4 mr-2" />
          Ask AI
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Panel */}
        <div className="space-y-6">
          {/* Alert Summary */}
          <div className="card-elevated p-6">
            <h2 className="text-lg font-semibold mb-4">Alert Summary</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between py-2 border-b">
                <span className="text-muted-foreground">Confidence Score</span>
                <div className="flex items-center gap-2">
                  <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full ${
                        alert.confidence >= 80 ? "bg-destructive" : 
                        alert.confidence >= 60 ? "bg-warning" : "bg-success"
                      }`}
                      style={{ width: `${alert.confidence}%` }}
                    />
                  </div>
                  <span className="font-semibold">{alert.confidence}%</span>
                </div>
              </div>
              <div className="flex items-center justify-between py-2 border-b">
                <span className="text-muted-foreground">Source Type</span>
                <Badge variant="outline">{alert.source}</Badge>
              </div>
              {alert.amount && (
                <div className="flex items-center justify-between py-2 border-b">
                  <span className="text-muted-foreground">Amount</span>
                  <span className="font-semibold">
                    {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(alert.amount)}
                  </span>
                </div>
              )}
              {alert.vendor && (
                <div className="flex items-center justify-between py-2">
                  <span className="text-muted-foreground">Vendor</span>
                  <span className="font-medium">{alert.vendor}</span>
                </div>
              )}
            </div>
          </div>

          {/* Timeline */}
          <div className="card-elevated p-6">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Clock className="w-5 h-5 text-muted-foreground" />
              Timeline
            </h2>
            <div className="space-y-4">
              {alert.timeline.map((item, index) => (
                <div key={index} className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                    {index < alert.timeline.length - 1 && (
                      <div className="w-0.5 h-full bg-border mt-1" />
                    )}
                  </div>
                  <div className="pb-4">
                    <p className="text-sm font-medium">{item.event}</p>
                    <p className="text-xs text-muted-foreground">{item.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="card-elevated p-6">
            <h2 className="text-lg font-semibold mb-4">Investigator Actions</h2>
            <div className="space-y-4">
              <Textarea
                placeholder="Add investigator notes..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="min-h-[100px]"
              />
              <Button onClick={handleSaveNotes} variant="outline" className="w-full">
                Save Notes
              </Button>
              <div className="grid grid-cols-2 gap-3">
                <Button 
                  variant="outline"
                  className="border-success/30 text-success hover:bg-success/10"
                  onClick={() => handleAction("false-positive")}
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  False Positive
                </Button>
                <Button 
                  variant="outline"
                  className="border-destructive/30 text-destructive hover:bg-destructive/10"
                  onClick={() => handleAction("confirmed")}
                >
                  <XCircle className="w-4 h-4 mr-2" />
                  Confirm Fraud
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel */}
        <div className="space-y-6">
          {/* Why This Was Flagged */}
          <div className="card-elevated p-6 border-l-4 border-l-warning">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-warning" />
              Why This Was Flagged
            </h2>
            <p className="text-muted-foreground mb-4">{alert.description}</p>
            <ul className="space-y-3">
              {alert.reasons.map((reason, index) => (
                <li key={index} className="flex gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-warning mt-2 flex-shrink-0" />
                  <span className="text-sm">{reason}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Evidence */}
          <div className="card-elevated p-6">
            <h2 className="text-lg font-semibold mb-4">Supporting Evidence</h2>
            <div className="space-y-3">
              {alert.evidence.map((item, index) => {
                const Icon = getSourceIcon(item.type);
                return (
                  <div key={index} className="p-4 bg-muted/50 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Icon className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm font-medium">{item.type}</span>
                    </div>
                    <p className="text-sm text-muted-foreground font-mono bg-background p-2 rounded border">
                      {item.content}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Linked Sources */}
          <div className="card-elevated p-6">
            <h2 className="text-lg font-semibold mb-4">Linked Sources</h2>
            <div className="flex flex-wrap gap-2">
              {["Transaction Data", "Invoice Record", "Email Thread"].map((source) => (
                <Button key={source} variant="outline" size="sm" className="gap-2">
                  <FileText className="w-3 h-3" />
                  {source}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlertDetail;
