import { Controller, Get, Post, Body, Patch, Param, UseGuards } from '@nestjs/common';
import { JobApplicationsService } from './job-applications.service';
import { CreateJobApplicationDto } from './dto/create-job-application.dto';
import { UpdateJobApplicationDto } from './dto/update-job-application.dto';
import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('job-applications')
export class JobApplicationsController {
  constructor(private readonly jobApplicationsService: JobApplicationsService) {}

  @Post()
  create(@Body() createJobApplicationDto: CreateJobApplicationDto) {
    const userId = '10000000-0000-0000-0000-000000000000'; // Using a fake but existing user in the database to create a job application
    return this.jobApplicationsService.create(createJobApplicationDto, userId);
  }

  @Get()
  findAll() {
    return this.jobApplicationsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.jobApplicationsService.findById(id);
  }

  @Patch(':id')
  archive(@Param('id') id: string) {
    return this.jobApplicationsService.setArchived(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateJobApplicationDto: UpdateJobApplicationDto) {
    return this.jobApplicationsService.update(id, updateJobApplicationDto);
  }
  
}