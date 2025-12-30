import { useState } from "react";
import { Save, RotateCcw, Sliders, ToggleLeft, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

const Settings = () => {
  const { toast } = useToast();
  const [amountThreshold, setAmountThreshold] = useState([25000]);
  const [frequencySensitivity, setFrequencySensitivity] = useState([70]);
  const [emailCorrelation, setEmailCorrelation] = useState(true);
  const [duplicateCheck, setDuplicateCheck] = useState(true);
  const [rushPaymentFlag, setRushPaymentFlag] = useState(true);
  const [offHoursAlert, setOffHoursAlert] = useState(false);

  const handleSave = () => {
    toast({
      title: "Settings Saved",
      description: "Your detection thresholds have been updated.",
    });
  };

  const handleReset = () => {
    setAmountThreshold([25000]);
    setFrequencySensitivity([70]);
    setEmailCorrelation(true);
    setDuplicateCheck(true);
    setRushPaymentFlag(true);
    setOffHoursAlert(false);
    toast({
      title: "Settings Reset",
      description: "All settings have been restored to defaults.",
    });
  };

  return (
    <div className="space-y-6 animate-fade-in max-w-2xl">
      <div>
        <h1 className="text-2xl font-semibold">Settings</h1>
        <p className="text-muted-foreground mt-1">Configure detection thresholds and analysis options</p>
      </div>

      {/* Thresholds */}
      <div className="card-elevated p-6">
        <div className="flex items-center gap-2 mb-6">
          <Sliders className="w-5 h-5 text-primary" />
          <h2 className="text-lg font-semibold">Detection Thresholds</h2>
        </div>

        <div className="space-y-8">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-base">Amount Threshold</Label>
                <p className="text-sm text-muted-foreground">
                  Flag transactions exceeding this amount
                </p>
              </div>
              <span className="text-lg font-semibold">
                ${amountThreshold[0].toLocaleString()}
              </span>
            </div>
            <Slider
              value={amountThreshold}
              onValueChange={setAmountThreshold}
              max={100000}
              min={1000}
              step={1000}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>$1,000</span>
              <span>$100,000</span>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-base">Frequency Sensitivity</Label>
                <p className="text-sm text-muted-foreground">
                  How aggressively to flag repeated patterns
                </p>
              </div>
              <span className="text-lg font-semibold">
                {frequencySensitivity[0]}%
              </span>
            </div>
            <Slider
              value={frequencySensitivity}
              onValueChange={setFrequencySensitivity}
              max={100}
              min={10}
              step={5}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Low (10%)</span>
              <span>High (100%)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Feature Toggles */}
      <div className="card-elevated p-6">
        <div className="flex items-center gap-2 mb-6">
          <ToggleLeft className="w-5 h-5 text-primary" />
          <h2 className="text-lg font-semibold">Detection Features</h2>
        </div>

        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-base">Email Correlation</Label>
              <p className="text-sm text-muted-foreground">
                Cross-reference emails with invoice submissions
              </p>
            </div>
            <Switch
              checked={emailCorrelation}
              onCheckedChange={setEmailCorrelation}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-base">Duplicate Document Check</Label>
              <p className="text-sm text-muted-foreground">
                Detect duplicate invoices and receipts
              </p>
            </div>
            <Switch
              checked={duplicateCheck}
              onCheckedChange={setDuplicateCheck}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-base">Rush Payment Alerts</Label>
              <p className="text-sm text-muted-foreground">
                Flag payments marked as urgent or rush
              </p>
            </div>
            <Switch
              checked={rushPaymentFlag}
              onCheckedChange={setRushPaymentFlag}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-base">Off-Hours Activity</Label>
              <p className="text-sm text-muted-foreground">
                Alert on transactions outside business hours
              </p>
            </div>
            <Switch
              checked={offHoursAlert}
              onCheckedChange={setOffHoursAlert}
            />
          </div>
        </div>
      </div>

      {/* Warning */}
      <div className="p-4 bg-warning/10 border border-warning/20 rounded-lg flex gap-3">
        <AlertTriangle className="w-5 h-5 text-warning flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-medium">Adjusting Sensitivity</p>
          <p className="text-sm text-muted-foreground">
            Lower thresholds may increase false positives. Higher thresholds may miss genuine fraud. 
            Review alert trends after making changes.
          </p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        <Button onClick={handleSave} className="flex-1">
          <Save className="w-4 h-4 mr-2" />
          Save Settings
        </Button>
        <Button variant="outline" onClick={handleReset}>
          <RotateCcw className="w-4 h-4 mr-2" />
          Reset to Default
        </Button>
      </div>
    </div>
  );
};

export default Settings;
