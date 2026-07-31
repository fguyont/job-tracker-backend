import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateJobApplicationDto, JobApplicationStatus } from './dto/create-job-application.dto';
import { UpdateJobApplicationDto } from './dto/update-job-application.dto';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class JobApplicationsService {

  constructor(private readonly prisma: PrismaService) { }

  async create(createJobApplicationDto: CreateJobApplicationDto, userId: string) {
    return await this.prisma.jobApplication.create({
      data: {
        ...createJobApplicationDto,
        user: {
          connect: { id: userId },
        },
      }
    });
  }

  async findAll(userId: string) {
    return await this.prisma.jobApplication.findMany({
      where: {
        userId: userId
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findById(id: string, userId: string) {
    return await this.prisma.jobApplication.findUniqueOrThrow({
      where: {
        id: id,
        userId: userId
      },
    });
  }

  async setArchived(id: string, userId: string) {
    var toArchived = await this.findById(id, userId);
    if (toArchived != null) {
      return await this.prisma.jobApplication.update({
        where: {
          id: id,
          userId: userId
        },
        data: {
          status: JobApplicationStatus.ARCHIVED,
        },
      });
    }
    throw new BadRequestException(`Job application not archived`);
  }

  async update(id: string, userId: string, updateJobApplicationDto: UpdateJobApplicationDto) {
    var toUpdate = await this.findById(id, userId);
    if (toUpdate != null) {
      return await this.prisma.jobApplication.update({
        where: {
          id: id,
          userId: userId
        },
        data: updateJobApplicationDto,
      });
    }
    throw new BadRequestException(`Job application not updated`);
  }

}