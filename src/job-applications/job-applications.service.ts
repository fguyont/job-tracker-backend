import { Injectable } from '@nestjs/common';
import { CreateJobApplicationDto } from './dto/create-job-application.dto';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class JobApplicationsService {

  constructor(private readonly prisma: PrismaService) {}

  async create(createDto: CreateJobApplicationDto) {
    return this.prisma.jobApplication.create({
      data: createDto,
    });
  }

  async findAll() {
    return this.prisma.jobApplication.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findById(id: string) {
    return this.prisma.jobApplication.findUniqueOrThrow({
      where: { id },
    });
  }

}