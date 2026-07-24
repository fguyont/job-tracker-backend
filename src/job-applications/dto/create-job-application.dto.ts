import { Type } from 'class-transformer';
import { IsEnum, IsNotEmpty, IsOptional, IsString, IsDate } from 'class-validator';

export enum JobApplicationStatus {
  APPLIED = 'APPLIED',
  INTERVIEW = 'INTERVIEWED',
  OFFERED = 'OFFERED',
  REJECTED = 'REJECTED',
  ARCHIVED = 'ARCHIVED'
}

export class CreateJobApplicationDto {
  @IsString()
  @IsNotEmpty()
  company!: string;

  @IsString()
  @IsNotEmpty()
  position!: string;

  @IsString()
  @IsOptional()
  salary?: string;

  @IsEnum(JobApplicationStatus)
  status!: JobApplicationStatus;

  @Type(() => Date)  // Converts string to date
  @IsDate()
  appliedAt!: Date;

  @IsString()
  @IsOptional()
  notes?: string;
}
