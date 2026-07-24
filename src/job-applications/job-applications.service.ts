import { Injectable } from '@nestjs/common';
import { CreateJobApplicationDto, JobApplicationStatus } from './dto/create-job-application.dto';
import { PrismaService } from 'prisma/prisma.service';
import { UpdateJobApplicationDto } from './dto/update-job-application.dto';

@Injectable()
export class JobApplicationsService {

  constructor(private readonly prisma: PrismaService) {}

  async create(createJobApplicationDto: CreateJobApplicationDto) {
    return await this.prisma.jobApplication.create({
      data: createJobApplicationDto,
    });
  }

  async findAll() {
    return await this.prisma.jobApplication.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findById(id: string) {
    return await this.prisma.jobApplication.findUniqueOrThrow({
      where: { id },
    });
  }

  async setArchived(id: string) {
    var toArchived = await this.findById(id);
    if (toArchived != null) {
      return await this.prisma.jobApplication.update({
        where: { id },
        data: {
          status: JobApplicationStatus.ARCHIVED,
        },
      });
    }
  }

  async update(id: string, updateJobApplicationDto: UpdateJobApplicationDto) {
    var toUpdate = await this.findById(id);
    if (toUpdate != null) {
      return await this.prisma.jobApplication.update({
        where: { id },
        data: updateJobApplicationDto,
      });
    }
  }

}