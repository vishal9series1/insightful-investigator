export interface FraudAlert {
  id: string;
  riskLevel: "high" | "medium" | "low";
  fraudType: string;
  source: "Transaction" | "Invoice" | "Email";
  amount?: number;
  vendor?: string;
  status: "New" | "Under Review" | "Resolved";
  createdAt: string;
  description: string;
  confidence: number;
  reasons: string[];
  timeline: {
    date: string;
    event: string;
  }[];
  evidence: {
    type: string;
    content: string;
  }[];
}

export const mockAlerts: FraudAlert[] = [
  {
    id: "FRD-001",
    riskLevel: "high",
    fraudType: "Duplicate Invoice",
    source: "Invoice",
    amount: 45000,
    vendor: "TechSupply Corp",
    status: "New",
    createdAt: "2024-01-15T10:30:00Z",
    description: "Duplicate invoice detected with identical amounts and vendor details across multiple submissions",
    confidence: 94,
    reasons: [
      "Invoice number INV-2024-001 appears twice in the system",
      "Submission dates are 3 days apart",
      "Same vendor, amount, and line items",
      "Different payment accounts specified"
    ],
    timeline: [
      { date: "2024-01-12", event: "First invoice submitted" },
      { date: "2024-01-15", event: "Duplicate invoice detected" },
      { date: "2024-01-15", event: "Alert generated" }
    ],
    evidence: [
      { type: "Invoice", content: "Invoice #INV-2024-001 - $45,000.00 - TechSupply Corp" },
      { type: "Transaction", content: "Payment request initiated for duplicate invoice" }
    ]
  },
  {
    id: "FRD-002",
    riskLevel: "high",
    fraudType: "Unusual Transaction Pattern",
    source: "Transaction",
    amount: 125000,
    vendor: "Global Services Ltd",
    status: "Under Review",
    createdAt: "2024-01-14T14:20:00Z",
    description: "Transaction amount significantly exceeds historical patterns for this vendor",
    confidence: 89,
    reasons: [
      "Transaction is 340% higher than average for this vendor",
      "Occurred outside normal business hours",
      "New payment destination account",
      "Rush payment flag enabled"
    ],
    timeline: [
      { date: "2024-01-14", event: "Transaction initiated" },
      { date: "2024-01-14", event: "Anomaly detected by AI" },
      { date: "2024-01-14", event: "Alert escalated to review" }
    ],
    evidence: [
      { type: "Transaction", content: "Wire transfer $125,000 to account ending 4521" },
      { type: "Email", content: "Urgent payment request from [email protected]" }
    ]
  },
  {
    id: "FRD-003",
    riskLevel: "medium",
    fraudType: "Email Impersonation",
    source: "Email",
    vendor: "CEO Office",
    status: "New",
    createdAt: "2024-01-14T09:15:00Z",
    description: "Suspicious email requesting urgent wire transfer appears to impersonate executive",
    confidence: 76,
    reasons: [
      "Email domain slightly differs from company domain",
      "Unusual request pattern for executive",
      "Urgency language detected",
      "New recipient bank details"
    ],
    timeline: [
      { date: "2024-01-14", event: "Suspicious email received" },
      { date: "2024-01-14", event: "Email flagged by system" }
    ],
    evidence: [
      { type: "Email", content: "From: [email protected] - Subject: Urgent Wire Transfer Needed" }
    ]
  },
  {
    id: "FRD-004",
    riskLevel: "medium",
    fraudType: "Vendor Account Change",
    source: "Invoice",
    amount: 28500,
    vendor: "Office Supplies Inc",
    status: "Under Review",
    createdAt: "2024-01-13T16:45:00Z",
    description: "Vendor bank account details changed shortly before large payment",
    confidence: 72,
    reasons: [
      "Bank account changed 2 days before invoice submission",
      "Change request via email, not official channels",
      "Payment amount higher than usual"
    ],
    timeline: [
      { date: "2024-01-11", event: "Bank details change requested" },
      { date: "2024-01-13", event: "Invoice submitted with new details" },
      { date: "2024-01-13", event: "Pattern flagged" }
    ],
    evidence: [
      { type: "Invoice", content: "Invoice #OS-5521 - $28,500.00" },
      { type: "Email", content: "Bank change request from [email protected]" }
    ]
  },
  {
    id: "FRD-005",
    riskLevel: "low",
    fraudType: "Minor Discrepancy",
    source: "Transaction",
    amount: 1250,
    vendor: "Cloud Services Pro",
    status: "Resolved",
    createdAt: "2024-01-12T11:00:00Z",
    description: "Small variance detected between invoice and payment amounts",
    confidence: 45,
    reasons: [
      "Payment amount differs by $50 from invoice",
      "Likely rounding or tax adjustment"
    ],
    timeline: [
      { date: "2024-01-12", event: "Discrepancy detected" },
      { date: "2024-01-12", event: "Marked for review" },
      { date: "2024-01-13", event: "Resolved as tax adjustment" }
    ],
    evidence: [
      { type: "Invoice", content: "Invoice amount: $1,200.00" },
      { type: "Transaction", content: "Payment amount: $1,250.00" }
    ]
  },
  {
    id: "FRD-006",
    riskLevel: "low",
    fraudType: "Timing Anomaly",
    source: "Transaction",
    amount: 8900,
    vendor: "Marketing Agency",
    status: "New",
    createdAt: "2024-01-11T08:30:00Z",
    description: "Transaction processed outside normal approval workflow timing",
    confidence: 38,
    reasons: [
      "Approved at 2:30 AM local time",
      "Approver typically works 9-5 schedule"
    ],
    timeline: [
      { date: "2024-01-11", event: "Transaction approved" },
      { date: "2024-01-11", event: "Timing flag raised" }
    ],
    evidence: [
      { type: "Transaction", content: "Approval timestamp: 2024-01-11 02:30:00 UTC" }
    ]
  }
];

export const chatMessages = [
  {
    id: 1,
    role: "user" as const,
    content: "What are the top fraud patterns you've detected this week?"
  },
  {
    id: 2,
    role: "assistant" as const,
    content: "Based on my analysis, I've identified 3 primary fraud patterns this week:\n\n1. **Duplicate Invoices** (4 cases) - Multiple submissions of identical invoices from different sources\n\n2. **Unusual Transaction Amounts** (2 cases) - Payments significantly exceeding historical patterns\n\n3. **Email Impersonation** (1 case) - Suspected BEC attack targeting wire transfers\n\nWould you like me to dive deeper into any of these patterns?"
  }
];

export const uploadedFiles = [
  { id: 1, name: "transactions_jan2024.csv", type: "Transactions", status: "completed", records: 1250 },
  { id: 2, name: "invoices_batch_001.pdf", type: "Invoices", status: "processing", records: null },
  { id: 3, name: "email_archive.json", type: "Emails", status: "completed", records: 342 }
];
