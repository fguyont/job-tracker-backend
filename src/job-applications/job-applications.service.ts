import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateJobApplicationDto } from './dto/create-job-application.dto';
import { UpdateJobApplicationDto } from './dto/update-job-application.dto';
import { JobApplication } from './interfaces/job-application.interface';

@Injectable()
export class JobApplicationsService {
  private jobApplications: JobApplication[] = [
    {
      id: '1',
      company: 'TechCorp',
      position: 'Frontend Developer',
      status: 'APPLIED',
      createdAt: new Date('2026-07-18T00:30:00'),
      appliedAt: new Date('2026-07-15T14:30:00'),
      updatedAt: new Date('2026-07-20T16:30:00')
    },
  ];

  findAll(): JobApplication[] {
    return this.jobApplications;
  }

  create(createDto: CreateJobApplicationDto): JobApplication {
    const newJob: JobApplication = {
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date(),
      ...createDto,
    };
    this.jobApplications.push(newJob);
    return newJob;
  }

  update(id: string, updateDto: UpdateJobApplicationDto): JobApplication {
    const jobIndex = this.jobApplications.findIndex((job) => job.id === id);
    if (jobIndex === -1) {
      throw new NotFoundException(`JobApplication with ID "${id}" not found`);
    }

    const updatedJob = {
      ...this.jobApplications[jobIndex],
      ...updateDto,
    };

    this.jobApplications[jobIndex] = updatedJob;
    return updatedJob;
  }
}