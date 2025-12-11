
export const MOCK_USER = {
  name: "Maria Rodriguez",
  role: "Mother/Guardian",
  inmateName: "Joseph 'Joe' Rodriguez",
  inmateId: "CDCR #T-12345",
  facility: "Corcoran State Prison",
};

export const CASE_TIMELINE = [
  {
    id: 1,
    date: "2024-10-01",
    title: "Complaint Filed",
    description: "Civil Rights Complaint (42 USC §1983) filed alleging denial of medical care.",
    status: "completed",
    type: "legal",
  },
  {
    id: 2,
    date: "2024-11-15",
    title: "Service of Defendants",
    description: "Defendants served with the complaint. Proof of service filed.",
    status: "completed",
    type: "legal",
  },
  {
    id: 3,
    date: "2024-12-01",
    title: "Defendant's Motion to Dismiss",
    description: "Defendants filed a motion to dismiss arguing failure to exhaust remedies.",
    status: "active",
    type: "alert",
    note: "Waiting for court ruling. Lawyer says this is standard.",
  },
  {
    id: 4,
    date: "2025-02-15",
    title: "Discovery Phase (Expected)",
    description: "If motion is denied, discovery begins. Prepare medical records.",
    status: "upcoming",
    type: "legal",
  },
];

export const DOCUMENTS = [
  {
    id: 1,
    title: "Initial Complaint.pdf",
    type: "Legal",
    date: "2024-10-01",
    size: "2.4 MB",
  },
  {
    id: 2,
    title: "CDCR 602 Grievance - Medical.pdf",
    type: "Grievance",
    date: "2024-09-15",
    size: "1.1 MB",
  },
  {
    id: 3,
    title: "Letter from Joe - Nov 5.jpg",
    type: "Correspondence",
    date: "2024-11-05",
    size: "3.5 MB",
  },
  {
    id: 4,
    title: "Medical Request Form 7362.pdf",
    type: "Medical",
    date: "2024-08-20",
    size: "0.8 MB",
  },
];

export const JOURNAL_ENTRIES = [
  {
    id: 1,
    date: "2024-12-10",
    title: "Call with Joe",
    content: "Joe called at 2pm. Said his back pain is getting worse. Still hasn't seen the specialist despite the court order. He filed another 602 today.",
    tags: ["Medical", "Call", "Grievance"],
    urgent: true,
  },
  {
    id: 2,
    date: "2024-11-28",
    title: "Legal Mail Received",
    content: "Received a letter from the court. The scheduling conference has been moved to January.",
    tags: ["Legal", "Mail"],
    urgent: false,
  },
];

export const HELP_ARTICLES = [
  {
    id: 1,
    title: "Understanding 42 USC §1983",
    category: "Federal Law",
    description: "A guide to filing civil rights lawsuits against government officials.",
  },
  {
    id: 2,
    title: "Exhaustion of Remedies (PLRA)",
    category: "Procedure",
    description: "Why you MUST finish the prison grievance process before suing.",
  },
  {
    id: 3,
    title: "Filing a CDCR 602 Grievance",
    category: "State Procedure",
    description: "Step-by-step guide to the California prison grievance system.",
  },
  {
    id: 4,
    title: "Eighth Amendment Rights",
    category: "Constitutional Rights",
    description: "What constitutes 'Cruel and Unusual Punishment' regarding medical care.",
  },
];
