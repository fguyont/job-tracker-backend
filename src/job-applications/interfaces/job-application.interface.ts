export interface JobApplication {
  id: string;
  company: string;
  position: string;
  status: 'APPLIED' | 'INTERVIEW' | 'OFFERED' | 'REJECTED' | 'ARCHIVED'; // ARCHIVED to avoid complete deletion
  createdAt: Date; // Job application creation date
  appliedAt: Date; // Not to be confused with createdAt because job application can be on a different date from creation one
  updatedAt: Date;
  notes?: string;
}