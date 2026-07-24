export interface JobApplication {
  id: string;
  company: string;
  position: string;
  salary?: string; // string type because it is more flexible and operations won't be necessary 
  status: 'APPLIED' | 'INTERVIEWED' | 'OFFERED' | 'REJECTED' | 'ARCHIVED'; // ARCHIVED to avoid complete deletion
  createdAt: Date; // Job application creation date
  appliedAt: Date; // Not to be confused with createdAt because job application can be on a different date from creation one
  updatedAt: Date;
  notes?: string;
}