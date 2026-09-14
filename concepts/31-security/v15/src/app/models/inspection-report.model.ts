export interface InspectionReport {
  id: string;
  field: string;
  inspector: string;
  date: string;
  htmlNotes: string;
  hasAuditApproval: boolean;
}
