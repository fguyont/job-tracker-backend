import { Controller, Get, Post, Body, Patch, Param } from '@nestjs/common';
import { JobApplicationsService } from './job-applications.service';
import { CreateJobApplicationDto } from './dto/create-job-application.dto';
import { UpdateJobApplicationDto } from './dto/update-job-application.dto';

@Controller('job-applications')
export class JobApplicationsController {
  constructor(private readonly jobApplicationsService: JobApplicationsService) {}

  @Post()
  create(@Body() createDto: CreateJobApplicationDto) {
    return this.jobApplicationsService.create(createDto);
  }

  @Get()
  findAll() {
    return this.jobApplicationsService.findAll();
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDto: UpdateJobApplicationDto) {
    return this.jobApplicationsService.update(id, updateDto);
  }
}