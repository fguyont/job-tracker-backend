import { IsEnum, IsNotEmpty, IsOptional, IsString, IsDateString } from 'class-validator';

export enum JobApplicationStatus {
  APPLIED = 'APPLIED',
  INTERVIEW = 'INTERVIEW',
  OFFERED = 'OFFERED',
  REJECTED = 'REJECTED',
}

export class CreateJobApplicationDto {
  @IsString()
  @IsNotEmpty()
  company!: string;

  @IsString()
  @IsNotEmpty()
  position!: string;

  @IsEnum(JobApplicationStatus)
  status!: JobApplicationStatus;

  @IsDateString()
  appliedAt!: string;

  @IsString()
  @IsOptional()
  notes?: string;
}
