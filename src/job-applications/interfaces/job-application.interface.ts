export interface JobApplication {
  id: string;
  company: string;
  position: string;
  status: 'APPLIED' | 'INTERVIEW' | 'OFFERED' | 'REJECTED';
  appliedAt: string;
  notes?: string;
}